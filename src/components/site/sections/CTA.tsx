import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Lock, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/site/Magnetic";
import { Reveal } from "@/components/site/Reveal";
import { QuoteFunnel } from "@/components/site/QuoteFunnel";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const auroraRightRef = useRef<HTMLDivElement>(null);

  // GS6 — Aurora layers drift on scroll (scrub) through the section
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    if (!sectionRef.current) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !sectionRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          if (auroraRef.current) {
            gsap.fromTo(
              auroraRef.current,
              { yPercent: -10, xPercent: -5, scale: 1 },
              {
                yPercent: 15,
                xPercent: 10,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current!,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              }
            );
          }
          if (auroraRightRef.current) {
            gsap.fromTo(
              auroraRightRef.current,
              { yPercent: 10, xPercent: 5 },
              {
                yPercent: -15,
                xPercent: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current!,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
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
    <section ref={sectionRef} id="devis" className="py-16 sm:py-20 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] ring-frame border border-border/40 shadow-elev bg-gradient-hero">
            {/* Premium layered background */}
            <div className="absolute inset-0 bg-noise pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(70% 60% at 0% 0%, color-mix(in oklab, var(--peach) 65%, transparent), transparent 60%), radial-gradient(60% 60% at 100% 100%, color-mix(in oklab, var(--emerald) 22%, transparent), transparent 65%), radial-gradient(40% 40% at 100% 0%, color-mix(in oklab, var(--blush) 35%, transparent), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div
              ref={auroraRef}
              className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full pointer-events-none will-change-transform"
              style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--emerald) 22%, transparent), transparent 70%)" }}
              aria-hidden="true"
            />
            <div
              ref={auroraRightRef}
              className="absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full pointer-events-none will-change-transform"
              style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--navy) 14%, transparent), transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-16 relative">
                <Reveal>
                  <p className="eyebrow relative inline-flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-emerald" />
                    06 — Devis gratuit
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="relative mt-4 font-display text-[clamp(2.25rem,5.2vw,4.25rem)] leading-[1.02] text-balance tracking-[-0.025em]">
                    Garantissez votre sécurité.<br />
                    <span className="text-gradient-emerald">Maîtrisez votre avenir.</span>
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="relative mt-6 text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
                    Souscription rapide, garanties solides, conseil humain. Recevez votre attestation sous 24 h.
                  </p>
                </Reveal>

                <Reveal delay={240}>
                  <div className="relative mt-8 sm:mt-9 flex flex-wrap gap-3">
                    <Magnetic strength={0.22}>
                      <QuoteFunnel>
                        <button
                          data-magnetic="true"
                          className="group relative inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 sm:px-7 py-3.5 sm:py-4 text-sm font-medium shadow-elev hover:shadow-premium transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                        >
                        {/* shine sweep */}
                        <span
                          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out"
                          style={{ background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)" }}
                          aria-hidden="true"
                        />
                        {/* emerald glow halo */}
                        <span
                          className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ boxShadow: "0 14px 32px -10px color-mix(in oklab, var(--emerald) 55%, transparent)" }}
                          aria-hidden="true"
                        />
                        <span className="relative">Demander ma simulation</span>
                        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>
                      </QuoteFunnel>
                    </Magnetic>
                    <a
                      href="tel:+33187663942"
                      className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 backdrop-blur px-6 py-3.5 text-sm font-medium hover:bg-accent hover:border-emerald/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Phone className="h-4 w-4 text-emerald" />
                      <span>01 87 66 39 42</span>
                    </a>
                    <a
                      href="https://wa.me/33755533466"
                      className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 backdrop-blur px-6 py-3.5 text-sm font-medium hover:bg-accent transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald" />
                      WhatsApp
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={320}>
                  <div className="relative mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald" strokeWidth={3} />
                      Sans engagement
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald" strokeWidth={3} />
                      100 % gratuit
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-emerald" strokeWidth={3} />
                      Réponse en moins de 5 min
                    </span>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5 relative border-t lg:border-t-0 lg:border-l border-border/60 bg-surface/70 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-between gap-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald inline-flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald" />
                    </span>
                    Ce qui vous attend
                  </p>
                  <ul className="mt-7 space-y-5">
                    {[
                      ["2 min", "pour décrire votre besoin"],
                      ["< 1 h", "premier retour d'un courtier dédié"],
                      ["24 h", "attestation envoyée par email"],
                    ].map(([k, v], i) => (
                      <motion.li
                        key={k}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-baseline gap-5 border-b border-border/60 pb-5 last:border-0 last:pb-0"
                      >
                        <span className="font-display text-3xl text-foreground tracking-[-0.02em] tabular-nums w-20">{k}</span>
                        <span className="text-sm text-muted-foreground">{v}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border/60 pt-5">
                  <Lock className="h-4 w-4 text-emerald" />
                  <span className="font-mono tracking-[0.05em]">Données chiffrées · RGPD · ORIAS 25 002 890</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}