/**
 * Mock WordPress posts — used during dev/staging before the live WP API is wired.
 * Mirrors the shape produced by /wp-json/wp/v2/posts?_embed (post-normalisation).
 *
 * To switch to live data: set VITE_WP_API_URL=https://integracc.fr in .env.local.
 */

import type { WpCategory, WpPost } from "./wp-api";
import autoImg from "@/assets/service-auto.webp";
import motoImg from "@/assets/service-moto.webp";
import santeImg from "@/assets/service-sante.webp";
import decennaleImg from "@/assets/service-decennale.webp";
import vtcImg from "@/assets/service-vtc.webp";

export const MOCK_CATEGORIES: WpCategory[] = [
  { id: 1, name: "Auto", slug: "auto", description: "Tout sur l'assurance auto", count: 2 },
  { id: 2, name: "Réglementation", slug: "reglementation", description: "Lois & cadre légal", count: 2 },
  { id: 3, name: "Santé", slug: "sante", description: "Mutuelles & prévoyance", count: 1 },
  { id: 4, name: "BTP", slug: "btp", description: "Décennale & artisans", count: 1 },
  { id: 5, name: "Pro", slug: "pro", description: "RC Pro & indépendants", count: 1 },
];

const AUTHOR_ILYASS = {
  id: 1,
  name: "Ilyass Zerouali",
  slug: "ilyass-zerouali",
  avatar: "https://www.gravatar.com/avatar/0?d=mp&s=96",
};

const AUTHOR_INTEGRA = {
  id: 2,
  name: "Équipe Integra",
  slug: "equipe-integra",
  avatar: "https://www.gravatar.com/avatar/0?d=mp&s=96",
};

