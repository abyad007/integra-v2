import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "@/components/site/Reveal";
import { BlogCard } from "@/components/site/BlogCard";
import type { WpPost } from "@/lib/wp-api";

/**
 * "Derniers articles" preview section for the homepage.
 * Renders a horizontal Embla carousel (1/2/3 cards by breakpoint)
 * with dot navigation + arrow buttons.
 */
export function LatestPosts({ posts }: { posts: WpPost[] }) {
  if (!posts || posts.length === 0) return null;

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

        <Reveal>
          <BlogCarousel posts={posts} />
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   BlogCarousel — Embla horizontal, 1/2/3 cards by breakpoint
   ════════════════════════════════════════════════════════════ */
function BlogCarousel({ posts }: { posts: WpPost[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden -mx-2" ref={emblaRef}>
        <div className="flex touch-pan-y cursor-grab active:cursor-grabbing">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Aller au slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-8 bg-emerald"
                  : "w-1.5 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Article précédent"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface hover:bg-accent hover:border-emerald/30 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Article suivant"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface hover:bg-accent hover:border-emerald/30 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
