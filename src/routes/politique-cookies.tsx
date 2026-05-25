import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Cookie } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const Route = createFileRoute("/politique-cookies")({
  head: () => ({
    meta: [
      { title: "Politique des Cookies | Integra CC" },
      { name: "description", content: "Politique d'utilisation des cookies et traceurs sur le site Integra CC." },
    ],
  }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1 py-20 lg:py-32 relative">
        <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-surface to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-[0.15] pointer-events-none [mask-image:radial-gradient(ellipse_50%_40%_at_50%_10%,black,transparent)]" />

        <div className="mx-auto max-w-3xl px-5 lg:px-8 relative z-10">
          <Reveal>
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour à l'accueil
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] uppercase tracking-wider font-medium text-emerald mb-6 shadow-soft">
              <Cookie className="h-3.5 w-3.5" />
              Transparence · CNIL
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.03em] leading-[1.05] mb-6 text-balance">
              Politique des <span className="text-gradient-emerald">Cookies.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
              Lors de votre visite sur www.integracc.fr, des cookies et traceurs peuvent être déposés sur votre
              navigateur. Cette page vous explique précisément lesquels, pourquoi, et comment les gérer.
            </p>
            <div className="divider-soft mb-10" />
          </Reveal>

          <div className="space-y-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <Reveal as="section" delay={120}>
              <h2 className="font-display text-2xl text-foreground mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre navigateur lorsque vous visitez un site web. Il permet de mémoriser certaines informations (préférences, session, comportement de navigation) lors de votre visite ou lors de visites ultérieures. Les cookies ne contiennent pas de virus et ne peuvent pas accéder à d'autres informations stockées sur votre appareil.
              </p>
            </Reveal>

            <Reveal as="section" delay={160}>
              <h2 className="font-display text-2xl text-foreground mb-4">2. Les 3 catégories de cookies utilisés</h2>
              <div className="space-y-4">
                <article className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <strong className="text-foreground">Cookies strictement nécessaires</strong>
                    <span className="inline-flex items-center rounded-full bg-emerald/10 text-emerald px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider border border-emerald/15 shrink-0">
                      Toujours actifs
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed mb-3">
                    Indispensables au fonctionnement du site. Sans eux, vous ne pourriez pas naviguer ou utiliser les fonctionnalités essentielles (formulaire de devis, sécurité de la connexion, préférences d'affichage).
                  </p>
                  <p className="text-[12.5px] text-muted-foreground">
                    <strong className="text-foreground">Base légale :</strong> intérêt légitime (RGPD Art. 6.1.f).{" "}
                    <strong className="text-foreground">Durée :</strong> session ou jusqu'à 13 mois.{" "}
                    <strong className="text-foreground">Consentement :</strong> non requis.
                  </p>
                </article>

                <article className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <strong className="text-foreground">Mesure d'audience (Analytique)</strong>
                    <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider border border-border shrink-0">
                      Opt-in
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed mb-3">
                    Cookies anonymisés pour comprendre comment les visiteurs naviguent (pages vues, parcours, taux de conversion). Nous utilisons des outils respectueux de la vie privée (Plausible, Matomo en mode anonymisé), sans collecte de données personnelles ni cross-site tracking.
                  </p>
                  <p className="text-[12.5px] text-muted-foreground">
                    <strong className="text-foreground">Base légale :</strong> consentement (RGPD Art. 6.1.a).{" "}
                    <strong className="text-foreground">Durée :</strong> 13 mois maximum.{" "}
                    <strong className="text-foreground">Consentement :</strong> requis et révocable.
                  </p>
                </article>

                <article className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <strong className="text-foreground">Personnalisation & retargeting</strong>
                    <span className="inline-flex items-center rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider border border-border shrink-0">
                      Opt-in
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed mb-3">
                    Cookies tiers (Meta Pixel, Google Ads, LinkedIn Insight Tag) pour vous proposer des offres adaptées sur d'autres sites après votre visite. Optionnel et désactivable à tout moment.
                  </p>
                  <p className="text-[12.5px] text-muted-foreground">
                    <strong className="text-foreground">Base légale :</strong> consentement (RGPD Art. 6.1.a).{" "}
                    <strong className="text-foreground">Durée :</strong> 13 mois maximum.{" "}
                    <strong className="text-foreground">Consentement :</strong> requis et révocable.
                  </p>
                </article>
              </div>
            </Reveal>

            <Reveal as="section" delay={200}>
              <h2 className="font-display text-2xl text-foreground mb-4">3. Gérer vos préférences à tout moment</h2>
              <p className="mb-4">
                Conformément à la réglementation CNIL (délibération n°2020-091), retirer son consentement doit être aussi simple que le donner. Vous pouvez modifier vos choix à tout moment :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Via le lien <strong className="text-foreground">« Gérer mes cookies »</strong> en bas de chaque page (dans le pied de page)</li>
                <li>En configurant les paramètres de votre navigateur web (Chrome, Firefox, Safari, Edge)</li>
                <li>Via les outils de gestion centralisée (Your Online Choices, Network Advertising Initiative)</li>
              </ul>
              <p className="mt-4">
                Le retrait de votre consentement n'affecte pas la légalité du traitement effectué jusque-là.
              </p>
            </Reveal>

            <Reveal as="section" delay={240}>
              <h2 className="font-display text-2xl text-foreground mb-4">4. Durée de validité du consentement</h2>
              <p>
                Votre choix est conservé pendant <strong className="text-foreground">6 mois maximum</strong>, conformément aux recommandations de la CNIL. Au terme de cette période, le bandeau réapparaîtra automatiquement et vous serez invité à confirmer vos préférences.
              </p>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}