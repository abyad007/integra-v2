import { Link } from "@tanstack/react-router";
import { Check, ArrowRight, ArrowLeft, HelpCircle, type LucideIcon } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { CTA } from "@/components/site/sections/CTA";
import { Trust } from "@/components/site/sections/Trust";
import { QuoteFunnel } from "@/components/site/QuoteFunnel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type ServiceProfile = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type ServicePageProps = {
  /** Eyebrow badge icon */
  badgeIcon: LucideIcon;
  /** Short eyebrow label, e.g. "Assurance Moto" */
  badgeLabel: string;
  /** H1 main statement (text part) */
  title: string;
  /** H1 italic pivot phrase (emerald gradient) */
  titlePivot: string;
  /** Sub paragraph below H1 */
  description: string;
  /** Big 3D illustration path */
  heroImage: string;
  /** Alt text for the illustration */
  heroAlt: string;
  /** CTA button label, e.g. "Obtenir mon tarif moto" */
  ctaLabel: string;
  /** QuoteFunnel default type (auto, moto, habitation, sante, pro) */
  defaultType: string;
  /** Two short trust bullets shown next to the CTA */
  ctaBullets: [string, string];
  /** Profiles / use-cases section eyebrow */
  profilesEyebrow: string;
  /** Profiles / use-cases section H2 text part */
  profilesTitle: string;
  /** Profiles / use-cases section H2 italic pivot */
  profilesPivot: string;
  /** 3 profile cards */
  profiles: ServiceProfile[];
  /** Optional FAQ items specific to this service (3-6 questions). When omitted, no FAQ section renders. */
  faqs?: Array<{ q: string; a: string }>;
};

export function ServicePage(p: ServicePageProps) {
  const BadgeIcon = p.badgeIcon;
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Header />
      <main>
        {/* Hero — 2 columns: copy left, 3D illustration right */}
        <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 overflow-hidden border-b border-border/60">
          <div className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald/[0.04] to-transparent pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_55%_at_50%_25%,black,transparent)]">
            <div className="absolute inset-0 bg-grid opacity-[0.18]" />
          </div>

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
              <div className="lg:col-span-6">
                <Reveal delay={80}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-emerald mb-6 shadow-soft">
                    <BadgeIcon className="h-3.5 w-3.5" />
                    {p.badgeLabel}
                  </div>
                </Reveal>
                <Reveal delay={160}>
                  <h1 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] tracking-tight text-balance">
                    {p.title}{" "}
                    <span className="text-gradient-emerald">{p.titlePivot}</span>
                  </h1>
                </Reveal>
                <Reveal delay={240}>
                  <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                    {p.description}
                  </p>
                </Reveal>
                <Reveal delay={320}>
                  <div className="mt-8 flex flex-wrap gap-4 items-center">
                    <QuoteFunnel defaultType={p.defaultType}>
                      <button
                        data-magnetic="true"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-elev hover:shadow-premium hover:-translate-y-0.5 transition-all"
                      >
                        {p.ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </QuoteFunnel>
                    <div className="flex flex-col justify-center text-xs text-muted-foreground gap-1.5">
                      <span className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald" strokeWidth={3} />
                        {p.ctaBullets[0]}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-emerald" strokeWidth={3} />
                        {p.ctaBullets[1]}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={200} className="lg:col-span-6">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] ring-frame border border-border/40 bg-surface shadow-premium">
                  <img
                    src={p.heroImage}
                    alt={p.heroAlt}
                    width={2528}
                    height={1696}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Profils / use-cases */}
        <section className="py-20 lg:py-32 bg-surface cv-auto">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <p className="eyebrow mb-4">{p.profilesEyebrow}</p>
              <h2 className="font-display text-3xl lg:text-[2.75rem] text-balance max-w-2xl leading-tight">
                {p.profilesTitle}{" "}
                <span className="text-gradient-emerald">{p.profilesPivot}</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid sm:grid-cols-3 gap-6 lg:gap-8">
              {p.profiles.map((prof, i) => {
                const Icon = prof.icon;
                return (
                  <Reveal
                    key={prof.title}
                    delay={100 + i * 100}
                    className="relative rounded-3xl border border-border bg-background p-8 shadow-soft hover:shadow-premium hover:-translate-y-1 hover:border-emerald/30 transition-all duration-500 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald/10 text-emerald mb-6 border border-emerald/20 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-xl mb-3 leading-tight">{prof.title}</h3>
                      <p className="text-[14.5px] text-muted-foreground leading-relaxed">{prof.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ spécifique service — n'apparaît que si faqs fournies */}
        {p.faqs && p.faqs.length > 0 && (
          <section className="py-20 lg:py-32 relative border-t border-border/60">
            <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />
            <div className="mx-auto max-w-4xl px-5 lg:px-8 relative">
              <Reveal className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-emerald mb-6 shadow-soft">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Vos questions
                </div>
                <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-balance">
                  Tout ce qu'il faut savoir
                  <br />
                  <span className="text-gradient-emerald">avant de souscrire.</span>
                </h2>
              </Reveal>
              <Reveal>
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {p.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="rounded-2xl border border-border bg-surface/95 backdrop-blur shadow-soft hover:border-emerald/40 transition-colors duration-300 px-5 sm:px-6 data-[state=open]:border-emerald/40"
                    >
                      <AccordionTrigger className="font-display text-base sm:text-[17px] tracking-[-0.01em] py-5 text-left hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-[14.5px] text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </div>
          </section>
        )}

        {/* Réutilisation des blocs globaux */}
        <Trust />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
