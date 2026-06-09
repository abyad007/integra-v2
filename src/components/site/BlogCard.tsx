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
      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-soft hover:shadow-card hover:-translate-y-0.5 hover:border-emerald/30 transition-all duration-400 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {img ? (
        <div
          className={`relative overflow-hidden bg-muted border-b border-border/60 ${
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
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {category && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-surface/95 text-emerald px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border border-emerald/15">
              {category.name}
            </span>
          )}
        </div>
      ) : (
        <div
          className={`relative bg-muted border-b border-border/60 ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:w-[55%] lg:border-b-0 lg:border-r" : "aspect-[16/10]"
          }`}
        >
          {category && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-surface text-emerald px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider border border-emerald/15">
              {category.name}
            </span>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-5xl text-emerald/20 italic">
              {post.title.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      <div className={`relative flex-1 flex flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground tabular-nums">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTimeMin} min
          </span>
        </div>

        <h3
          className={`font-display tracking-[-0.02em] leading-tight mt-3 line-clamp-3 ${
            featured ? "text-2xl lg:text-[1.75rem]" : "text-lg"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`mt-3 text-sm text-muted-foreground leading-relaxed ${
            featured ? "line-clamp-4" : "line-clamp-2"
          }`}
        >
          {excerpt}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald">
            Lire l'article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-[11px] text-muted-foreground truncate ml-3 max-w-[40%]">
            {post.author.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
