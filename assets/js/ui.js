// ui.js - Gestion de l'interface utilisateur et de la navigation

import questions from './questions.js';
import { API_ENDPOINTS, QUESTIONNAIRE_SECTIONS, RAID_AXES } from './config.js';
import { createSession, submitPart1, submitPart2, submitPart3, getReport } from './api.js';

// État global du questionnaire
const state = {
  currentQuestionIndex: 0,
  sessionId: null,
  responses: {},
  currentSection: 1
};

// Initialise le questionnaire
function initQuestionnaire() {
  // Masquer les conteneurs sauf celui de démarrage
  document.getElementById('questionnaire-container').style.display = 'none';
  document.getElementById('loading-container').style.display = 'none';
  document.getElementById('results-container').style.display = 'none';
  document.getElementById('error-container').style.display = 'none';
  
  // Afficher le conteneur de démarrage
  document.getElementById('start-container').style.display = 'flex';
  
  // Attacher l'événement au bouton de démarrage
  document.getElementById('start-button').addEventListener('click', startQuestionnaire);
  
  // Attacher les événements aux boutons de navigation
  document.getElementById('btn-previous').addEventListener('click', goToPreviousQuestion);
  document.getElementById('btn-next').addEventListener('click', goToNextQuestion);
}

// Commence le questionnaire
async function startQuestionnaire() {
  try {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('loading-container').style.display = 'flex';
    
    // Créer une nouvelle session
    state.sessionId = await createSession();
    
    // Masquer le chargement et afficher le questionnaire
    document.getElementById('loading-container').style.display = 'none';
    document.getElementById('questionnaire-container').style.display = 'flex';
    
    // Afficher la première question
    displayQuestion(0);
    
  } catch (error) {
    showError("Impossible de démarrer le questionnaire. Veuillez réessayer.");
    console.error(error);
  }
}

// Affiche la question courante
function displayQuestion(index) {
  if (index < 0 || index >= questions.length) return;
  
  state.currentQuestionIndex = index;
  const question = questions[index];
  
  // Si la question a une condition, vérifier si elle doit être affichée
  if (question.condition) {
    const conditionMet = checkCondition(question.condition);
    if (!conditionMet) {
      // Passer à la question suivante ou précédente
      if (index > state.currentQuestionIndex) {
        return displayQuestion(index + 1);
      } else {
        return displayQuestion(index - 1);
      }
    }
  }
  
  // Mettre à jour la section si nécessaire
  if (question.section !== state.currentSection) {
    state.currentSection = question.section;
    document.getElementById('section-name').textContent = QUESTIONNAIRE_SECTIONS[state.currentSection];
  }
  
  // Mettre à jour le titre et la description de la question
  document.getElementById('question-title').textContent = question.question;
  
  const descriptionElement = document.getElementById('question-description');
  if (question.description) {
    descriptionElement.textContent = question.description;
    descriptionElement.style.display = 'block';
  } else {
    descriptionElement.style.display = 'none';
  }
  
  // Mettre à jour les options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    
    if (question.type === 'single') {
      // Option unique (radio)
      optionElement.innerHTML = `
        <input type="radio" id="${option.value}" name="${question.id}" value="${option.value}" 
          ${state.responses[question.id] === option.value ? 'checked' : ''}>
        <label for="${option.value}">
          <span class="option-text">${option.text}</span>
          ${option.description ? `<span class="option-description">${option.description}</span>` : ''}
        </label>
      `;
      
      // Ajout de l'événement click pour passer automatiquement à la question suivante
      optionElement.addEventListener('click', () => {
        document.getElementById(option.value).checked = true;
        saveResponse(question.id, option.value);
        setTimeout(() => goToNextQuestion(), 500);
      });
    } else if (question.type === 'multiple') {
      // Options multiples (checkbox)
      optionElement.innerHTML = `
        <input type="checkbox" id="${option.value}" name="${question.id}" value="${option.value}"
          ${state.responses[question.id] && state.responses[question.id].includes(option.value) ? 'checked' : ''}>
        <label for="${option.value}">
          <span class="option-text">${option.text}</span>
          ${option.description ? `<span class="option-description">${option.description}</span>` : ''}
        </label>
      `;
      
      // Pour les options multiples, l'utilisateur doit cliquer sur "Suivant"
      const checkbox = optionElement.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => {
        const selectedOptions = getSelectedOptions(question.id);
        
        // Si un maximum est défini, désactiver les autres options une fois atteint
        if (question.max && selectedOptions.length > question.max) {
          checkbox.checked = false;
          alert(`Vous pouvez sélectionner au maximum ${question.max} options.`);
        } else {
          saveMultipleResponses(question.id, getSelectedOptions(question.id));
        }
      });
    }
    
    optionsContainer.appendChild(optionElement);
  });
  
  // Mettre à jour la barre de progression
  updateProgress();
  
  // Mettre à jour les boutons de navigation
  updateNavigationButtons();
  
  // Défiler vers le haut de la page pour la nouvelle question
  window.scrollTo(0, 0);
}
// Récupère les options sélectionnées pour les questions à choix multiples
function getSelectedOptions(questionId) {
  const checkboxes = document.querySelectorAll(`input[name="${questionId}"]:checked`);
  return Array.from(checkboxes).map(cb => cb.value);
}

