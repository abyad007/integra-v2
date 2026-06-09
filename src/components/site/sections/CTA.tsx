import { motion } from "framer-motion";
import { ArrowRight, Check, Lock, MessageCircle, Phone } from "lucide-react";
import { Magnetic } from "@/components/site/Magnetic";
import { Reveal } from "@/components/site/Reveal";
import { QuoteFunnel } from "@/components/site/QuoteFunnel";

export function CTA() {
  return (
    <section id="devis" className="py-16 sm:py-20 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/70 shadow-card bg-surface">
            <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-80" />

            <div className="relative grid lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-10 lg:p-14 relative">
                <Reveal>
                  <p className="eyebrow">Devis gratuit</p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="relative mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.06] text-balance tracking-[-0.025em] font-medium">
                    Garantissez votre sécurité.
                    <br />
                    <span className="text-gradient-emerald">Maîtrisez votre avenir.</span>
                  </h2>
                </Reveal>
                <Reveal delay={160}>
                  <p className="relative mt-6 text-muted-foreground text-base sm:text-lg max-w-lg leading-relaxed">
                    Souscription rapide, garanties solides, conseil humain. Recevez votre attestation sous 24 h.
                  </p>
                </Reveal>

                <Reveal delay={240}>
                  <div className="relative mt-8 flex flex-wrap gap-3">
                    <Magnetic strength={0.22}>
                      <QuoteFunnel>
                        <button
                          data-magnetic="true"
                          className="inline-flex items-center gap-2 rounded-full bg-emerald text-white px-6 py-3.5 text-sm font-semibold shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all"
                        >
                          Demander ma simulation
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </QuoteFunnel>
                    </Magnetic>
                    <a
                      href="tel:+33187663942"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-medium hover:bg-muted/60 transition-all"
                    >
                      <Phone className="h-4 w-4 text-emerald" />
                      01 87 66 39 42
                    </a>
                    <a
                      href="https://wa.me/33755533466"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-medium hover:bg-muted/60 transition-all"
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

              <div className="lg:col-span-5 relative border-t lg:border-t-0 lg:border-l border-border/60 bg-background/50 p-8 lg:p-10 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-emerald font-semibold">
                    Ce qui vous attend
                  </p>
                  <ul className="mt-6 space-y-5">
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
                        <span className="font-display text-2xl text-foreground tracking-[-0.02em] tabular-nums w-16">
                          {k}
                        </span>
                        <span className="text-sm text-muted-foreground">{v}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border/60 pt-5">
                  <Lock className="h-4 w-4 text-emerald" />
                  <span>Données chiffrées · RGPD · ORIAS 25 002 890</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
