#!/usr/bin/env node
/**
 * Generates public/sitemap.xml :
 *   - all static routes of the React app
 *   - all published WordPress blog articles fetched live from integracc.fr
 *
 * Run:   node scripts/gen-sitemap.mjs
 * Or:    npm run build:sitemap
 *
 * Output: public/sitemap.xml
 */

import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SITE_URL = process.env.SITE_URL || "https://integra-assurance.com";
const WP_API_URL = process.env.WP_API_URL || "https://integracc.fr";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/a-propos", priority: 0.9, changefreq: "monthly" },
  { path: "/blog", priority: 0.9, changefreq: "daily" },
  { path: "/service/assurance-auto", priority: 0.9, changefreq: "monthly" },
  { path: "/service/assurance-moto", priority: 0.9, changefreq: "monthly" },
  { path: "/service/assurance-habitation", priority: 0.9, changefreq: "monthly" },
  { path: "/service/assurance-sante", priority: 0.9, changefreq: "monthly" },
  { path: "/service/assurance-prevoyance", priority: 0.9, changefreq: "monthly" },
  { path: "/service/assurance-pro", priority: 0.9, changefreq: "monthly" },
  { path: "/service/assurance-decennale", priority: 0.9, changefreq: "monthly" },
  { path: "/service/assurance-vtc", priority: 0.9, changefreq: "monthly" },
  { path: "/calculateur-bonus-malus", priority: 0.7, changefreq: "monthly" },
  { path: "/code-de-la-route", priority: 0.6, changefreq: "monthly" },
  { path: "/espace-client", priority: 0.5, changefreq: "yearly" },
  { path: "/mentions-legales", priority: 0.3, changefreq: "yearly" },
  { path: "/politique-de-confidentialite", priority: 0.3, changefreq: "yearly" },
  { path: "/politique-cookies", priority: 0.3, changefreq: "yearly" },
];

async function fetchAllBlogPosts() {
  const posts = [];
  let page = 1;
  const perPage = 100;
  for (;;) {
    const url = new URL(`${WP_API_URL}/wp-json/wp/v2/posts`);
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("status", "publish");
    url.searchParams.set("_fields", "slug,modified");
    let res;
    try {
      res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
    } catch (e) {
      console.warn(`[sitemap] WP fetch failed page ${page}: ${e.message}`);
      break;
    }
    if (!res.ok) {
      if (res.status === 400 && page > 1) break; // page out of range
      console.warn(`[sitemap] WP returned ${res.status} on page ${page}`);
      break;
    }
    const arr = await res.json();
    if (!Array.isArray(arr) || arr.length === 0) break;
    posts.push(...arr);
    const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);
    if (page >= totalPages) break;
    page++;
    if (page > 20) break; // safety cap
  }
  return posts;
}

function isoDate(d) {
  try {
    return new Date(d).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

async function main() {
  console.log(`[sitemap] Generating for ${SITE_URL}`);
  console.log(`[sitemap] Fetching blog from ${WP_API_URL}/wp-json/wp/v2/posts ...`);
  const posts = await fetchAllBlogPosts();
  console.log(`[sitemap] Got ${posts.length} blog posts`);

  const today = new Date().toISOString().split("T")[0];

  const urls = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${SITE_URL}${r.path}`,
      lastmod: today,
      changefreq: r.changefreq,
      priority: r.priority.toFixed(1),
    })),
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: isoDate(p.modified),
      changefreq: "monthly",
      priority: "0.8",
    })),
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          `    <lastmod>${u.lastmod}</lastmod>\n` +
          `    <changefreq>${u.changefreq}</changefreq>\n` +
          `    <priority>${u.priority}</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  const outPath = join(ROOT, "public", "sitemap.xml");
  writeFileSync(outPath, xml, "utf8");
  console.log(`[sitemap] ✓ Wrote ${urls.length} URLs to ${outPath}`);
}

main().catch((err) => {
  console.error("[sitemap] Failed:", err);
  process.exit(1);
});
