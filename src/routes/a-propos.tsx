import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Lock,
  Handshake,
  Compass,
  Award,
  Calendar,
  Users,
  Phone,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CTA } from "@/components/site/sections/CTA";
import { CountUp } from "@/components/site/CountUp";
import founderImg from "@/assets/founder-ilyass.webp";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Integra Assurance | Courtier indépendant ORIAS 25002890" },
      {
        name: "description",
        content:
          "Integra Assurance : courtier indépendant fondé en 2019 par Ilyass Zerouali, spécialiste des profils résiliés, malussés et jeunes conducteurs. ORIAS 25002890, supervisé par l'ACPR.",
      },
      { property: "og:title", content: "À propos d'Integra — Courtier indépendant" },
      { property: "og:description", content: "Découvrez l'histoire, l'équipe et les engagements d'Integra Assurance." },
      { property: "og:url", content: "https://integra-assurance.com/a-propos" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://integra-assurance.com/a-propos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "InsuranceAgency",
          name: "Integra CC",
          alternateName: "Integra Assurance",
          url: "https://integra-assurance.com",
          telephone: "+33187663942",
          founder: {
            "@type": "Person",
            name: "Ilyass Zerouali",
            jobTitle: "Courtier en assurance indépendant",
          },
          foundingDate: "2019",
          address: {
            "@type": "PostalAddress",
            streetAddress: "60 Rue François 1er",
            addressLocality: "Paris",
            postalCode: "75008",
            addressCountry: "FR",
          },
          identifier: {
            "@type": "PropertyValue",
            propertyID: "ORIAS",
            value: "25002890",
          },
          areaServed: { "@type": "Country", name: "France" },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Indépendance",
    desc: "Aucun lien capitalistique avec une compagnie. Nous comparons librement plus de 40 assureurs pour défendre uniquement votre intérêt.",
  },
  {
    icon: Handshake,
    title: "Humain",
    desc: "Un seul conseiller dédié, du devis à la gestion de sinistre. Pas de plateforme anonyme, pas de centre d'appels offshore.",
  },
  {
    icon: Compass,
    title: "Transparence",
    desc: "Garanties détaillées, exclusions explicitées, frais et commissions assumés. Pas de petites lignes, pas de mauvaise surprise.",
  },
];

