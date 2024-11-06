import { generateLetter } from './letterGenerator.js';
import { displayMessage, renderGraphics, updateScoreDisplay, updateTimerDisplay, displayLetterDetails, updateElementalDisplay } from './domRenderer.js';
import { gameRules } from './gameRules.js';
import { attemptToInhalePowder, attemptToStealCash } from './powerUps.js';
import { messages } from './data_gr.js';

let level = "easy";
let currentLetter = null;
let timer;
let timeRemaining;
let gridItemClickHandlers = [];

export function startGame() {
    gameRules[level].playing = true;
    renderGraphics(gameRules[level].playing);
    currentLetter = generateNewLetter();
    setupGridItemListeners();
}

export function startTimer() {
    timeRemaining = gameRules[level].speedThreshold;
    updateTimerDisplay(timeRemaining);
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame(false, true);
        }
    }, 1000);
}

export function checkAnswer(userInput) {
    clearInterval(timer);
    let correct = false;

    if (currentLetter.requiresOutgoing) {
        correct = userInput === "OUT";
    } else if (currentLetter.zipCode) {
        correct = userInput === currentLetter.zipCode.slice(-2);
    }

    if (correct) {
        gameRules[level].score++;
        displayMessage(messages.correctMessage, 'info-box success');
    } else {
        gameRules[level].score--;
        displayMessage(messages.incorrectMessage, 'info-box warning');
    }

    updateScoreDisplay(gameRules[level].score, gameRules[level].cash);  // Updated to pass the combined message string

    if (gameRules[level].score < gameRules[level].gameOverThreshold) {
        endGame(false, false);
        return;
    }

    if (gameRules[level].levelUpScore && gameRules[level].score >= gameRules[level].levelUpScore) {
        level = gameRules[level].nextLevel;
        displayMessage(messages.levelUpMessage.replace("{level}", level), 'info-box level-up');
    }

    currentLetter = generateNewLetter();
    startTimer();
}

function generateNewLetter() {
    currentLetter = generateLetter(level);

    if (Math.random() < gameRules[level].powerUpProbability) {
        const powerUpType = getRandomPowerUp();

        switch (powerUpType) {
            case 'inhalePowder':
                currentLetter.powerUp = 'inhalePowder';
                currentLetter.effectType = Math.random() < 0.5 ? 'intoxication' : 'poison';
                currentLetter.inhalePowderEffect = attemptToInhalePowder;
                displayMessage(messages.inhalePowderFoundMessage, 'info-box success');
                break;

            case 'cash':
                currentLetter.powerUp = 'cash';
                currentLetter.cashAmount = Math.floor(Math.random() * 100) + 1;
                displayMessage(messages.cashFoundMessage.replace("{amount}", currentLetter.cashAmount), 'info-box success');
                break;

            default:
                currentLetter.powerUp = null;
                break;
        }
    } else {
        currentLetter.powerUp = null;
    }

    if (currentLetter.powerUp === 'inhalePowder') {
        attemptToInhalePowder(currentLetter, (updatedIntoxication, updatedPoison) => {
            gameRules[level].intoxication = updatedIntoxication;
            gameRules[level].poison = updatedPoison;
            updateElementalDisplay(gameRules[level].poison, gameRules[level].intoxication);
            updateScoreDisplay(gameRules[level].score, gameRules[level].cash, gameRules[level].intoxication, gameRules[level].poison);
        }, gameRules[level].intoxication, gameRules[level].poison);
    }

    if (currentLetter.powerUp === 'cash') {
        const caughtProbability = gameRules[level].caughtProbability;
        attemptToStealCash(currentLetter, caughtProbability, (amountStolen) => {
            gameRules[level].cash += amountStolen;
            updateScoreDisplay(gameRules[level].score, gameRules[level].cash);
            displayMessage(messages.totalCashPocketedMessage.replace("{totalCash}", gameRules[level].cash), 'info-box info');
        });
    }

    displayLetterDetails(currentLetter);
    return currentLetter;
}

function getRandomPowerUp() {
    const powerUps = ['inhalePowder', 'cash'];
    const randomIndex = Math.floor(Math.random() * powerUps.length);
    return powerUps[randomIndex];
}

function setupGridItemListeners() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItemClickHandlers.forEach((handler) => {
        gridItems.forEach((item) => {
            item.removeEventListener('click', handler);
        });
    });

    gridItems.forEach((item) => {
        const handler = () => {
            const zipcode = item.textContent;
            checkAnswer(zipcode);
        };
        gridItemClickHandlers.push(handler);
        item.addEventListener('click', handler);
    });
}

function endGame(caughtStealing = false, outOfTime = false) {
    if (caughtStealing) {
        displayMessage(messages.firedCaughtStealingMessage.replace("{score}", gameRules[level].score), 'info-box warning');
    } else if (outOfTime) {
        displayMessage(messages.firedOutOfTimeMessage.replace("{score}", gameRules[level].score).replace("{totalCash}", gameRules[level].cash), 'info-box warning');
    } else {
        displayMessage(messages.firedMistakesMessage.replace("{score}", gameRules[level].score).replace("{totalCash}", gameRules[level].cash), 'info-box warning');
    }

    gameRules[level].playing = false;

    const gridItems = document.querySelectorAll('.grid-item');
    gridItemClickHandlers.forEach((handler) => {
        gridItems.forEach((item) => {
            item.removeEventListener('click', handler);
        });
    });
}
