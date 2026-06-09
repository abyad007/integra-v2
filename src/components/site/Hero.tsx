import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Car, Bike, Home, HeartPulse, Briefcase,
  Star, Phone, Lock, Clock, Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Tilt } from "@/components/site/Tilt";
import { HeroParallax } from "@/components/site/HeroParallax";
import { CountUp } from "@/components/site/CountUp";
import heroImg from "@/assets/hero-integra.webp";
import heroImgMobile from "@/assets/hero-integra-mobile.webp";
import { QuoteFunnel } from "@/components/site/QuoteFunnel";

const quickTypes = [
  { id: "auto", label: "Auto", Icon: Car },
  { id: "moto", label: "Moto", Icon: Bike },
  { id: "habitation", label: "Habitation", Icon: Home },
  { id: "sante", label: "Santé", Icon: HeartPulse },
  { id: "pro", label: "Pro", Icon: Briefcase },
];

export function Hero() {
  const [selected, setSelected] = useState("auto");
  const sectionRef = useRef<HTMLElement>(null);
  const chipLeftRef = useRef<HTMLDivElement>(null);
  const chipRightRef = useRef<HTMLDivElement>(null);

  // GS1 — Hero parallax multi-layer (chips drift on scroll, desktop only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;
    if (!sectionRef.current) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          if (chipLeftRef.current) {
            gsap.fromTo(
              chipLeftRef.current,
              { yPercent: 0, xPercent: 0 },
              {
                yPercent: -55,
                xPercent: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current!,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.6,
                },
              }
            );
          }
          if (chipRightRef.current) {
            gsap.fromTo(
              chipRightRef.current,
              { yPercent: 0, xPercent: 0 },
              {
                yPercent: -90,
                xPercent: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current!,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.9,
                },
              }
            );
          }
        }, sectionRef);

        revert = () => ctx.revert();
      }
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Ambient background — chaleureux, discret */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.22] pointer-events-none [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-8 sm:pt-12 lg:pt-20 pb-16 sm:pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/90 backdrop-blur px-3.5 py-1.5 text-[11px] text-muted-foreground shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                <span className="font-medium text-foreground/80">ORIAS 25 002 890</span>
                <span className="text-border">·</span>
                <span>Supervisé par l'ACPR</span>
              </div>
            </Reveal>

            <Reveal className="mt-7 sm:mt-9" delay={80}>
              <h1 className="font-display font-medium text-[clamp(2.75rem,8.5vw,5.5rem)] leading-[1.06] tracking-[-0.03em] text-balance">
                <span className="block text-foreground">La protection juste,</span>
                <span className="block text-gradient-emerald mt-1">au juste prix.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 sm:mt-7 max-w-lg text-[1.05rem] sm:text-lg text-muted-foreground leading-[1.7]">
                Courtier indépendant — nous comparons{" "}
                <strong className="text-foreground font-semibold">40+ compagnies</strong>{" "}
                pour trouver la couverture adaptée à votre profil, sans frais cachés.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 sm:mt-9 rounded-2xl border border-border/70 bg-surface shadow-card max-w-xl overflow-hidden">
                <div className="flex items-center gap-1 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {quickTypes.map(({ id, label, Icon }) => {
                    const active = selected === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelected(id)}
                        aria-pressed={active}
                        className={`relative inline-flex items-center gap-2 rounded-xl px-3.5 min-h-10 text-sm whitespace-nowrap flex-shrink-0 transition-colors ${
                          active ? "text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="hero-quick-pill"
                            className="absolute inset-0 rounded-xl bg-navy"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <Icon className="relative h-4 w-4" />
                        <span className="relative">{label}</span>
                      </button>
                    );
                  })}
                </div>
                <QuoteFunnel defaultType={selected}>
                  <button className="group flex items-center justify-between gap-3 border-t border-border/60 px-4 py-3.5 min-h-12 w-full text-left hover:bg-muted/40 transition-colors">
                    <span className="text-sm leading-tight min-w-0 truncate">
                      <span className="text-muted-foreground">Devis </span>
                      <MorphText value={selected} className="font-semibold capitalize text-foreground" />
                      <span className="text-muted-foreground"> · 2 min</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald text-white px-4 py-2 text-xs font-semibold shadow-soft group-hover:-translate-y-0.5 transition-transform">
                      Continuer
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </QuoteFunnel>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <a href="tel:+33187663942" className="inline-flex items-center gap-2 hover:text-foreground transition">
                  <Phone className="h-4 w-4 text-emerald" />
                  <span className="font-medium text-foreground tabular-nums">01 87 66 39 42</span>
                </a>
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-emerald" />
                  Sans engagement
                </span>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <dl className="mt-10 sm:mt-12 grid grid-cols-3 gap-3 max-w-lg">
                {[
                  { num: 40, suffix: "+", v: "assureurs", n: "01" },
                  { num: 92, suffix: "%", v: "acceptés", n: "02" },
                  { num: 24, suffix: "h", v: "attestation", n: "03" },
                ].map(({ num, suffix, v, n }) => (
                  <div key={n} className="rounded-xl border border-border/60 bg-surface/80 px-4 py-4">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-emerald font-semibold">{n}</span>
                    <dt className="mt-2 font-display text-[2rem] sm:text-[2.25rem] tracking-[-0.03em] leading-none tabular-nums">
                      <CountUp value={num} decimals={0} suffix={suffix} />
                    </dt>
                    <dd className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <HeroParallax offset={-40} className="lg:col-span-5 relative">
            <Reveal delay={200}>
              <div className="relative">
                <Tilt max={3}>
                  <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-surface shadow-card">
                    <picture>
                      <source media="(max-width: 640px)" srcSet={heroImgMobile} />
                      <img
                        src={heroImg}
                        alt="Conseillère Integra Assurance dans son bureau parisien lumineux"
                        width={2304}
                        height={1856}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        sizes="(min-width: 1024px) 480px, 100vw"
                        className="w-full h-auto block"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />

                    <div className="absolute left-4 right-4 bottom-4 rounded-xl bg-surface/95 backdrop-blur-md p-4 border border-border/60 shadow-soft">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-emerald text-emerald" />
                          ))}
                        </div>
                        <span className="font-semibold">4.8/5</span>
                        <span className="text-muted-foreground">Trustpilot</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85 italic font-display">
                        « Devis en 5 minutes, attestation le lendemain. »
                      </p>
                      <p className="mt-1.5 text-[11px] text-muted-foreground">Camille R.</p>
                    </div>
                  </div>
                </Tilt>

                <div ref={chipLeftRef} className="hidden lg:flex absolute -left-4 top-8 items-center gap-2 rounded-full bg-surface border border-border px-4 py-2 shadow-soft text-xs font-medium will-change-transform">
                  <Sparkles className="h-3.5 w-3.5 text-emerald" />
                  Jusqu'à −30 %
                </div>

                <div ref={chipRightRef} className="hidden lg:flex absolute -right-3 bottom-24 items-center gap-2.5 rounded-xl bg-navy text-white px-4 py-3 shadow-elev text-sm will-change-transform">
                  <Clock className="h-4 w-4 text-emerald" />
                  <span>Réponse sous 24 h</span>
                </div>
              </div>
            </Reveal>
          </HeroParallax>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   MorphText — character-by-character morph
   Each char animates in with a tiny stagger for a premium feel
   ════════════════════════════════════════════════════════════ */
function MorphText({ value, className = "" }: { value: string; className?: string }) {
  // Split into chars; AnimatePresence keys on `value` so the WHOLE string
  // re-mounts when changed (clean transition from "auto" → "moto")
  const chars = value.split("");
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value}
        className={`${className} inline-flex`}
        initial="hidden"
        animate="visible"
        exit="exit"
        aria-label={value}
      >
        {chars.map((c, i) => (
          <motion.span
            key={`${value}-${i}-${c}`}
            variants={{
              hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  delay: i * 0.015,
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
              exit: {
                opacity: 0,
                y: -6,
                filter: "blur(4px)",
                transition: {
                  delay: i * 0.008,
                  duration: 0.14,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            aria-hidden="true"
          >
            {c}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}