import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, User, Users, Briefcase } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-sante.webp";

export const Route = createFileRoute("/service/assurance-sante")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-sante",
      title: "Mutuelle Santé — Individuelle, famille, TNS | Integra Assurance",
      description:
        "Mutuelles complémentaires santé sans questionnaire médical. Optique, dentaire, hospitalisation : niveaux de garanties au choix, devis gratuit en 2 min.",
      name: "Mutuelle Santé",
      serviceType: "Health insurance",
    }),
  component: SantePage,
});

function SantePage() {
  return (
    <ServicePage
      badgeIcon={HeartPulse}
      badgeLabel="Mutuelle Santé"
      title="Soignez-vous mieux,"
      titlePivot="dépensez moins."
      description="Complémentaires santé sans questionnaire médical, sans délai de carence. Optique, dentaire, hospitalisation, médecines douces : choisissez votre niveau de remboursement."
      heroImage={heroImage}
      heroAlt="Stéthoscope et cœur — illustration 3D Integra Mutuelle Santé"
      ctaLabel="Comparer les mutuelles"
      defaultType="sante"
      ctaBullets={["Sans questionnaire", "Tiers payant chez 95 % des pros"]}
      profilesEyebrow="Toutes situations"
      profilesTitle="Une mutuelle adaptée à"
      profilesPivot="chaque foyer."
      profiles={[
        {
          icon: User,
          title: "Individuel",
          desc: "Salarié, retraité ou étudiant : couverture personnalisée à partir de 25 €/mois, sans avance de frais grâce au tiers payant.",
        },
        {
          icon: Users,
          title: "Famille",
          desc: "Conjoint et enfants couverts à un tarif dégressif. Orthodontie, lunettes, hospitalisation : tous les postes renforcés.",
        },
        {
          icon: Briefcase,
          title: "TNS & indépendants",
          desc: "Loi Madelin déductible du revenu imposable. Couverture étendue + indemnités journalières en option.",
        },
      ]}
    />
  );
}
