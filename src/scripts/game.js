import * as data from '../data/data_en.js';
import * as render from './render.js';
import { cashPowerUp } from './powerUps.js';

let isRunning = false;
let timer = null;
let timeRemaining = 0;
let currentLetter = null;

export const Player = {
    cash: 0,
    level: 1,
    lives: 3,
    caughtProbability: 0.5,
    cashProbability: 0.1,
};

export const gameConfig = {
    levelMultiplier: 100,
    baseCashReward: 5,
    cashRewardIncrement: 2,
    randomizationCap: 0.9,
    randomizationBaseDivisor: 20,
    initialTime: 10,
    timeBonus: 5,
};

export function startGame() {
    isRunning = true;
    timeRemaining = gameConfig.initialTime;
    render.graphics(isRunning);
    render.setupGridItemListeners();

    generateNextLetter();
    render.updateTimerDisplay(timeRemaining);
    render.updateLivesDisplay(Player.lives);
    render.updateCashDisplay(Player.cash);
    render.displayMessage(data.messages.gameStart, 'info-box level-up');


    timer = setInterval(() => {
        if (--timeRemaining <= 0) {
            endGame('time');
        }
        render.updateTimerDisplay(timeRemaining);
    }, 1000);
}

export function endGame(reason) {
    clearInterval(timer);
    timeRemaining = 0;
    render.updateTimerDisplay(timeRemaining);
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
    const addressInfo = getRandomElement(data.addresses);

    const streetName = getRandomElement(addressInfo.streets);
    const formattedStreet = streetName.includes("##")
        ? streetName.replace("##", "").trim()
        : `${streetName} ${Math.floor(Math.random() * 1000) + 1}`;

    const letter = {
        firstName: getRandomElement(data.firstNames),
        lastName: getRandomElement(data.lastNames),
        street: formattedStreet,
        zipCode: addressInfo.zipCode,
        county: addressInfo.county,
        city: addressInfo.city,
        country: addressInfo.country,
        sortAs: addressInfo.sortAs,
        hasCash: Math.random() < Player.cashProbability,
        cashAmount: Math.random() < Player.cashProbability ? cashPowerUp.getAmount() : 0
    };

    currentLetter = letter;
    render.displayLetterDetails(currentLetter);
}



const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];
