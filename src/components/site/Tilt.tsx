import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lightweight pointer-driven 3D tilt.
 * Adds --rx / --ry / --mx / --my CSS vars on hover; resets on leave.
 * Honors prefers-reduced-motion automatically (CSS handles it).
 */
export function Tilt({
  children,
  className = "",
  max = 5,
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees */
  max?: number;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      const px = (pending.x - r.left) / r.width;
      const py = (pending.y - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    };

    const onMove = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt-3d ${className}`}>
      {children}
      {glow && <span className="tilt-glow" aria-hidden="true" />}
    </div>
  );
}
