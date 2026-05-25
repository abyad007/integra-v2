/**
 * Headless WordPress API client.
 *
 * Architecture:
 *   integracc.fr   → WordPress V1 (source of truth for blog)
 *   integra-assurance.com → React V2 (this app, public consumer)
 *
 * Security model:
 *   - All fetches are UNAUTHENTICATED (no Application Password used).
 *   - Reason: Vite inlines VITE_* env vars in the public client bundle.
 *     Putting credentials in VITE_* would expose them to all visitors.
 *   - Published posts + categories + featured media are public on WP REST.
 *   - Authors are protected → resolved via local AUTHOR_MAP fallback.
 *   - To preview drafts later: use a TanStack Start `createServerFn` with
 *     a server-only secret (no VITE_ prefix), invisible to the browser.
 */

import { MOCK_POSTS, MOCK_CATEGORIES } from "./wp-mock-data";

const WP_API_URL = (import.meta.env.VITE_WP_API_URL as string | undefined) ?? "";
const WP_USE_RANK_MATH = import.meta.env.VITE_WP_USE_RANK_MATH === "true";

export const WP_IS_LIVE = WP_API_URL.length > 0;

// ────────────────────────────────────────────────────────────
// Author resolution — public WP doesn't expose /users without auth.
// We map known author IDs from integracc.fr to display names.
// Unknown IDs → generic fallback "Équipe Integra".
// ────────────────────────────────────────────────────────────

const AUTHOR_MAP: Record<number, { name: string; slug: string; description?: string }> = {
  1: {
    name: "Équipe Integra Assurance",
    slug: "equipe-integra",
    description:
      "Courtier en assurances en ligne agréé ORIAS n°25002890. Notre équipe d'experts vous aide à comparer et choisir les meilleures offres.",
  },
  7: {
    name: "Ilyass Zerouali",
    slug: "ilyass-zerouali",
    description:
      "Courtier en assurance indépendant agréé ORIAS n°25002890. Fondateur d'Integra Assurance, spécialiste des profils résiliés, malussés et jeunes conducteurs depuis 2019.",
  },
};

const DEFAULT_AUTHOR = AUTHOR_MAP[1];

// ────────────────────────────────────────────────────────────
// Public types — internal, post-normalisation
// ────────────────────────────────────────────────────────────

export type WpAuthor = {
  id: number;
  name: string;
  slug: string;
  avatar?: string;
};

export type WpCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
};

export type WpTag = {
  id: number;
  name: string;
  slug: string;
};

export type WpMediaSize = {
  url: string;
  width: number;
  height: number;
};

export type WpMedia = {
  url: string;
  alt: string;
  width: number;
  height: number;
  /** Real WP-generated sizes (only those that actually exist on the server) */
  sizes: WpMediaSize[];
};

export type RankMathHead = {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  schema?: object;
  rawHead?: string;
};

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  link?: string;
  title: string;
  excerpt: string;
  content: string;
  featuredMedia?: WpMedia;
  author: WpAuthor;
  categories: WpCategory[];
  tags: WpTag[];
  rankMath?: RankMathHead;
  readingTimeMin: number;
};

// ────────────────────────────────────────────────────────────
// Raw WP shape (subset, only what we consume)
// ────────────────────────────────────────────────────────────

type WpRawMedia = {
  id: number;
  source_url?: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
};

type WpRawTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
};

type WpRaw = {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  link?: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  author: number;
  categories?: number[];
  tags?: number[];
  featured_media?: number;
  _embedded?: {
    author?: Array<{ id: number; name: string; slug: string; avatar_urls?: Record<string, string>; description?: string }>;
    "wp:featuredmedia"?: WpRawMedia[];
    "wp:term"?: WpRawTerm[][];
  };
};

// ────────────────────────────────────────────────────────────
// Utilities
// ────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/** Strip the leading <h1>...</h1> from rendered content (it duplicates the post title) */
function stripLeadingH1(html: string): string {
  return html.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");
}

