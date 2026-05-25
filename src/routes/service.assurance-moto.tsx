import { createFileRoute } from "@tanstack/react-router";
import { Bike, GraduationCap, Zap, Wrench } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-moto.webp";

export const Route = createFileRoute("/service/assurance-moto")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-moto",
      title: "Assurance Moto — Scooter, 125, grosses cylindrées | Integra Assurance",
      description:
        "Du scooter urbain aux roadsters et grosses cylindrées : couverture sur mesure pour tous les permis et tous les profils. Devis gratuit en 2 min.",
      name: "Assurance Moto",
      serviceType: "Motorcycle insurance",
    }),
  component: MotoPage,
});

function MotoPage() {
  return (
    <ServicePage
      badgeIcon={Bike}
      badgeLabel="Assurance Moto"
      title="Roulez l'esprit libre,"
      titlePivot="couvert sur mesure."
      description="Scooter 50, 125, roadster, sportive ou trail : nous négocions avec les assureurs spécialisés deux-roues pour bâtir la garantie adaptée à votre machine et votre usage."
      heroImage={heroImage}
      heroAlt="Roadster sportif — illustration 3D Integra Assurance Moto"
      ctaLabel="Obtenir mon tarif moto"
      defaultType="moto"
      ctaBullets={["Tous permis acceptés", "Carte verte sous 24 h"]}
      profilesEyebrow="Tous deux-roues"
      profilesTitle="Une formule pour"
      profilesPivot="chaque type de pilote."
      profiles={[
        {
          icon: GraduationCap,
          title: "Permis A2 & jeunes pilotes",
          desc: "Nos partenaires acceptent les permis récents avec des tarifs progressifs. Bridé ou débridé, pas de mauvaise surprise.",
        },
        {
          icon: Zap,
          title: "Grosses cylindrées & sportives",
          desc: "Hypersport, naked premium, custom : couverture tous risques avec valeur à neuf et garantie équipement pilote.",
        },
        {
          icon: Wrench,
          title: "Scooter & usage quotidien",
          desc: "Trajets domicile-travail, livraisons, déplacements urbains : formules économiques avec assistance 0 km incluse.",
        },
      ]}
    />
  );
}
