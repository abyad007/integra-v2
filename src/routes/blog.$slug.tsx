import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { BlogCard } from "@/components/site/BlogCard";
import { CTA } from "@/components/site/sections/CTA";
import { fetchPost, fetchPosts, type WpPost } from "@/lib/wp-api";

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPost(params.slug);
    if (!post) throw notFound();

    // Pull a few related posts (same primary category, exclude self)
    const primaryCat = post.categories[0]?.slug;
    let related: WpPost[] = [];
    if (primaryCat) {
      const r = await fetchPosts({ categorySlug: primaryCat, perPage: 4 });
      related = r.posts.filter((p) => p.id !== post.id).slice(0, 3);
    }

    return { post, related };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { post } = loaderData;
    const description = post.rankMath?.description ?? stripHtml(post.excerpt).slice(0, 160);
    const title = post.rankMath?.title ?? `${post.title} | Integra Assurance`;
    const url = post.rankMath?.canonical ?? `https://integra-assurance.com/blog/${post.slug}`;
    const ogImage = post.rankMath?.ogImage ?? post.featuredMedia?.url ?? "";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: post.rankMath?.ogTitle ?? title },
        { property: "og:description", content: post.rankMath?.ogDescription ?? description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(ogImage ? [{ property: "og:image" as const, content: ogImage }] : []),
        { name: "twitter:card", content: post.rankMath?.twitterCard ?? "summary_large_image" },
        { name: "article:published_time", content: post.date },
        ...(post.modified ? [{ name: "article:modified_time" as const, content: post.modified }] : []),
        { name: "article:author", content: post.author.name },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            post.rankMath?.schema ?? {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description,
              datePublished: post.date,
              dateModified: post.modified ?? post.date,
              author: {
                "@type": "Person",
                name: post.author.name,
              },
              publisher: {
                "@type": "Organization",
                name: "Integra CC",
                url: "https://integra-assurance.com",
              },
              ...(ogImage ? { image: ogImage } : {}),
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
            }
          ),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="text-center">
          <p className="eyebrow mb-4 justify-center">Article introuvable</p>
          <h1 className="font-display text-4xl tracking-tight mb-4">
            Cet article <span className="text-gradient-emerald">n'existe pas.</span>
          </h1>
          <p className="text-muted-foreground mb-8">Il a peut-être été déplacé ou supprimé.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-soft hover:shadow-premium transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous les articles
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();
  const category = post.categories[0];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <main>
        {/* Hero article */}
        <article>
          <header className="relative pt-16 pb-12 lg:pt-20 lg:pb-16 border-b border-border/60 overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
            <div className="mx-auto max-w-4xl px-5 lg:px-8 relative">
              <Reveal>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Tous les articles
                </Link>
              </Reveal>

              <Reveal delay={80}>
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-5">
                  {category && (
                    <span className="inline-flex items-center rounded-full bg-emerald/10 text-emerald px-3 py-1 border border-emerald/20">
                      {category.name}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {post.readingTimeMin} min
                  </span>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <h1 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] tracking-[-0.025em] leading-[1.08] text-balance">
                  {post.title}
                </h1>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-8 flex items-center gap-3 text-sm">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-emerald font-display text-base font-medium border border-emerald/15">
                    {post.author.name.charAt(0)}
                  </span>
                  <div className="leading-tight">
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-[12px] text-muted-foreground">Équipe Integra Assurance</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </header>

          {/* Featured image — full bleed at top */}
          {post.featuredMedia && (
            <Reveal>
              <div className="mx-auto max-w-6xl px-0 lg:px-8 -mt-2 mb-12 lg:mb-20">
                <div className="relative aspect-[16/9] lg:aspect-[2.2/1] overflow-hidden lg:rounded-3xl border-y lg:border border-border/60 bg-cream shadow-premium">
                  <img
                    src={post.featuredMedia.url}
                    alt={post.featuredMedia.alt || post.title}
                    width={post.featuredMedia.width}
                    height={post.featuredMedia.height}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    sizes="(min-width: 1280px) 1152px, 100vw"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          )}

          {/* Body — Gutenberg HTML rendered via .prose */}
          <div className="mx-auto max-w-3xl px-5 lg:px-8 pb-12 lg:pb-16">
            <Reveal>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Reveal>

            {/* Tags */}
            {post.tags.length > 0 && (
              <Reveal>
                <div className="mt-12 pt-8 border-t border-border/60 flex flex-wrap gap-2">
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground mr-2 self-center">
                    Tags
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground/75"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Mid-page CTA — converts mid-read */}
          <Reveal>
            <div className="mx-auto max-w-4xl px-5 lg:px-8 pb-16 lg:pb-24">
              <div
                className="relative overflow-hidden rounded-2xl border border-emerald/20 ring-frame shadow-soft p-8 lg:p-10 grid md:grid-cols-[1fr_auto] items-center gap-6"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--emerald) 12%, transparent), color-mix(in oklab, var(--navy) 4%, transparent))",
                }}
              >
                <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />
                <div className="relative">
                  <p className="eyebrow">Cet article vous a aidé ?</p>
                  <h3 className="mt-3 font-display text-2xl lg:text-3xl tracking-[-0.015em] leading-tight">
                    Obtenez votre <span className="text-gradient-emerald">devis personnalisé</span> en 2 min.
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md">
                    Un courtier humain compare 40+ assureurs pour vous, sans engagement.
                  </p>
                </div>
                <div className="relative flex flex-wrap gap-3">
                  <Link
                    to="/"
                    hash="devis"
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold shadow-elev hover:shadow-premium hover:-translate-y-0.5 transition-all"
                  >
                    Devis gratuit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 lg:py-24 bg-surface/60 border-y border-border/60">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <Reveal className="mb-10 flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <p className="eyebrow">Continuer la lecture</p>
                  <h2 className="mt-3 font-display text-2xl lg:text-3xl tracking-[-0.02em] leading-tight">
                    Articles <span className="text-gradient-emerald">similaires.</span>
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:text-integra-green-dark transition-colors"
                >
                  Tous les articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={40 + i * 40}>
                    <BlogCard post={p} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
