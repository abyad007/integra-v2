import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Car, Users, Star } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-vtc.webp";

export const Route = createFileRoute("/service/assurance-vtc")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-vtc",
      title: "Assurance VTC & Taxi — Carte pro acceptée | Integra Assurance",
      description:
        "Assurance professionnelle VTC, taxi et transport de personnes. Carte pro acceptée, attestation immédiate, tous profils chauffeurs.",
      name: "Assurance VTC & Taxi",
      serviceType: "Commercial vehicle insurance",
    }),
  component: VtcPage,
});

function VtcPage() {
  return (
    <ServicePage
      badgeIcon={BadgeCheck}
      badgeLabel="Assurance VTC & Taxi"
      title="Au volant chaque jour,"
      titlePivot="couvert chaque instant."
      description="Assurance professionnelle dédiée aux chauffeurs VTC, taxis et transport de personnes. Carte pro acceptée, garanties renforcées passagers et perte d'exploitation incluse."
      heroImage={heroImage}
      heroAlt="Berline executive et casquette chauffeur — illustration 3D Integra Assurance VTC"
      ctaLabel="Obtenir mon tarif VTC"
      defaultType="auto"
      ctaBullets={["Carte pro acceptée", "Attestation immédiate"]}
      profilesEyebrow="Tous chauffeurs"
      profilesTitle="Une couverture adaptée à"
      profilesPivot="votre activité."
      profiles={[
        {
          icon: Car,
          title: "VTC plateforme",
          desc: "Uber, Bolt, Heetch, Marcel : assurance compatible toutes plateformes, avec garantie panne mécanique et perte d'exploitation.",
        },
        {
          icon: Users,
          title: "Taxi & transport collectif",
          desc: "Licence de taxi, transport scolaire, navettes : couverture passagers étendue + RC professionnelle exploitation.",
        },
        {
          icon: Star,
          title: "Chauffeur privé & grande remise",
          desc: "Berlines premium, vans VIP : garanties haut de gamme avec valeur à neuf 36 mois et véhicule de remplacement.",
        },
      ]}
      faqs={[
        {
          q: "Toutes les plateformes (Uber, Bolt, Heetch, Marcel) sont-elles couvertes ?",
          a: "Oui sur nos contrats. La condition : tu déclares dès la souscription les plateformes sur lesquelles tu travailles. Si tu en ajoutes une nouvelle plus tard, simple avenant en 24 h. Refus = ces plateformes ont des historiques de sinistres trop élevés pour l'assureur (rare).",
        },
        {
          q: "Perte d'exploitation — c'est combien d'indemnité par jour ?",
          a: "50 à 150 €/jour selon la formule, pendant la durée d'immobilisation (max 60 jours en standard, 120 jours en Premium). Vital si tu travailles à temps plein : un sinistre de 3 semaines = 3 000 €/4 500 € de revenu protégé.",
        },
        {
          q: "Mon véhicule a moins de 3 ans — valeur à neuf en cas de vol/destruction ?",
          a: "Oui, garantie \"valeur à neuf 36 mois\" sur nos formules Confort et Premium. En cas de destruction totale ou vol non-retrouvé, on te rembourse le prix d'achat initial (pas la cote Argus). Écart possible : plusieurs milliers d'euros sur une berline récente.",
        },
        {
          q: "Mon équipement (GPS pro, tablette, sièges enfants) est couvert ?",
          a: "Oui via la garantie \"équipement professionnel\", incluse en Premium ou en option (~50 €/an). Plafond standard : 2 000 €. Pour les chauffeurs VTC haut de gamme avec équipement étendu (chargeurs Apple/Android, rafraîchissements, accessoires), on monte jusqu'à 5 000 €.",
        },
        {
          q: "Véhicule de remplacement — combien de jours, et même catégorie ?",
          a: "7 à 30 jours selon la formule. La catégorie dépend du contrat : standard = compacte/citadine, Premium = catégorie identique (donc berline si tu as une berline). Pour un chauffeur VTC premium, la catégorie identique est non-négociable, sinon tu perds tes clients haut de gamme pendant l'immobilisation.",
        },
      ]}
    />
  );
}