const CREDENTIALS = [
  {
    icon: ShieldCheck,
    label: "ORIAS",
    value: "n°25 002 890",
    desc: "Registre unique des intermédiaires en assurance, banque et finance",
  },
  {
    icon: BadgeCheck,
    label: "ACPR",
    value: "Supervisé",
    desc: "Autorité de Contrôle Prudentiel et de Résolution (Banque de France)",
  },
  {
    icon: Lock,
    label: "RGPD",
    value: "Conforme",
    desc: "Données chiffrées en transit et au repos, hébergement français",
  },
  {
    icon: Award,
    label: "Trustpilot",
    value: "4,8 / 5",
    desc: "Plus de 600 clients vérifiés satisfaits",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <main>
        {/* ════════════ HERO — split layout ════════════ */}
        <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-20 overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_55%_at_50%_30%,black,transparent)]">
            <div className="absolute inset-0 bg-grid opacity-[0.18]" />
          </div>
          <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Retour à l'accueil
              </Link>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <Reveal delay={60}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-emerald mb-6 shadow-soft">
                    <Users className="h-3.5 w-3.5" />
                    À propos d'Integra
                  </div>
                </Reveal>
                <Reveal delay={140}>
                  <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.03em] leading-[1.05] text-balance">
                    Un courtier
                    <br />
                    <span className="text-gradient-emerald">qui défend vraiment</span>
                    <br />
                    vos intérêts.
                  </h1>
                </Reveal>
                <Reveal delay={220}>
                  <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    Integra Assurance est un cabinet de courtage indépendant fondé en 2019, spécialisé
                    dans les profils que les compagnies traditionnelles refusent : résiliés,
                    malussés, jeunes conducteurs, artisans, indépendants.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                      ORIAS n°25 002 890
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-emerald" />
                      Fondé en 2019
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span className="inline-flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-emerald" />
                      4,8 / 5 Trustpilot
                    </span>
                  </div>
                </Reveal>
              </div>

              {/* Right column intentionally empty on desktop (founder portrait is in dedicated section below) */}
              <Reveal delay={200} className="lg:col-span-5 hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald/15 via-transparent to-navy/10 blur-2xl opacity-70" />
                  <div className="relative grid grid-cols-2 gap-3 text-center">
                    {[
                      { v: 12500, suffix: "+", label: "Dossiers traités" },
                      { v: 40, suffix: "+", label: "Assureurs comparés" },
                      { v: 92, suffix: "%", label: "Demandes acceptées" },
                      { v: 24, suffix: " h", label: "Attestation envoyée" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-border/70 bg-surface/95 backdrop-blur px-5 py-6 shadow-soft"
                      >
                        <dt className="font-display text-[2rem] tracking-[-0.03em] leading-none tabular-nums">
                          <CountUp value={s.v} suffix={s.suffix} />
                        </dt>
                        <dd className="mt-2 text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                          {s.label}
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════ FONDATEUR — portrait + bio ════════════ */}
        <section className="relative py-20 lg:py-32 bg-surface/60 border-b border-border/60">
          <div className="absolute inset-0 bg-noise opacity-50" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <Reveal className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald/20 via-transparent to-navy/10 blur-2xl opacity-60" />
                  <div className="relative overflow-hidden rounded-[1.75rem] ring-frame border border-border/40 bg-surface shadow-premium aspect-[3/4] lg:aspect-[4/5]">
                    <img
                      src={founderImg}
                      alt="Ilyass Zerouali, fondateur d'Integra Assurance"
                      width={1536}
                      height={2048}
                      loading="eager"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />
                  </div>
                  {/* Floating ORIAS chip */}
                  <div className="hidden lg:flex absolute -right-4 bottom-8 items-center gap-3 rounded-2xl glass-soft px-4 py-3 shadow-premium border border-border/60">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald/12 text-emerald">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        ORIAS
                      </p>
                      <p className="text-sm font-semibold tabular-nums">n°25 002 890</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-7">
                <p className="eyebrow">Le fondateur</p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-balance">
                  Ilyass Zerouali,
                  <br />
                  <span className="text-gradient-emerald">courtier indépendant.</span>
                </h2>
                <div className="mt-7 space-y-5 text-base lg:text-[1.0625rem] leading-relaxed text-muted-foreground max-w-2xl">
                  <p>
                    Diplômé en droit des assurances, Ilyass a fondé Integra en 2019 avec une conviction
                    forte : le marché du courtage français ne sert pas correctement les profils que les
                    grandes compagnies jugent "à risque".
                  </p>
                  <p>
                    Pendant cinq ans en cabinet traditionnel, il a vu trop d'assurés résiliés ou
                    malussés se faire écarter par des algorithmes anonymes — sans qu'on prenne le
                    temps d'étudier leur dossier. Integra est née pour proposer l'inverse : un
                    conseiller dédié, un dossier humain, un partenariat avec les rares compagnies
                    spécialisées qui acceptent ces profils.
                  </p>
                  <p>
                    Membre de la Chambre Syndicale des Courtiers d'Assurance, il publie également
                    chaque mois sur le{" "}
                    <Link to="/blog" className="text-emerald font-medium hover:underline">
                      blog Integra
                    </Link>{" "}
                    des guides issus de l'expérience terrain de centaines de dossiers traités.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="tel:+33187663942"
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-elev hover:shadow-premium hover:-translate-y-0.5 transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    Parler à Ilyass
                  </a>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium hover:bg-accent transition-all"
                  >
                    Lire ses guides
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════ VALEURS ════════════ */}
        <section className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-noise opacity-50" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">Nos engagements</p>
              <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-balance tracking-[-0.03em]">
                Trois principes
                <br />
                <span className="text-gradient-emerald">non négociables.</span>
              </h2>
            </Reveal>

            <div className="mt-12 lg:mt-16 grid sm:grid-cols-3 gap-5 lg:gap-6">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <Reveal key={v.title} delay={80 + i * 80}>
                    <article className="group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-surface/95 backdrop-blur p-8 shadow-soft hover:shadow-premium hover:-translate-y-1 hover:border-emerald/40 transition-all duration-500">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--emerald) 70%, transparent), transparent)" }}
                      />
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald/10 text-emerald border border-emerald/15 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <h3 className="font-display text-xl lg:text-[1.4rem] tracking-[-0.015em] leading-tight">
                        {v.title}
                      </h3>
                      <p className="mt-3 text-[14.5px] text-muted-foreground leading-relaxed">
                        {v.desc}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════ CRÉDENTIALS / CONFORMITÉ ════════════ */}
        <section className="relative py-16 lg:py-24 bg-surface/60 border-y border-border/60">
          <div className="absolute inset-0 bg-noise opacity-50" />
          <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
            <Reveal>
              <p className="eyebrow">Conformité & garanties</p>
              <h2 className="mt-4 font-display text-2xl lg:text-[2rem] tracking-[-0.02em] leading-tight max-w-xl">
                Encadré par les <span className="text-gradient-emerald">plus hautes autorités</span> de
                régulation française.
              </h2>
            </Reveal>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {CREDENTIALS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.label} delay={80 + i * 60}>
                    <div className="relative h-full overflow-hidden rounded-2xl border border-border/70 bg-surface/95 backdrop-blur p-5 shadow-soft">
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/10 text-emerald border border-emerald/15 flex-shrink-0">
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald">
                            {c.label}
                          </p>
                          <p className="mt-1 font-display text-lg tabular-nums tracking-[-0.01em]">
                            {c.value}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-[12.5px] text-muted-foreground leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
