import { useReducedMotion, motion, type Variants } from "framer-motion";
import type { HTMLAttributes } from "react";

type Variant = "up" | "fade" | "scale" | "left" | "right" | "blur" | "premium";
type Tag = "div" | "section" | "article" | "li" | "ul" | "ol";

type Props = HTMLAttributes<HTMLElement> & {
  delay?: number;
  as?: Tag;
  variant?: Variant;
  duration?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const initialFor = (v: Variant) => {
  switch (v) {
    case "fade":
      return { opacity: 0 };
    case "scale":
      return { opacity: 0, scale: 0.96, filter: "blur(6px)" };
    case "left":
      return { opacity: 0, x: -24, filter: "blur(4px)" };
    case "right":
      return { opacity: 0, x: 24, filter: "blur(4px)" };
    case "blur":
      return { opacity: 0, filter: "blur(10px)" };
    case "premium":
      return { opacity: 0, y: 24, scale: 0.985, filter: "blur(8px)" };
    case "up":
    default:
      return { opacity: 0, y: 18, filter: "blur(4px)" };
  }
};

const animateTo = (v: Variant) => {
  switch (v) {
    case "fade":
      return { opacity: 1 };
    case "scale":
      return { opacity: 1, scale: 1, filter: "blur(0px)" };
    case "left":
    case "right":
      return { opacity: 1, x: 0, filter: "blur(0px)" };
    case "blur":
      return { opacity: 1, filter: "blur(0px)" };
    case "premium":
      return { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
    case "up":
    default:
      return { opacity: 1, y: 0, filter: "blur(0px)" };
  }
};

export function Reveal({
  delay = 0,
  as = "div",
  variant = "up",
  duration = 0.45,
  className = "",
  style,
  children,
  ...rest
}: Props) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const Tag = as as "div";
    return (
      <Tag className={className} style={style} {...(rest as object)}>
        {children}
      </Tag>
    );
  }

  const variants: Variants = {
    hidden: initialFor(variant),
    visible: {
      ...animateTo(variant),
      transition: { duration, delay: delay / 1000, ease: EASE },
    },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.15 }}
      variants={variants}
      className={className}
      style={style}
      {...(rest as object)}
    >
      {children}
    </MotionTag>
  );
}

/* ---------- Stagger group for lists of cards ---------- */

type GroupProps = HTMLAttributes<HTMLElement> & {
  as?: Tag;
  stagger?: number;
  delayChildren?: number;
};

export function RevealGroup({
  as = "div",
  stagger = 0.05,
  delayChildren = 0,
  className = "",
  style,
  children,
  ...rest
}: GroupProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const Tag = as as "div";
    return (
      <Tag className={className} style={style} {...(rest as object)}>
        {children}
      </Tag>
    );
  }

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delayChildren / 1000,
      },
    },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.1 }}
      variants={variants}
      className={className}
      style={style}
      {...(rest as object)}
    >
      {children}
    </MotionTag>
  );
}

type ItemProps = HTMLAttributes<HTMLElement> & {
  as?: Tag;
  variant?: Variant;
  duration?: number;
};

export function RevealItem({
  as = "div",
  variant = "up",
  duration = 0.4,
  className = "",
  style,
  children,
  ...rest
}: ItemProps) {
  const prefersReduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (prefersReduced) {
    const Tag = as as "div";
    return (
      <Tag className={className} style={style} {...(rest as object)}>
        {children}
      </Tag>
    );
  }

  const variants: Variants = {
    hidden: initialFor(variant),
    visible: {
      ...animateTo(variant),
      transition: { duration, ease: EASE },
    },
  };

  return (
    <MotionTag
      variants={variants}
      className={className}
      style={style}
      {...(rest as object)}
    >
      {children}
    </MotionTag>
  );
}
