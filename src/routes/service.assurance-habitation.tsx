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
    />
  );
}
