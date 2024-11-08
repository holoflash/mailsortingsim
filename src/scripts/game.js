import * as data from '../data/data_en.js';
import { handleCashPowerUp } from './powerUps.js';
import * as render from './render.js';

export const gameRules = {
    easy: {
        speedThreshold: 10,
        levelUpScore: 5,
        nextLevel: "medium",
        gameOverThreshold: -5
    },
    medium: {
        speedThreshold: 8,
        levelUpScore: 20,
        nextLevel: "hard",
        gameOverThreshold: -2
    },
    hard: {
        speedThreshold: 6,
        levelUpScore: null,
        nextLevel: "insane",
        gameOverThreshold: -11
    }
};

export const player = {
    score: 0,
    cash: 0,
    level: "easy",
    playing: false,
    caughtProbability: 0.2,
    cashProbability: 0.2
};

let currentLetter = null;
let timer;
let timeRemaining;

export function startGame() {
    player.playing = true;
    render.graphics(player.playing);
    currentLetter = generateLetter();
    render.setupGridItemListeners();
    startTimer();
}

function startTimer() {
    timeRemaining = gameRules[player.level].speedThreshold;
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
        player.score++;
        render.displayMessage(data.messages.correctMessage, 'info-box success');
    } else {
        player.score--;
        render.displayMessage(data.messages.incorrectMessage, 'info-box warning');
    }

    render.updateScoreDisplay(player.score);
    render.updateCashDisplay(player.cash);

    if (player.score < gameRules[player.level].gameOverThreshold) {
        endGame(false, false);
        return;
    }

    if (gameRules[player.level].levelUpScore && player.score >= gameRules[player.level].levelUpScore) {
        player.level = gameRules[player.level].nextLevel;
        render.displayMessage(data.messages.levelUpMessage.replace("{level}", player.level), 'info-box level-up');
    }

    currentLetter = generateLetter();
}

export function endGame(caughtStealing = false, outOfTime = false) {
    const getMessage = () => {
        if (caughtStealing) {
            return data.messages.firedCaughtStealingMessage;
        } else if (outOfTime) {
            return data.messages.firedOutOfTimeMessage;
        }
        return data.messages.firedMistakesMessage;
    };

    render.displayMessage(getMessage(), 'info-box warning');
    player.playing = false;
    render.removeGridItemClickListeners();
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateLetter() {
    const firstName = getRandomElement(data.firstNames);
    const lastName = getRandomElement(data.lastNames);
    let [zipCode, addressInfo] = getRandomElement(Object.entries(data.addresses));
    const street = `${getRandomElement(addressInfo.streets)} ${Math.floor(Math.random() * 1000) + 1}`;
    const county = addressInfo.county;

    let city = data.defaultCity;
    let country = data.defaultCountry;
    let requiresOutgoing = false;

    if (player.level === "medium") {
        if (Math.random() < 0.5) city = getRandomElement(data.otherCities);
        if (Math.random() < 0.5) country = getRandomElement(data.otherCountries);
    } else if (player.level === "hard") {
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

    let letter = {
        firstName,
        lastName,
        street,
        zipCode,
        county,
        city,
        country,
        requiresOutgoing
    };

    if (Math.random() < player.cashProbability) {
        handleCashPowerUp(amount => {
            player.cash += amount;
            render.updateScoreDisplay(player.score);
            render.updateCashDisplay(player.cash);
        });
    }
    render.displayLetterDetails(letter);
    return letter;
}
