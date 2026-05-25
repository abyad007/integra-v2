import { useEffect, useRef, useState } from "react";
import { Phone, Search, FileCheck, FileSignature, Clock, type LucideIcon } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import step01 from "@/assets/step-01-contact.webp";
import step02 from "@/assets/step-02-decouverte.webp";
import step03 from "@/assets/step-03-validation.webp";
import step04 from "@/assets/step-04-souscription.webp";

type Step = { n: string; icon: LucideIcon; title: string; desc: string; time: string; img: string };

const STEPS: Step[] = [
  { n: "01", icon: Phone, title: "Contact", desc: "Vous nous exposez votre besoin, nous analysons rapidement votre demande.", time: "2 min", img: step01 },
  { n: "02", icon: Search, title: "Découverte", desc: "Un expert échange avec vous pour comprendre votre situation et définir la solution adaptée.", time: "15 min", img: step02 },
  { n: "03", icon: FileCheck, title: "Validation", desc: "Nous vérifions vos informations et documents pour garantir une souscription fiable et sans erreur.", time: "24 h", img: step03 },
  { n: "04", icon: FileSignature, title: "Souscription", desc: "Vous signez en ligne ; votre contrat est activé et vos documents transmis immédiatement.", time: "Immédiat", img: step04 },
];

/**
 * Storytelling scroll-pinned 4-step method (GSAP ScrollTrigger).
 * - Desktop: section pins, active step changes with scroll progress
 * - Mobile / reduced-motion: graceful vertical fallback, no pin
 */
