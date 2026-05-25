import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen, Phone, Search, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { BlogCard } from "@/components/site/BlogCard";
import { CTA } from "@/components/site/sections/CTA";
import { fetchAllPosts, fetchCategories, type WpCategory, type WpPost } from "@/lib/wp-api";

export const Route = createFileRoute("/blog")({
  loader: async () => {
    const [{ posts, total }, categories] = await Promise.all([
      fetchAllPosts({ maxPosts: 200 }),
      fetchCategories(),
    ]);
    // Keep only categories that have actual posts in our loaded set
    // (WP category counts can include drafts/revisions, so use real data)
    const usedCategoryIds = new Set<number>();
    for (const post of posts) {
      for (const c of post.categories) usedCategoryIds.add(c.id);
    }
    const activeCategories = categories.filter((c) => usedCategoryIds.has(c.id));

    return { posts, total, categories: activeCategories };
  },
  head: () => ({
    meta: [
      { title: "Blog Integra — Guides, décryptages & conseils assurance" },
      {
        name: "description",
        content:
          "Articles, guides et conseils sur l'assurance auto, moto, habitation, santé et professionnelle. Décryptages réglementaires et bonnes pratiques par les courtiers Integra.",
      },
      { property: "og:title", content: "Blog Integra — Guides & conseils assurance" },
      { property: "og:description", content: "Décryptages, guides et bonnes pratiques par les courtiers Integra." },
      { property: "og:url", content: "https://integra-assurance.com/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://integra-assurance.com/blog" }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { posts, categories } = Route.useLoaderData();
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // Client-side filtered list (category + search)
  const filteredPosts = useMemo<WpPost[]>(() => {
    let list = posts;
    if (activeCat) {
      list = list.filter((p) => p.categories.some((c) => c.slug === activeCat));
    }
    if (query.trim().length > 1) {
      const q = query.toLowerCase().trim();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    return list;
  }, [posts, activeCat, query]);

  const [featured, ...rest] = filteredPosts;
  const inlineCtaPosition = Math.min(6, Math.max(3, Math.floor(rest.length / 2)));
  const beforeCta = rest.slice(0, inlineCtaPosition);
  const afterCta = rest.slice(inlineCtaPosition);

  // GSAP scrub on hero background — soft parallax of the radial overlay
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!heroRef.current || !heroBgRef.current) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !heroRef.current || !heroBgRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          gsap.fromTo(
            heroBgRef.current!,
            { yPercent: 0, scale: 1 },
            {
              yPercent: 25,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current!,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        }, heroRef);

        revert = () => ctx.revert();
      }
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <main>
        {/* ════════════ HERO ════════════ */}
        <section
          ref={heroRef}
          className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden border-b border-border/60"
        >
          <div
            ref={heroBgRef}
            className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_55%_at_50%_25%,black,transparent)] will-change-transform"
          >
            <div className="absolute inset-0 bg-grid opacity-[0.18]" />
          </div>
          <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Retour à l'accueil
              </Link>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <Reveal delay={60}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-emerald mb-6 shadow-soft">
                    <BookOpen className="h-3.5 w-3.5" />
                    Blog · {posts.length} articles
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.03em] leading-[1.05] text-balance">
                    Guides, décryptages
                    <br />
                    <span className="text-gradient-emerald">& bonnes pratiques.</span>
                  </h1>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    Tout ce qu'il faut savoir sur l'assurance auto, moto, habitation, santé et
                    professionnelle. Conseils de courtiers, décryptages réglementaires et bonnes
                    pratiques actualisées.
                  </p>
                </Reveal>
              </div>

              {/* Search box */}
              <Reveal delay={280} className="lg:col-span-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="search"
                    inputMode="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un sujet (malus, hamon, décennale...)"
                    className="w-full rounded-full bg-surface border border-border/70 pl-11 pr-5 py-3.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-emerald/50 focus:ring-2 focus:ring-emerald/15 transition shadow-soft"
                  />
                </div>
              </Reveal>
            </div>

            {/* Category filter chips */}
            <Reveal delay={340}>
              <div className="mt-10 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCat(null)}
                  className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeCat === null
                      ? "bg-foreground text-background shadow-soft"
                      : "border border-border bg-surface text-foreground/75 hover:text-foreground hover:border-emerald/30"
                  }`}
                >
                  Tous
                  <span className="ml-1.5 opacity-70 tabular-nums">({posts.length})</span>
                </button>
                {categories.map((c) => {
                  const active = activeCat === c.slug;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCat(active ? null : c.slug)}
                      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                        active
                          ? "bg-foreground text-background shadow-soft"
                          : "border border-border bg-surface text-foreground/75 hover:text-foreground hover:border-emerald/30"
                      }`}
                    >
                      {c.name}
                      {c.count != null && (
                        <span className="ml-1.5 opacity-70 tabular-nums">({c.count})</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════ ARTICLES ════════════ */}
        <section className="py-12 lg:py-16 relative">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-display text-2xl text-muted-foreground">
                  Aucun article ne correspond à votre recherche.
                </p>
                <button
                  onClick={() => {
                    setActiveCat(null);
                    setQuery("");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:shadow-premium transition-all"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                {/* Featured (top, full-width) */}
                {featured && (
                  <Reveal>
                    <FeaturedCardWrapper post={featured} />
                  </Reveal>
                )}

                {/* First batch */}
                {beforeCta.length > 0 && (
                  <div
                    className={`mt-10 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 cv-auto-list`}
                  >
                    {beforeCta.map((post, i) => (
                      <Reveal key={post.id} delay={Math.min(i * 50, 300)}>
                        <BlogCard post={post} />
                      </Reveal>
                    ))}
                  </div>
                )}

                {/* Inline CTA banner */}
                {afterCta.length > 0 && (
                  <Reveal>
                    <InlineCta />
                  </Reveal>
                )}

                {/* Remaining articles */}
                {afterCta.length > 0 && (
                  <div className="mt-10 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 cv-auto-list">
                    {afterCta.map((post, i) => (
                      <Reveal key={post.id} delay={Math.min(i * 40, 240)}>
                        <BlogCard post={post} />
                      </Reveal>
                    ))}
                  </div>
                )}

                {/* Count footer */}
                <div className="mt-12 text-center text-xs text-muted-foreground tabular-nums">
                  {filteredPosts.length} article{filteredPosts.length > 1 ? "s" : ""} affiché
                  {filteredPosts.length > 1 ? "s" : ""}
                  {activeCat && (
                    <>
                      {" · catégorie "}
                      <strong className="text-foreground">
                        {categories.find((c) => c.slug === activeCat)?.name}
                      </strong>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════════
   FEATURED CARD WRAPPER
   ════════════════════════════════════════════════════ */
function FeaturedCardWrapper({ post }: { post: WpPost }) {
  return (
    <div className="relative">
      <div className="absolute -top-6 left-0 inline-flex items-center gap-1.5 rounded-full bg-emerald text-emerald-foreground px-3 py-1 text-[10.5px] font-semibold uppercase tracking-wider shadow-elev">
        <Sparkles className="h-3 w-3" />
        À la une
      </div>
      <BlogCard post={post} featured eager />
    </div>
  );
}

/* ════════════════════════════════════════════════════
   INLINE CTA — between article batches
   ════════════════════════════════════════════════════ */
function InlineCta() {
  return (
    <aside
      className="my-10 lg:my-14 relative overflow-hidden rounded-2xl border border-emerald/20 ring-frame shadow-soft"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--emerald) 14%, transparent), color-mix(in oklab, var(--navy) 4%, transparent))",
      }}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none" />
      <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6 p-6 sm:p-8 lg:p-10">
        <div>
          <p className="eyebrow">Besoin d'un devis ?</p>
          <h3 className="mt-3 font-display text-2xl lg:text-3xl tracking-[-0.015em] leading-tight">
            Comparons 40+ assureurs en{" "}
            <span className="text-gradient-emerald">2 minutes.</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
            Sans engagement, sans création de compte. Réponse d'un courtier humain sous 1 h.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            hash="devis"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold shadow-elev hover:shadow-premium hover:-translate-y-0.5 transition-all"
          >
            Devis gratuit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="tel:+33187663942"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3.5 text-sm font-medium hover:bg-accent transition-all"
          >
            <Phone className="h-4 w-4 text-emerald" />
            01 87 66 39 42
          </a>
        </div>
      </div>
    </aside>
  );
}
