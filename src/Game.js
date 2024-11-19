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
    if (gameSettings.cash >= gameSettings.level * levelMultiplier) levelUp();

    generateNextLetter();
}

function levelUp() {
    gameSettings.level++;
    displayMessage(data.messages.levelUpMessage.replace('{level}', gameSettings.level), 'info-box level-up');
}

function generateNextLetter() {
    const { addresses, firstNames, lastNames } = data;
    const addressInfo = getRandomElement(addresses);
    const streetName = getRandomElement(addressInfo.streets).replace("##", "").trim();
    const formattedStreet = streetName.includes("##")
        ? streetName
        : `${streetName} ${Math.floor(Math.random() * 1000) + 1}`;

    currentLetter = {
        firstName: getRandomElement(firstNames),
        lastName: getRandomElement(lastNames),
        street: formattedStreet,
        ...addressInfo,
        hasCash: Math.random() < gameSettings.cashProbability,
        cashAmount: Math.max(cashPowerUp.getAmount(), 1),
    };

    displayLetterDetails(currentLetter);
}

const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

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

    const createElement = (tag, options = {}, parent = body) => {
        const el = document.createElement(tag);
        Object.entries(options).forEach(([key, value]) => {
            if (key === 'text') el.textContent = value;
            else if (key === 'classList') el.classList.add(...value);
            else el[key] = value;
        });
        parent.appendChild(el);
        return el;
    };

    createElement('div', { id: 'header-title', text: data.messages.headerTitle });
    createElement('div', { id: 'instructions', text: data.messages.instructions });

    const gameInfo = createElement('div', { id: 'game-info' });
    ['lives', 'cash'].forEach(id =>
        createElement('div', { id, classList: ['info-box', 'neutral'] }, gameInfo)
    );

    ['message', 'timer', 'letter-details'].forEach(id =>
        createElement('div', { id, classList: id === 'message' ? ['info-box'] : ['info-box', 'neutral'] })
    );

    const gridContainer = createElement('div', { id: 'zipcode-grid', classList: ['grid-container'] });
    //Restart button for debugging
    // createElement('button', { text: 'RESTART' }, body).addEventListener('click', () => location.reload());

    [...new Set(data.addresses.map(({ sortAs }) => sortAs))]
        .forEach(sortAs => gridContainer.appendChild(createGridItem(sortAs)));
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