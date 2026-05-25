import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de Confidentialité | Integra CC" },
      { name: "description", content: "Politique de confidentialité et protection des données personnelles (RGPD) d'Integra CC." },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
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
              <Lock className="h-3.5 w-3.5" />
              Protection des données · RGPD
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-[-0.03em] leading-[1.05] mb-6 text-balance">
              Politique de <span className="text-gradient-emerald">Confidentialité.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
              La présente politique décrit la manière dont INTEGRA CC collecte, utilise et protège les données
              personnelles des utilisateurs du site www.integracc.fr.
            </p>
            <div className="divider-soft mb-10" />
          </Reveal>

          <div className="space-y-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <Reveal as="section" delay={120}>
              <h2 className="font-display text-2xl text-foreground mb-4">1. Identité du responsable de traitement</h2>
              <p>
                La société INTEGRA CC (Exploitée par Zerouali Itouhlaten Ilyass), Entreprise Individuelle sise au 60 Rue François 1er, 75008 Paris, immatriculée sous le SIREN 939 734 430 et à l'ORIAS sous le numéro 25002890, est le responsable de traitement des données collectées sur ce site.
              </p>
              <p className="mt-3">
                INTEGRA CC n'a pas désigné de Délégué à la Protection des Données (DPO) au sens de l'article 37 du RGPD. Pour toute question relative à vos données, vous pouvez écrire directement à <strong className="text-foreground">rgpd@integracc.fr</strong>.
              </p>
            </Reveal>

            <Reveal as="section" delay={160}>
              <h2 className="font-display text-2xl text-foreground mb-4">2. Données collectées et finalités</h2>
              <p>Nous collectons vos données personnelles (nom, prénom, e-mail, téléphone, situation d'assurance, etc.) principalement lors de la demande de devis en ligne ou lors de l'utilisation de nos formulaires de contact.</p>
              <ul className="mt-4 space-y-2 list-disc list-inside ml-4">
                <li><strong className="text-foreground">Pour la réalisation de devis :</strong> transmission sécurisée aux compagnies d'assurance partenaires pour obtenir le meilleur tarif.</li>
                <li><strong className="text-foreground">Pour la gestion de la relation client :</strong> suivi de votre dossier, relances, et accompagnement par un conseiller dédié.</li>
                <li><strong className="text-foreground">Pour l'exécution du contrat :</strong> émission des attestations provisoires et gestion de la souscription.</li>
              </ul>
            </Reveal>

            <Reveal as="section" delay={200}>
              <h2 className="font-display text-2xl text-foreground mb-4">3. Durée de conservation</h2>
              <p>
                Vos données sont conservées le temps nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées, dans le respect des délais légaux de prescription.
              </p>
              <ul className="mt-4 space-y-2 list-disc list-inside ml-4">
                <li>Données relatives aux devis non transformés en contrats : 3 ans à compter du dernier contact.</li>
                <li>Données relatives aux contrats d'assurance : pendant la durée du contrat et jusqu'à 5 ans après sa résiliation, ou selon les obligations de conservation de la compagnie d'assurance.</li>
              </ul>
            </Reveal>

            <Reveal as="section" delay={240}>
              <h2 className="font-display text-2xl text-foreground mb-4">4. Vos droits</h2>
              <p>
                Conformément à la réglementation applicable en matière de données à caractère personnel, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement et de portabilité de vos données.
              </p>
              <p className="mt-4">
                Pour exercer ces droits, vous pouvez nous adresser votre demande :
                <br />Par email : <a href="mailto:rgpd@integracc.fr" className="text-emerald hover:underline">rgpd@integracc.fr</a>
                <br />Par courrier : INTEGRA CC, 60 Rue François 1er, 75008 Paris.
              </p>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}