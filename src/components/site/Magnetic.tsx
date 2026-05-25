import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic hover wrapper — element subtly drifts toward the pointer.
 * Use sparingly on premium CTAs.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.18,
}: {
  children: ReactNode;
  className?: string;
  /** 0..0.4 — fraction of pointer offset applied as translation */
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const apply = () => {
      raf = 0;
      if (!pending || !el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (pending.x - cx) * strength;
      const dy = (pending.y - cy) * strength;
      el.style.setProperty("--tx", `${dx.toFixed(1)}px`);
      el.style.setProperty("--ty", `${dy.toFixed(1)}px`);
    };

    const onMove = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.style.setProperty("--tx", `0px`);
      el.style.setProperty("--ty", `0px`);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
