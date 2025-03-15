// api.js - Fonctions pour les appels API au backend

import { API_BASE_URL, API_ENDPOINTS } from './config.js';

// Crée une nouvelle session
async function createSession() {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE_SESSION}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data = await response.json();
    return data.session_id;
  } catch (error) {
    console.error("Erreur lors de la création de session:", error);
    throw error;
  }
}

// Soumet les réponses pour la partie 1
async function submitPart1(sessionId, responses) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PART1}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: sessionId,
        ...responses
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la soumission de la partie 1:", error);
    throw error;
  }
}

// Soumet les réponses pour la partie 2
async function submitPart2(sessionId, responses) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PART2}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: sessionId,
        ...responses
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la soumission de la partie 2:", error);
    throw error;
  }
}

// Soumet les réponses pour la partie 3
async function submitPart3(sessionId, responses) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PART3}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: sessionId,
        ...responses
      })
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la soumission de la partie 3:", error);
    throw error;
  }
}

// Récupère l'allocation d'actifs et le rapport
async function getReport(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REPORT}?session_id=${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération du rapport:", error);
    throw error;
  }
}

export {
  createSession,
  submitPart1,
  submitPart2,
  submitPart3,
  getReport
};
