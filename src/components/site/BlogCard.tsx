import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import type { WpMedia, WpPost } from "@/lib/wp-api";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/**
 * Build a srcset from the real WP-generated sizes (from media_details.sizes).
 * Only includes variants that ACTUALLY exist on the WP server — no guessing.
 */
function buildSrcSet(media: WpMedia): string | undefined {
  if (!media.sizes || media.sizes.length < 2) return undefined;
  return media.sizes.map((s) => `${s.url} ${s.width}w`).join(", ");
}

export function BlogCard({
  post,
  featured = false,
  eager = false,
}: {
  post: WpPost;
  featured?: boolean;
  /** When true, the image loads eagerly (use for above-the-fold cards only). */
  eager?: boolean;
}) {
  const category = post.categories[0];
  const excerpt = stripHtml(post.excerpt);
  const img = post.featuredMedia;
  const srcset = img ? buildSrcSet(img) : undefined;

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/70 bg-surface/95 backdrop-blur shadow-soft hover:shadow-premium hover:-translate-y-1 hover:border-emerald/40 transition-all duration-500 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--emerald) 70%, transparent), transparent)" }}
      />

      {img ? (
        <div
          className={`relative overflow-hidden bg-cream border-b border-border/60 ${
            featured
              ? "aspect-[16/10] lg:aspect-auto lg:w-[55%] lg:border-b-0 lg:border-r"
              : "aspect-[16/10]"
          }`}
        >
          <img
            src={img.url}
            srcSet={srcset}
            sizes={
              featured
                ? "(min-width: 1024px) 720px, 100vw"
                : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            }
            alt={img.alt || post.title}
            width={img.width}
            height={img.height}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : "auto"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          {category && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur text-emerald px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider border border-emerald/15 shadow-soft">
              {category.name}
            </span>
          )}
        </div>
      ) : (
        // Fallback when no featured media: cream block with category badge
        <div
          className={`relative bg-gradient-to-br from-cream via-surface to-cream/40 border-b border-border/60 ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:w-[55%] lg:border-b-0 lg:border-r" : "aspect-[16/10]"
          }`}
        >
          {category && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur text-emerald px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider border border-emerald/15 shadow-soft">
              {category.name}
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl text-emerald/20">
              {post.title.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      <div className={`relative flex-1 flex flex-col p-6 ${featured ? "lg:p-10" : ""}`}>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground tabular-nums">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTimeMin} min
          </span>
        </div>

        <h3
          className={`font-display tracking-[-0.015em] leading-tight mt-3 line-clamp-3 ${
            featured ? "text-2xl lg:text-[1.85rem]" : "text-lg lg:text-[1.25rem]"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`mt-3 text-sm text-muted-foreground leading-relaxed ${
            featured ? "line-clamp-4 lg:line-clamp-5" : "line-clamp-2"
          }`}
        >
          {excerpt}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald">
            Lire l'article
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <span className="text-[11px] text-muted-foreground truncate ml-3 max-w-[40%]">
            {post.author.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