// Vérifie si une condition est remplie
function checkCondition(condition) {
  const { questionId, operator, value } = condition;
  const response = state.responses[questionId];
  
  if (!response) return false;
  
  switch (operator) {
    case '==':
      return response === value;
    case '!=':
      return response !== value;
    case '>':
      return parseInt(response) > parseInt(value);
    case '<':
      return parseInt(response) < parseInt(value);
    case '>=':
      return parseInt(response) >= parseInt(value);
    case '<=':
      return parseInt(response) <= parseInt(value);
    case 'includes':
      return Array.isArray(response) && response.includes(value);
    default:
      return false;
  }
}

// Sauvegarde la réponse à une question à choix unique
function saveResponse(questionId, value) {
  state.responses[questionId] = value;
}

// Sauvegarde les réponses à une question à choix multiples
function saveMultipleResponses(questionId, values) {
  state.responses[questionId] = values;
}

// Met à jour la barre de progression
function updateProgress() {
  const totalQuestions = questions.length;
  const currentQuestion = state.currentQuestionIndex + 1;
  const progressPercent = (currentQuestion / totalQuestions) * 100;
  
  document.getElementById('progress-bar-fill').style.width = `${progressPercent}%`;
  document.getElementById('progress-text').textContent = `Question ${currentQuestion}/${totalQuestions}`;
}

// Met à jour les boutons de navigation
function updateNavigationButtons() {
  const prevButton = document.getElementById('btn-previous');
  const nextButton = document.getElementById('btn-next');
  
  // Gérer le bouton précédent
  if (state.currentQuestionIndex === 0) {
    prevButton.style.visibility = 'hidden';
  } else {
    prevButton.style.visibility = 'visible';
  }
  
  // Gérer le bouton suivant
  if (state.currentQuestionIndex === questions.length - 1) {
    nextButton.textContent = 'Terminer';
  } else {
    nextButton.textContent = 'Suivant';
  }
  
  // Vérifier si la question courante a une réponse
  const currentQuestion = questions[state.currentQuestionIndex];
  const hasResponse = state.responses[currentQuestion.id];
  
  // Pour les questions à choix multiples, toujours activer le bouton suivant
  if (currentQuestion.type === 'multiple') {
    nextButton.disabled = false;
  } else {
    // Pour les questions à choix unique, activer le bouton suivant seulement si une réponse est sélectionnée
    nextButton.disabled = !hasResponse;
  }
}

// Passe à la question précédente
function goToPreviousQuestion() {
  if (state.currentQuestionIndex > 0) {
    displayQuestion(state.currentQuestionIndex - 1);
  }
}

