import { ShieldCheck, Handshake, Compass, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const pillars = [
  {
    n: "01",
    icon: ShieldCheck,
    title: "Indépendance totale",
    desc: "Aucun lien capitalistique avec une compagnie. Nous comparons librement plus de 40 assureurs pour défendre uniquement votre intérêt.",
  },
  {
    n: "02",
    icon: Handshake,
    title: "Conseil humain & dédié",
    desc: "Un seul interlocuteur, du devis à la gestion de sinistre. Une relation de confiance, sans plateformes anonymes.",
  },
  {
    n: "03",
    icon: Compass,
    title: "Transparence absolue",
    desc: "Garanties détaillées, exclusions explicitées, frais et commissions assumés. Pas de petites lignes, pas de mauvaise surprise.",
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="relative py-20 sm:py-24 lg:py-32 bg-surface/60 border-y border-border/60 cv-auto">
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_45%_at_50%_30%,black,transparent)]"
      >
        <div className="absolute inset-0 bg-grid opacity-[0.18]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">04 — Nos engagements</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] text-balance tracking-[-0.03em]">
            Trois principes
            <br />
            <span className="text-gradient-emerald">non négociables.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Ce qui nous distingue : une posture éthique, un conseil indépendant et une exigence
            de clarté à chaque étape de votre couverture.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-14 lg:mt-16 grid sm:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.n} delay={60 + i * 50}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-surface/95 backdrop-blur p-7 lg:p-8 shadow-soft hover:shadow-premium hover:-translate-y-1 hover:border-emerald/40 transition-all duration-500">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--emerald) 70%, transparent), transparent)" }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald/10 text-emerald border border-emerald/15 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[10.5px] tracking-[0.22em] text-emerald/80">
                      {p.n}
                    </span>
                  </div>
                  <h3 className="relative mt-6 font-display text-[1.6rem] lg:text-[1.85rem] tracking-[-0.02em] leading-[1.1]">
                    {p.title}
                  </h3>
                  <p className="relative mt-3 text-[14.5px] text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-emerald font-medium">
                    <Sparkles className="h-3 w-3" />
                    Promesse Integra
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
