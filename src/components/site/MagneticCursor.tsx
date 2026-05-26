import { useEffect, useRef } from "react";

/**
 * Premium magnetic cursor halo.
 *
 * Renders a small green-tinted halo that follows the mouse cursor.
 * On hover of any element with `data-magnetic="true"`, the halo:
 *   - scales up
 *   - centers itself on the element
 *   - changes to a stronger emerald glow
 *
 * Disabled on:
 *   - touch devices (no cursor)
 *   - prefers-reduced-motion
 *
 * Mount once at the root (e.g. in __root.tsx RootComponent).
 * To "magnetize" any CTA: add `data-magnetic="true"` to its element.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!dot || !halo) return;

    let mouseX = 0;
    let mouseY = 0;
    let haloX = 0;
    let haloY = 0;
    let dotX = 0;
    let dotY = 0;
    let scale = 1;
    let targetScale = 1;
    let opacity = 0;
    let targetOpacity = 0;
    let active = false;
    let activeRect: DOMRect | null = null;
    let rafId = 0;

    const tick = () => {
      // Halo: slow lerp (smooth follow) — magnet snaps to element when hovering
      if (active && activeRect) {
        const cx = activeRect.left + activeRect.width / 2;
        const cy = activeRect.top + activeRect.height / 2;
        haloX += (cx - haloX) * 0.18;
        haloY += (cy - haloY) * 0.18;
      } else {
        haloX += (mouseX - haloX) * 0.14;
        haloY += (mouseY - haloY) * 0.14;
      }
      scale += (targetScale - scale) * 0.18;
      opacity += (targetOpacity - opacity) * 0.18;

      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%) scale(${scale})`;
      halo.style.opacity = String(opacity);

      // Dot: fast follow (sharp pointer feel)
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (targetOpacity === 0) targetOpacity = 1;
    };

    const onLeave = () => {
      targetOpacity = 0;
    };

    const onEnterTarget = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      activeRect = el.getBoundingClientRect();
      active = true;
      targetScale = 1.8;
    };
    const onLeaveTarget = () => {
      active = false;
      activeRect = null;
      targetScale = 1;
    };

    // Bind to all magnetic targets currently on the page + observe future ones
    const bindTargets = () => {
      document.querySelectorAll<HTMLElement>("[data-magnetic='true']").forEach((el) => {
        if (el.dataset.magneticBound === "1") return;
        el.dataset.magneticBound = "1";
        el.addEventListener("pointerenter", onEnterTarget);
        el.addEventListener("pointerleave", onLeaveTarget);
      });
    };
    bindTargets();
    // Re-scan when DOM changes (route navigation, etc.)
    const mo = new MutationObserver(() => bindTargets());
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      mo.disconnect();
      document.querySelectorAll<HTMLElement>("[data-magnetic='true']").forEach((el) => {
        el.removeEventListener("pointerenter", onEnterTarget);
        el.removeEventListener("pointerleave", onLeaveTarget);
        delete el.dataset.magneticBound;
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden lg:block"
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--emerald) 35%, transparent), color-mix(in oklab, var(--emerald) 8%, transparent) 60%, transparent 80%)",
          mixBlendMode: "multiply",
          opacity: 0,
          willChange: "transform, opacity",
          transition: "background 200ms ease",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--emerald)",
          opacity: 0.6,
          willChange: "transform",
        }}
      />
    </>
  );
}
