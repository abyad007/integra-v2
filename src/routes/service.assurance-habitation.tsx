import { createFileRoute } from "@tanstack/react-router";
import { Home, Key, Building2, Trees } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-habitation.webp";

export const Route = createFileRoute("/service/assurance-habitation")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-habitation",
      title: "Assurance Habitation — Locataire, propriétaire, résidence secondaire | Integra",
      description:
        "Multi-risques habitation pour locataires, propriétaires occupants ou bailleurs. Couverture étendue, indemnisation à neuf, devis en 2 min.",
      name: "Assurance Habitation",
      serviceType: "Home insurance",
    }),
  component: HabitationPage,
});

function HabitationPage() {
  return (
    <ServicePage
      badgeIcon={Home}
      badgeLabel="Assurance Habitation"
      title="Votre foyer protégé,"
      titlePivot="sans paperasse."
      description="Multi-risques habitation complète : incendie, dégât des eaux, vol, bris, RC vie privée, valeur à neuf. Souscription 100 % en ligne, attestation immédiate."
      heroImage={heroImage}
      heroAlt="Maison architecte — illustration 3D Integra Assurance Habitation"
      ctaLabel="Obtenir mon tarif habitation"
      defaultType="habitation"
      ctaBullets={["Attestation immédiate", "Indemnisation à neuf 5 ans"]}
      profilesEyebrow="Tous logements"
      profilesTitle="Une couverture adaptée à"
      profilesPivot="votre situation."
      profiles={[
        {
          icon: Key,
          title: "Locataires",
          desc: "Attestation exigée par votre bailleur en 5 minutes. Garantie risques locatifs + recours des voisins inclus.",
        },
        {
          icon: Building2,
          title: "Propriétaires occupants",
          desc: "Couverture étendue du bâti et du mobilier, garantie reconstruction à neuf, équipements high-tech protégés.",
        },
        {
          icon: Trees,
          title: "Résidence secondaire & bailleur",
          desc: "Formules PNO (propriétaire non occupant) et résidences secondaires : protection toute l'année, même inoccupée.",
        },
      ]}
      faqs={[
        {
          q: "Mon bailleur me demande une attestation d'assurance pour signer le bail — sous combien de temps ?",
          a: "Immédiatement. Tu fais la souscription en ligne en 5 min, l'attestation est dans ta boîte mail sous 1 h (jours ouvrés). Tu la transmets à ton bailleur pour signer ton bail sans attendre.",
        },
        {
          q: "Locataire : je dois assurer quoi exactement, et quel niveau minimum ?",
          a: "Légalement, juste les \"risques locatifs\" (incendie, dégât des eaux, explosion qui pourraient endommager le bâtiment). Mais on recommande systématiquement la \"multirisque habitation\" qui couvre AUSSI tes biens (mobilier, électronique) et ta responsabilité civile vie privée. Surcoût marginal (~5 €/mois) pour une protection 10× plus large.",
        },
        {
          q: "Indemnisation à neuf — pendant combien de temps mes meubles sont-ils valorisés au prix d'achat ?",
          a: "Standard : 2 ans pour le matériel high-tech (TV, ordinateurs), 5 ans pour le mobilier classique. Au-delà, application d'un coefficient de vétusté de 10-15 % par an. Nos formules Premium étendent ces durées à 5 et 10 ans respectivement.",
        },
        {
          q: "Dégât des eaux chez moi cause un dégât chez le voisin — qu'est-ce qui se passe ?",
          a: "Tu déclares le sinistre à ton assureur (le nôtre si tu es client) sous 5 jours ouvrés via constat amiable. La garantie \"recours des voisins\" couvre les dommages causés aux tiers — ils sont indemnisés directement par ton assureur, sans que tu aies à avancer quoi que ce soit.",
        },
        {
          q: "Propriétaire non occupant (PNO) — pourquoi c'est obligatoire si j'ai déjà une RC ?",
          a: "Légalement, le syndic peut exiger une PNO pour les copropriétés. Surtout, en cas de dégât chez ton locataire causé par les parties privatives (canalisation, électricité), c'est TA responsabilité, pas la sienne. Sans PNO, tu paies de ta poche.",
        },
      ]}
    />
  );
}
