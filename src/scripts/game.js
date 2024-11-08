import * as data from '../data/data_en.js';
import { handleCashPowerUp } from './powerUps.js';
import * as render from './render.js';

const defaultGameRules = {
    score: 0,
    cash: 0,
    playing: false,
    caughtProbability: 0.2,
    powerUpProbability: 0.2
};

export const gameRules = {
    easy: {
        ...defaultGameRules,
        speedThreshold: 10,
        levelUpScore: 5,
        nextLevel: "medium",
        gameOverThreshold: -5
    },
    medium: {
        ...defaultGameRules,
        speedThreshold: 8,
        levelUpScore: 20,
        nextLevel: "hard",
        gameOverThreshold: -2
    },
    hard: {
        ...defaultGameRules,
        speedThreshold: 6,
        levelUpScore: null,
        nextLevel: "insane",
        gameOverThreshold: -11
    }
};

export let level = "easy";
let currentLetter = null;
let timer;
let timeRemaining;

export function startGame() {
    gameRules[level].playing = true;
    render.graphics(gameRules[level].playing);
    currentLetter = generateNewLetter();
    render.setupGridItemListeners();
}

function startTimer() {
    timeRemaining = gameRules[level].speedThreshold;
    render.updateTimerDisplay(timeRemaining);
    timer = setInterval(() => {
        timeRemaining--;
        render.updateTimerDisplay(timeRemaining);

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
        render.displayMessage(data.messages.correctMessage, 'info-box success');
    } else {
        gameRules[level].score--;
        render.displayMessage(data.messages.incorrectMessage, 'info-box warning');
    }

    render.updateScoreDisplay(gameRules[level].score);
    render.updateCashDisplay(gameRules[level].cash);

    if (gameRules[level].score < gameRules[level].gameOverThreshold) {
        endGame(false, false);
        return;
    }

    if (gameRules[level].levelUpScore && gameRules[level].score >= gameRules[level].levelUpScore) {
        level = gameRules[level].nextLevel;
        render.displayMessage(data.messages.levelUpMessage.replace("{level}", level), 'info-box level-up');
    }

    currentLetter = generateNewLetter();
    startTimer();
}

function endGame(caughtStealing = false, outOfTime = false) {
    const getMessage = () => {
        if (caughtStealing) {
            return data.messages.firedCaughtStealingMessage;
        } else if (outOfTime) {
            return data.messages.firedOutOfTimeMessage;
        }
        return data.messages.firedMistakesMessage;
    };

    render.displayMessage(getMessage(), 'info-box warning');
    gameRules[level].playing = false;
    render.removeGridItemClickListeners();
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNewLetter() {
    currentLetter = generateLetter(level);

    if (Math.random() < gameRules[level].powerUpProbability) {
        handleCashPowerUp(amount => {
            gameRules[level].cash += amount;
            render.updateScoreDisplay(gameRules[level].score);
            render.updateCashDisplay(gameRules[level].cash);
        });
    } else {
        currentLetter.powerUp = null;
    }

    render.displayLetterDetails(currentLetter);
    return currentLetter;
}

function generateLetter(level) {
    const firstName = getRandomElement(data.firstNames);
    const lastName = getRandomElement(data.lastNames);

    // Retrieve a random address entry, including zip code, county, and street options
    let [zipCode, addressInfo] = getRandomElement(Object.entries(data.addresses));
    const street = `${getRandomElement(addressInfo.streets)} ${Math.floor(Math.random() * 1000) + 1}`;
    const county = addressInfo.county;

    let city = data.defaultCity;
    let country = data.defaultCountry;
    let requiresOutgoing = false;

    if (level === "medium") {
        if (Math.random() < 0.5) city = getRandomElement(data.otherCities);
        if (Math.random() < 0.5) country = getRandomElement(data.otherCountries);
    } else if (level === "hard") {
        if (Math.random() < 0.3) {
            zipCode = `${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 90) + 10}`;
            requiresOutgoing = true;
        } else if (Math.random() < 0.3) {
            zipCode = null;
            requiresOutgoing = true;
        }
        if (Math.random() < 0.2) {
            city = getRandomElement(data.otherCities);
            country = getRandomElement(data.otherCountries);
            requiresOutgoing = true;
        }
    }

    return {
        firstName,
        lastName,
        street,
        zipCode,
        county,
        city,
        country,
        requiresOutgoing
    };
}
