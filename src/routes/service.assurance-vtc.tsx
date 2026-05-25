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
    />
  );
}
