import {
  ShieldCheck,
  TrendingUp,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Award,
  Sparkles,
} from "lucide-react";

/**
 * Infinite horizontal marquee of trust signals.
 * Placed right under the Hero — gives an instant "alive / active" feel.
 *
 * CSS-only animation (no JS), respects prefers-reduced-motion via media query.
 */

const STATS = [
  { icon: Users, value: "+12 500", label: "Dossiers traités" },
  { icon: CheckCircle2, value: "92 %", label: "Demandes acceptées" },
  { icon: Star, value: "4,8 / 5", label: "Trustpilot" },
  { icon: Clock, value: "≤ 1 h", label: "Carte verte" },
  { icon: ShieldCheck, value: "ORIAS", label: "n°25 002 890" },
  { icon: Award, value: "40+", label: "Assureurs comparés" },
  { icon: TrendingUp, value: "24 h", label: "Délai moyen attestation" },
  { icon: Sparkles, value: "0 €", label: "Frais d'étude" },
];

export function StatsMarquee() {
  // Duplicate the list 3x so the marquee loop is seamless at any viewport
  const row = [...STATS, ...STATS, ...STATS];

  return (
    <section
      aria-label="Chiffres-clés Integra"
      className="relative bg-navy text-navy-foreground border-y border-white/10 overflow-hidden"
    >
      {/* Fade edges */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, var(--navy), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(270deg, var(--navy), transparent)",
        }}
      />

      <div className="stats-marquee-track flex items-center gap-12 py-5">
        {row.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={`${s.label}-${i}`}
              className="flex-shrink-0 inline-flex items-center gap-3 whitespace-nowrap"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8 border border-white/12 text-emerald">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="inline-flex items-baseline gap-2">
                <strong className="font-display text-xl tracking-[-0.015em] tabular-nums">
                  {s.value}
                </strong>
                <span className="text-[12px] uppercase tracking-[0.16em] text-white/65">
                  {s.label}
                </span>
              </span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/20 ml-4" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
