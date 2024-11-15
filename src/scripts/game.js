import * as data from '../data/data_en.js';
import { handleCashPowerUp } from './powerUps.js';
import * as render from './render.js';

let isRunning = false;
let timer = null;
let timeRemaining = 0;
let currentLetter = null;

export const Player = {
    cash: 0,
    level: 1,
    lives: 3,
    caughtProbability: 0.5,
    cashProbability: 0.08,
};

export const gameConfig = {
    levelMultiplier: 100,
    baseCashReward: 5,
    cashRewardIncrement: 2,
    randomizationCap: 0.9,
    randomizationBaseDivisor: 20,
    initialTime: 10,
    timeBonus: 3,
};

export function startGame() {
    isRunning = true;
    timeRemaining = gameConfig.initialTime;
    Player.cash = 0;
    Player.level = 1;
    Player.lives = 3;

    render.graphics(isRunning);
    render.setupGridItemListeners();

    generateNextLetter();
    render.updateTimerDisplay(timeRemaining);

    clearInterval(timer);
    timer = setInterval(() => {
        if (--timeRemaining <= 0) endGame('time');
        render.updateTimerDisplay(timeRemaining);
    }, 1000);
}

export function endGame(reason) {
    clearInterval(timer);
    isRunning = false;

    const message = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
        caught: data.messages.firedCaughtStealingMessage,
    }[reason];

    render.displayMessage(message, 'info-box warning');
    render.removeGridItemClickListeners();
}

export function checkAnswer(userInput) {
    const { levelMultiplier, baseCashReward, cashRewardIncrement, timeBonus } = gameConfig;
    const cashReward = baseCashReward + Player.level * cashRewardIncrement;
    const levelUpScore = Player.level * levelMultiplier;

    const isCorrect = userInput === currentLetter.sortAs;

    if (isCorrect) {
        Player.cash += cashReward;
        timeRemaining += timeBonus;
        render.displayMessage(
            `${data.messages.correctMessage} +$${cashReward}`,
            'info-box success'
        );
        render.updateTimerDisplay(timeRemaining);
    } else {
        Player.lives--;
        render.displayMessage(data.messages.incorrectMessage, 'info-box warning');
    }

    render.updateCashDisplay(Player.cash);
    render.updateLivesDisplay(Player.lives);

    if (Player.lives <= 0) return endGame('lives');

    if (Player.cash >= levelUpScore) {
        Player.level++;
        render.displayMessage(
            data.messages.levelUpMessage.replace('{level}', Player.level),
            'info-box level-up'
        );
    }

    generateNextLetter();
}


export function generateNextLetter() {
    const [zipCode, addressInfo] = getRandomElement(Object.entries(data.addresses));

    const letter = {
        firstName: getRandomElement(data.firstNames),
        lastName: getRandomElement(data.lastNames),
        street: `${getRandomElement(addressInfo.streets)} ${Math.floor(Math.random() * 1000) + 1}`,
        zipCode,
        county: addressInfo.county,
        city: addressInfo.city,
        country: addressInfo.country,
        sortAs: addressInfo.sortAs,
    };

    if (Math.random() < Player.cashProbability) {
        handleCashPowerUp(amount => {
            Player.cash += amount;
            render.updateCashDisplay(Player.cash);
        });
    }

    currentLetter = letter;
    render.displayLetterDetails(currentLetter);
}

const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

