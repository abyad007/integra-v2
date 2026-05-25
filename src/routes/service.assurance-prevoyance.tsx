import { createFileRoute } from "@tanstack/react-router";
import { Shield, Activity, Heart, Wallet } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-prevoyance.webp";

export const Route = createFileRoute("/service/assurance-prevoyance")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-prevoyance",
      title: "Assurance Prévoyance — Invalidité, incapacité, décès | Integra",
      description:
        "Protégez vos revenus et votre famille en cas d'arrêt de travail, invalidité ou décès. Solutions sur mesure pour salariés, TNS et indépendants.",
      name: "Assurance Prévoyance",
      serviceType: "Life insurance",
    }),
  component: PrevoyancePage,
});

function PrevoyancePage() {
  return (
    <ServicePage
      badgeIcon={Shield}
      badgeLabel="Assurance Prévoyance"
      title="Protégez vos revenus,"
      titlePivot="protégez les vôtres."
      description="Maintien de salaire, rente invalidité, capital décès : construisez un filet de sécurité solide pour vous et vos proches en cas de coup dur, sans questionnaire intrusif."
      heroImage={heroImage}
      heroAlt="Bouclier et parapluie — illustration 3D Integra Prévoyance"
      ctaLabel="Obtenir mon devis prévoyance"
      defaultType="pro"
      ctaBullets={["Loi Madelin déductible", "Garanties immédiates"]}
      profilesEyebrow="Chaque protection"
      profilesTitle="Une garantie pour"
      profilesPivot="chaque risque."
      profiles={[
        {
          icon: Activity,
          title: "Incapacité de travail",
          desc: "Indemnités journalières dès le 4ᵉ jour d'arrêt, complétant la Sécurité sociale ou votre prévoyance entreprise.",
        },
        {
          icon: Heart,
          title: "Invalidité permanente",
          desc: "Rente mensuelle versée à vie en cas d'invalidité partielle ou totale, calibrée sur votre niveau de revenu.",
        },
        {
          icon: Wallet,
          title: "Capital & rente décès",
          desc: "Capital versé à vos bénéficiaires + rente éducation pour les enfants. Garantie obsèques en option.",
        },
      ]}
    />
  );
}
