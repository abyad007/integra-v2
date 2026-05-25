import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Range in px the element will translate over scroll (negative = up). */
  offset?: number;
  className?: string;
};

/**
 * Subtle scroll parallax wrapper. Wraps content in a motion.div whose Y
 * translates over the viewport scroll. Disabled when prefers-reduced-motion.
 */
export function HeroParallax({ children, offset = -60, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yRaw: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={prefersReduced ? undefined : { y: yRaw, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
