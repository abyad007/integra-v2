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
      faqs={[
        {
          q: "La RC Pro est-elle obligatoire pour mon activité ?",
          a: "Obligatoire pour les professions réglementées : médecins, avocats, experts-comptables, agents immobiliers, courtiers, architectes, métiers du bâtiment (décennale séparée), métiers de la sécurité. Fortement recommandée pour tous les autres : un litige client peut coûter plusieurs milliers d'euros que ta seule responsabilité civile vie privée ne couvrira pas.",
        },
        {
          q: "Je suis auto-entrepreneur — combien ça coûte ?",
          a: "Entrée de gamme : 150-300 €/an pour les consultants/freelances digitaux avec un CA < 50 k€. Plus cher pour les métiers à risque (artisans, conseil financier). Le tarif dépend du CA prévisionnel et du code NAF déclaré.",
        },
        {
          q: "Cyber-risques inclus ?",
          a: "Oui en option sur nos formules Premium. Couverture : ransomware, vol de données clients, attaque DDoS, frais de notification CNIL en cas de fuite RGPD. Pour les métiers qui traitent des données sensibles (santé, juridique, comptabilité), c'est devenu non-négociable.",
        },
        {
          q: "Une attestation pour un appel d'offres — sous combien de temps ?",
          a: "Immédiate dans 80 % des cas. Tu nous communiques les exigences précises de l'appel d'offres (montant garanti, étendue géographique, activités couvertes), on génère l'attestation conforme en quelques heures.",
        },
        {
          q: "Que se passe-t-il si je change d'activité en cours d'année ?",
          a: "Tu nous préviens, on adapte le contrat (avenant). Le tarif est recalculé au prorata des changements. Pas de résiliation à la clé : on garde la continuité de garantie pour éviter une carence.",
        },
      ]}
    />
  );
}
