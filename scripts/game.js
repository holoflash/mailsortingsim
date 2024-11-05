import { generateLetter } from './letterGenerator.js';
import { renderGraphics } from './renderGraphics.js';

let score = 0;
let cash = 0;
let level = "easy";
let currentLetter = null;

const gameRules = {
    easy: {
        speedThreshold: 10,
        levelUpScore: 5,
        nextLevel: "medium",
        gameOverThreshold: -5,
        cashProbability: 0.1,
        caughtProbability: 0.1
    },
    medium: {
        speedThreshold: 8,
        levelUpScore: 10,
        nextLevel: "hard",
        gameOverThreshold: -2,
        cashProbability: 0.2,
        caughtProbability: 0.2
    },
    hard: {
        speedThreshold: 6,
        levelUpScore: null,
        gameOverThreshold: -1,
        cashProbability: 0.3,
        caughtProbability: 0.3
    }
};

let timer;
let timeRemaining;

// DOM elements
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const letterDetailsDisplay = document.getElementById('letter-details');
const messageDisplay = document.getElementById('message');

function updateScore() {
    scoreDisplay.textContent = `Score: ${score} | Cash: $${cash}`;
}

function updateTimer() {
    timerDisplay.textContent = `Time remaining: ${timeRemaining} seconds`;
}

function displayLetter(letter) {
    // Clear previous content
    letterDetailsDisplay.innerHTML = '';

    const createInfoLine = (value) => {
        const line = document.createElement('div');
        line.textContent = value;
        line.className = 'info-line';
        return line;
    };

    letterDetailsDisplay.appendChild(createInfoLine(`${letter.firstName} ${letter.lastName}`));
    letterDetailsDisplay.appendChild(createInfoLine(letter.street));
    letterDetailsDisplay.appendChild(createInfoLine(letter.zipCode || "???"));
    letterDetailsDisplay.appendChild(createInfoLine(letter.county || "???"));
    letterDetailsDisplay.appendChild(createInfoLine(`${letter.city}, ${letter.country}`));

    if (letter.requiresOutgoing) {
        const outgoingNotice = document.createElement('div');
        outgoingNotice.textContent = "This letter needs to be sorted as OUTGOING!";
        outgoingNotice.className = 'info-line warning';
        letterDetailsDisplay.appendChild(outgoingNotice);
    }

    if (letter.containsCash) {
        const pocketCash = confirm("This letter contains cash? Do you want to steal this cash?");

        if (pocketCash) {
            if (Math.random() < gameRules[level].caughtProbability) {
                endGame(true); // Caught stealing
                return;
            } else {
                cash += letter.cashAmount;
                messageDisplay.className = 'info-box success';
                messageDisplay.textContent = `You pocketed $${letter.cashAmount}. Total cash: $${cash}`;
                updateScore();
            }
        }
    }

    updateScore();
    startTimer();
}

function startTimer() {
    timeRemaining = gameRules[level].speedThreshold;
    updateTimer();
    timer = setInterval(() => {
        timeRemaining--;
        updateTimer();

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame(false, true); // Out of time
        }
    }, 1000);
}

export function checkAnswer(userInput) {
    clearInterval(timer);
    let correct = false;

    if (currentLetter.requiresOutgoing) {
        correct = userInput.toLowerCase() === "outgoing";
    } else if (currentLetter.zipCode) {
        correct = userInput === currentLetter.zipCode.slice(-2);
    }

    if (correct) {
        score++;
        messageDisplay.className = 'info-box success';
        messageDisplay.textContent = "Correct!";
    } else {
        score--;
        messageDisplay.className = 'info-box warning';
        messageDisplay.textContent = "Incorrect.";
    }

    updateScore();

    if (score < gameRules[level].gameOverThreshold) {
        endGame(false, false); // Low score
        return;
    }

    if (gameRules[level].levelUpScore && score >= gameRules[level].levelUpScore) {
        level = gameRules[level].nextLevel;
        messageDisplay.className = 'info-box level-up';
        messageDisplay.textContent = `Level Up! Welcome to ${capitalizeFirstLetter(level)} Mode!`;
    }

    currentLetter = generateNewLetter();
}

function generateNewLetter() {
    currentLetter = generateLetter(level);

    if (Math.random() < gameRules[level].cashProbability) {
        currentLetter.containsCash = true;
        currentLetter.cashAmount = Math.floor(Math.random() * 100) + 1;
    } else {
        currentLetter.containsCash = false;
    }

    displayLetter(currentLetter);
    return currentLetter;
}

let gridItemClickHandlers = []; // Store the event listener functions

export function startGame() {
    renderGraphics();
    currentLetter = generateNewLetter();

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
        gridItemClickHandlers.push(handler); // Store the handler for later removal
        item.addEventListener('click', handler);
    });
}

function endGame(caughtStealing = false, outOfTime = false) {
    if (caughtStealing) {
        messageDisplay.className = 'info-box warning';
        messageDisplay.textContent = `YOU'RE FIRED! You were caught stealing! Final Score: ${score} | Total Cash Pocketed: $0`;
    } else if (outOfTime) {
        messageDisplay.className = 'info-box warning';
        messageDisplay.textContent = `YOU'RE FIRED! Too slow! Final Score: ${score} | Total Cash Pocketed: $${cash}`;
    } else {
        messageDisplay.className = 'info-box warning';
        messageDisplay.textContent = `YOU'RE FIRED! You made too many mistakes! Final Score: ${score} | Total Cash Pocketed: $${cash}`;
    }

    // Deactivate all event listeners by removing them
    const gridItems = document.querySelectorAll('.grid-item');
    gridItemClickHandlers.forEach((handler) => {
        gridItems.forEach((item) => {
            item.removeEventListener('click', handler);
        });
    });
}
