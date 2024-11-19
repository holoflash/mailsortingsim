import * as data from './data.js';
import { sounds } from './sounds/sounds.js';
import { gameSettings } from './gameSettings.js';

let timer = null;
let timeRemaining = 0;
let currentLetter = null;

function startGame() {
    timeRemaining = gameSettings.initialTime;
    graphics();
    setupGridItemListeners();
    generateNextLetter();
    updateHUD();
    displayMessage(data.messages.gameStart, 'info-box level-up');
    timer = setInterval(() => {
        if (--timeRemaining <= 0) endGame('time');
        updateHUD();
    }, 1000);
}

function endGame(reason) {
    sounds.fired.play();
    clearInterval(timer);
    timeRemaining = 0;
    updateHUD();

    const message = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
        caught: data.messages.firedCaughtStealingMessage,
    }[reason];

    displayMessage(message, 'info-box warning');
    disableGameButtons();
}

function checkAnswer(userInput) {
    const { baseCashReward, cashRewardIncrement, levelMultiplier, timeBonus } = gameSettings;
    const cashReward = baseCashReward + gameSettings.level * cashRewardIncrement;
    const isCorrect = userInput === currentLetter.sortAs;
    const messageKey = isCorrect ? 'correctMessage' : 'incorrectMessage';

    if (isCorrect) {
        sounds.correct.play()
        gameSettings.cash += cashReward;
        timeRemaining += timeBonus;
    } else {
        sounds.mistake.play();
        gameSettings.lives--;
    }

    displayMessage(data.messages[messageKey] + (isCorrect ? ` +$${cashReward}` : ''), isCorrect ? 'info-box success' : 'info-box warning');
    updateHUD();

    if (gameSettings.lives <= 0) return endGame('lives');
    if (gameSettings.cash >= gameSettings.level * levelMultiplier) {
        gameSettings.level++;
        displayMessage(data.messages.levelUpMessage.replace('{level}', gameSettings.level), 'info-box level-up');
    }

    generateNextLetter();
}

function generateNextLetter() {
    const { addresses, firstNames, lastNames } = data;
    const addressInfo = addresses[Math.floor(Math.random() * addresses.length)]
    const streetName = addressInfo.streets[Math.floor(Math.random() * addressInfo.streets.length)].replace("##", "").trim();
    const formattedStreet = streetName.includes("##")
        ? streetName
        : `${streetName} ${Math.floor(Math.random() * 1000) + 1}`;

    currentLetter = {
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        street: formattedStreet,
        ...addressInfo,
        hasCash: Math.random() < gameSettings.cashProbability,
        cashAmount: Math.max(cashPowerUp.getAmount(), 1),
    };

    displayLetterDetails(currentLetter);
}

const cashPowerUp = {
    getAmount: () => Math.floor(Math.random() * 100) + 1,

    createButton: letter => {
        const button = document.createElement('button');
        button.className = 'cash-button';

        const cashText = document.createElement('span');
        cashText.textContent = data.messages.stealCashActionText.replace("{amount}", letter.cashAmount);
        button.appendChild(cashText);

        button.addEventListener('click', () => {
            button.remove();
            cashPowerUp.handleAction(letter.cashAmount, gameSettings.caughtProbability);
        });

        return button;
    },

    handleAction: (amount, caughtProbability) => {
        const caught = Math.random() < caughtProbability;
        const amountStolen = caught ? 0 : amount;
        const messageKey = amountStolen ? 'pocketCashMessage' : 'caughtStealingMessage';
        const messageType = amountStolen ? 'info-box success' : 'info-box warning';

        displayMessage(data.messages[messageKey].replace("{amount}", amount), messageType);

        if (caught) {
            sounds.caughtStealing.play();
            gameSettings.lives--;
            gameSettings.cash -= amount;
            updateHUD();

            if (gameSettings.lives <= 0) {
                displayMessage(data.messages.firedMistakesMessage, 'info-box warning');
                disableGameButtons();
            }
        } else {
            sounds.coins.play();
            gameSettings.cash += amount;
            updateHUD();
        }
    }
};

