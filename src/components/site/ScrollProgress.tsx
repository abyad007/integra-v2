import { useEffect, useRef } from "react";

/**
 * Thin emerald progress bar at the very top of the viewport,
 * tracks scroll progression. Also publishes --sy on <html> for
 * subtle parallax utilities to consume.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    const update = () => {
      ticking = false;
      const sy = window.scrollY || 0;
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const p = Math.max(0, Math.min(1, sy / max));
      if (barRef.current) {
        barRef.current.style.setProperty("--sp", String(p));
      }
      root.style.setProperty("--sy", String(sy));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