export const MOCK_POSTS: WpPost[] = [
  {
    id: 101,
    slug: "comment-resilier-assurance-auto-loi-hamon",
    date: "2026-05-20T10:00:00",
    modified: "2026-05-20T10:00:00",
    title: "Comment résilier son assurance auto avec la loi Hamon (guide 2026)",
    excerpt:
      "<p>La loi Hamon vous permet de changer d'assureur auto à tout moment après la première année. Mode d'emploi complet, modèle de lettre et pièges à éviter.</p>",
    content: `
      <p>Depuis 2015, la loi Hamon a profondément libéré le marché de l'assurance auto en France. Après douze mois de contrat, vous pouvez résilier <strong>quand vous voulez</strong>, sans frais, sans justification, et c'est votre nouvel assureur qui prend en charge les démarches.</p>

      <h2>Quand pouvez-vous activer la loi Hamon ?</h2>
      <p>La règle est simple : <strong>après un an d'engagement</strong> à compter de la date d'effet de votre contrat. Cette date figure sur votre attestation d'assurance (la fameuse "carte verte"). Avant cet anniversaire, seules les motifs légaux classiques s'appliquent (déménagement, changement de véhicule, vente, etc.).</p>

      <h2>Les 3 étapes pour changer d'assureur</h2>
      <ol>
        <li><strong>Comparer les offres.</strong> Faites un devis sur plusieurs assureurs (ou passez par un courtier qui compare 40+ compagnies en une demande).</li>
        <li><strong>Signer le nouveau contrat.</strong> Votre nouvel assureur a besoin de votre numéro de contrat actuel et de votre relevé d'informations (à demander gratuitement à votre assureur sortant).</li>
        <li><strong>Laissez le nouvel assureur faire la résiliation.</strong> C'est lui qui envoie le courrier de résiliation par lettre recommandée, qui prend effet sous 30 jours.</li>
      </ol>

      <h2>Le piège classique : la double cotisation</h2>
      <p>Veillez à ce que la <strong>date d'effet du nouveau contrat</strong> coïncide avec la date de résiliation effective de l'ancien. Un décalage = soit vous roulez sans assurance (illégal), soit vous payez deux assurances en parallèle.</p>

      <h2>Cas particulier : conducteur résilié ou malussé</h2>
      <p>Si votre ancien contrat a été résilié <strong>par l'assureur</strong> (non-paiement, sinistralité, fausse déclaration), la loi Hamon ne s'applique pas. Vous devez passer par un courtier spécialisé dans les profils difficiles pour retrouver une couverture.</p>

      <h2>Et après ?</h2>
      <p>Le nouveau contrat démarre, l'attestation provisoire vous est envoyée immédiatement par email (sous une heure chez Integra), et l'ancien assureur vous rembourse au prorata la portion non utilisée de votre dernière prime.</p>
    `,
    featuredMedia: { url: autoImg, alt: "Illustration berline navy Integra", width: 2528, height: 1696 },
    author: AUTHOR_ILYASS,
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[1]],
    tags: [{ id: 11, name: "Loi Hamon", slug: "loi-hamon" }, { id: 12, name: "Résiliation", slug: "resiliation" }],
    rankMath: {
      title: "Loi Hamon assurance auto : résilier à tout moment (guide 2026)",
      description: "Comment résilier votre assurance auto avec la loi Hamon : conditions, étapes, modèle de lettre et pièges à éviter. Guide complet par un courtier.",
      canonical: "https://integracc.fr/blog/comment-resilier-assurance-auto-loi-hamon",
    },
    readingTimeMin: 4,
  },

  {
    id: 102,
    slug: "bonus-malus-crm-comment-fonctionne",
    date: "2026-05-12T09:30:00",
    title: "Bonus-Malus (CRM) : comment ça marche et comment le réduire",
    excerpt:
      "<p>Le coefficient de réduction-majoration (CRM) impacte directement votre prime d'assurance auto. On vous explique le mécanisme et les leviers pour faire baisser le vôtre.</p>",
    content: `
      <p>Le Coefficient de Réduction-Majoration, plus connu sous le nom de "bonus-malus", est le multiplicateur appliqué chaque année à votre prime de référence. Il peut faire varier votre cotisation du <strong>simple à plus du triple</strong> selon votre comportement.</p>

      <h2>Le mécanisme exact</h2>
      <p>Vous démarrez votre vie d'automobiliste avec un CRM de <strong>1.00</strong>. Chaque année sans accident responsable, votre CRM est multiplié par <strong>0.95</strong> (réduction de 5 %). Au bout de 13 ans sans sinistre, vous atteignez le plancher légal de 0.50, qui ne peut plus descendre.</p>

      <p>À l'inverse, chaque accident responsable multiplie votre CRM par <strong>1.25</strong> (majoration de 25 %). Pour un accident partiellement responsable (50/50), c'est x 1.125. Le plafond légal du malus est fixé à 3.50.</p>

      <h2>Notre simulateur</h2>
      <p>Vous pouvez calculer votre CRM exact en quelques clics avec notre <a href="/calculateur-bonus-malus">simulateur Bonus-Malus</a>, gratuit et anonyme.</p>

      <h2>3 leviers pour faire baisser votre malus</h2>
      <ul>
        <li><strong>L'ancienneté sans sinistre.</strong> Deux années consécutives sans accident responsable suffisent à "effacer" un malus passé : vous revenez automatiquement à 1.00.</li>
        <li><strong>Le stage de récupération.</strong> Inutile pour le CRM (il n'agit que sur le permis), mais valorisé par certains assureurs spécialisés.</li>
        <li><strong>Le changement d'assureur avec courtier spécialisé.</strong> Certaines compagnies proposent un coefficient de "départ" plus avantageux que le strict report du malus précédent.</li>
      </ul>

      <h2>Mon assureur peut-il me résilier à cause de mon malus ?</h2>
      <p>Oui, après un sinistre responsable, votre assureur a 2 mois pour vous résilier de plein droit. C'est rare en pratique pour un premier accident, mais courant après plusieurs sinistres ou des défauts de paiement.</p>

      <p>Si cela vous arrive, ne paniquez pas : un courtier comme Integra a accès à des partenaires spécialisés qui acceptent les profils malussés ou résiliés, souvent à des tarifs très raisonnables.</p>
    `,
    featuredMedia: { url: autoImg, alt: "Illustration berline navy Integra", width: 2528, height: 1696 },
    author: AUTHOR_INTEGRA,
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[1]],
    tags: [{ id: 13, name: "Bonus-Malus", slug: "bonus-malus" }, { id: 14, name: "CRM", slug: "crm" }],
    rankMath: {
      title: "Bonus-Malus assurance auto : comment fonctionne le CRM ?",
      description: "Coefficient de Réduction-Majoration expliqué : barème, calcul, leviers pour réduire votre malus auto. Simulateur gratuit inclus.",
      canonical: "https://integracc.fr/blog/bonus-malus-crm-comment-fonctionne",
    },
    readingTimeMin: 5,
  },

  {
    id: 103,
    slug: "decennale-btp-auto-entrepreneur-guide-complet",
    date: "2026-05-05T08:00:00",
    title: "Garantie décennale BTP : le guide complet pour auto-entrepreneur",
    excerpt:
      "<p>Vous lancez votre micro-entreprise dans le bâtiment ? La décennale est obligatoire. Quelles activités, quels tarifs, quelle couverture ? Toutes les réponses.</p>",
    content: `
      <p>L'assurance décennale est l'<strong>obligation légale numéro 1</strong> de tout artisan du bâtiment, salarié ou indépendant. Sans elle, pas d'assurance dommages-ouvrage côté client, pas de chantier légal, et un risque personnel financier qui peut atteindre 10 ans de revenus.</p>

      <h2>Qui est concerné ?</h2>
      <p>Tous les corps de métier qui interviennent sur le gros œuvre ou le second œuvre du bâtiment :</p>
      <ul>
        <li>Maçons, charpentiers, couvreurs, plaquistes, carreleurs</li>
        <li>Plombiers, électriciens, chauffagistes (CVC)</li>
        <li>Peintres, menuisiers, vitriers</li>
        <li>Maîtres d'œuvre, architectes, bureaux d'études</li>
      </ul>

      <p>Y compris les <strong>micro-entrepreneurs</strong>, dès le premier chantier facturé. La forme juridique ne change rien : c'est l'activité déclarée qui compte.</p>

      <h2>Combien ça coûte ?</h2>
      <p>Le tarif dépend de plusieurs facteurs :</p>
      <ul>
        <li><strong>Le chiffre d'affaires prévisionnel.</strong> Plus il est élevé, plus la prime est forte (mais proportionnellement plus avantageuse).</li>
        <li><strong>Les corps de métier.</strong> Une seule activité coûte moins qu'une multi-activité (mais souvent moins économique qu'une décennale "multi-corps de métier").</li>
        <li><strong>Le profil.</strong> Primo-accédant, repreneur, antécédents de sinistres impactent le tarif.</li>
      </ul>
      <p>En pratique : comptez <strong>1 200 à 3 500 € HT/an</strong> pour une activité unique, et <strong>2 500 à 6 000 € HT/an</strong> pour une multi-corps. Les courtiers spécialisés comme Integra négocient des tarifs jusqu'à 30 % plus bas que les compagnies en direct.</p>

      <h2>Attestation : sous combien de temps ?</h2>
      <p>Chez Integra, <strong>48 heures maximum</strong> pour les profils standards, dès la signature électronique. Pour les profils complexes (antécédents, activités rares), comptez 5 à 10 jours ouvrés.</p>

      <h2>Que couvre concrètement la décennale ?</h2>
      <p>Tout dommage qui compromet la solidité de l'ouvrage ou le rend impropre à sa destination, pendant les 10 ans qui suivent la réception. Concrètement : fissures structurelles, infiltrations majeures, défauts d'isolation thermique, problèmes électriques compromettant l'usage, etc.</p>

      <p>À ne pas confondre avec la <strong>garantie biennale</strong> (équipements dissociables, 2 ans) ou la <strong>garantie de parfait achèvement</strong> (tout désordre signalé la 1ère année).</p>
    `,
    featuredMedia: { url: decennaleImg, alt: "Casque chantier et équerre — illustration 3D Integra Décennale", width: 2048, height: 2048 },
    author: AUTHOR_ILYASS,
    categories: [MOCK_CATEGORIES[3], MOCK_CATEGORIES[4]],
    tags: [{ id: 15, name: "Décennale", slug: "decennale" }, { id: 16, name: "Auto-entrepreneur", slug: "auto-entrepreneur" }],
    rankMath: {
      title: "Décennale BTP auto-entrepreneur : guide complet 2026 | Integra",
      description: "Garantie décennale obligatoire BTP : activités concernées, tarifs, délai d'attestation, couverture. Guide pratique pour artisans et micro-entreprises.",
      canonical: "https://integracc.fr/blog/decennale-btp-auto-entrepreneur-guide-complet",
    },
    readingTimeMin: 6,
  },

  {
    id: 104,
    slug: "mutuelle-sante-tns-loi-madelin-expliquee",
    date: "2026-04-28T11:15:00",
    title: "Mutuelle santé TNS : la loi Madelin expliquée simplement",
    excerpt:
      "<p>Vous êtes TNS (Travailleur Non Salarié) ? La loi Madelin vous permet de déduire vos cotisations santé et prévoyance de votre revenu imposable. Mode d'emploi.</p>",
    content: `
      <p>La loi Madelin de 1994 a créé un cadre fiscal extrêmement avantageux pour les Travailleurs Non Salariés (TNS) : gérants majoritaires de SARL, EI, EURL, professions libérales, artisans, commerçants. <strong>Vos cotisations santé, prévoyance et retraite complémentaire sont déductibles de votre revenu imposable</strong>, dans la limite de plafonds spécifiques.</p>

      <h2>Concrètement, combien ça change ?</h2>
      <p>Pour un TNS au TMI 30 % qui souscrit une mutuelle Madelin à 1 800 €/an, l'économie d'impôt est de <strong>540 €</strong>. Le coût réel de la mutuelle tombe à 1 260 €/an. À 41 % de TMI, l'économie monte à 738 €.</p>

      <h2>Les conditions à respecter</h2>
      <ul>
        <li><strong>Statut TNS</strong> au RSI/SSI (gérant majoritaire, EI, profession libérale).</li>
        <li><strong>Contrat Madelin éligible.</strong> Tous les contrats santé ne le sont pas : vérifiez la mention "responsable et solidaire — éligible Madelin" dans les conditions générales.</li>
        <li><strong>Cotisations versées</strong> (et non remboursées) pendant l'année fiscale.</li>
        <li><strong>Contrat avec sortie en rente</strong> uniquement (pour la retraite Madelin spécifiquement).</li>
      </ul>

      <h2>Plafonds 2026</h2>
      <p>Trois plafonds distincts s'appliquent (les sommes versées au-delà ne sont plus déductibles, mais le contrat reste valide) :</p>
      <ul>
        <li><strong>Santé :</strong> 3,75 % du revenu professionnel + 7 % du PASS, plafonné à 3 % de 8 PASS soit environ <strong>11 100 €/an</strong>.</li>
        <li><strong>Prévoyance :</strong> 1,75 % du PASS + 3,75 % du revenu, dans la limite de 3 % de 8 PASS.</li>
        <li><strong>Retraite :</strong> 10 % du revenu plafonné à 8 PASS + 15 % sur la tranche entre 1 et 8 PASS.</li>
      </ul>
      <p><em>(PASS = Plafond Annuel de la Sécurité Sociale, ~46 368 € en 2026)</em></p>

      <h2>Pièges courants</h2>
      <p>Attention à ne pas confondre <strong>déduction</strong> (qui baisse votre revenu imposable) avec <strong>crédit d'impôt</strong> (qui baisse directement votre impôt). Et n'oubliez pas que vos cotisations santé restent <strong>soumises à la CSG/CRDS</strong> (~9,7 %), même si elles sont déductibles fiscalement.</p>

      <p>Notre conseil : pour un TNS qui démarre, vise une mutuelle Madelin "milieu de gamme" qui couvre vraiment l'optique, le dentaire et l'hospitalisation, plutôt que la mutuelle premium qui dépasse les plafonds de déduction.</p>
    `,
    featuredMedia: { url: santeImg, alt: "Stéthoscope navy et cœur emerald — illustration 3D Integra Santé", width: 2048, height: 2048 },
    author: AUTHOR_INTEGRA,
    categories: [MOCK_CATEGORIES[2], MOCK_CATEGORIES[4]],
    tags: [{ id: 17, name: "TNS", slug: "tns" }, { id: 18, name: "Loi Madelin", slug: "loi-madelin" }],
    rankMath: {
      title: "Mutuelle TNS Loi Madelin 2026 : déduction fiscale | Integra",
      description: "Loi Madelin pour TNS : conditions, plafonds 2026, calcul économie d'impôt. Guide pour gérants majoritaires, EI, libéraux et artisans.",
      canonical: "https://integracc.fr/blog/mutuelle-sante-tns-loi-madelin-expliquee",
    },
    readingTimeMin: 5,
  },

  {
    id: 105,
    slug: "assurance-vtc-guide-choisir-2026",
    date: "2026-04-15T14:00:00",
    title: "Quelle assurance VTC choisir en 2026 : le guide complet",
    excerpt:
      "<p>Vous démarrez ou changez d'assurance VTC ? Plateformes acceptées, garanties indispensables, tarifs : tout ce qu'il faut comparer avant de signer.</p>",
    content: `
      <p>L'assurance professionnelle est obligatoire pour exercer comme chauffeur VTC en France. Mais entre une "assurance pro" générique et une vraie assurance VTC dédiée, le gap de couverture peut coûter cher en cas de sinistre. Voici les 6 critères à comparer avant de signer.</p>

      <h2>1. Les plateformes couvertes</h2>
      <p>Toutes les assurances VTC ne couvrent pas toutes les plateformes (Uber, Bolt, Heetch, Marcel, Free Now…). Certaines compagnies refusent par exemple les plateformes étrangères. <strong>Exigez la mention écrite des plateformes autorisées</strong> dans vos conditions particulières.</p>

      <h2>2. La couverture passagers</h2>
      <p>L'assurance RC obligatoire couvre les passagers en cas d'accident. Mais l'<strong>indemnité par passager</strong> varie de 1 M€ (minimum légal) à 5 M€ chez les meilleurs assureurs. Pour un véhicule 4 places transportant régulièrement de la clientèle business, c'est non négociable.</p>

      <h2>3. La garantie perte d'exploitation</h2>
      <p>Si votre véhicule est immobilisé après sinistre, vous perdez votre seul outil de travail. La garantie perte d'exploitation vous verse une indemnité journalière (de 50 à 150 €/jour selon le contrat) pendant la durée d'immobilisation. <strong>À privilégier impérativement</strong> pour un chauffeur à temps plein.</p>

      <h2>4. Le véhicule de remplacement</h2>
      <p>En cas de sinistre, combien de jours de véhicule de courtoisie ? <strong>Catégorie identique</strong> ou catégorie inférieure ? Pour un VTC premium, un véhicule de remplacement berline est indispensable, sinon vous perdez vos clients haut de gamme.</p>

      <h2>5. La valeur à neuf</h2>
      <p>Pour un véhicule récent (moins de 36 mois), la garantie "valeur à neuf" rembourse le prix d'achat initial, pas la cote Argus. C'est un écart de plusieurs milliers d'euros en cas de vol ou destruction totale.</p>

      <h2>6. La couverture équipement</h2>
      <p>Tablette, GPS pro, sièges enfants, équipement de service (rafraîchissements, chargeurs) : la garantie équipement professionnel les couvre. Pas systématique dans les contrats standards.</p>

      <h2>Tarifs indicatifs 2026</h2>
      <p>Pour un chauffeur VTC débutant avec véhicule berline standard sur Uber :</p>
      <ul>
        <li><strong>Formule éco</strong> (RC + dommages collision) : 1 800 à 2 400 €/an</li>
        <li><strong>Formule confort</strong> (+ perte exploitation + valeur à neuf) : 2 800 à 3 600 €/an</li>
        <li><strong>Formule premium</strong> (+ équipement + véhicule remplacement berline) : 3 800 à 5 200 €/an</li>
      </ul>

      <p>Notre conseil : <strong>ne lésinez pas sur la perte d'exploitation</strong>. Le surcoût est de l'ordre de 30 €/mois, mais elle peut vous sauver financièrement après le moindre accrochage.</p>
    `,
    featuredMedia: { url: vtcImg, alt: "Limousine S-Class et casquette chauffeur — illustration 3D Integra VTC", width: 2528, height: 1696 },
    author: AUTHOR_ILYASS,
    categories: [MOCK_CATEGORIES[4]],
    tags: [{ id: 19, name: "VTC", slug: "vtc" }, { id: 20, name: "Chauffeur", slug: "chauffeur" }],
    rankMath: {
      title: "Assurance VTC 2026 : guide pour choisir la meilleure | Integra",
      description: "Comparer une assurance VTC en 6 critères : plateformes, passagers, perte d'exploitation, valeur à neuf. Tarifs indicatifs et conseil courtier.",
      canonical: "https://integracc.fr/blog/assurance-vtc-guide-choisir-2026",
    },
    readingTimeMin: 6,
  },

  {
    id: 106,
    slug: "code-route-bonnes-pratiques-jeune-conducteur",
    date: "2026-04-02T09:00:00",
    title: "Jeune conducteur : 7 réflexes pour éviter le malus dès la 1ère année",
    excerpt:
      "<p>La période probatoire (3 ans avec permis classique, 2 ans après conduite accompagnée) est la plus risquée. Voici comment la traverser sans malus ni résiliation.</p>",
    content: `
      <p>Un jeune conducteur paie en moyenne 2,5 fois plus cher qu'un conducteur expérimenté pour une couverture équivalente. Et le moindre sinistre responsable la 1ère année peut faire exploser la facture. Voici les 7 réflexes qui font vraiment la différence.</p>

      <h2>1. Choisir un véhicule moins puissant qu'éligible</h2>
      <p>L'assurance jeune conducteur est tarifée principalement sur la puissance fiscale et la valeur du véhicule. Une <strong>citadine essence 5-6 CV</strong> coûte 40 % moins cher à assurer qu'une compacte diesel 7-8 CV, à profil identique.</p>

      <h2>2. Faire la conduite accompagnée si pas déjà fait</h2>
      <p>La conduite accompagnée réduit la période probatoire de 3 ans à 2 ans, et apporte une réduction immédiate du tarif assureur (en moyenne -15 % la première année).</p>

      <h2>3. La franchise jeune conducteur</h2>
      <p>Pendant les 3 (ou 2) premières années, votre franchise est <strong>doublée</strong> en cas de sinistre responsable, sauf si l'assureur prévoit explicitement le contraire. Vérifiez ce point dans vos conditions générales.</p>

      <h2>4. Éviter les "petits accrochages" déclarés</h2>
      <p>Tout sinistre déclaré, même bénin, peut compter dans le malus. Pour un dommage purement matériel sous la franchise (~600 €), demandez à votre artisan d'établir un devis avant de déclarer : il est parfois plus économique de payer de votre poche.</p>

      <h2>5. Le stage volontaire de sensibilisation</h2>
      <p>Coût : 200-250 €. Bénéfice : +2 points de permis et reconnaissance par certains assureurs (rabais de 5 à 10 % à la prochaine échéance). Effet psychologique aussi : on prend conscience de réflexes acquis qu'on ne réalisait pas.</p>

      <h2>6. Souscrire en son nom et pas chez les parents</h2>
      <p>Tentation classique : assurer le véhicule au nom du parent et "ajouter" le jeune conducteur en conducteur secondaire. <strong>Risqué.</strong> Si l'assureur découvre que le jeune utilise le véhicule à titre principal, c'est une <strong>fausse déclaration</strong> qui peut entraîner la résiliation avec inscription au fichier AGIRA pendant 5 ans.</p>

      <h2>7. Tester nos quiz code de la route</h2>
      <p>Réviser le code régulièrement maintient les bons réflexes. Notre <a href="/code-de-la-route">quiz interactif</a> est gratuit et propose des questions spécifiquement orientées jeunes conducteurs.</p>

      <h2>Et si malgré tout vous avez un sinistre ?</h2>
      <p>Pas de panique : un seul sinistre responsable ne vous fera ni résilier ni "blacklister". Le malus est de 25 % (CRM 1.25 au lieu de 1.00), absorbé naturellement en 5 ans sans nouveau sinistre. C'est la <strong>répétition</strong> qui pose problème, pas l'incident isolé.</p>
    `,
    featuredMedia: { url: motoImg, alt: "Roadster sportif — illustration 3D Integra Moto", width: 2528, height: 1696 },
    author: AUTHOR_INTEGRA,
    categories: [MOCK_CATEGORIES[0], MOCK_CATEGORIES[1]],
    tags: [{ id: 21, name: "Jeune conducteur", slug: "jeune-conducteur" }, { id: 22, name: "Permis", slug: "permis" }],
    rankMath: {
      title: "Jeune conducteur : 7 conseils pour éviter le malus | Integra",
      description: "Période probatoire : 7 réflexes pour traverser vos 3 premières années sans malus, sans résiliation et sans surprime. Guide pratique courtier.",
      canonical: "https://integracc.fr/blog/code-route-bonnes-pratiques-jeune-conducteur",
    },
    readingTimeMin: 5,
  },
];
