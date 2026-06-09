import {
  ShieldCheck,
  TrendingUp,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Award,
} from "lucide-react";

const STATS = [
  { icon: Users, value: "+12 500", label: "Dossiers traités" },
  { icon: CheckCircle2, value: "92 %", label: "Demandes acceptées" },
  { icon: Star, value: "4,8 / 5", label: "Trustpilot" },
  { icon: Clock, value: "≤ 1 h", label: "Carte verte" },
  { icon: ShieldCheck, value: "ORIAS", label: "n°25 002 890" },
  { icon: Award, value: "40+", label: "Assureurs comparés" },
  { icon: TrendingUp, value: "24 h", label: "Attestation" },
  { icon: CheckCircle2, value: "0 €", label: "Frais d'étude" },
];

export function StatsMarquee() {
  const row = [...STATS, ...STATS, ...STATS];

  return (
    <section
      aria-label="Chiffres-clés Integra"
      className="relative border-y border-border bg-surface overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--surface), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--surface), transparent)" }}
      />

      <div className="stats-marquee-track flex items-center gap-10 py-4">
        {row.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={`${s.label}-${i}`}
              className="flex-shrink-0 inline-flex items-center gap-3 whitespace-nowrap"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald/10 text-emerald">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              <span className="inline-flex items-baseline gap-2">
                <strong className="font-display text-lg tracking-[-0.02em] tabular-nums text-foreground">
                  {s.value}
                </strong>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </span>
              </span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border ml-2" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
