import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { BlogCard } from "@/components/site/BlogCard";
import type { WpPost } from "@/lib/wp-api";

/**
 * Compact "Derniers articles" preview section for the homepage.
 * Accepts up to 3 posts; if empty, renders nothing.
 */
export function LatestPosts({ posts }: { posts: WpPost[] }) {
  if (!posts || posts.length === 0) return null;
  const top = posts.slice(0, 3);

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-surface/50 border-y border-border/60 cv-auto">
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-50" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 sm:mb-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">
              <BookOpen className="h-3 w-3" />
              Blog
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] text-balance tracking-[-0.03em]">
              Décryptages, guides
              <br />
              <span className="text-gradient-emerald">& bonnes pratiques.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:text-right" delay={120}>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed lg:max-w-md lg:ml-auto">
              Plus de 60 articles d'expertise rédigés par nos courtiers ORIAS sur l'assurance auto,
              moto, habitation, santé et professionnelle.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
            >
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {top.map((post, i) => (
            <Reveal key={post.id} delay={80 + i * 60}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
