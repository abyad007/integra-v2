import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Laptop, Store, Truck } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-pro.webp";

export const Route = createFileRoute("/service/assurance-pro")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-pro",
      title: "RC Pro & Multirisque Professionnelle | Integra Assurance",
      description:
        "Responsabilité civile professionnelle, multirisque local, protection cyber : couvrez vos responsabilités et vos chantiers. Devis gratuit en 2 min.",
      name: "Assurance Professionnelle",
      serviceType: "Professional liability insurance",
    }),
  component: ProPage,
});

function ProPage() {
  return (
    <ServicePage
      badgeIcon={Briefcase}
      badgeLabel="Assurance Pro & RC Pro"
      title="Votre activité couverte,"
      titlePivot="votre liberté préservée."
      description="Responsabilité civile professionnelle, multirisque local commercial, protection juridique, cyber-risques : nous bâtissons votre couverture pro à 360°, à un tarif négocié."
      heroImage={heroImage}
      heroAlt="Mallette et laptop — illustration 3D Integra Assurance Pro"
      ctaLabel="Obtenir mon devis pro"
      defaultType="pro"
      ctaBullets={["Attestation RC sous 24 h", "Adapté à votre code NAF"]}
      profilesEyebrow="Tous métiers"
      profilesTitle="Couverture sur mesure pour"
      profilesPivot="votre activité."
      profiles={[
        {
          icon: Laptop,
          title: "Freelances & consultants",
          desc: "Métiers du conseil, du numérique, de la formation : RC Pro couvrant les fautes professionnelles et préjudices immatériels.",
        },
        {
          icon: Store,
          title: "Commerçants & TPE",
          desc: "Multirisque local + RC exploitation + perte d'exploitation : protégez votre boutique, vos stocks et votre activité.",
        },
        {
          icon: Truck,
          title: "Artisans & libéraux",
          desc: "Couverture matériel, véhicule pro, marchandises transportées + RC professionnelle adaptée à votre métier.",
        },
      ]}
    />
  );
}
