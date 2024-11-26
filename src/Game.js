import * as data from './data.js';
import * as renderDOM from './renderDOM.js';

const sounds = {
    coins: new Audio('../src/sounds/coins.mp3'),
    correct: new Audio('../src/sounds/correct.mp3'),
    mistake: new Audio('../src/sounds/mistake.mp3'),
    fired: new Audio('../src/sounds/fired.mp3'),
    letterHandling: new Audio('../src/sounds/letterHandling.mp3'),
};

const INITIAL_GAME_STATE = {
    cash: 0,
    level: 1,
    lives: 3,
    timeRemaining: 20,
};

const CONSTANTS = {
    maxLevel: 13,
    initialCashReward: 5,
    timeBonus: 2,
    requiredCashForLevel: {
        1: 40, 2: 60, 3: 110, 4: 170, 5: 240,
        6: 320, 7: 410, 8: 510, 9: 620,
        10: 740, 11: 870, 12: 1000,
    },
};

const game = {
    ...INITIAL_GAME_STATE,
    setHighscore(newHighscore) {
        localStorage.setItem('highscore', newHighscore);
    },
    getHighscore() {
        return parseInt(localStorage.getItem('highscore') || '0', 10);
    },
};

let timer = null;
let gameOver = false;
let currentLetter = null;
let lastAddressInfo = null;
let firstLetterForNewLevel = true;
let firstLetterAtMaxLevel = true;
let timerPaused = false;
let timeRemaining = game.timeRemaining;

function startGame() {
    gameOver = false;
    timeRemaining = game.timeRemaining;
    renderDOM.graphics(data.messages.title);
    generateNextLetter();
    renderDOM.renderGrid(data.addresses, game.level, checkAnswer);
    renderDOM.updateHUD(data.messages, game, timeRemaining);
    renderDOM.displayMessage(data.messages.startGame, 'info-box level-up');
    timer = setInterval(() => {
        if (--timeRemaining <= 0) endGame('time');
        renderDOM.updateHUD(data.messages, game, timeRemaining);
    }, 1000);

    showDialog([data.messages[`level${game.level}Dialog`]]);
}

function endGame(reason) {
    gameOver = true;
    sounds.fired.play();
    clearInterval(timer);
    timeRemaining = 0;
    renderDOM.updateHUD(data.messages, game, timeRemaining);

    const message = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
    }[reason];

    const messageParts = [];

    if (game.cash > game.getHighscore()) {
        messageParts.push(`${data.messages.newHighscoreMessage} $${game.cash}`);
        messageParts.push(message);
        game.setHighscore(game.cash);
    } else {
        messageParts.push(message);
        messageParts.push(`${data.messages.finalCashMessage} $${game.cash}`);
        messageParts.push(`${data.messages.highscoreMessage} $${game.getHighscore()}`);
    }

    showDialog([messageParts]);

    renderDOM.disableGameButtons();
}

function checkAnswer(userInput) {
    const isCorrect = userInput === currentLetter.sortAs;

    if (isCorrect) {
        sounds.correct.play();
        sounds.coins.play();
        game.cash += CONSTANTS.initialCashReward;
        timeRemaining += CONSTANTS.timeBonus;
        renderDOM.displayMessage(data.messages.correctMessage + ` +$${CONSTANTS.initialCashReward}`, 'info-box success');
    } else {
        sounds.mistake.play();
        game.lives--;
        renderDOM.displayMessage(data.messages.incorrectAnswerMessage.replace("{correctAnswer}", currentLetter.sortAs), 'info-box warning');
    }
    renderDOM.updateHUD(data.messages, game, timeRemaining);
    if (game.lives <= 0) return endGame('lives');

    if (game.cash >= CONSTANTS.requiredCashForLevel[game.level]) {
        handleLevelUp();
    }
    generateNextLetter();
}

function handleLevelUp() {
    if (game.level > CONSTANTS.maxLevel) {
        return;
    }

    if (game.level > 8) {
        game.lives++;
    }
    sounds.letterHandling.play();
    game.level++;
    renderDOM.displayMessage(data.messages.levelUp + game.level, 'info-box level-up');
    renderDOM.updateHUD(data.messages, game, timeRemaining);

    if (game.level) {
        showDialog([data.messages[`level${game.level}Dialog`]]);
    }

    firstLetterForNewLevel = true;
    renderDOM.renderGrid(data.addresses, game.level, checkAnswer);
}

function generateNextLetter() {
    const availableAddresses = [];
    if (firstLetterForNewLevel && game.level < CONSTANTS.maxLevel) {
        availableAddresses.push(...data.addresses[`Level ${game.level}`]);
        firstLetterForNewLevel = false;
    } else {
        for (let i = 1; i <= Math.min(game.level, CONSTANTS.maxLevel); i++) {
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

    if (game.level >= CONSTANTS.maxLevel) {
        const shouldOmitField = firstLetterAtMaxLevel || Math.random() < 0.1;

        if (shouldOmitField) {
            const fieldToOmit = ["firstName", "lastName", "street", "zipCode", "county", "city", "country"][Math.floor(Math.random() * 7)];
            currentLetter[fieldToOmit] = "";
            currentLetter.sortAs = "BIN";

            if (fieldToOmit === "country") {
                currentLetter.city = addressInfo.city;
                currentLetter.country = "";
            }

            firstLetterAtMaxLevel = false;
        }
    }

    renderDOM.displayLetterDetails(currentLetter);
}

function showDialog([message]) {
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
            Object.assign(game, INITIAL_GAME_STATE);
            startGame();
        } else {
            if (timerPaused) {
                timer = setInterval(() => {
                    if (--timeRemaining <= 0) endGame('time');
                    renderDOM.updateHUD(data.messages, game, timeRemaining);
                }, 1000);
                timerPaused = false;
            }
        }
    });

    dialog.showModal();
}

startGame();
