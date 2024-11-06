import { generateLetter } from './letterGenerator.js';
import { displayMessage, renderGraphics, updateScoreDisplay, updateTimerDisplay, displayLetterDetails, updateElementalDisplay } from './domRenderer.js';
import { gameRules } from './gameRules.js';
import { attemptToStealCash } from './cashHandler.js'; // Import the attemptToStealCash function
import { attemptToInhalePowder } from './powderHandler.js'; // Import the inhale powder handler

let level = "easy";
let currentLetter = null;
let timer;
let timeRemaining;
let gridItemClickHandlers = [];

export function startGame() {
    gameRules[level].playing = true; // Set the playing state for the current level
    renderGraphics(gameRules[level].playing);
    currentLetter = generateNewLetter();
    setupGridItemListeners();
}

// Starts the countdown timer for each round
export function startTimer() {
    timeRemaining = gameRules[level].speedThreshold;
    updateTimerDisplay(timeRemaining);
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame(false, true); // Out of time
        }
    }, 1000);
}

// Checks the player's answer and updates the score
export function checkAnswer(userInput) {
    clearInterval(timer);  // Stop the timer to avoid overlapping
    let correct = false;

    if (currentLetter.requiresOutgoing) {
        correct = userInput.toLowerCase() === "outgoing";
    } else if (currentLetter.zipCode) {
        correct = userInput === currentLetter.zipCode.slice(-2);
    }

    if (correct) {
        gameRules[level].score++;
        displayMessage("Correct!", 'info-box success');
    } else {
        gameRules[level].score--;
        displayMessage("Incorrect.", 'info-box warning');
    }

    updateScoreDisplay(gameRules[level].score, gameRules[level].cash);

    if (gameRules[level].score < gameRules[level].gameOverThreshold) {
        endGame(false, false); // Low score
        return;
    }

    if (gameRules[level].levelUpScore && gameRules[level].score >= gameRules[level].levelUpScore) {
        level = gameRules[level].nextLevel;
        displayMessage(`Level Up! Welcome to ${capitalizeFirstLetter(level)} Mode!`, 'info-box level-up');
    }

    currentLetter = generateNewLetter();
    startTimer(); // Restart the timer for the next round
}

function generateNewLetter() {
    currentLetter = generateLetter(level);

    // Handle power-ups, including cash and inhalePowder
    if (Math.random() < gameRules[level].powerUpProbability) {
        const powerUpType = getRandomPowerUp(); // Randomly decide the power-up type

        switch (powerUpType) {
            case 'inhalePowder':
                currentLetter.powerUp = 'inhalePowder';
                currentLetter.effectType = Math.random() < 0.5 ? 'intoxication' : 'poison'; // Randomly assign rush or poison
                currentLetter.inhalePowderEffect = attemptToInhalePowder; // Assign the inhalePowder function
                displayMessage("You found Inhale Powder!", 'info-box success');
                break;

            case 'cash':
                currentLetter.powerUp = 'cash';
                currentLetter.cashAmount = Math.floor(Math.random() * 100) + 1; // Random cash amount
                displayMessage(`You found $${currentLetter.cashAmount}! It's a power-up!`, 'info-box success');
                break;

            default:
                currentLetter.powerUp = null; // No power-up for this letter
                break;
        }
    } else {
        currentLetter.powerUp = null; // No power-up for this letter
    }

    // Inhale powder effect logic (ask if the player wants to use it)
    if (currentLetter.powerUp === 'inhalePowder') {
        attemptToInhalePowder(currentLetter, (updatedIntoxication, updatedPoison) => {
            // After inhaling powder, update the display
            gameRules[level].intoxication = updatedIntoxication; // Update intoxication state
            gameRules[level].poison = updatedPoison; // Update poison state
            updateElementalDisplay(gameRules[level].poison, gameRules[level].intoxication); // Update the display with the new poison value
            updateScoreDisplay(gameRules[level].score, gameRules[level].cash, gameRules[level].intoxication, gameRules[level].poison); // Update all relevant UI values
        }, gameRules[level].intoxication, gameRules[level].poison); // Pass the current values of intoxication and poison
    }

    // If cash is found, handle the steal action as usual (cash logic remains unchanged)
    if (currentLetter.powerUp === 'cash') {
        const caughtProbability = gameRules[level].caughtProbability;
        attemptToStealCash(currentLetter, caughtProbability, (amountStolen) => {
            gameRules[level].cash += amountStolen; // Update the cash
            updateScoreDisplay(gameRules[level].score, gameRules[level].cash); // Update display with updated cash
            displayMessage(`Total Cash Pocketed: $${gameRules[level].cash}`, 'info-box info');
        });
    }

    displayLetterDetails(currentLetter);
    return currentLetter;
}

// Helper function to randomly choose a power-up type (only cash and inhalePowder now)
function getRandomPowerUp() {
    const powerUps = ['inhalePowder', 'cash']; // Only include inhalePowder and cash as power-ups
    const randomIndex = Math.floor(Math.random() * powerUps.length);
    return powerUps[randomIndex];
}

// Sets up listeners on grid items for the player's answers
function setupGridItemListeners() {
    const gridItems = document.querySelectorAll('.grid-item');

    // Remove any existing event listeners to prevent duplication
    gridItemClickHandlers.forEach((handler) => {
        gridItems.forEach((item) => {
            item.removeEventListener('click', handler);
        });
    });

    // Add new event listeners
    gridItems.forEach((item) => {
        const handler = () => {
            const zipcode = item.textContent;
            checkAnswer(zipcode);
        };
        gridItemClickHandlers.push(handler);
        item.addEventListener('click', handler);
    });
}

// Ends the game with a specific message
function endGame(caughtStealing = false, outOfTime = false) {
    if (caughtStealing) {
        displayMessage(`YOU'RE FIRED! You were caught stealing! Final Score: ${gameRules[level].score} | Total Cash Pocketed: $0`, 'info-box warning');
    } else if (outOfTime) {
        displayMessage(`YOU'RE FIRED! Too slow! Final Score: ${gameRules[level].score} | Total Cash Pocketed: $${gameRules[level].cash}`, 'info-box warning');
    } else {
        displayMessage(`YOU'RE FIRED! You made too many mistakes! Final Score: ${gameRules[level].score} | Total Cash Pocketed: $${gameRules[level].cash}`, 'info-box warning');
    }

    gameRules[level].playing = false;

    // Remove event listeners from grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItemClickHandlers.forEach((handler) => {
        gridItems.forEach((item) => {
            item.removeEventListener('click', handler);
        });
    });
}

