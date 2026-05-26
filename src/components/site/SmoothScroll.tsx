import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-powered smooth scroll, integrated with GSAP ScrollTrigger.
 * - Client only (no SSR)
 * - Respects prefers-reduced-motion (disables smoothing)
 * - Skipped on small touch screens for best mobile perf
 * - Modern integration: lenis drives gsap.ticker, scroll events refresh ScrollTrigger
 *   (no scrollerProxy — triggers use the default window scroller)
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const isSmallTouch =
      window.matchMedia("(max-width: 768px)").matches &&
      window.matchMedia("(hover: none)").matches;
    if (isSmallTouch) return;

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    let detach: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);

        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);

        ScrollTrigger.refresh();

        detach = () => {
          lenis.off("scroll", onScroll);
        };
      }
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      detach?.();
      lenis.destroy();
    };
  }, []);

  return null;
}