// Passe à la question suivante ou termine le questionnaire
function goToNextQuestion() {
  // Sauvegarder la réponse courante si elle n'a pas été sauvegardée automatiquement
  const currentQuestion = questions[state.currentQuestionIndex];
  
  if (currentQuestion.type === 'single') {
    const selectedOption = document.querySelector(`input[name="${currentQuestion.id}"]:checked`);
    if (selectedOption) {
      saveResponse(currentQuestion.id, selectedOption.value);
    }
  } else if (currentQuestion.type === 'multiple') {
    saveMultipleResponses(currentQuestion.id, getSelectedOptions(currentQuestion.id));
  }
  
  // Si c'est la dernière question, terminer le questionnaire
  if (state.currentQuestionIndex === questions.length - 1) {
    completeQuestionnaire();
  } else {
    // Sinon, passer à la question suivante
    displayQuestion(state.currentQuestionIndex + 1);
  }
}
// Termine le questionnaire et soumet toutes les réponses
async function completeQuestionnaire() {
  try {
    // Afficher l'écran de chargement
    document.getElementById('questionnaire-container').style.display = 'none';
    document.getElementById('loading-container').style.display = 'flex';
    
    // Préparer les réponses par section
    const part1Responses = prepareResponsesForPart1();
    const part2Responses = prepareResponsesForPart2();
    const part3Responses = prepareResponsesForPart3();
    
    // Soumettre les réponses de chaque partie
    await submitPart1(state.sessionId, part1Responses);
    await submitPart2(state.sessionId, part2Responses);
    await submitPart3(state.sessionId, part3Responses);
    
    // Générer le rapport
    await generateReport();
    
  } catch (error) {
    showError("Une erreur est survenue lors de la soumission de vos réponses. Veuillez réessayer.");
    console.error(error);
  }
}

// Prépare les réponses pour la partie 1
function prepareResponsesForPart1() {
  const part1Questions = questions.filter(q => q.section === 1);
  const responses = {};
  
  // Structurer les réponses par axe RAID
  const riskResponses = [];
  const approachResponses = [];
  const implicationResponses = [];
  const diversificationResponses = [];
  
  part1Questions.forEach(question => {
    const response = state.responses[question.id];
    if (response) {
      if (question.axe === 'R') riskResponses.push(response);
      else if (question.axe === 'A') approachResponses.push(response);
      else if (question.axe === 'I') implicationResponses.push(response);
      else if (question.axe === 'D') diversificationResponses.push(response);
    }
  });
  
  return {
    risk_answers: riskResponses,
    approach_answers: approachResponses,
    implication_answers: implicationResponses,
    diversification_answers: diversificationResponses
  };
}

// Prépare les réponses pour la partie 2
function prepareResponsesForPart2() {
  const part2Questions = questions.filter(q => q.section === 2);
  const responses = {
    knowledge_levels: {},
    preferences: {},
    og_crypto: false,
    strategies: []
  };
  
  part2Questions.forEach(question => {
    const response = state.responses[question.id];
    if (response) {
      if (question.id === 'knowledge_bourse') responses.knowledge_levels.bourse = parseInt(response);
      else if (question.id === 'knowledge_immo') responses.knowledge_levels.immo = parseInt(response);
      else if (question.id === 'knowledge_crypto') responses.knowledge_levels.crypto = parseInt(response);
      else if (question.id === 'preference_bourse') responses.preferences.bourse = parseInt(response);
      else if (question.id === 'preference_immo') responses.preferences.immo = parseInt(response);
      else if (question.id === 'preference_crypto') responses.preferences.crypto = parseInt(response);
      else if (question.id === 'og_crypto') responses.og_crypto = response === 'true';
      else if (question.id === 'strategies') responses.strategies = response;
    }
  });
  
  return responses;
}

