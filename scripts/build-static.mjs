#!/usr/bin/env node
/**
 * Static site generator for Hostinger shared hosting.
 *
 * Approach:
 *   1. Generate sitemap.xml (gathers all routes incl. dynamic blog slugs)
 *   2. Run `vite build` to produce dist/client (hashed assets) + dist/server (SSR worker)
 *   3. Spawn `wrangler dev` to serve the built SSR worker locally
 *   4. Crawl every URL listed in sitemap.xml, save the rendered HTML
 *   5. Stop wrangler, copy public/ → dist-static/, copy dist/client/* → dist-static/
 *   6. Output dist-static/ ready to be uploaded to Hostinger public_html/
 *
 * Usage:
 *   npm run build:static
 *
 * Requirements:
 *   - wrangler installed (comes with @cloudflare/vite-plugin via npm install)
 *   - Internet access (sitemap fetches WP slugs from integracc.fr)
 *
 * After completion, upload the contents of dist-static/ to Hostinger.
 */

import { execSync, spawn } from "node:child_process";
import { writeFileSync, mkdirSync, existsSync, cpSync, rmSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "dist-static");
const PUBLIC_DIR = join(ROOT, "public");
const CLIENT_DIST = join(ROOT, "dist", "client");

const PORT = 8788;
const SERVER_URL = `http://127.0.0.1:${PORT}`;
const WAIT_MAX_MS = 30_000;

// ────────────────────────────────────────────────────────────
function log(msg) {
  console.log(`[static] ${msg}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer() {
  const deadline = Date.now() + WAIT_MAX_MS;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(SERVER_URL + "/", { method: "HEAD" });
      if (res.status < 500) return true;
    } catch {
      // not ready yet
    }
    await sleep(500);
  }
  throw new Error(`Wrangler did not become ready on ${SERVER_URL} within ${WAIT_MAX_MS / 1000}s`);
}

function parseSitemap() {
  const sitemapPath = join(PUBLIC_DIR, "sitemap.xml");
  if (!existsSync(sitemapPath)) {
    throw new Error("public/sitemap.xml not found — run `npm run build:sitemap` first");
  }
  const xml = readFileSync(sitemapPath, "utf8");
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map((m) => {
    const url = new URL(m[1]);
    return url.pathname.replace(/\/$/, "") || "/";
  });
}

async function fetchHtml(path, attempt = 1) {
  const MAX_ATTEMPTS = 3;
  try {
    const res = await fetch(SERVER_URL + path, {
      headers: { Accept: "text/html" },
      // Some wrangler dev hosts return slow responses for big pages
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok && res.status !== 404) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.text();
  } catch (err) {
    if (attempt < MAX_ATTEMPTS) {
      // Exponential backoff: 500ms, 1500ms
      await sleep(500 * Math.pow(3, attempt - 1));
      return fetchHtml(path, attempt + 1);
    }
    throw new Error(`${err.message || "fetch failed"} (after ${MAX_ATTEMPTS} attempts)`);
  }
}

function saveHtml(path, html) {
  // path "/foo/bar" → dist-static/foo/bar/index.html
  // path "/" → dist-static/index.html
  const relPath = path === "/" ? "index.html" : path.replace(/^\//, "") + "/index.html";
  const fullPath = join(OUT, relPath);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, html, "utf8");
}

// ────────────────────────────────────────────────────────────
async function main() {
  // Step 1: sitemap (also gives us the list of routes to crawl)
  log("1/5 — Generating sitemap…");
  execSync("node scripts/gen-sitemap.mjs", { stdio: "inherit", cwd: ROOT });

  // Step 2: build prod
  log("2/5 — Building production assets (vite build)…");
  execSync("npm run build", { stdio: "inherit", cwd: ROOT });

  // Step 3: spawn wrangler dev
  log("3/5 — Starting wrangler dev server on port " + PORT + " …");
  const wrangler = spawn("npx", ["wrangler", "dev", "--port", String(PORT), "--local", "--log-level=warn"], {
    cwd: ROOT,
    stdio: ["ignore", "inherit", "inherit"],
    shell: true,
  });

  let wranglerExited = false;
  wrangler.on("exit", () => (wranglerExited = true));

  // Cleanup helper
  const cleanup = () => {
    if (!wranglerExited) {
      try {
        wrangler.kill();
      } catch {
        // ignore
      }
    }
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(130);
  });

  try {
    await waitForServer();
    log(`Server is ready at ${SERVER_URL}`);

    // Step 4: crawl every route
    log("4/5 — Crawling routes & saving HTML…");
    const routes = parseSitemap();
    log(`  ${routes.length} routes to crawl`);

    // Clean output dir
    if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
    mkdirSync(OUT, { recursive: true });

    let saved = 0;
    let failed = 0;
    for (const route of routes) {
      try {
        const html = await fetchHtml(route);
        saveHtml(route, html);
        saved++;
        if (saved % 10 === 0) log(`    ${saved}/${routes.length} routes processed`);
      } catch (err) {
        failed++;
        console.error(`  ⚠ ${route}: ${err.message}`);
      }
    }
    log(`  ✓ ${saved} saved, ${failed} failed`);

    // Step 5: copy public/ and dist/client/ into dist-static/
    log("5/5 — Copying public/ and dist/client/ assets…");
    if (existsSync(PUBLIC_DIR)) {
      cpSync(PUBLIC_DIR, OUT, { recursive: true, force: true });
    }
    if (existsSync(CLIENT_DIST)) {
      cpSync(CLIENT_DIST, OUT, { recursive: true, force: true });
    }

    log(`✅ Static site ready in dist-static/`);
    log(`   Upload the contents of dist-static/ to your Hostinger public_html/`);
  } finally {
    cleanup();
  }
}

main().catch((err) => {
  console.error("[static] FAILED:", err);
  process.exit(1);
});
