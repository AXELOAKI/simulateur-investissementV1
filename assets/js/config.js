// config.js - Configuration de l'API et paramètres globaux

// URL de base de l'API
const API_BASE_URL = "https://simulateur-investissement-api-1118b9c7c6a1.herokuapp.com/api/v1";

// Endpoints de l'API
const API_ENDPOINTS = {
  CREATE_SESSION: "/sessions",
  PART1: "/profil",
  PART2: "/preferences",
  PART3: "/objectifs",
  REPORT: "/rapport",
  ALLOCATION: "/allocation"
};

// Configuration des sections du questionnaire
const QUESTIONNAIRE_SECTIONS = {
  1: "Profil d'investisseur",
  2: "Préférences et Style",
  3: "Objectifs et Horizon"
};

// Configuration des axes RAID
const RAID_AXES = {
  "R": "Risque",
  "A": "Approche",
  "I": "Implication",
  "D": "Diversification"
};

export { 
  API_BASE_URL, 
  API_ENDPOINTS, 
  QUESTIONNAIRE_SECTIONS,
  RAID_AXES
};