/** Decode common HTML entities in titles (&amp; → &, &#8217; → ', etc.) */
function decodeEntities(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&#0?38;/g, "&")
    .replace(/&#0?39;/g, "'")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function computeReadingTime(html: string): number {
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function resolveAuthor(id: number): WpAuthor {
  const known = AUTHOR_MAP[id];
  if (known) return { id, ...known };
  return { id, ...DEFAULT_AUTHOR };
}

function mapMedia(raw: WpRawMedia): WpMedia | undefined {
  if (!raw?.source_url) return undefined;
  const rawSizes = raw.media_details?.sizes ?? {};

  // Collect ONLY the standard responsive sizes that actually exist
  // (we skip theme-specific cropped variants like consulting-image-350x204-croped
  //  to keep the srcset clean).
  const wantedKeys = ["thumbnail", "medium", "medium_large", "large", "1536x1536", "2048x2048", "full"];
  const sizes: WpMediaSize[] = [];
  const seen = new Set<number>();

  for (const key of wantedKeys) {
    const s = rawSizes[key];
    if (s?.source_url && s.width && !seen.has(s.width)) {
      sizes.push({ url: s.source_url, width: s.width, height: s.height });
      seen.add(s.width);
    }
  }
  // Always include the original
  const origW = raw.media_details?.width ?? 0;
  if (origW && !seen.has(origW)) {
    sizes.push({ url: raw.source_url, width: origW, height: raw.media_details?.height ?? 0 });
  } else if (sizes.length === 0) {
    sizes.push({ url: raw.source_url, width: origW || 1200, height: raw.media_details?.height ?? 630 });
  }

  // Sort ascending by width for a clean srcset
  sizes.sort((a, b) => a.width - b.width);

  // Pick the "large" size (around 1024px) as the default `src` for cards
  const defaultSize = sizes.find((s) => s.width >= 900 && s.width <= 1280) ?? sizes[sizes.length - 1];

  return {
    url: defaultSize.url,
    alt: raw.alt_text ?? "",
    width: defaultSize.width,
    height: defaultSize.height,
    sizes,
  };
}

function mapPost(raw: WpRaw, catLookup?: Map<number, WpCategory>): WpPost {
  const featuredRaw = raw._embedded?.["wp:featuredmedia"]?.[0];
  // Skip broken embeds (404 placeholder objects from WP when image missing)
  const featuredMedia =
    featuredRaw && featuredRaw.source_url ? mapMedia(featuredRaw) : undefined;

  // Categories: prefer embedded terms; fall back to ID lookup
  const embeddedTerms = raw._embedded?.["wp:term"]?.flat() ?? [];
  const embeddedCats = embeddedTerms.filter((t) => t.taxonomy === "category");
  const embeddedTags = embeddedTerms.filter((t) => t.taxonomy === "post_tag");

  let categories: WpCategory[] = embeddedCats.map((t) => ({
    id: t.id,
    name: decodeEntities(t.name),
    slug: t.slug,
  }));

  // Fallback: if no embedded categories, resolve from cat IDs + lookup table
  if (categories.length === 0 && raw.categories && catLookup) {
    categories = raw.categories
      .map((id) => catLookup.get(id))
      .filter((c): c is WpCategory => Boolean(c));
  }

  const tags: WpTag[] = embeddedTags.map((t) => ({
    id: t.id,
    name: decodeEntities(t.name),
    slug: t.slug,
  }));

  // Author: try embedded first, then fallback to local AUTHOR_MAP
  const authorEmbedded = raw._embedded?.author?.[0];
  const author: WpAuthor =
    authorEmbedded && !("code" in authorEmbedded)
      ? {
          id: authorEmbedded.id,
          name: authorEmbedded.name,
          slug: authorEmbedded.slug,
          avatar: authorEmbedded.avatar_urls?.["96"],
        }
      : resolveAuthor(raw.author);

  const cleanedContent = stripLeadingH1(raw.content.rendered);

  return {
    id: raw.id,
    slug: raw.slug,
    date: raw.date,
    modified: raw.modified,
    link: raw.link,
    title: decodeEntities(stripHtml(raw.title.rendered)),
    excerpt: raw.excerpt.rendered,
    content: cleanedContent,
    featuredMedia,
    author,
    categories,
    tags,
    readingTimeMin: computeReadingTime(cleanedContent),
  };
}

// ────────────────────────────────────────────────────────────
// Public API — work with mock OR live, identical signatures
// ────────────────────────────────────────────────────────────

let _categoriesCache: WpCategory[] | null = null;
let _categoriesLookupCache: Map<number, WpCategory> | null = null;

export async function fetchCategories(): Promise<WpCategory[]> {
  if (!WP_IS_LIVE) return MOCK_CATEGORIES;
  if (_categoriesCache) return _categoriesCache;

  const url = new URL(`${WP_API_URL}/wp-json/wp/v2/categories`);
  url.searchParams.set("per_page", "100");
  url.searchParams.set("_fields", "id,name,slug,description,count,parent");

  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) return [];

  const raw = (await res.json()) as Array<{
    id: number;
    name: string;
    slug: string;
    description?: string;
    count?: number;
  }>;

  // Filter empty categories and the catch-all "Uncategorized" to keep the UI focused
  _categoriesCache = raw
    .filter((c) => (c.count ?? 0) > 0 && c.slug !== "uncategorized")
    .map((c) => ({
      id: c.id,
      name: decodeEntities(c.name),
      slug: c.slug,
      description: c.description ? decodeEntities(c.description) : undefined,
      count: c.count,
    }));

  _categoriesLookupCache = new Map(_categoriesCache.map((c) => [c.id, c]));
  return _categoriesCache;
}

async function getCategoryLookup(): Promise<Map<number, WpCategory>> {
  if (_categoriesLookupCache) return _categoriesLookupCache;
  await fetchCategories(); // populates the cache
  return _categoriesLookupCache ?? new Map();
}

export async function fetchPosts(opts?: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
}): Promise<{ posts: WpPost[]; total: number; totalPages: number }> {
  const perPage = opts?.perPage ?? 12;
  const page = opts?.page ?? 1;

  if (!WP_IS_LIVE) {
    let list = MOCK_POSTS;
    if (opts?.categorySlug) {
      list = list.filter((p) => p.categories.some((c) => c.slug === opts.categorySlug));
    }
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const start = (page - 1) * perPage;
    return { posts: list.slice(start, start + perPage), total, totalPages };
  }

  const url = new URL(`${WP_API_URL}/wp-json/wp/v2/posts`);
  url.searchParams.set("_embed", "wp:featuredmedia,wp:term");
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("status", "publish");
  if (opts?.categorySlug) {
    // Resolve slug → id first (WP REST doesn't support filtering by slug directly)
    const lookup = await getCategoryLookup();
    const cat = [...lookup.values()].find((c) => c.slug === opts.categorySlug);
    if (cat) url.searchParams.set("categories", String(cat.id));
  }

  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`WP fetchPosts failed: ${res.status}`);

  const total = parseInt(res.headers.get("X-WP-Total") ?? "0", 10);
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10);
  const raw = (await res.json()) as WpRaw[];

  const catLookup = await getCategoryLookup();
  return { posts: raw.map((p) => mapPost(p, catLookup)), total, totalPages };
}

