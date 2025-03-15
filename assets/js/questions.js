// questions.js - Définition complète des questions du simulateur

const questions = [
  // ===== PARTIE 1: Profil RAID (10 questions) =====
  {
    id: "risk_q1",
    section: 1,
    axe: "R",
    question: "Face à une opportunité à haut risque, quelle est votre réaction ?",
    options: [
      { value: "A", text: "Je l'évite à tout prix, je préfère la sécurité même si les gains sont modestes." },
      { value: "B", text: "J'y consacre une très petite partie de mon argent, juste pour essayer." },
      { value: "C", text: "J'investis un montant raisonnable si je pense que ça pourrait en valoir la peine." },
      { value: "D", text: "J'investis significativement, car les grandes opportunités impliquent souvent des risques." }
    ],
    type: "single"
  },
  {
    id: "risk_q2",
    section: 1,
    axe: "R",
    question: "Imaginez que votre investissement perd 15% de sa valeur en un mois. Que faites-vous ?",
    options: [
      { value: "A", text: "Je vends tout immédiatement pour éviter de perdre davantage." },
      { value: "B", text: "Je vends une partie pour limiter mes pertes potentielles." },
      { value: "C", text: "Je ne fais rien et j'attends que ça remonte." },
      { value: "D", text: "J'en profite pour acheter plus, car c'est maintenant moins cher." }
    ],
    type: "single"
  },
  {
    id: "risk_q3",
    section: 1,
    axe: "R",
    question: "Comment répartiriez-vous 1000€ d'épargne ?",
    options: [
      { value: "A", text: "100% sur des placements très sécurisés (livrets, comptes épargne)." },
      { value: "B", text: "70% sécurisés, 30% sur des placements un peu plus risqués." },
      { value: "C", text: "50% sécurisés, 50% sur des placements plus risqués." },
      { value: "D", text: "30% sécurisés, 70% sur des placements dynamiques ou risqués." }
    ],
    type: "single"
  },
  {
    id: "risk_q4",
    section: 1,
    axe: "R",
    question: "Parmi ces placements, lequel vous attire le plus ?",
    options: [
      { value: "A", text: "Un livret d'épargne garantissant 2% par an sans risque." },
      { value: "B", text: "Des obligations d'entreprises offrant 4% par an avec un risque modéré." },
      { value: "C", text: "Un portefeuille d'actions visant 7% par an avec des fluctuations importantes." },
      { value: "D", text: "Un fonds spéculatif visant 13% par an avec un risque de perte significatif." }
    ],
    type: "single"
  },
  {
    id: "approach_q1",
    section: 1,
    axe: "A",
    question: "Un expert annonce une opportunité d'investissement très prometteuse. Comment réagissez-vous ?",
    options: [
      { value: "A", text: "Je mène ma propre enquête avant de suivre ou non son conseil." },
      { value: "B", text: "Je consulte d'autres sources pour voir si son avis est partagé." },
      { value: "C", text: "S'il est réputé, je considère qu'il a probablement raison." },
      { value: "D", text: "Je suis immédiatement son conseil, je ne veux pas rater cette opportunité." }
    ],
    type: "single"
  },
  {
    id: "approach_q2",
    section: 1,
    axe: "A",
    question: "Pour vous, qu'est-ce qui est le plus important dans un investissement ?",
    options: [
      { value: "A", text: "Les chiffres clés et la solidité financière démontrée par des données." },
      { value: "B", text: "Un bon équilibre entre l'idée du projet et ses résultats financiers." },
      { value: "C", text: "Si le prix monte récemment et si les gens en parlent positivement." },
      { value: "D", text: "L'histoire du projet et si ça me parle personnellement." }
    ],
    type: "single"
  },
  {
    id: "approach_q3",
    section: 1,
    axe: "A",
    question: "Si un investissement ne se passe pas comme prévu, comment réagissez-vous ?",
    options: [
      { value: "A", text: "J'analyse en détail ce qui n'a pas fonctionné dans mon raisonnement initial." },
      { value: "B", text: "J'essaie de comprendre ce qui a causé cette différence avec mes attentes." },
      { value: "C", text: "Je note ce qui s'est passé pour essayer de faire mieux la prochaine fois." },
      { value: "D", text: "C'est la vie, les investissements sont imprévisibles de toute façon." }
    ],
    type: "single"
  },
  {
    id: "implication_q1",
    section: 1,
    axe: "I",
    question: "Comment aimeriez-vous gérer votre argent si vous commenciez à investir ?",
    options: [
      { value: "A", text: "Je préfère laisser un conseiller gérer à ma place, je ne veux pas y penser." },
      { value: "B", text: "Je choisis une solution automatique où j'investis un petit montant tous les mois." },
      { value: "C", text: "Je veux apprendre à gérer moi-même, en suivant mes investissements de temps en temps." },
      { value: "D", text: "J'investis moi-même activement, je veux suivre et ajuster mes placements régulièrement." }
    ],
    type: "single"
  },
  {
    id: "implication_q2",
    section: 1,
    axe: "I",
    question: "Combien de temps êtes-vous prêt à consacrer chaque semaine à la gestion de vos investissements ?",
    options: [
      { value: "A", text: "Le moins possible, idéalement quelques minutes par mois." },
      { value: "B", text: "30 minutes à 1 heure par mois pour vérifier l'essentiel." },
      { value: "C", text: "Régulièrement pour suivre et ajuster mes positions." },
      { value: "D", text: "Plusieurs heures par semaine, je considère cela comme une activité importante." }
    ],
    type: "single"
  },
  {
    id: "diversification_q1",
    section: 1,
    axe: "D",
    question: "Vous entendez dire qu'on peut investir dans les actions, les obligations, les fonds, voire l'immobilier papier. Comment feriez-vous vos premiers pas ?",
    options: [
      { value: "A", text: "Je choisirais un seul type d'actif pour ne pas me compliquer la vie." },
      { value: "B", text: "Je prendrais majoritairement des actions et un petit pourcentage dans un autre support." },
      { value: "C", text: "J'essaierais d'avoir au moins 2 ou 3 classes d'actifs pour équilibrer." },
      { value: "D", text: "J'intégrerais plusieurs classes d'actifs dès le départ." }
    ],
    type: "single"
  },

  // ===== PARTIE 2: Préférences et Style (6 questions) =====
  {
    id: "knowledge_bourse",
    section: 2,
    question: "À quel point êtes-vous à l'aise avec la Bourse ?",
    options: [
      { value: 1, text: "Aucune idée" },
      { value: 2, text: "J'ai quelques bases théoriques" },
      { value: 3, text: "J'ai déjà investi un peu" },
      { value: 4, text: "Je suis à l'aise, j'investis moi-même" },
      { value: 5, text: "J'ai un niveau avancé ou professionnel" }
    ],
    type: "single"
  },
  {
    id: "knowledge_immo",
    section: 2,
    question: "À quel point êtes-vous à l'aise avec l'Immobilier ?",
    options: [
      { value: 1, text: "Aucune idée" },
      { value: 2, text: "J'ai quelques bases théoriques" },
      { value: 3, text: "J'ai déjà investi un peu" },
      { value: 4, text: "Je suis à l'aise, j'investis moi-même" },
      { value: 5, text: "J'ai un niveau avancé ou professionnel" }
    ],
    type: "single"
  },
  {
    id: "knowledge_crypto",
    section: 2,
    question: "À quel point êtes-vous à l'aise avec la Crypto ?",
    options: [
      { value: 1, text: "Aucune idée" },
      { value: 2, text: "J'ai quelques bases théoriques" },
      { value: 3, text: "J'ai déjà investi un peu" },
      { value: 4, text: "Je suis à l'aise, j'investis moi-même" },
      { value: 5, text: "J'ai un niveau avancé ou professionnel" }
    ],
    type: "single"
  },
  {
    id: "preference_bourse",
    section: 2,
    question: "Quelle est votre affinité avec la Bourse ?",
    options: [
      { value: 0, text: "Pas du tout" },
      { value: 1, text: "Un peu" },
      { value: 2, text: "Oui, j'aime bien" },
      { value: 3, text: "J'adore" }
    ],
    type: "single"
  },
  {
    id: "preference_immo",
    section: 2,
    question: "Quelle est votre affinité avec l'Immobilier ?",
    options: [
      { value: 0, text: "Pas du tout" },
      { value: 1, text: "Un peu" },
      { value: 2, text: "Oui, j'aime bien" },
      { value: 3, text: "J'adore" }
    ],
    type: "single"
  },
  {
    id: "preference_crypto",
    section: 2,
    question: "Quelle est votre affinité avec la Crypto ?",
    options: [
      { value: 0, text: "Pas du tout" },
      { value: 1, text: "Un peu" },
      { value: 2, text: "Oui, j'aime bien" },
      { value: 3, text: "J'adore" }
    ],
    type: "single"
  },
  {
    id: "og_crypto",
    section: 2,
    question: "Vous considérez-vous comme un \"OG Crypto\" (très à l'aise dans ce domaine) ?",
    options: [
      { value: "true", text: "Oui" },
      { value: "false", text: "Non" }
    ],
    type: "single",
    condition: {
      questionId: "preference_crypto",
      operator: ">",
      value: 0
    }
  },
  {
    id: "strategies",
    section: 2,
    question: "Quelles approches décrivent au mieux votre manière d'investir ?",
    description: "Vous pouvez cocher plusieurs options",
    options: [
      { value: "revenus", text: "J'aimerais recevoir de l'argent régulièrement de mes investissements (comme un salaire)" },
      { value: "croissance", text: "Je préfère voir mon capital grossir dans le temps, même sans toucher d'argent régulièrement" },
      { value: "opportuniste", text: "J'aime pouvoir saisir les bonnes occasions quand elles se présentent" },
      { value: "analytique", text: "Je me sens à l'aise avec les chiffres et les données pour prendre mes décisions" },
      { value: "innovation", text: "Je suis attiré par les nouvelles technologies et les innovations de demain" },
      { value: "delegation", text: "Je préférerais que quelqu'un (ou un système) gère mes investissements pour moi" },
      { value: "protection", text: "Ma priorité est de protéger mon argent contre l'inflation et les risques" },
      { value: "esg", text: "Je souhaite que mes investissements aient un impact positif sur la société et l'environnement" }
    ],
    type: "multiple"
  },
  // ===== PARTIE 3: Objectifs et Horizons (5 questions) =====
  {
    id: "objectifs",
    section: 3,
    question: "Quels sont vos objectifs principaux d'investissement ?",
    description: "Choisissez jusqu'à 2 objectifs par ordre de priorité",
    options: [
      { value: "securite", text: "Constituer une épargne de sécurité pour les imprévus", description: "Favorise les actifs liquides et peu risqués" },
      { value: "retraite", text: "Préparer ma retraite", description: "Privilégie des investissements à long terme et génération de revenus" },
      { value: "croissance", text: "Faire fructifier mon épargne sans but précis", description: "Équilibre entre croissance et sécurité" },
      { value: "projet", text: "Financer un projet à moyen terme (immobilier, création d'entreprise...)", description: "Actifs avec horizon défini et liquidité modérée" },
      { value: "revenus", text: "Générer des revenus complémentaires réguliers", description: "Accent sur les actifs générant du cash-flow" }
    ],
    type: "multiple",
    max: 2
  },
  {
    id: "horizon",
    section: 3,
    question: "Quel est votre horizon principal pour l'ensemble de votre portefeuille ?",
    options: [
      { value: "court", text: "Court terme (1-3 ans)" },
      { value: "moyen", text: "Moyen terme (4-7 ans)" },
      { value: "long", text: "Long terme (8+ ans)" }
    ],
    type: "single"
  },
  {
    id: "horizons_multiples",
    section: 3,
    question: "Avez-vous des objectifs à différents horizons temporels ?",
    options: [
      { value: "true", text: "Oui, j'ai des objectifs à court, moyen et long terme" },
      { value: "false", text: "Non, mes objectifs sont principalement sur un même horizon" }
    ],
    type: "single"
  },
  {
    id: "liquidite",
    section: 3,
    question: "À quel point auriez-vous besoin de pouvoir récupérer rapidement votre argent ?",
    options: [
      { value: 0, text: "Je n'aurai probablement pas besoin d'y toucher avant l'échéance prévue" },
      { value: 1, text: "Je pourrais avoir besoin d'une petite partie en cas d'imprévu" },
      { value: 2, text: "Je souhaite pouvoir accéder à mon argent facilement si nécessaire" },
      { value: 3, text: "Il est essentiel que je puisse récupérer mon argent à tout moment" }
    ],
    type: "single"
  },
  {
    id: "evolution",
    section: 3,
    question: "Comment pensez-vous que vos besoins financiers vont évoluer dans les prochaines années ?",
    options: [
      { value: "depenses_importantes", text: "Je prévois des dépenses importantes prochainement (achat immobilier, etc.)" },
      { value: "revenus_croissants", text: "Mes revenus devraient augmenter plus vite que mes dépenses" },
      { value: "stable", text: "Ma situation devrait rester relativement stable" },
      { value: "preparation_retraite", text: "Je m'approche de la retraite et j'aurai besoin de revenus complémentaires" },
      { value: "indetermine", text: "Autre/Je ne sais pas" }
    ],
    type: "single"
  }
];

export default questions;
