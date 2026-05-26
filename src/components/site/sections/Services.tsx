import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import autoImg from "@/assets/service-auto.webp";
import motoImg from "@/assets/service-moto.webp";
import habitationImg from "@/assets/service-habitation.webp";
import santeImg from "@/assets/service-sante.webp";
import prevoyanceImg from "@/assets/service-prevoyance.webp";
import proImg from "@/assets/service-pro.webp";
import decennaleImg from "@/assets/service-decennale.webp";
import vtcImg from "@/assets/service-vtc.webp";

const services = [
  {
    img: autoImg,
    title: "Assurance Auto",
    desc: "Résiliés, malussés, jeunes conducteurs. Carte verte sous 1 h.",
    href: "/service/assurance-auto/",
    accent: "Tous profils",
  },
  {
    img: motoImg,
    title: "Assurance Moto",
    desc: "Scooter, 125, grosses cylindrées. Couverture sur mesure.",
    href: "/service/assurance-moto/",
    accent: "Tous permis",
  },
  {
    img: habitationImg,
    title: "Assurance Habitation",
    desc: "Locataire ou propriétaire. Multi-risques étendus.",
    href: "/service/assurance-habitation/",
    accent: "Propriétaire & locataire",
  },
  {
    img: santeImg,
    title: "Assurance Santé",
    desc: "Mutuelles individuelles et familiales, sans questionnaire.",
    href: "/service/assurance-sante/",
    accent: "Sans questionnaire",
  },
  {
    img: prevoyanceImg,
    title: "Prévoyance",
    desc: "Invalidité, incapacité, décès. Protégez vos proches.",
    href: "/service/assurance-prevoyance/",
    accent: "Protection familiale",
  },
  {
    img: proImg,
    title: "RC Pro & Pro",
    desc: "Indépendants, freelances, TPE. RC et multirisques pro.",
    href: "/service/assurance-pro/",
    accent: "Indépendants",
  },
  {
    img: decennaleImg,
    title: "Décennale BTP",
    desc: "Artisans, micro-entrepreneurs. Attestation sous 48 h.",
    href: "/service/assurance-decennale/",
    accent: "48 h",
  },
  {
    img: vtcImg,
    title: "Assurance VTC",
    desc: "Chauffeurs VTC, taxis et transport de personnes. Carte pro acceptée.",
    href: "/service/assurance-vtc/",
    accent: "Chauffeurs pros",
  },
];

type Service = (typeof services)[number];

function ServiceCard({ s, pinned = false }: { s: Service; pinned?: boolean }) {
  return (
    <a
      href={s.href}
      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/70 bg-surface/85 backdrop-blur shadow-soft hover:shadow-premium hover:-translate-y-1 hover:border-emerald/40 transition-all duration-500 card-sheen ${
        pinned ? "w-[340px] flex-shrink-0" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--emerald) 70%, transparent), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: "radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, var(--emerald) 8%, transparent), transparent 60%)" }}
      />

      <div className="relative aspect-[16/10] overflow-hidden bg-cream border-b border-border/60">
        <img
          src={s.img}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-surface/95 backdrop-blur text-emerald px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wider border border-emerald/15 shadow-soft">
          <Sparkles className="h-2.5 w-2.5" />
          {s.accent}
        </span>
      </div>

      <div className="relative flex-1 flex flex-col p-6 lg:p-7">
        <h3 className="font-display text-xl lg:text-[1.4rem] tracking-[-0.015em] leading-tight">
          {s.title}
        </h3>
        <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
          {s.desc}
        </p>
        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald">
          Découvrir
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // GS4 — Horizontal scroll pin on desktop ≥1280px (xl breakpoint)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const isXl = window.matchMedia("(min-width: 1280px)").matches;
    if (!isXl) return;
    if (!sectionRef.current || !pinRef.current || !trackRef.current) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !sectionRef.current || !pinRef.current || !trackRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const computeDistance = () => {
            const trackW = trackRef.current!.scrollWidth;
            const viewportW = window.innerWidth;
            return Math.max(0, trackW - viewportW + 96); // 96px gutter
          };

          ScrollTrigger.create({
            trigger: sectionRef.current!,
            start: "top top",
            end: () => `+=${computeDistance()}`,
            pin: pinRef.current!,
            pinSpacing: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!trackRef.current) return;
              const distance = computeDistance();
              const x = -distance * self.progress;
              trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          });
        }, sectionRef);

        // Refresh after fonts/images settle
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
    <section ref={sectionRef} id="services" className="relative bg-background">
      {/* Mobile / tablet / lg (< xl) — classic grid layout */}
      <div className="xl:hidden py-20 sm:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-60" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 sm:mb-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">02 — Nos solutions</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] text-balance tracking-[-0.03em]">
                Une couverture juste,
                <br />
                <span className="text-gradient-emerald">pour chaque vie.</span>
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={120}>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Particulier ou professionnel, nous activons le bon partenaire parmi nos 40+ compagnies
                référencées pour bâtir la garantie la plus adaptée à votre profil.
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={40 + i * 40}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop xl ≥1280px — horizontal scroll-pinned track */}
      <div className="hidden xl:block">
        <div ref={pinRef} className="h-screen flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-noise pointer-events-none opacity-60" />
          <div className="mx-auto max-w-7xl px-8 w-full mb-12 relative">
            <div className="grid grid-cols-12 gap-16 items-end">
              <div className="col-span-7">
                <p className="eyebrow">02 — Nos solutions</p>
                <h2 className="mt-4 font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.04] text-balance tracking-[-0.03em]">
                  Une couverture juste,
                  <br />
                  <span className="text-gradient-emerald">pour chaque vie.</span>
                </h2>
              </div>
              <div className="col-span-5">
                <p className="text-muted-foreground text-base leading-relaxed">
                  Particulier ou professionnel, nous activons le bon partenaire parmi nos 40+ compagnies
                  référencées pour bâtir la garantie la plus adaptée à votre profil.
                </p>
                {/* Progress indicator */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald">
                    Défilez
                  </span>
                  <div className="relative h-px flex-1 bg-border overflow-hidden">
                    <div
                      ref={progressRef}
                      className="absolute inset-0 origin-left bg-emerald"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal track */}
          <div className="relative w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 px-8 will-change-transform"
              style={{ width: "max-content" }}
            >
              {services.map((s) => (
                <ServiceCard key={s.title} s={s} pinned />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
