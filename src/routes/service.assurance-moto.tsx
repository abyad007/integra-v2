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
      faqs={[
        {
          q: "Permis A2 (bridé) accepté ? Avec une moto débridable ?",
          a: "Oui, nos partenaires acceptent les permis A2 dès le 1er jour. Pour une moto débridable (Yamaha MT-07, Honda CB650R…), tu déclares la version bridée au moment du contrat — quand tu passeras au permis A complet, on met à jour la déclaration en 1 clic.",
        },
        {
          q: "Mon équipement (casque, blouson, gants) est-il couvert en cas d'accident ?",
          a: "Oui via la garantie \"équipement du pilote\" : casque, blouson, pantalon, gants, bottes sont indemnisés jusqu'à 1 500-3 000 € selon la formule choisie. Option non-systématique chez les assureurs classiques, on l'inclut par défaut sur les formules Confort et Premium.",
        },
        {
          q: "Garantie vol — quelles conditions ?",
          a: "Vol couvert si stationnement avec antivol homologué SRA (\"U\" ou chaîne) — obligatoire dès qu'on assure tous risques. Vol au domicile : couvert sans condition d'antivol dans la majorité des contrats. Garage privé fermé = franchise réduite.",
        },
        {
          q: "Je conduis ma moto seulement 6 mois par an, je peux suspendre l'assurance ?",
          a: "Oui via une formule \"hivernage\" : tu paies une cotisation réduite pendant la période d'arrêt (la RC obligatoire reste active car la moto reste un véhicule terrestre à moteur). Économies de 30-50 % sur la prime annuelle.",
        },
        {
          q: "Grosse cylindrée (>600cc) ou sportive — surprime ?",
          a: "Pas systématiquement. Le tarif dépend de la puissance fiscale et de la valeur, pas uniquement de la cylindrée. Un roadster naked premium est souvent moins cher à assurer qu'une hypersport. On compare et on te trouve le meilleur compromis.",
        },
      ]}
    />
  );
}
