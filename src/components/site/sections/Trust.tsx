import { useCallback, useEffect, useRef, useState } from "react";
import { Star, Quote, ShieldCheck, BadgeCheck, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import avatarCamille from "@/assets/avatar-camille.webp";
import avatarMehdi from "@/assets/avatar-mehdi.webp";
import avatarSophie from "@/assets/avatar-sophie.webp";

const testimonials = [
  {
    name: "Camille R.",
    role: "Cliente vérifiée",
    text: "Devis en 5 minutes, conseiller dédié, attestation reçue le lendemain. Service impeccable, je recommande sans hésiter.",
    rating: 5,
    avatar: avatarCamille,
  },
  {
    name: "Mehdi K.",
    role: "Auto · résilié",
    text: "Après ma résiliation, personne ne voulait m'assurer. Integra a trouvé une solution adaptée en moins de 24 h, à un tarif correct.",
    rating: 5,
    avatar: avatarMehdi,
  },
  {
    name: "Sophie B.",
    role: "RC Pro · indépendante",
    text: "Conseil clair, garanties expliquées sans jargon. Je me sens enfin couverte par quelqu'un qui défend mes intérêts.",
    rating: 5,
    avatar: avatarSophie,
  },
  {
    name: "Lucas M.",
    role: "Jeune conducteur · 22 ans",
    text: "Mon premier contrat auto en jeune permis B, ils ont trouvé un tarif imbattable. Carte verte le jour même. Bravo l'équipe.",
    rating: 5,
    avatar: avatarMehdi,
  },
  {
    name: "Aïcha N.",
    role: "Habitation · Paris 11",
    text: "Devis multirisque habitation comparé en 3 minutes. J'économise 280 €/an sur des garanties supérieures. Aucune comparaison avec mon ancien assureur.",
    rating: 5,
    avatar: avatarSophie,
  },
  {
    name: "Jean-Marc L.",
    role: "Artisan · Décennale BTP",
    text: "Attestation décennale obtenue en 48 h alors que d'autres courtiers ne me répondaient même pas. Très professionnels, prix correct.",
    rating: 5,
    avatar: avatarMehdi,
  },
  {
    name: "Élodie F.",
    role: "VTC · Île-de-France",
    text: "Première fois qu'un courtier comprend vraiment les besoins d'un chauffeur VTC. Garantie perte d'exploitation incluse, je dors tranquille.",
    rating: 5,
    avatar: avatarCamille,
  },
  {
    name: "Karim B.",
    role: "Mutuelle santé TNS",
    text: "J'ai mis 6 mois à comprendre Madelin avec mon ancien courtier. Avec Integra, c'était clair en 10 minutes et j'économise 1 200 €/an.",
    rating: 5,
    avatar: avatarMehdi,
  },
];

const badges = [
  { icon: ShieldCheck, label: "ORIAS n°25 002 890" },
  { icon: BadgeCheck, label: "Supervisé par l'ACPR" },
  { icon: Lock, label: "Données chiffrées · RGPD" },
];

export function Trust() {
  const statsRef = useRef<HTMLDListElement>(null);
  const [statsProgress, setStatsProgress] = useState<number | undefined>(undefined);

  // GS5 — Scroll-scrub of the 4 CountUps via a single ScrollTrigger.
  // All 4 counters tick together in sync with scroll position (premium feel).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStatsProgress(1);
      return;
    }
    if (!statsRef.current) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !statsRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: statsRef.current!,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.4,
            onUpdate: (self) => setStatsProgress(self.progress),
          });
        }, statsRef);

        revert = () => ctx.revert();
      }
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section id="trust" className="relative py-20 sm:py-24 lg:py-32 cv-auto">
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-50" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 sm:mb-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">05 — Confiance</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] text-balance tracking-[-0.03em]">
              Des milliers d'assurés
              <br />
              <span className="text-gradient-emerald">nous font confiance.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Une note moyenne de 4.8/5 sur Trustpilot, un taux d'acceptation supérieur à 92 %,
              et un conseiller dédié à chaque dossier — c'est notre standard.
            </p>
          </Reveal>
        </div>

        {/* Stats band — driven by single ScrollTrigger scrub (GS5) */}
        <Reveal>
          <dl
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 shadow-soft mb-12 lg:mb-16"
          >
            {[
              { v: 4.8, decimals: 1, suffix: "/5", label: "Note Trustpilot" },
              { v: 12500, decimals: 0, suffix: "+", label: "Dossiers traités" },
              { v: 92, decimals: 0, suffix: "%", label: "Demandes acceptées" },
              { v: 24, decimals: 0, suffix: "h", label: "Attestation envoyée" },
            ].map((s) => (
              <div key={s.label} className="bg-surface px-5 py-7 sm:py-8 text-center">
                <dt className="font-display text-[2.25rem] sm:text-[2.75rem] tracking-[-0.03em] leading-none tabular-nums">
                  <CountUp
                    value={s.v}
                    decimals={s.decimals}
                    suffix={s.suffix}
                    progress={statsProgress}
                  />
                </dt>
                <dd className="mt-2.5 text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Testimonials slider — Embla horizontal, auto-rotate, navigation */}
        <Reveal>
          <TestimonialsSlider />
        </Reveal>

        {/* Compliance badges */}
        <Reveal delay={300}>
          <div className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <span key={b.label} className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald" />
                  {b.label}
                </span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TestimonialsSlider — Embla horizontal carousel
   - 1 card on mobile, 2 on sm, 3 on lg
   - Auto-rotate every 6s, paused on hover/touch
   - Dots navigation + arrow buttons
   ════════════════════════════════════════════════════════════ */
function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-rotate every 6 sec, paused on hover/touch/reduced-motion
  useEffect(() => {
    if (!emblaApi) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: number | undefined;
    let paused = false;

    const tick = () => {
      if (!paused) emblaApi.scrollNext();
    };
    const start = () => {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(tick, 6000);
    };
    const stop = () => window.clearInterval(intervalId);

    const onPointerEnter = () => {
      paused = true;
    };
    const onPointerLeave = () => {
      paused = false;
    };

    start();
    const node = emblaApi.rootNode();
    node.addEventListener("pointerenter", onPointerEnter);
    node.addEventListener("pointerleave", onPointerLeave);
    return () => {
      stop();
      node.removeEventListener("pointerenter", onPointerEnter);
      node.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden -mx-2" ref={emblaRef}>
        <div className="flex touch-pan-y cursor-grab active:cursor-grabbing">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
            >
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-surface/95 backdrop-blur p-7 shadow-soft hover:shadow-premium hover:-translate-y-1 hover:border-emerald/40 transition-all duration-500">
                <Quote
                  aria-hidden="true"
                  className="absolute right-6 top-6 h-8 w-8 text-emerald/15 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-emerald text-emerald" />
                  ))}
                </div>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-foreground/90 min-h-[7rem]">
                  « {t.text} »
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3">
                  <span className="relative grid h-11 w-11 place-items-center rounded-full overflow-hidden border border-border/70 ring-1 ring-emerald/10 shadow-soft">
                    <img
                      src={t.avatar}
                      alt={`Portrait de ${t.name}`}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover scale-[1.18]"
                    />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-[11.5px] text-muted-foreground mt-0.5">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation : dots + arrow buttons */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Aller au témoignage ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-8 bg-emerald"
                  : "w-1.5 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Témoignage précédent"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface hover:bg-accent hover:border-emerald/30 transition-all active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Témoignage suivant"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface hover:bg-accent hover:border-emerald/30 transition-all active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
