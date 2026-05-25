import { MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Pourquoi passer par un courtier plutôt que de souscrire en direct ?",
    a: "Un courtier compare pour vous plus de 40 compagnies et négocie des conditions souvent inaccessibles en agence. Vous gagnez du temps, vous bénéficiez d'un conseil indépendant, et l'accompagnement est totalement gratuit — c'est l'assureur retenu qui nous rémunère.",
  },
  {
    q: "Quels profils acceptez-vous ?",
    a: "Tous : résiliés (non-paiement, sinistralité, fausse déclaration), malussés, jeunes conducteurs, professionnels du BTP, indépendants… Nous avons des partenaires spécialisés pour chaque situation, même les plus complexes.",
  },
  {
    q: "Combien de temps pour obtenir une attestation ?",
    a: "Le devis prend 2 minutes. Une attestation provisoire peut être éditée en moins d'une heure pour l'auto et la moto. L'attestation définitive vous est envoyée par email sous 24 h ouvrées.",
  },
  {
    q: "Est-ce vraiment gratuit et sans engagement ?",
    a: "Oui. Notre travail de comparaison, le devis et le conseil sont 100 % gratuits, sans engagement. Vous restez libre d'accepter ou non l'offre proposée — aucun frais caché ne s'ajoute au tarif de la compagnie.",
  },
  {
    q: "Comment êtes-vous rémunérés ?",
    a: "Par une commission versée par la compagnie d'assurance retenue. Cette commission est encadrée par la réglementation (DDA) et n'augmente jamais votre prime. Nous publions nos accords commerciaux sur simple demande, dans une logique de transparence totale.",
  },
  {
    q: "Que se passe-t-il en cas de sinistre ?",
    a: "Votre conseiller dédié reste votre interlocuteur unique. Nous vous accompagnons dans la déclaration, le suivi du dossier et la négociation avec la compagnie pour défendre vos intérêts jusqu'à l'indemnisation.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui. Nous sommes conformes au RGPD, vos données sont chiffrées en transit et au repos, hébergées en France. Aucune information n'est revendue à des tiers. Vous pouvez exercer vos droits (accès, rectification, suppression) à tout moment.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-24 lg:py-32 bg-surface/60 border-y border-border/60 cv-auto">
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-50" />
      <div className="mx-auto max-w-5xl px-5 lg:px-8 relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">07 — FAQ</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.04] text-balance tracking-[-0.03em]">
            Vos questions,
            <br />
            <span className="text-gradient-emerald">nos réponses claires.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Tout ce qu'il faut savoir avant de nous confier votre couverture. Pas de jargon,
            pas de petites lignes — uniquement de la clarté.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 lg:mt-16 rounded-3xl border border-border/70 bg-surface/95 backdrop-blur shadow-soft overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-border/60 last:border-0 px-6 sm:px-8 group/item"
                >
                  <AccordionTrigger
                    className="py-6 text-left font-display text-lg sm:text-xl tracking-[-0.01em] leading-snug hover:no-underline gap-6"
                  >
                    <span className="flex-1">{item.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-6 pr-10">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl border border-border/70 bg-background/90 backdrop-blur p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <div className="flex-1">
              <p className="font-display text-xl tracking-[-0.01em]">Une autre question ?</p>
              <p className="text-sm text-muted-foreground mt-1.5">
                Un conseiller vous répond du lundi au samedi, de 8h30 à 20h30.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+33187663942"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium shadow-soft hover:shadow-premium hover:-translate-y-0.5 transition-all"
              >
                <Phone className="h-4 w-4" />
                01 87 66 39 42
              </a>
              <a
                href="https://wa.me/33755533466"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium hover:bg-accent transition-all"
              >
                <MessageCircle className="h-4 w-4 text-emerald" />
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
