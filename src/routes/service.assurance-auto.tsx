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
      faqs={[
        {
          q: "Je viens d'être résilié pour non-paiement ou sinistralité — vous pouvez m'assurer ?",
          a: "Oui. C'est notre spécialité. Nous avons plusieurs partenaires (Netvox, AMI3F, courtiers grossistes) qui acceptent les profils résiliés sous 48 h, parfois sous 24 h selon votre dossier. Le tarif est plus élevé qu'une compagnie classique pendant 2-3 ans, puis revient progressivement à la normale.",
        },
        {
          q: "Quel est le délai pour recevoir ma carte verte ?",
          a: "Immédiat dans 90 % des cas. Dès la souscription en ligne, vous recevez votre attestation provisoire d'assurance par email en moins d'une heure (jours ouvrés 8h30-20h30). La carte verte officielle vous est envoyée par courrier sous 5-10 jours.",
        },
        {
          q: "Mon malus est élevé (1.50, 2.00…) — combien de temps avant qu'il disparaisse ?",
          a: "Le CRM diminue de 5 % par année sans sinistre responsable (multiplication par 0.95). Avec un CRM de 1.50, il faut environ 8 ans pour revenir à 1.00 (ou 2 ans consécutifs sans accident pour un \"reset\" légal). Notre simulateur bonus-malus vous permet de projeter ça en quelques clics.",
        },
        {
          q: "Jeune conducteur avec permis B fraîchement obtenu — combien ça coûte ?",
          a: "En moyenne 2,5× plus cher qu'un conducteur expérimenté, mais avec de gros écarts selon le véhicule, la zone géographique et le profil. Pour une citadine essence 5-6 CV en région, comptez 700-1 100 €/an au tiers. Conduite accompagnée et stage de sensibilisation réduisent le tarif de 15 à 25 %.",
        },
        {
          q: "Puis-je résilier mon assurance auto actuelle pour venir chez vous ?",
          a: "Oui, via la loi Hamon (après 1 an de contrat) ou la loi Chatel (à l'échéance annuelle). Nous nous chargeons des démarches : vous nous donnez votre n° de contrat actuel et nous envoyons la résiliation à votre place. Aucun frais.",
        },
        {
          q: "Que se passe-t-il en cas de sinistre une fois assuré chez vous ?",
          a: "Vous nous appelez au 01 87 66 39 42 — un conseiller dédié prend votre dossier en main et déclare le sinistre à votre assureur partenaire. Nous suivons l'indemnisation, négocions les éventuels désaccords, et vous accompagnons jusqu'au règlement final. Service inclus, pas de frais supplémentaires.",
        },
      ]}
    />
  );
}
