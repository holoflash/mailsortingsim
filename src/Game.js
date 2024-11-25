import * as data from './data.js';
import * as renderDOM from './renderDOM.js'

const sounds = {
    coins: new Audio('../src/sounds/coins.mp3'),
    correct: new Audio('../src/sounds/correct.mp3'),
    mistake: new Audio('../src/sounds/mistake.mp3'),
    fired: new Audio('../src/sounds/fired.mp3'),
    letterHandling: new Audio('../src/sounds/letterHandling.mp3'),
};

const gameSettings = {
    cash: 0,
    level: 1,
    maxLevel: 13,
    lives: 3,
    initialCashReward: 5,
    initialTime: 20,
    timeBonus: 2,
    requiredCashForLevel: {
        1: 30,
        2: 60,
        3: 100,
        4: 210,
        5: 320,
        6: 430,
        7: 540,
        8: 650,
        9: 760,
        10: 870,
        11: 980,
        12: 1100,
    }
};

let timer = null;
let timeRemaining = 0;
let currentLetter = null;
let firstLetterForNewLevel = true;
let lastAddressInfo = null;
let timerPaused = false;
let firstLetterAtMaxLevel = true;
let gameOver = false;

function getHighscore() {
    const highscore = localStorage.getItem('highscore');
    return highscore ? parseInt(highscore) : 0;
}

function setHighscore(newHighscore) {
    localStorage.setItem('highscore', newHighscore);
}

function startGame() {
    timeRemaining = gameSettings.initialTime;
    renderDOM.graphics(data.messages.title);
    generateNextLetter();
    renderDOM.renderGrid(data.addresses, gameSettings.level, checkAnswer);
    renderDOM.updateHUD(data.messages, gameSettings, timeRemaining);
    renderDOM.displayMessage(data.messages.startGame, 'info-box level-up');
    timer = setInterval(() => {
        if (--timeRemaining <= 0) endGame('time');
        renderDOM.updateHUD(data.messages, gameSettings, timeRemaining);
    }, 1000);

    showDialog([data.messages[`level${gameSettings.level}Dialog`]]);
}

function endGame(reason) {
    gameOver = true;
    sounds.fired.play();
    clearInterval(timer);
    timeRemaining = 0;
    renderDOM.updateHUD(data.messages, gameSettings, timeRemaining);

    const message = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
    }[reason];

    const finalCash = gameSettings.cash;
    const highscore = getHighscore();

    const messageParts = [];

    if (finalCash > highscore) {
        messageParts.push(`${data.messages.newHighscoreMessage} $${finalCash}`);
        messageParts.push(message);
        setHighscore(finalCash);
    } else {
        messageParts.push(message);
        messageParts.push(`${data.messages.finalCashMessage} $${finalCash}.`);
        messageParts.push(`${data.messages.highscoreMessage} $${highscore}`);
    }

    showDialog(messageParts);

    renderDOM.disableGameButtons();
}

export function checkAnswer(userInput) {
    const { timeBonus, initialCashReward } = gameSettings;
    const isCorrect = userInput === currentLetter.sortAs;

    if (isCorrect) {
        sounds.correct.play();
        sounds.coins.play();
        gameSettings.cash += initialCashReward;
        timeRemaining += timeBonus;
        renderDOM.displayMessage(data.messages.correctMessage + ` +$${initialCashReward}`, 'info-box success');
    } else {
        sounds.mistake.play();
        gameSettings.lives--;
        renderDOM.displayMessage(data.messages.incorrectAnswerMessage.replace("{correctAnswer}", currentLetter.sortAs), 'info-box warning');
    }
    renderDOM.updateHUD(data.messages, gameSettings, timeRemaining);
    if (gameSettings.lives <= 0) return endGame('lives');

    const requiredCash = gameSettings.requiredCashForLevel[gameSettings.level];
    if (gameSettings.cash >= requiredCash) {
        handleLevelUp();
    }

    generateNextLetter();
}

function handleLevelUp() {
    if (gameSettings.level > gameSettings.maxLevel) {
        return;
    }

    if (gameSettings.level > 8) {
        gameSettings.lives++;
    }
    sounds.letterHandling.play();
    gameSettings.level++;
    renderDOM.displayMessage(data.messages.levelUp + gameSettings.level, 'info-box level-up');
    renderDOM.updateHUD(data.messages, gameSettings, timeRemaining);

    if (gameSettings.level) {
        showDialog([data.messages[`level${gameSettings.level}Dialog`]]);
    }

    firstLetterForNewLevel = true;
    renderDOM.renderGrid(data.addresses, gameSettings.level, checkAnswer);
}

function generateNextLetter() {
    const availableAddresses = [];
    const maxLevelToConsider = Math.min(gameSettings.level, gameSettings.maxLevel);
    if (firstLetterForNewLevel && gameSettings.level < gameSettings.maxLevel) {
        availableAddresses.push(...data.addresses[`Level ${gameSettings.level}`]);
        firstLetterForNewLevel = false;
    } else {
        for (let i = 1; i <= maxLevelToConsider; i++) {
            availableAddresses.push(...data.addresses[`Level ${i}`]);
        }
    }

    let addressInfo;
    do {
        addressInfo = availableAddresses[Math.floor(Math.random() * availableAddresses.length)];
    } while (addressInfo === lastAddressInfo);
    lastAddressInfo = addressInfo;

    const city = `${addressInfo.city},`;
    const country = addressInfo.country;
    const street = `${addressInfo.streets[Math.floor(Math.random() * addressInfo.streets.length)].trim()} ${Math.floor(Math.random() * 1000) + 1}`;

    currentLetter = {
        firstName: data.firstNames[Math.floor(Math.random() * data.firstNames.length)],
        lastName: data.lastNames[Math.floor(Math.random() * data.lastNames.length)],
        street,
        zipCode: addressInfo.zipCode,
        county: addressInfo.county,
        city,
        country,
        sortAs: addressInfo.sortAs,
    };

    if (gameSettings.level >= gameSettings.maxLevel && firstLetterAtMaxLevel) {
        const fieldToOmit = ["firstName", "lastName", "street", "zipCode", "county", "city", "country"][Math.floor(Math.random() * 7)];
        currentLetter[fieldToOmit] = "";
        currentLetter.sortAs = "BIN";

        if (fieldToOmit === "country") {
            currentLetter.city = addressInfo.city;
            currentLetter.country = "";
        }

        firstLetterAtMaxLevel = false;
    }

    renderDOM.displayLetterDetails(currentLetter);
}

function showDialog(message) {
    const dialog = renderDOM.renderDialog(message);
    if (timer) {
        clearInterval(timer);
        timerPaused = true;
    }

    const okButton = dialog.querySelector('button');

    okButton.addEventListener('click', () => {
        dialog.close();
        document.body.removeChild(dialog);

        if (gameOver) {
            gameOver = false;
            gameSettings.initialTime = 20;
            timeRemaining = gameSettings.initialTime;
            gameSettings.level = 1;
            gameSettings.lives = 3;
            gameSettings.cash = 0;
            startGame();
        } else {
            if (timerPaused) {
                timer = setInterval(() => {
                    if (--timeRemaining <= 0) endGame('time');
                    renderDOM.updateHUD(data.messages, gameSettings, timeRemaining);
                }, 1000);
                timerPaused = false;
            }
        }
    });

    dialog.showModal();
}

startGame();