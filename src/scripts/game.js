import * as data from '../data/data_en.js';

let isRunning = false;
let timer = null;
let timeRemaining = 0;
let currentLetter = null;

export const sounds = {
    coins: new Audio('./sounds/coins.wav'),
    correct: new Audio('./sounds/correct.wav'),
    mistake: new Audio('./sounds/mistake.wav'),
    fired: new Audio('./sounds/fired.wav'),
    letterHandling: new Audio('./sounds/letterHandling.wav'),
    caughtStealing: new Audio('./sounds/caughtStealing.wav'),
};

export const Player = {
    cash: 0,
    level: 1,
    lives: 3,
    caughtProbability: 0.5,
    cashProbability: 0.5,
};

export const gameConfig = {
    levelMultiplier: 200,
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
    graphics(isRunning);
    setupGridItemListeners();

    generateNextLetter();
    updateTimerDisplay(timeRemaining);
    updateLivesDisplay(Player.lives);
    updateCashDisplay(Player.cash);
    displayMessage(data.messages.gameStart, 'info-box level-up');


    timer = setInterval(() => {
        if (--timeRemaining <= 0) {
            endGame('time');
        }
        updateTimerDisplay(timeRemaining);
    }, 1000);
}

export function endGame(reason) {
    sounds.fired.play()
    clearInterval(timer);
    timeRemaining = 0;
    updateTimerDisplay(timeRemaining);
    isRunning = false;

    const message = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
        caught: data.messages.firedCaughtStealingMessage,
    }[reason];

    displayMessage(message, 'info-box warning');
    removeGridItemClickListeners();
}

export function checkAnswer(userInput) {
    const { levelMultiplier, baseCashReward, cashRewardIncrement, timeBonus } = gameConfig;
    const cashReward = baseCashReward + Player.level * cashRewardIncrement;
    const levelUpScore = Player.level * levelMultiplier;

    const isCorrect = userInput === currentLetter.sortAs;

    if (isCorrect) {
        sounds.correct.play()
        Player.cash += cashReward;
        timeRemaining += timeBonus;
        displayMessage(
            `${data.messages.correctMessage} +$${cashReward}`,
            'info-box success'
        );
        updateTimerDisplay(timeRemaining);
    } else {
        sounds.mistake.play()
        Player.lives--;
        displayMessage(data.messages.incorrectMessage, 'info-box warning');
    }

    updateCashDisplay(Player.cash);
    updateLivesDisplay(Player.lives);

    if (Player.lives <= 0) return endGame('lives');

    if (Player.cash >= levelUpScore) {
        Player.level++;
        displayMessage(
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

    const hasCash = Math.random() < Player.cashProbability;
    const cashAmount = hasCash ? Math.max(cashPowerUp.getAmount(), 1) : 0;

    const letter = {
        firstName: getRandomElement(data.firstNames),
        lastName: getRandomElement(data.lastNames),
        street: formattedStreet,
        zipCode: addressInfo.zipCode,
        county: addressInfo.county,
        city: addressInfo.city,
        country: addressInfo.country,
        sortAs: addressInfo.sortAs,
        hasCash: hasCash,
        cashAmount: cashAmount
    };

    currentLetter = letter;
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

export function handleCashPowerUp(onEffect) {
    const amount = cashPowerUp.getAmount();
    cashPowerUp.handleAction(amount, Player.caughtProbability);
}

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
    // Clear existing content and dynamically build the HTML structure
    const body = document.body;
    body.textContent = ''; // Clear all existing content by setting textContent to an empty string.

    // Create and append the header title
    const headerTitle = document.createElement('div');
    headerTitle.id = 'header-title';
    headerTitle.textContent = data.messages.headerTitle;
    body.appendChild(headerTitle);

    // Create and append the instructions
    const instructions = document.createElement('div');
    instructions.id = 'instructions';
    instructions.textContent = data.messages.instructions;
    body.appendChild(instructions);

    // Create and append the game info section (lives and cash)
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

    // Create and append the message box
    const messageBox = document.createElement('div');
    messageBox.id = 'message';
    messageBox.classList.add('info-box');
    body.appendChild(messageBox);

    // Create and append the timer box
    const timerBox = document.createElement('div');
    timerBox.id = 'timer';
    timerBox.classList.add('info-box', 'neutral');
    body.appendChild(timerBox);

    // Create and append the letter details box
    const letterDetailsBox = document.createElement('div');
    letterDetailsBox.id = 'letter-details';
    letterDetailsBox.classList.add('info-box', 'neutral');
    body.appendChild(letterDetailsBox);

    // Create and append the zipcode grid
    const gridContainer = document.createElement('div');
    gridContainer.id = 'zipcode-grid';
    gridContainer.classList.add('grid-container');
    body.appendChild(gridContainer);

    // Create and append the restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'RESTART';
    restartButton.addEventListener('click', () => location.reload());
    body.appendChild(restartButton);

    // Set the page title
    document.title = data.messages.title;

    // Set the grid items based on data
    [...new Set(data.addresses.map(({ sortAs }) => sortAs))].forEach(sortAs =>
        gridContainer.appendChild(createGridItem(sortAs))
    );
}

export function updateLivesDisplay(lives) {
    const livesDisplay = document.getElementById('lives');
    livesDisplay.textContent = data.messages.livesMessage.replace("{lives}", lives);
}

export function updateCashDisplay(cash) {
    const cashDisplay = document.getElementById('cash');
    cashDisplay.textContent = data.messages.cashMessage.replace("{cash}", cash);
}

export function updateTimerDisplay(timeRemaining) {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = data.messages.timerMessage.replace("{time}", timeRemaining);
}

export function displayMessage(content, type = 'info-box') {
    const messageDisplay = document.getElementById('message');
    messageDisplay.className = type;
    messageDisplay.textContent = content;
}

export function removeGridItemClickListeners() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItemClickHandlers.forEach(handler => {
        gridItems.forEach(item => {
            item.removeEventListener('click', handler);
        });
    });
};

export function setupGridItemListeners() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItemClickHandlers.forEach((handler) => {
        gridItems.forEach((item) => {
            item.removeEventListener('click', handler);
        });
    });

    gridItems.forEach((item) => {
        const handler = () => {
            const zipcode = item.textContent;
            checkAnswer(zipcode);
        };
        gridItemClickHandlers.push(handler);
        item.addEventListener('click', handler);
    });
}
