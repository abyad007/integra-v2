import { createFileRoute } from "@tanstack/react-router";
import { Car, AlertTriangle, Shield, UserPlus } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-auto.webp";

export const Route = createFileRoute("/service/assurance-auto")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-auto",
      title: "Assurance Auto — Tous profils acceptés | Integra Assurance",
      description:
        "Jeunes conducteurs, malussés, résiliés... Nous trouvons l'assurance auto adaptée à votre profil au meilleur prix. Devis gratuit en 2 min.",
      name: "Assurance Auto",
      serviceType: "Vehicle insurance",
    }),
  component: AutoPage,
});

function AutoPage() {
  return (
    <ServicePage
      badgeIcon={Car}
      badgeLabel="Assurance Auto"
      title="L'assurance auto qui"
      titlePivot="ne vous juge pas."
      description="Quel que soit votre historique (résilié, malussé, jeune conducteur), notre réseau de plus de 40 partenaires nous permet de trouver une couverture juste et de vous délivrer une carte verte immédiatement."
      heroImage={heroImage}
      heroAlt="Berline executive — illustration 3D Integra Assurance Auto"
      ctaLabel="Obtenir mon tarif auto"
      defaultType="auto"
      ctaBullets={["Sans engagement", "Attestation provisoire en 1 h"]}
      profilesEyebrow="Notre spécialité"
      profilesTitle="Nous avons une solution pour"
      profilesPivot="chaque situation."
      profiles={[
        {
          icon: AlertTriangle,
          title: "Conducteurs résiliés",
          desc: "Pour non-paiement, sinistres ou alcoolémie. Nous avons des solutions dédiées pour vous remettre en route légalement, sans délai.",
        },
        {
          icon: Shield,
          title: "Malussés",
          desc: "Un malus élevé ne doit pas vous empêcher de rouler. Nous comparons les offres spécialisées pour faire baisser la facture.",
        },
        {
          icon: UserPlus,
          title: "Jeunes conducteurs",
          desc: "Assurez votre premier véhicule sans vous ruiner grâce à nos compagnies partenaires expertes en jeunes permis.",
        },
      ]}
    />
  );
}
