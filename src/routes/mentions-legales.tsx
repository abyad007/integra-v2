import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions Légales & Conformité | Integra CC" },
      { name: "description", content: "Informations légales, réglementation ORIAS, ACPR et politique de protection des données (RGPD) d'Integra CC." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
      <ScrollProgress />
      <Header />
      <main className="flex-1 py-20 lg:py-32 relative">
        {/* Background gradient */}
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
              <ShieldCheck className="h-3.5 w-3.5" />
              Conformité & Transparence
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.03em] leading-[1.05] mb-6 text-balance">
              Mentions <span className="text-gradient-emerald">Légales.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
              Informations sur l'éditeur du site, l'activité réglementée, l'hébergement et le traitement des données.
            </p>
            <div className="divider-soft mb-10" />
          </Reveal>

          <div className="space-y-12 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <Reveal as="section" delay={160}>
              <h2 className="font-display text-2xl text-foreground mb-4">1. Éditeur du site</h2>
              <p>
                Le présent site, accessible à l'URL <strong className="text-foreground">www.integracc.fr</strong>, est édité par :
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside ml-4">
                <li><strong className="text-foreground">Dénomination :</strong> INTEGRA CC</li>
                <li><strong className="text-foreground">Forme juridique :</strong> Entreprise Individuelle (EI) – Exploitant : Zerouali Itouhlaten Ilyass</li>
                <li><strong className="text-foreground">Siège social :</strong> 60 Rue François 1er, 75008 Paris</li>
                <li><strong className="text-foreground">SIREN :</strong> 939 734 430</li>
                <li><strong className="text-foreground">Directeur de la publication :</strong> Zerouali Itouhlaten Ilyass</li>
                <li><strong className="text-foreground">Contact :</strong> contact@integracc.fr | 01 87 66 39 42</li>
              </ul>
            </Reveal>

            <Reveal as="section" delay={200}>
              <h2 className="font-display text-2xl text-foreground mb-4">2. Activité réglementée (Courtage en assurance)</h2>
              <p>
                INTEGRA CC exerce en tant que courtier en assurances (catégorie b de l'article L.520-1 II 1° du Code des assurances).
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside ml-4">
                <li><strong className="text-foreground">Immatriculation ORIAS :</strong> n° 25 002 890 (vérifiable sur <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">www.orias.fr</a>)</li>
                <li><strong className="text-foreground">Garantie Financière et Responsabilité Civile Professionnelle :</strong> Conformes aux articles L.512-6 et L.512-7 du Code des assurances.</li>
                <li><strong className="text-foreground">Autorité de contrôle :</strong> INTEGRA CC est soumise au contrôle de l'ACPR (Autorité de Contrôle Prudentiel et de Résolution) - 4 Place de Budapest CS 92459, 75436 Paris Cedex 09.</li>
              </ul>
            </Reveal>

            <Reveal as="section" delay={240}>
              <h2 className="font-display text-2xl text-foreground mb-4">3. Hébergement</h2>
              <p>
                Le site est hébergé par :<br />
                <strong className="text-foreground">Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>
            </Reveal>

            <Reveal as="section" delay={280}>
              <h2 className="font-display text-2xl text-foreground mb-4">4. Informatique et Libertés (RGPD)</h2>
              <p>
                Conformément au Règlement (UE) 2016/679 (Règlement Général sur la Protection des Données - RGPD) et à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification, de portabilité, d'effacement de vos données ou d'une limitation du traitement.
              </p>
              <p className="mt-4">
                Les informations recueillies via nos formulaires (devis, contact) sont enregistrées dans un fichier informatisé par INTEGRA CC pour la gestion de la relation client, la réalisation de devis et l'exécution des contrats d'assurance.
              </p>
              <p className="mt-4">
                Pour exercer vos droits, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:rgpd@integracc.fr" className="text-emerald hover:underline">rgpd@integracc.fr</a>. [1]
                Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.
              </p>
            </Reveal>

            <Reveal as="section" delay={320}>
              <h2 className="font-display text-2xl text-foreground mb-4">5. Traitement des réclamations</h2>
              <p>
                En cas de mécontentement, vous pouvez adresser votre réclamation au service dédié : <strong className="text-foreground">contact@integracc.fr</strong>. Nous nous engageons à en accuser réception sous 10 jours et à y répondre sous 2 mois maximum. En cas de désaccord persistant, vous pourrez saisir le Médiateur de l'Assurance (La Médiation de l'Assurance - TSA 50110 - 75441 Paris Cedex 09).
              </p>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}