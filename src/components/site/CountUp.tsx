import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /**
   * If provided, count is driven externally (0..1) instead of self-triggered useInView.
   * Used by parent ScrollTrigger scrub to synchronize multiple counters on the same scroll progress.
   */
  progress?: number;
};

/**
 * Animated counter triggered on scroll (rAF easing) OR driven externally via `progress`.
 * Respects prefers-reduced-motion.
 */
export function CountUp({
  value,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  progress,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  const externalDriven = progress !== undefined;

  // External driver: clamp & ease, render immediately
  useEffect(() => {
    if (!externalDriven) return;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    const t = Math.max(0, Math.min(1, progress ?? 0));
    const eased = 1 - Math.pow(1 - t, 3);
    setDisplay(value * eased);
  }, [externalDriven, progress, value, prefersReduced]);

  // Self-triggered rAF (legacy path when no external progress)
  useEffect(() => {
    if (externalDriven) return;
    if (!inView || prefersReduced) {
      if (prefersReduced) setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (value - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [externalDriven, inView, value, duration, prefersReduced]);

  const formatted = display.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
