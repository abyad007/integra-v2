import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, User, Users, Briefcase } from "lucide-react";
import { ServicePage } from "@/components/site/ServicePage";
import { buildServiceHead } from "@/lib/service-meta";
import heroImage from "@/assets/service-sante.webp";

export const Route = createFileRoute("/service/assurance-sante")({
  head: () =>
    buildServiceHead({
      slug: "/service/assurance-sante",
      title: "Mutuelle Santé — Individuelle, famille, TNS | Integra Assurance",
      description:
        "Mutuelles complémentaires santé sans questionnaire médical. Optique, dentaire, hospitalisation : niveaux de garanties au choix, devis gratuit en 2 min.",
      name: "Mutuelle Santé",
      serviceType: "Health insurance",
    }),
  component: SantePage,
});

function SantePage() {
  return (
    <ServicePage
      badgeIcon={HeartPulse}
      badgeLabel="Mutuelle Santé"
      title="Soignez-vous mieux,"
      titlePivot="dépensez moins."
      description="Complémentaires santé sans questionnaire médical, sans délai de carence. Optique, dentaire, hospitalisation, médecines douces : choisissez votre niveau de remboursement."
      heroImage={heroImage}
      heroAlt="Stéthoscope et cœur — illustration 3D Integra Mutuelle Santé"
      ctaLabel="Comparer les mutuelles"
      defaultType="sante"
      ctaBullets={["Sans questionnaire", "Tiers payant chez 95 % des pros"]}
      profilesEyebrow="Toutes situations"
      profilesTitle="Une mutuelle adaptée à"
      profilesPivot="chaque foyer."
      profiles={[
        {
          icon: User,
          title: "Individuel",
          desc: "Salarié, retraité ou étudiant : couverture personnalisée à partir de 25 €/mois, sans avance de frais grâce au tiers payant.",
        },
        {
          icon: Users,
          title: "Famille",
          desc: "Conjoint et enfants couverts à un tarif dégressif. Orthodontie, lunettes, hospitalisation : tous les postes renforcés.",
        },
        {
          icon: Briefcase,
          title: "TNS & indépendants",
          desc: "Loi Madelin déductible du revenu imposable. Couverture étendue + indemnités journalières en option.",
        },
      ]}
      faqs={[
        {
          q: "Il y a un délai de carence avant que je sois couvert ?",
          a: "Sur nos contrats : aucun délai pour les soins courants (médecin, pharmacie, optique). 3 mois pour le dentaire et l'hospitalisation programmée. 9 mois pour la maternité. Hospitalisation d'urgence : couverte dès le 1er jour.",
        },
        {
          q: "Je suis TNS — est-ce que la mutuelle Madelin réduit vraiment mes impôts ?",
          a: "Oui. Tes cotisations santé Madelin sont déductibles de ton revenu imposable, dans la limite de ~11 100 €/an (3 % de 8 PASS). Au TMI 30 %, une mutuelle à 1 800 €/an te coûte réellement 1 260 €. Économie de 540 €/an. Plus le TMI est haut, plus tu gagnes.",
        },
        {
          q: "Optique : je peux choisir mes lunettes hors panier 100 % santé ?",
          a: "Oui. Le panier 100 % santé est obligatoire mais limité à des montures basiques (~30 €). Pour tes vraies lunettes, le remboursement dépend du niveau (Premium = jusqu'à 400 €/équipement tous les 2 ans). On t'explique le détail avant souscription.",
        },
        {
          q: "Hospitalisation — chambre individuelle remboursée ?",
          a: "Oui sur toutes nos formules à partir du niveau Confort. Forfait journalier hospitalier (20 €/jour) remboursé à 100 % par toutes les complémentaires (obligation légale). La chambre individuelle (60-90 €/jour selon clinique) est l'option qui varie le plus entre formules.",
        },
        {
          q: "Je voyage à l'étranger — couvert ?",
          a: "Soins urgents à l'étranger : oui, remboursés au tarif sécurité sociale française (souvent ridicule hors UE). Pour les vrais voyages, on recommande d'ajouter une assurance voyage temporaire (Mondial Assistance, ACS) qui couvre les frais réels jusqu'à 200 000 €. Tarif : 1-2 €/jour.",
        },
      ]}
    />
  );
}
