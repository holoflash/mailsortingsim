import * as data from '../data/data_en.js';

let isRunning = false;
let timer = null;
let timeRemaining = 0;
let currentLetter = null;

const sounds = Object.fromEntries(
    ['coins', 'correct', 'mistake', 'fired', 'letterHandling', 'caughtStealing']
        .map(name => [name, new Audio(`../sounds/${name}.wav`)])
);

export const Player = {
    cash: 0,
    level: 1,
    lives: 3,
    caughtProbability: 0.5,
    cashProbability: 0.5,
};

export const gameConfig = {
    levelMultiplier: 10,
    baseCashReward: 5,
    cashRewardIncrement: 2,
    initialTime: 10,
    timeBonus: 5,
};

export function startGame() {
    isRunning = true;
    timeRemaining = gameConfig.initialTime;
    graphics(isRunning);
    setupGridItemListeners();

    generateNextLetter();
    updateTimerDisplay(timeRemaining);
    updateLivesDisplay(Player.lives);
    updateCashDisplay(Player.cash);
    displayMessage(data.messages.gameStart, 'info-box level-up');


    timer = setInterval(() => {
        if (--timeRemaining <= 0) endGame('time');
        updateTimerDisplay();
    }, 1000);
}

export function endGame(reason) {
    sounds.fired.play();
    clearInterval(timer);
    timeRemaining = 0;
    updateTimerDisplay();
    isRunning = false;

    const message = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
        caught: data.messages.firedCaughtStealingMessage,
    }[reason];

    displayMessage(message, 'info-box warning');
    removeGridItemClickListeners();
    disableGameButtons();
}

export function checkAnswer(userInput) {
    const { baseCashReward, cashRewardIncrement, levelMultiplier, timeBonus } = gameConfig;
    const cashReward = baseCashReward + Player.level * cashRewardIncrement;
    const levelUpScore = Player.level * levelMultiplier;

    if (userInput === currentLetter.sortAs) {
        sounds.correct.play();
        Player.cash += cashReward;
        timeRemaining += timeBonus;
        displayMessage(`${data.messages.correctMessage} +$${cashReward}`, 'info-box success');
        updateTimerDisplay(timeRemaining);
    } else {
        sounds.mistake.play()
        Player.lives--;
        displayMessage(data.messages.incorrectMessage, 'info-box warning');
    }

    updateCashDisplay(Player.cash);
    updateLivesDisplay(Player.lives);

    if (Player.lives <= 0) return endGame('lives');
    if (Player.cash >= levelUpScore) levelUp();

    generateNextLetter();
}

function levelUp() {
    Player.level++;
    displayMessage(data.messages.levelUpMessage.replace('{level}', Player.level), 'info-box level-up');
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
        hasCash: Math.random() < Player.cashProbability,
        cashAmount: Math.max(cashPowerUp.getAmount(), 1),
    };

    displayLetterDetails(currentLetter);
}

const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

const cashPowerUp = {
    getAmount: () => Math.floor(Math.random() * 100) + 1,

    handleAction: (amount, caughtProbability) => {
        const caught = Math.random() < caughtProbability;
        const amountStolen = caught ? 0 : amount;
        const messageKey = amountStolen ? 'pocketCashMessage' : 'caughtStealingMessage';
        const messageType = amountStolen ? 'info-box success' : 'info-box warning';

        displayMessage(data.messages[messageKey].replace("{amount}", amount), messageType);

        if (caught) {
            sounds.caughtStealing.play()
            Player.lives--;
            Player.cash -= amount;
            updateLivesDisplay(Player.lives);
            updateCashDisplay(Player.cash);

            if (Player.lives <= 0) {
                displayMessage(data.messages.firedMistakesMessage, 'info-box warning');
                removeGridItemClickListeners();
            }
        } else {
            sounds.coins.play()
            Player.cash += amount;
            updateCashDisplay(Player.cash);
        }
    }
};

export let gridItemClickHandlers = [];

export function displayLetterDetails(letter) {
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
        const cashButton = createCashButton(letter);
        letterContainer.appendChild(cashButton);
    }

    letterDetailsDisplay.appendChild(letterContainer);
}

function createCashButton(letter) {
    const button = document.createElement('button');
    button.className = 'cash-button';

    const cashText = document.createElement('span');
    const actionText = data.messages.stealCashActionText.replace("{amount}", letter.cashAmount); // Replace the placeholder with actual cash amount
    cashText.textContent = actionText;

    button.appendChild(cashText);

    button.addEventListener('click', () => {
        button.remove();
        cashPowerUp.handleAction(letter.cashAmount, Player.caughtProbability);
    });

    return button;
}

export function createGridItem(labelText) {
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

export function graphics() {
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

    const restartButton = document.createElement('button');
    restartButton.textContent = 'RESTART';
    restartButton.addEventListener('click', () => location.reload());
    body.appendChild(restartButton);

    document.title = data.messages.title;

    [...new Set(data.addresses.map(({ sortAs }) => sortAs))].forEach(sortAs =>
        gridContainer.appendChild(createGridItem(sortAs))
    );
}

function updateLivesDisplay() {
    document.getElementById('lives').textContent = data.messages.livesMessage.replace("{lives}", Player.lives);
}

function updateCashDisplay() {
    document.getElementById('cash').textContent = data.messages.cashMessage.replace("{cash}", Player.cash);
}

function updateTimerDisplay() {
    document.getElementById('timer').textContent = data.messages.timerMessage.replace("{time}", timeRemaining);
}

export function displayMessage(content, type = 'info-box') {
    const messageDisplay = document.getElementById('message');
    messageDisplay.className = type;
    messageDisplay.textContent = content;
}

function removeGridItemClickListeners() {
    document.querySelectorAll('.grid-item').forEach(item => {
        item.replaceWith(item.cloneNode(true)); // Removes all event listeners
    });
}
function disableGameButtons() {
    const gameButtons = document.querySelectorAll('.grid-item, .cash-button');
    gameButtons.forEach(button => {
        button.disabled = true; // Disables the button
    });
}

function setupGridItemListeners() {
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', () => checkAnswer(item.textContent));
    });
}
