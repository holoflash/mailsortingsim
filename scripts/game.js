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
        gameOverThreshold: -10,
        cashProbability: 0.02,
        caughtProbability: 0.01
    },
    medium: {
        speedThreshold: 8,
        levelUpScore: 10,
        nextLevel: "hard",
        gameOverThreshold: -5,
        cashProbability: 0.3,
        caughtProbability: 0.2
    },
    hard: {
        speedThreshold: 6,
        levelUpScore: null,
        gameOverThreshold: -1,
        cashProbability: 0.4,
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

    // Helper function to create a new line of information
    const createInfoLine = (value) => {
        const line = document.createElement('div');
        line.textContent = value;
        line.className = 'info-line';
        return line;
    };

    // Display each piece of letter information on a new line
    letterDetailsDisplay.appendChild(createInfoLine(`${letter.firstName} ${letter.lastName}`));
    letterDetailsDisplay.appendChild(createInfoLine(letter.street));
    letterDetailsDisplay.appendChild(createInfoLine(letter.zipCode || "???"));
    letterDetailsDisplay.appendChild(createInfoLine(letter.county || "???"));
    letterDetailsDisplay.appendChild(createInfoLine(letter.city + ", " + letter.country));


    // Outgoing notice, displayed if the letter requires outgoing sorting
    if (letter.requiresOutgoing) {
        const outgoingNotice = document.createElement('div');
        outgoingNotice.textContent = "This letter needs to be sorted as OUTGOING!";
        outgoingNotice.className = 'info-line warning';
        letterDetailsDisplay.appendChild(outgoingNotice);
    }

    // Cash-related notice if applicable
    if (letter.containsCash) {
        const pocketCash = confirm("This letter contains cash? Do you want to steal this cash?");

        if (pocketCash) {
            if (Math.random() < gameRules[level].caughtProbability) {
                messageDisplay.className = 'info-box warning';
                messageDisplay.textContent = "You got caught stealing! You're fired! Cash pocketed: $0";
                cash = 0;
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
            messageDisplay.className = 'info-box warning';
            messageDisplay.textContent = "You took too long! You are fired!";
            endGame();
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
        messageDisplay.className = 'info-box warning';
        messageDisplay.textContent = "What are you doing?! You are fired!";
        endGame();
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

const gridItems = document.querySelectorAll('.grid-item');

function endGame(caughtStealing = false) {
    if (caughtStealing) {
        messageDisplay.className = 'info-box warning';
        messageDisplay.textContent = `Game Over! You were caught stealing. Final Score: ${score} | Total Cash Pocketed: $0`;
    } else {
        messageDisplay.className = 'info-box neutral';
        messageDisplay.textContent = `Game Over! Final Score: ${score} | Total Cash Pocketed: $${cash}`;
    }
}

export function startGame() {
    renderGraphics();
    currentLetter = generateNewLetter();

    gridItems.forEach((item) => {
        item.addEventListener('click', () => {
            const zipcode = item.textContent;
            checkAnswer(zipcode);
        });
    });
}