/**
 * Fetch ALL published posts by paginating internally.
 * Used for the blog index where we want every article available for
 * client-side filtering. Capped at `maxPosts` (default 200) for safety.
 */
export async function fetchAllPosts(opts?: { maxPosts?: number }): Promise<{
  posts: WpPost[];
  total: number;
}> {
  const cap = opts?.maxPosts ?? 200;
  const perPage = 100; // WP REST hard max

  if (!WP_IS_LIVE) {
    return { posts: MOCK_POSTS, total: MOCK_POSTS.length };
  }

  // First page also tells us totalPages via X-WP-TotalPages header
  const firstUrl = new URL(`${WP_API_URL}/wp-json/wp/v2/posts`);
  firstUrl.searchParams.set("_embed", "wp:featuredmedia,wp:term");
  firstUrl.searchParams.set("per_page", String(perPage));
  firstUrl.searchParams.set("page", "1");
  firstUrl.searchParams.set("status", "publish");

  const firstRes = await fetch(firstUrl.toString(), {
    headers: { Accept: "application/json" },
  });
  if (!firstRes.ok) throw new Error(`WP fetchAllPosts failed: ${firstRes.status}`);

  const total = parseInt(firstRes.headers.get("X-WP-Total") ?? "0", 10);
  const totalPages = parseInt(firstRes.headers.get("X-WP-TotalPages") ?? "1", 10);
  const firstRaw = (await firstRes.json()) as WpRaw[];

  const catLookup = await getCategoryLookup();
  const allRaw: WpRaw[] = [...firstRaw];

  // Fetch remaining pages in parallel (cap to safety)
  if (totalPages > 1) {
    const maxPagesToFetch = Math.min(totalPages, Math.ceil(cap / perPage));
    const pagePromises: Promise<WpRaw[]>[] = [];
    for (let page = 2; page <= maxPagesToFetch; page++) {
      const url = new URL(`${WP_API_URL}/wp-json/wp/v2/posts`);
      url.searchParams.set("_embed", "wp:featuredmedia,wp:term");
      url.searchParams.set("per_page", String(perPage));
      url.searchParams.set("page", String(page));
      url.searchParams.set("status", "publish");
      pagePromises.push(
        fetch(url.toString(), { headers: { Accept: "application/json" } })
          .then((r) => (r.ok ? r.json() : []))
          .catch(() => [])
      );
    }
    const restPages = await Promise.all(pagePromises);
    for (const page of restPages) allRaw.push(...(page as WpRaw[]));
  }

  const posts = allRaw
    .slice(0, cap)
    .map((p) => mapPost(p, catLookup));

  return { posts, total };
}

export async function fetchPost(slug: string): Promise<WpPost | null> {
  if (!WP_IS_LIVE) {
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const url = new URL(`${WP_API_URL}/wp-json/wp/v2/posts`);
  url.searchParams.set("slug", slug);
  url.searchParams.set("_embed", "wp:featuredmedia,wp:term");

  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const arr = (await res.json()) as WpRaw[];
  if (!arr.length) return null;

  const catLookup = await getCategoryLookup();
  const post = mapPost(arr[0], catLookup);

  // Rank Math: try the dedicated endpoint if enabled and present
  if (WP_USE_RANK_MATH && post.link) {
    try {
      const rmUrl = new URL(`${WP_API_URL}/wp-json/rankmath/v1/getHead`);
      rmUrl.searchParams.set("url", post.link);
      const rmRes = await fetch(rmUrl.toString());
      if (rmRes.ok) {
        const rmJson = (await rmRes.json()) as { success: boolean; head?: string };
        if (rmJson.success && rmJson.head) {
          post.rankMath = { rawHead: rmJson.head };
        }
      }
    } catch {
      // Silent fallback: post stays renderable without Rank Math head
    }
  }

  return post;
}
