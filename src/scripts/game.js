import * as data from '../data/data_en.js';
import { handleCashPowerUp } from './powerUps.js';
import * as render from './render.js';

let isRunning = false;
let timer = null;
let timeRemaining = 0;

export const Player = {
    cash: 0,
    level: 1,
    lives: 5,
    caughtProbability: 0.2,
    cashProbability: 0.05,
};

function getLevelConfig(level) {
    return {
        levelUpScore: level * 100,
        cashReward: 5 + level * 2,
        randomizationDepth: Math.min(level, 5),
    };
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function chance(probability) {
    return Math.random() < probability;
}

function resetGameState() {
    isRunning = true;
    timeRemaining = 10;
    Player.cash = 0;
    Player.level = 1;
    Player.lives = 5;
}

export function startGame() {
    resetGameState();

    render.graphics(isRunning);
    render.setupGridItemListeners();

    generateNextLetter();
    startGameLoop();
}

function startGameLoop() {
    render.updateTimerDisplay(timeRemaining);
    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        render.updateTimerDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            endGame('time');
        }
    }, 1000);
}


export function endGame(reason) {
    console.log(reason)
    clearInterval(timer);
    isRunning = false;

    const messages = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
        caught: data.messages.firedCaughtStealingMessage,
    };

    const message = messages[reason];
    render.displayMessage(message, 'info-box warning');
    render.removeGridItemClickListeners();
}

export function checkAnswer(userInput) {
    const currentLetter = getCurrentLetter();
    const levelConfig = getLevelConfig(Player.level);

    let isCorrect;

    if (currentLetter.requiresOutgoing) {
        isCorrect = userInput === 'OUT';
    } else {
        isCorrect = currentLetter.zipCode && userInput === currentLetter.zipCode.slice(-2);
    }

    if (isCorrect) {
        Player.cash += levelConfig.cashReward;
        render.displayMessage(
            `${data.messages.correctMessage} +$${levelConfig.cashReward}`,
            'info-box success'
        );
        timeRemaining += 5;
        render.updateTimerDisplay(timeRemaining);
    } else {
        Player.lives--;
        render.displayMessage(data.messages.incorrectMessage, 'info-box warning');
    }

    render.updateCashDisplay(Player.cash);
    render.updateLivesDisplay(Player.lives);

    if (Player.lives <= 0) {
        endGame('lives');
        return;
    }

    if (Player.cash >= levelConfig.levelUpScore) {
        Player.level++;
        render.displayMessage(
            data.messages.levelUpMessage.replace('{level}', Player.level),
            'info-box level-up'
        );
    }

    generateNextLetter();
}

let currentLetter = null;

function generateNextLetter() {
    currentLetter = generateLetter();
    render.displayLetterDetails(currentLetter);
}

function getCurrentLetter() {
    return currentLetter;
}

function generateLetter() {
    const firstName = getRandomElement(data.firstNames);
    const lastName = getRandomElement(data.lastNames);
    const [zipCode, addressInfo] = getRandomElement(Object.entries(data.addresses));
    const street = `${getRandomElement(addressInfo.streets)} ${Math.floor(Math.random() * 1000) + 1}`;
    const county = addressInfo.county;

    let letter = {
        firstName,
        lastName,
        street,
        zipCode,
        county,
        city: data.defaultCity,
        country: data.defaultCountry,
        requiresOutgoing: false,
    };

    const randomizationChance = Math.min((Player.level - 1) / 30, 0.7);

    const randomizations = [
        () => (letter.city = getRandomElement(data.otherCities)), // Random city
        () => (letter.country = getRandomElement(data.otherCountries)), // Random country
        () => (letter.zipCode = null), // Null zip code
    ];

    // Apply randomizations based on the randomization chance
    randomizations.forEach(randomize => {
        if (chance(randomizationChance)) randomize();
    });

    if (!letter.zipCode || letter.country !== data.defaultCountry || letter.city !== data.defaultCity) {
        letter.requiresOutgoing = true;
    }

    if (chance(Player.cashProbability)) {
        handleCashPowerUp(amount => {
            Player.cash += amount;
            render.updateCashDisplay(Player.cash);
        });
    }

    return letter;
}
