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
      faqs={[
        {
          q: "Quelle est la différence entre prévoyance et mutuelle santé ?",
          a: "La mutuelle rembourse tes soins (consultations, lunettes, hospi). La prévoyance maintient ton REVENU si tu es en arrêt de travail, invalide ou décédé. Les 2 sont complémentaires et indépendantes — l'une ne remplace pas l'autre.",
        },
        {
          q: "Délai de franchise — au bout de combien de jours d'arrêt je suis indemnisé ?",
          a: "Standard : 3 à 30 jours selon le niveau de garanties choisi. Plus la franchise est courte, plus la cotisation est élevée. Pour un salarié, 7 jours est un bon équilibre (la sécu prend le relais du jour 4). Pour un TNS, 3 jours est conseillé.",
        },
        {
          q: "Si je décède, mes proches reçoivent combien et sous quel délai ?",
          a: "Le capital est défini à la souscription (souvent 1× à 3× ton salaire annuel). Versement aux bénéficiaires sous 30 jours après réception du certificat de décès. Pas de droits de succession dans la limite des plafonds légaux.",
        },
        {
          q: "Loi Madelin pour TNS : la prévoyance est aussi déductible ?",
          a: "Oui, dans une enveloppe spécifique : 1,75 % du PASS + 3,75 % du revenu professionnel, plafonné à 3 % de 8 PASS (~3 480 €/an déductibles en 2026). Au TMI 41 %, une cotisation prévoyance de 1 500 €/an te fait économiser 615 € d'impôts.",
        },
        {
          q: "Je suis en bonne santé — j'ai besoin d'un examen médical pour souscrire ?",
          a: "Pour les capitaux inférieurs à 200 000 € et l'IJ standard, un simple questionnaire de santé suffit (10 min, en ligne). Au-delà, examen médical avec analyses sanguines + ECG. Nos partenaires acceptent les profils avec antécédents (ALD, surpoids) — on étudie au cas par cas.",
        },
      ]}
    />
  );
}
