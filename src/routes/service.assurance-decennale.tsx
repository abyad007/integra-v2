import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Hammer, Building, Plug } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-decennale.webp";

export const Route = createFileRoute("/service/assurance-decennale")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-decennale",
      title: "Garantie Décennale BTP — Artisans, micro-entrepreneurs | Integra",
      description:
        "Garantie décennale obligatoire pour tous les acteurs du bâtiment. Attestation sous 48 h, tarifs négociés, primo-accédants acceptés.",
      name: "Garantie Décennale",
      serviceType: "Construction insurance",
    }),
  component: DecennalePage,
});

function DecennalePage() {
  return (
    <ServicePage
      badgeIcon={HardHat}
      badgeLabel="Garantie Décennale BTP"
      title="Couverture chantier,"
      titlePivot="sérénité totale."
      description="Garantie décennale obligatoire pour artisans, micro-entrepreneurs et entreprises du bâtiment. Attestation sous 48 h, RC pro et dommages-ouvrage en option."
      heroImage={heroImage}
      heroAlt="Casque chantier et équerre — illustration 3D Integra Décennale"
      ctaLabel="Obtenir mon attestation"
      defaultType="pro"
      ctaBullets={["Attestation sous 48 h", "Primo-accédants acceptés"]}
      profilesEyebrow="Tous corps de métier"
      profilesTitle="Une décennale pour"
      profilesPivot="chaque artisan."
      profiles={[
        {
          icon: Hammer,
          title: "Gros œuvre & second œuvre",
          desc: "Maçons, charpentiers, couvreurs, plaquistes : couverture conforme à votre activité déclarée Kbis ou auto-entrepreneur.",
        },
        {
          icon: Building,
          title: "Multi-activités & rénovation",
          desc: "Plusieurs activités sur le même chantier ? Une seule décennale multi-corps de métier, plus économique qu'une par activité.",
        },
        {
          icon: Plug,
          title: "Électricité, plomberie, CVC",
          desc: "Tarifs avantageux pour les lots techniques. Garantie biennale + responsabilité civile professionnelle incluses.",
        },
      ]}
    />
  );
}