// Prépare les réponses pour la partie 3
function prepareResponsesForPart3() {
  const part3Questions = questions.filter(q => q.section === 3);
  const responses = {};
  
  part3Questions.forEach(question => {
    const response = state.responses[question.id];
    if (response) {
      if (question.id === 'objectifs') responses.objectifs = response;
      else if (question.id === 'horizon') responses.horizon = response;
      else if (question.id === 'horizons_multiples') responses.horizons_multiples = response === 'true';
      else if (question.id === 'liquidite') responses.liquidite = parseInt(response);
      else if (question.id === 'evolution') responses.evolution = response;
    }
  });
  
  return responses;
}

// Génère et affiche le rapport final
async function generateReport() {
  try {
    // Obtenir le rapport et l'allocation d'actifs
    const reportData = await getReport(state.sessionId);
    
    // Masquer le conteneur de chargement
    document.getElementById('loading-container').style.display = 'none';
    
    // Afficher les résultats
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'flex';
    
    // Créer le contenu des résultats
    let htmlContent = `
      <h2 class="results-title">Votre Allocation d'Actifs Personnalisée</h2>
      <div class="results-summary">
        <p>${reportData.rapport_texte || "Voici votre allocation d'actifs personnalisée."}</p>
      </div>
      <div class="allocation-container">
    `;
    
    // Ajouter l'allocation si disponible
    if (reportData.allocation && Object.keys(reportData.allocation).length > 0) {
      htmlContent += `<div class="allocation-chart">`;
      
      // Créer un graphique simple pour l'allocation
      for (const [asset, percentage] of Object.entries(reportData.allocation)) {
        const formattedPercentage = typeof percentage === 'number' ? percentage.toFixed(0) : percentage;
        htmlContent += `
          <div class="allocation-bar">
            <div class="allocation-label">${formatAssetName(asset)}</div>
            <div class="allocation-bar-outer">
              <div class="allocation-bar-inner" style="width: ${formattedPercentage}%"></div>
            </div>
            <div class="allocation-percentage">${formattedPercentage}%</div>
          </div>
        `;
      }
      
      htmlContent += `</div>`;
    } else {
      htmlContent += `<p class="error-message">Les données d'allocation ne sont pas disponibles.</p>`;
    }
    
    // Ajouter le profil RAID si disponible
    if (reportData.profil_raid) {
      htmlContent += `
        <div class="raid-profile">
          <h3>Votre Profil RAID</h3>
          <ul>
            <li><strong>Risque:</strong> ${reportData.profil_raid.r}</li>
            <li><strong>Approche:</strong> ${reportData.profil_raid.a}</li>
            <li><strong>Implication:</strong> ${reportData.profil_raid.i}</li>
            <li><strong>Diversification:</strong> ${reportData.profil_raid.d}</li>
          </ul>
        </div>
      `;
    }
    
    // Ajouter un bouton pour recommencer
    htmlContent += `
      <div class="results-actions">
        <button id="restart-button" class="restart-button">Recommencer le questionnaire</button>
      </div>
    `;
    
    htmlContent += `</div>`; // Fermer allocation-container
    
    // Mettre à jour le conteneur de résultats
    resultsContainer.innerHTML = htmlContent;
    
    // Attacher l'événement au bouton de redémarrage
    document.getElementById('restart-button').addEventListener('click', () => {
      location.reload();
    });
    
  } catch (error) {
    showError("Impossible de récupérer vos résultats. Veuillez réessayer.");
    console.error(error);
  }
}

// Affiche un message d'erreur
function showError(message) {
  document.getElementById('questionnaire-container').style.display = 'none';
  document.getElementById('loading-container').style.display = 'none';
  document.getElementById('results-container').style.display = 'none';
  
  const errorContainer = document.getElementById('error-container');
  errorContainer.style.display = 'flex';
  errorContainer.innerHTML = `
    <div class="error-icon">⚠️</div>
    <p class="error-message">${message}</p>
    <button id="error-retry-button" class="btn">Réessayer</button>
  `;
  
  document.getElementById('error-retry-button').addEventListener('click', () => {
    location.reload();
  });
}

