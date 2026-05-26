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
      faqs={[
        {
          q: "Sous combien de temps j'ai mon attestation décennale ?",
          a: "48 h pour les profils standards (auto-entrepreneur ou société, sans antécédents, activité claire). 5 à 10 jours ouvrés pour les profils complexes (multi-activités, antécédents de sinistres, repreneur). Document signé électroniquement et envoyé par email.",
        },
        {
          q: "Je démarre en auto-entrepreneur — la décennale est obligatoire dès le 1er chantier ?",
          a: "Oui, dès le 1er chantier facturé sur des travaux soumis à garantie décennale (article L241-1 du Code des assurances). Sans elle : 75 000 € d'amende max + 6 mois de prison + responsabilité personnelle illimitée sur 10 ans en cas de sinistre. Pas négociable.",
        },
        {
          q: "Multi-corps de métier — je prends une décennale par activité ?",
          a: "Non, c'est moins économique. Nos partenaires proposent des décennales \"multi-corps\" qui couvrent jusqu'à 5-6 activités dans un seul contrat. Tarif : ~1,5× le prix d'une mono-activité, mais simplicité administrative + meilleure couverture des chantiers où tu fais plusieurs lots.",
        },
        {
          q: "Combien ça coûte pour un artisan auto-entrepreneur ?",
          a: "Indicatif : 1 200 € à 2 500 €/an HT pour une activité unique (peinture, carrelage, menuiserie) avec un CA prévisionnel < 50 k€. Plus cher pour les activités à risque (couverture, charpente, gros œuvre) : 2 500 à 4 500 €/an. Les tarifs ont augmenté de 15-20 % depuis 2024 sur le marché.",
        },
        {
          q: "Je peux changer d'assureur en cours d'année ?",
          a: "Oui, à l'échéance annuelle (loi Chatel) ou après 1 an de contrat (loi Hamon). Attention : la décennale couvre les chantiers QUI ONT DÉBUTÉ pendant la période d'assurance, pendant 10 ans après leur réception. Donc tu dois pouvoir prouver une continuité de garantie pour tous tes chantiers en cours.",
        },
      ]}
    />
  );
}