function displayLetterDetails(letter) {
    const letterDetailsDisplay = document.getElementById('letter-details');
    letterDetailsDisplay.textContent = '';

    const createInfoLine = (value, className = "") => {
        const line = document.createElement('p');
        line.textContent = value;
        if (className) line.classList.add(className);
        return line;
    };

    const letterContainer = document.createElement('div');
    letterContainer.classList.add('letter-container');
    letterContainer.appendChild(createInfoLine(`${letter.firstName} ${letter.lastName}`, 'letter-name'));
    letterContainer.appendChild(createInfoLine(letter.street, 'letter-street'));
    letterContainer.appendChild(createInfoLine(`${letter.zipCode || data.messages.unknownZipCode} ${letter.county}`, 'letter-zip-county'));
    letterContainer.appendChild(createInfoLine(`${letter.city}, ${letter.country}`, 'letter-location'));

    if (letter.hasCash) {
        const cashButton = cashPowerUp.createButton(letter);
        letterContainer.appendChild(cashButton);
    }

    letterDetailsDisplay.appendChild(letterContainer);
}

function graphics() {
    const body = document.body;
    body.textContent = '';

    const headerTitle = document.createElement('div');
    headerTitle.id = 'header-title';
    headerTitle.textContent = data.messages.headerTitle;
    body.appendChild(headerTitle);

    const instructions = document.createElement('div');
    instructions.id = 'instructions';
    instructions.textContent = data.messages.instructions;
    body.appendChild(instructions);

    const gameInfo = document.createElement('div');
    gameInfo.id = 'game-info';

    const livesBox = document.createElement('div');
    livesBox.id = 'lives';
    livesBox.classList.add('info-box', 'neutral');
    gameInfo.appendChild(livesBox);

    const cashBox = document.createElement('div');
    cashBox.id = 'cash';
    cashBox.classList.add('info-box', 'neutral');
    gameInfo.appendChild(cashBox);

    body.appendChild(gameInfo);

    const messageBox = document.createElement('div');
    messageBox.id = 'message';
    messageBox.classList.add('info-box');
    body.appendChild(messageBox);

    const timerBox = document.createElement('div');
    timerBox.id = 'timer';
    timerBox.classList.add('info-box', 'neutral');
    body.appendChild(timerBox);

    const letterDetailsBox = document.createElement('div');
    letterDetailsBox.id = 'letter-details';
    letterDetailsBox.classList.add('info-box', 'neutral');
    body.appendChild(letterDetailsBox);

    const gridContainer = document.createElement('div');
    gridContainer.id = 'zipcode-grid';
    gridContainer.classList.add('grid-container');
    body.appendChild(gridContainer);

    // const restartButton = document.createElement('button');
    // restartButton.textContent = 'RESTART';
    // restartButton.addEventListener('click', () => location.reload());
    // body.appendChild(restartButton);

    [...new Set(data.addresses.map(({ sortAs }) => sortAs))].forEach(sortAs =>
        gridContainer.appendChild(createGridItem(sortAs))
    );
}

function createGridItem(labelText) {
    const gridItem = document.createElement('button');
    gridItem.className = 'grid-item';

    const label = document.createElement('h3');
    label.textContent = labelText;

    gridItem.appendChild(label);

    if (/\d/.test(labelText)) {
        gridItem.classList.add('grid-item-number');
    }

    return gridItem;
}

function updateHUD() {
    document.getElementById('lives').textContent = data.messages.livesMessage.replace("{lives}", gameSettings.lives);
    document.getElementById('cash').textContent = data.messages.cashMessage.replace("{cash}", gameSettings.cash);
    document.getElementById('timer').textContent = data.messages.timerMessage.replace("{time}", timeRemaining);
}

function displayMessage(content, type = 'info-box') {
    const messageDisplay = document.getElementById('message');
    messageDisplay.className = type;
    messageDisplay.textContent = content;
}

function disableGameButtons() {
    const gameButtons = document.querySelectorAll('.grid-item, .cash-button');
    gameButtons.forEach(button => {
        button.disabled = true;
    });
}

function setupGridItemListeners() {
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', () => checkAnswer(item.textContent));
    });
}

startGame();