// Formate le nom des actifs pour l'affichage
function formatAssetName(assetKey) {
  const assetNames = {
    "bourse": "Actions",
    "obligations": "Obligations",
    "immo": "Immobilier",
    "crypto": "Crypto-monnaies",
    "or": "Or",
    "cash": "Liquidités"
  };
  
  return assetNames[assetKey] || assetKey;
}

export { initQuestionnaire };
// Termine le questionnaire et soumet toutes les réponses
async function completeQuestionnaire() {
  try {
    // Afficher l'écran de chargement
    document.getElementById('questionnaire-container').style.display = 'none';
    document.getElementById('loading-container').style.display = 'flex';
    
    // Préparer les réponses par section
    const part1Responses = prepareResponsesForPart1();
    const part2Responses = prepareResponsesForPart2();
    const part3Responses = prepareResponsesForPart3();
    
    // Soumettre les réponses de chaque partie
    await submitPart1(state.sessionId, part1Responses);
    await submitPart2(state.sessionId, part2Responses);
    await submitPart3(state.sessionId, part3Responses);
    
    // Générer le rapport
    await generateReport();
    
  } catch (error) {
    showError("Une erreur est survenue lors de la soumission de vos réponses. Veuillez réessayer.");
    console.error(error);
  }
}

// Prépare les réponses pour la partie 1
function prepareResponsesForPart1() {
  const part1Questions = questions.filter(q => q.section === 1);
  const responses = {};
  
  // Structurer les réponses par axe RAID
  const riskResponses = [];
  const approachResponses = [];
  const implicationResponses = [];
  const diversificationResponses = [];
  
  part1Questions.forEach(question => {
    const response = state.responses[question.id];
    if (response) {
      if (question.axe === 'R') riskResponses.push(response);
      else if (question.axe === 'A') approachResponses.push(response);
      else if (question.axe === 'I') implicationResponses.push(response);
      else if (question.axe === 'D') diversificationResponses.push(response);
    }
  });
  
  return {
    risk_answers: riskResponses,
    approach_answers: approachResponses,
    implication_answers: implicationResponses,
    diversification_answers: diversificationResponses
  };
}

// Prépare les réponses pour la partie 2
function prepareResponsesForPart2() {
  const part2Questions = questions.filter(q => q.section === 2);
  const responses = {
    knowledge_levels: {},
    preferences: {},
    og_crypto: false,
    strategies: []
  };
  
  part2Questions.forEach(question => {
    const response = state.responses[question.id];
    if (response) {
      if (question.id === 'knowledge_bourse') responses.knowledge_levels.bourse = parseInt(response);
      else if (question.id === 'knowledge_immo') responses.knowledge_levels.immo = parseInt(response);
      else if (question.id === 'knowledge_crypto') responses.knowledge_levels.crypto = parseInt(response);
      else if (question.id === 'preference_bourse') responses.preferences.bourse = parseInt(response);
      else if (question.id === 'preference_immo') responses.preferences.immo = parseInt(response);
      else if (question.id === 'preference_crypto') responses.preferences.crypto = parseInt(response);
      else if (question.id === 'og_crypto') responses.og_crypto = response === 'true';
      else if (question.id === 'strategies') responses.strategies = response;
    }
  });
  
  return responses;
}

// Prépare les réponses pour la partie 3
function prepareResponsesForPart3() {
  const part3Questions = questions.filter(q => q.section === 3);
  const responses = {};
  
  part3Questions.forEach(question => {
    const response = state.responses[question.id];
    if (response) {
      if (question.id === 'objectifs') responses.objectifs = response;
      else if (question.id === 'horizon') responses.horizon = response;
      else if (question.id === 'horizons_multiples') responses.horizons_multiples = response === 'true';
      else if (question.id === 'liquidite') responses.liquidite = parseInt(response);
      else if (question.id === 'evolution') responses.evolution = response;
    }
  });
  
  return responses;
}

