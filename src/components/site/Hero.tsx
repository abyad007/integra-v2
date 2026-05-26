import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Car, Bike, Home, HeartPulse, Briefcase,
  Star, Phone, Lock, Clock, Users, ShieldCheck, UserRound, Sparkles,
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
    <section ref={sectionRef} className="relative overflow-hidden border-b border-border/60">
      {/* Soft ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, color-mix(in oklab, var(--peach) 55%, transparent) 0%, transparent 60%), radial-gradient(50% 45% at 90% 20%, color-mix(in oklab, var(--emerald) 18%, transparent) 0%, transparent 65%), radial-gradient(70% 60% at 50% 110%, color-mix(in oklab, var(--blush) 45%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-10 sm:pt-14 lg:pt-24 pb-16 sm:pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* LEFT — editorial */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-surface/90 backdrop-blur px-3 py-1.5 text-[11.5px] sm:text-[12px] tracking-wide text-foreground/70 shadow-soft max-w-full">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-foreground/85">ORIAS</span>
                <span className="font-mono text-[10.5px] tabular-nums text-muted-foreground">25 002 890</span>
                <span className="hidden sm:inline h-3 w-px bg-border" />
                <span className="hidden sm:inline text-muted-foreground">Supervisé par l'ACPR</span>
              </div>
            </Reveal>

            <Reveal className="mt-6 sm:mt-8" delay={80}>
              <h1 className="font-display font-normal text-[clamp(2.75rem,9.5vw,6.25rem)] leading-[1.04] tracking-[-0.035em] text-balance pb-2">
                <span className="block text-foreground/95">La protection juste,</span>
                <span className="block text-gradient-emerald pb-[0.18em]">au juste prix.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 sm:mt-7 max-w-xl text-[1.05rem] sm:text-[1.125rem] lg:text-lg text-muted-foreground leading-[1.65]">
                Courtier indépendant en assurance. Nous comparons{" "}
                <strong className="text-foreground font-semibold">plus de 40 compagnies</strong>{" "}
                pour construire la couverture la plus juste — particuliers et professionnels,
                en toute transparence.
              </p>
            </Reveal>

            {/* Quick quote selector */}
            <Reveal delay={220}>
              <div className="mt-7 sm:mt-9 rounded-2xl border border-border/70 bg-surface/95 backdrop-blur p-2 shadow-elev max-w-xl relative overflow-hidden">
                <div
                  className="pointer-events-none absolute inset-x-0 -top-px h-px"
                  style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--emerald) 45%, transparent), transparent)" }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-1 overflow-x-auto -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {quickTypes.map(({ id, label, Icon }) => {
                    const active = selected === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelected(id)}
                        aria-pressed={active}
                        className={`group relative inline-flex items-center gap-2 rounded-xl px-3.5 min-h-11 text-sm transition-colors duration-300 whitespace-nowrap flex-shrink-0 ${active
                            ? "text-primary-foreground"
                            : "text-foreground/70 hover:text-foreground hover:bg-accent"
                          }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="hero-quick-pill"
                            className="absolute inset-0 rounded-xl bg-primary shadow-soft"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <Icon className={`relative h-4 w-4 transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-105"}`} />
                        <span className="relative">{label}</span>
                      </button>
                    );
                  })}
                </div>
                <QuoteFunnel defaultType={selected}>
                  <button
                    className="group relative mt-2 flex items-center justify-between gap-3 rounded-xl bg-foreground/[0.03] hover:bg-foreground/[0.06] px-3.5 sm:px-4 py-3 sm:py-3.5 transition-colors min-h-12 overflow-hidden w-full text-left"
                  >
                  <span className="text-[13px] sm:text-sm leading-tight min-w-0 truncate flex items-center gap-1.5">
                    <span className="text-muted-foreground">Devis</span>
                    <MorphText value={selected} className="font-medium capitalize text-foreground" />
                    <span className="text-muted-foreground">· 2 min</span>
                  </span>
                  <span className="btn-shine relative inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium shadow-premium transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_28px_-12px_color-mix(in_oklab,var(--primary)_55%,transparent)] flex-shrink-0">
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary-glow, var(--emerald)) 55%, transparent), transparent)" }}
                      aria-hidden="true"
                    />
                    <span className="relative">Continuer</span>
                    <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                  </button>
                </QuoteFunnel>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <a
                  href="tel:+33187663942"
                  className="inline-flex items-center gap-2 hover:text-foreground transition"
                >
                  <Phone className="h-4 w-4 text-emerald" />
                  <span className="font-medium text-foreground">01 87 66 39 42</span>
                </a>
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-emerald" />
                  Conseiller dédié
                </span>
                <span className="inline-flex items-center gap-2">
                  <Lock className="h-4 w-4 text-emerald" />
                  Sans engagement · données chiffrées
                </span>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <dl className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
                {[
                  { k: "40+", num: 40, decimals: 0, suffix: "+", v: "assureurs comparés", n: "01", Icon: Users },
                  { k: "92%", num: 92, decimals: 0, suffix: "%", v: "demandes acceptées", n: "02", Icon: ShieldCheck },
                  { k: "24h", num: 24, decimals: 0, suffix: "h", v: "attestation envoyée", n: "03", Icon: Clock },
                ].map(({ k, num, decimals, suffix, v, n, Icon }) => (
                  <div
                    key={k}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface/80 backdrop-blur px-4 sm:px-5 pt-4 pb-4 shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald/40 hover:shadow-premium"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--emerald) 70%, transparent), transparent)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, var(--emerald) 10%, transparent), transparent 60%)" }}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-emerald/80">{n}</span>
                      <Icon className="h-3.5 w-3.5 text-muted-foreground/70 transition-colors duration-500 group-hover:text-emerald" />
                    </div>
                    <dt className="relative mt-2 font-display text-[2rem] sm:text-[2.35rem] lg:text-[2.75rem] tracking-[-0.03em] leading-none tabular-nums">
                      <CountUp value={num} decimals={decimals} suffix={suffix} />
                    </dt>
                    <dd className="relative mt-2.5 text-[10.5px] sm:text-[11px] uppercase tracking-[0.14em] text-muted-foreground leading-tight">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* RIGHT — editorial visual */}
          <HeroParallax offset={-50} className="lg:col-span-5 relative">
            <Reveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 lg:-inset-6 rounded-[2rem] bg-gradient-to-br from-peach/60 via-transparent to-emerald/15 blur-2xl opacity-70 aurora" />

                <Tilt max={4}>
                  <div className="relative rounded-[1.75rem] overflow-hidden ring-frame border border-border/40 bg-surface media-zoom shadow-premium">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />

                    <div className="absolute left-4 right-4 bottom-4 rounded-2xl glass-soft p-4 shadow-soft border border-border/60">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-emerald text-emerald" />
                          ))}
                        </div>
                        <span className="font-semibold">4.8/5</span>
                        <span className="text-muted-foreground">· Trustpilot</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        « Devis en 5 minutes, conseiller dédié, attestation reçue le lendemain. »
                      </p>
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        Camille R. · cliente vérifiée
                      </p>
                    </div>
                  </div>
                </Tilt>

                <div ref={chipLeftRef} className="hidden lg:flex drift-x absolute -left-6 top-10 items-center gap-2 rounded-full glass-soft px-4 py-2 shadow-premium border border-border/60 animate-[fade-in_0.6s_ease-out_0.6s_both] will-change-transform">
                  <Sparkles className="h-4 w-4 text-emerald" />
                  <span className="text-xs font-medium">Économisez jusqu'à 30 %</span>
                </div>

                <div ref={chipRightRef} className="hidden lg:flex drift-x drift-x--alt absolute -right-4 bottom-28 items-center gap-3 rounded-2xl glass-soft px-4 py-3 shadow-premium border border-border/60 animate-[fade-in_0.6s_ease-out_0.85s_both] will-change-transform">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald/12 text-emerald">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-xs text-muted-foreground">Réponse sous</p>
                    <p className="text-sm font-semibold">24 heures ouvrées</p>
                  </div>
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
                  delay: i * 0.025,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
              exit: {
                opacity: 0,
                y: -6,
                filter: "blur(4px)",
                transition: {
                  delay: i * 0.012,
                  duration: 0.22,
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