export function MethodPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start", dragFree: true });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reduced || !isDesktop) return;
    if (!sectionRef.current || !pinRef.current) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !sectionRef.current || !pinRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const total = STEPS.length;
          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: "top top",
            end: () => `+=${window.innerHeight * (total - 0.5)}`,
            pin: pinRef.current!,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(total - 1, Math.floor(self.progress * total));
              setActive(idx);
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          });
        }, sectionRef);

        // Refresh after layout settles (fonts, images, late renders)
        const refresh = () => ScrollTrigger.refresh();
        const t1 = window.setTimeout(refresh, 100);
        const t2 = window.setTimeout(refresh, 800);
        window.addEventListener("load", refresh);

        revert = () => {
          window.clearTimeout(t1);
          window.clearTimeout(t2);
          window.removeEventListener("load", refresh);
          ctx.revert();
        };
      }
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section
      id="methode"
      ref={sectionRef}
      className="relative bg-background"
    >
      {/* Pinned viewport */}
      <div
        ref={pinRef}
        className="relative lg:h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]">
          <div className="absolute inset-0 bg-grid opacity-[0.2]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8 w-full py-20 lg:py-0 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: section header + progress */}
            <div className="lg:col-span-5">
              <p className="eyebrow">03 — Notre méthode</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] text-balance">
                Votre assurance <span className="text-gradient-emerald">en 4 étapes.</span>
              </h2>
              <p className="mt-5 text-muted-foreground inline-flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-emerald" />
                De la prise de contact à la signature, en moins d'une heure.
              </p>

              {/* Step progress (desktop) */}
              <div className="hidden lg:block mt-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-emerald tabular-nums">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    / {String(STEPS.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative h-px w-full bg-border overflow-hidden">
                  <div
                    ref={progressRef}
                    className="absolute inset-0 origin-left bg-emerald"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
                <ul className="mt-8 space-y-3">
                  {STEPS.map((s, i) => (
                    <li
                      key={s.n}
                      className={`flex items-center gap-3 transition-all duration-500 ${
                        i === active ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-mono tabular-nums transition-colors duration-500 ${
                          i === active
                            ? "bg-emerald text-emerald-foreground"
                            : "bg-foreground/[0.05] text-muted-foreground"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span className="text-sm font-medium">{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: animated step cards */}
            <div className="lg:col-span-7 relative">
              {/* Desktop: stacked crossfade with 3D step illustration on right */}
              <div className="hidden lg:block relative h-[440px]">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === active;
                  const isPast = i < active;
                  return (
                    <article
                      key={s.n}
                      aria-hidden={!isActive}
                      className="absolute inset-0 rounded-3xl border border-border bg-surface shadow-elev overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateY(0) scale(1)"
                          : isPast
                            ? "translateY(-24px) scale(0.98)"
                            : "translateY(36px) scale(0.97)",
                        pointerEvents: isActive ? "auto" : "none",
                        zIndex: isActive ? 2 : 1,
                      }}
                    >
                      <div className="grid grid-cols-[1fr_300px] h-full">
                        {/* Text block */}
                        <div className="relative p-10 flex flex-col justify-between">
                          <span
                            className="pointer-events-none absolute inset-0 opacity-50"
                            style={{
                              background:
                                "radial-gradient(60% 50% at 100% 0%, color-mix(in oklab, var(--emerald) 10%, transparent), transparent 60%)",
                            }}
                            aria-hidden="true"
                          />
                          <div className="relative flex items-start justify-between">
                            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald/10 text-emerald border border-emerald/15">
                              <Icon className="h-6 w-6" strokeWidth={1.5} />
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 text-emerald px-3 py-1 text-[11px] font-medium uppercase tracking-wider">
                              <Clock className="h-3 w-3" />
                              {s.time}
                            </span>
                          </div>
                          <div className="relative">
                            <span className="font-mono text-[11px] tracking-[0.2em] text-emerald">
                              Étape {s.n}
                            </span>
                            <h3 className="mt-3 font-display text-[2.5rem] xl:text-[2.75rem] tracking-[-0.02em] leading-[1.04]">
                              {s.title}
                            </h3>
                            <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-md">
                              {s.desc}
                            </p>
                          </div>
                        </div>

                        {/* Step illustration zone — 300px wide, object-contain so nothing is cropped */}
                        <div
                          className="relative border-l border-border/60 overflow-hidden"
                          style={{
                            background:
                              "radial-gradient(60% 70% at 50% 50%, color-mix(in oklab, var(--emerald) 6%, transparent), transparent 75%), linear-gradient(180deg, #FFFFFF 0%, #F9FBFC 100%)",
                          }}
                        >
                          <img
                            src={s.img}
                            alt=""
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 ease-out"
                            style={{
                              transform: isActive ? "scale(1)" : "scale(0.96)",
                            }}
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

          {/* Mobile / fallback: Embla slider horizontal */}
          <div className="lg:hidden overflow-hidden mt-8 -mx-5 sm:-mx-8" ref={emblaRef}>
            <div className="flex gap-4 pb-6 touch-pan-y pl-5 sm:pl-8 pr-5 sm:pr-8 cursor-grab active:cursor-grabbing">
              {STEPS.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.n}
                    className="flex-[0_0_85%] sm:flex-[0_0_60%] rounded-2xl border border-border bg-surface shadow-soft select-none overflow-hidden"
                  >
                    {/* Image zone with object-contain — entire object always visible */}
                    <div
                      className="relative aspect-[16/10] overflow-hidden border-b border-border/60"
                      style={{
                        background:
                          "radial-gradient(60% 70% at 50% 50%, color-mix(in oklab, var(--emerald) 6%, transparent), transparent 75%), linear-gradient(180deg, #FFFFFF, #F9FBFC)",
                      }}
                    >
                      <img
                        src={s.img}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-contain p-3"
                      />
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur text-emerald px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider border border-emerald/15 shadow-soft">
                        <Clock className="h-2.5 w-2.5" />
                        {s.time}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/10 text-emerald border border-emerald/15">
                          <Icon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                        <span className="font-mono text-[11px] text-emerald">Étape {s.n}</span>
                      </div>
                      <h3 className="mt-4 font-display text-xl leading-tight">{s.title}</h3>
                      <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