// Génère et affiche le rapport final
async function generateReport() {
  try {
    // Obtenir le rapport et l'allocation d'actifs
    const reportData = await getReport(state.sessionId);
    
    // Masquer le conteneur de chargement
    document.getElementById('loading-container').style.display = 'none';
    
    // Afficher les résultats
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'flex';
    
    // Créer le contenu des résultats
    let htmlContent = `
      <h2 class="results-title">Votre Allocation d'Actifs Personnalisée</h2>
      <div class="results-summary">
        <p>${reportData.rapport_texte || "Voici votre allocation d'actifs personnalisée."}</p>
      </div>
      <div class="allocation-container">
    `;
    
    // Ajouter l'allocation si disponible
    if (reportData.allocation && Object.keys(reportData.allocation).length > 0) {
      htmlContent += `<div class="allocation-chart">`;
      
      // Créer un graphique simple pour l'allocation
      for (const [asset, percentage] of Object.entries(reportData.allocation)) {
        const formattedPercentage = typeof percentage === 'number' ? percentage.toFixed(0) : percentage;
        htmlContent += `
          <div class="allocation-bar">
            <div class="allocation-label">${formatAssetName(asset)}</div>
            <div class="allocation-bar-outer">
              <div class="allocation-bar-inner" style="width: ${formattedPercentage}%"></div>
            </div>
            <div class="allocation-percentage">${formattedPercentage}%</div>
          </div>
        `;
      }
      
      htmlContent += `</div>`;
    } else {
      htmlContent += `<p class="error-message">Les données d'allocation ne sont pas disponibles.</p>`;
    }
    
    // Ajouter le profil RAID si disponible
    if (reportData.profil_raid) {
      htmlContent += `
        <div class="raid-profile">
          <h3>Votre Profil RAID</h3>
          <ul>
            <li><strong>Risque:</strong> ${reportData.profil_raid.r}</li>
            <li><strong>Approche:</strong> ${reportData.profil_raid.a}</li>
            <li><strong>Implication:</strong> ${reportData.profil_raid.i}</li>
            <li><strong>Diversification:</strong> ${reportData.profil_raid.d}</li>
          </ul>
        </div>
      `;
    }
    
    // Ajouter un bouton pour recommencer
    htmlContent += `
      <div class="results-actions">
        <button id="restart-button" class="restart-button">Recommencer le questionnaire</button>
      </div>
    `;
    
    htmlContent += `</div>`; // Fermer allocation-container
    
    // Mettre à jour le conteneur de résultats
    resultsContainer.innerHTML = htmlContent;
    
    // Attacher l'événement au bouton de redémarrage
    document.getElementById('restart-button').addEventListener('click', () => {
      location.reload();
    });
    
  } catch (error) {
    showError("Impossible de récupérer vos résultats. Veuillez réessayer.");
    console.error(error);
  }
}

// Affiche un message d'erreur
function showError(message) {
  document.getElementById('questionnaire-container').style.display = 'none';
  document.getElementById('loading-container').style.display = 'none';
  document.getElementById('results-container').style.display = 'none';
  
  const errorContainer = document.getElementById('error-container');
  errorContainer.style.display = 'flex';
  errorContainer.innerHTML = `
    <div class="error-icon">⚠️</div>
    <p class="error-message">${message}</p>
    <button id="error-retry-button" class="btn">Réessayer</button>
  `;
  
  document.getElementById('error-retry-button').addEventListener('click', () => {
    location.reload();
  });
}

// Formate le nom des actifs pour l'affichage
function formatAssetName(assetKey) {
  const assetNames = {
    "bourse": "Actions",
    "obligations": "Obligations",
    "immo": "Immobilier",
    "crypto": "Crypto-monnaies",
    "or": "Or",
    "cash": "Liquidités"
  };
  
  return assetNames[assetKey] || assetKey;
}

export { initQuestionnaire };
