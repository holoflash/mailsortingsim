import * as data from './data.js';

const sounds = {
    coins: new Audio('../src/sounds/coins.mp3'),
    correct: new Audio('../src/sounds/correct.mp3'),
    mistake: new Audio('../src/sounds/mistake.mp3'),
    fired: new Audio('../src/sounds/fired.mp3'),
    letterHandling: new Audio('../src/sounds/letterHandling.mp3'),
    caughtStealing: new Audio('../src/sounds/caughtStealing.mp3'),
};

const gameSettings = {
    cash: 0,
    level: 1,
    lives: 3,
    levelMultiplier: 20,
    baseCashReward: 5,
    initialTime: 10,
    timeBonus: 2,
};

let timer = null;
let timeRemaining = 0;
let currentLetter = null;

function startGame() {
    timeRemaining = gameSettings.initialTime;
    graphics();
    renderGrid();
    generateNextLetter();
    updateHUD();
    displayMessage(data.messages.startGame, 'info-box level-up');
    timer = setInterval(() => {
        if (--timeRemaining <= 0) endGame('time');
        updateHUD();
    }, 1000);
    showDialog(data.messages.level1Dialog);
}


function endGame(reason) {
    sounds.fired.play();
    clearInterval(timer);
    timeRemaining = 0;
    updateHUD();

    const message = {
        time: data.messages.firedOutOfTimeMessage,
        lives: data.messages.firedMistakesMessage,
    }[reason];

    displayMessage(message, 'info-box warning');
    disableGameButtons();
}

function checkAnswer(userInput) {
    const { baseCashReward, levelMultiplier, timeBonus } = gameSettings;
    const cashReward = baseCashReward;
    const isCorrect = userInput === currentLetter.sortAs;
    const messageKey = isCorrect ? 'correctMessage' : 'incorrectMessage';

    if (isCorrect) {
        sounds.correct.play();
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
        handleLevelUp(); // Call the new level-up function
    }

    generateNextLetter();
}

function handleLevelUp() {
    sounds.coins.play();
    gameSettings.level++;

    const levelDialog = data.messages[`level${gameSettings.level}Dialog`];

    if (levelDialog) {
        showDialog(levelDialog);
    }

    firstLetterForNewLevel = true;
    renderGrid();
}

let firstLetterForNewLevel = true;

function generateNextLetter() {
    const availableAddresses = [];
    const maxImplementedLevel = 6; // Adjust this to the number of implemented levels
    const isFinalLevel = gameSettings.level > maxImplementedLevel;

    // If we are in the final level, gather all previous level addresses
    if (isFinalLevel) {
        // Randomly decide whether to generate the special letter (20% chance)
        const generateSpecialLetter = Math.random() < 0.2;

        if (generateSpecialLetter) {
            // Generate a special letter with one field replaced by "???"
            const randomLetter = {
                firstName: data.firstNames[Math.floor(Math.random() * data.firstNames.length)],
                lastName: data.lastNames[Math.floor(Math.random() * data.lastNames.length)],
                street: `${data.firstNames[Math.floor(Math.random() * data.firstNames.length)]} ${Math.floor(Math.random() * 1000) + 1}`,
                zipCode: `ZIP-${Math.floor(Math.random() * 10000)}`,
                county: data.lastNames[Math.floor(Math.random() * data.lastNames.length)],
                city: `City-${Math.floor(Math.random() * 100)}`,
                country: "Countryland",
                sortAs: "BIN"
            };

            // Pick one property to replace with "???"
            const fields = ["firstName", "lastName", "street", "zipCode", "county", "city", "country"];
            const fieldToReplace = fields[Math.floor(Math.random() * fields.length)];
            randomLetter[fieldToReplace] = "???";

            currentLetter = randomLetter;
        } else {
            // For final level, gather all addresses from the previous levels
            for (let i = 1; i <= maxImplementedLevel; i++) {
                availableAddresses.push(...data.addresses[`Level ${i}`]);
            }

            const addressInfo = availableAddresses[Math.floor(Math.random() * availableAddresses.length)];

            const streetName = addressInfo.streets[Math.floor(Math.random() * addressInfo.streets.length)].replace("##", "").trim();
            const formattedStreet = streetName.includes("##")
                ? streetName
                : `${streetName} ${Math.floor(Math.random() * 1000) + 1}`;

            currentLetter = {
                firstName: data.firstNames[Math.floor(Math.random() * data.firstNames.length)],
                lastName: data.lastNames[Math.floor(Math.random() * data.lastNames.length)],
                street: formattedStreet,
                ...addressInfo,
            };
        }
    } else {
        // For levels 1 through 6, generate a regular letter
        if (firstLetterForNewLevel) {
            availableAddresses.push(...data.addresses[`Level ${gameSettings.level}`]);
            firstLetterForNewLevel = false;
        } else {
            for (let i = 1; i <= gameSettings.level; i++) {
                availableAddresses.push(...data.addresses[`Level ${i}`]);
            }
        }

        const addressInfo = availableAddresses[Math.floor(Math.random() * availableAddresses.length)];

        const streetName = addressInfo.streets[Math.floor(Math.random() * addressInfo.streets.length)].replace("##", "").trim();
        const formattedStreet = streetName.includes("##")
            ? streetName
            : `${streetName} ${Math.floor(Math.random() * 1000) + 1}`;

        currentLetter = {
            firstName: data.firstNames[Math.floor(Math.random() * data.firstNames.length)],
            lastName: data.lastNames[Math.floor(Math.random() * data.lastNames.length)],
            street: formattedStreet,
            ...addressInfo,
        };
    }

    displayLetterDetails(currentLetter);
}




function displayLetterDetails(letter) {
    const letterDetailsDisplay = document.getElementById('letter-details');
    letterDetailsDisplay.textContent = '';

    const createInfoLine = (value, className = "") => {
        const line = document.createElement('p');
        line.textContent = value || "—"; // Display "—" for missing details
        if (className) line.classList.add(className);
        return line;
    };

    const letterContainer = document.createElement('div');
    letterContainer.classList.add('letter-container');
    letterContainer.appendChild(createInfoLine(`${letter.firstName} ${letter.lastName}`.trim(), 'letter-name'));
    letterContainer.appendChild(createInfoLine(letter.street, 'letter-street'));
    letterContainer.appendChild(createInfoLine(`${letter.zipCode || "Unknown ZIP"} ${letter.county}`.trim(), 'letter-zip-county'));
    letterContainer.appendChild(createInfoLine(`${letter.city}, ${letter.country}`.trim(), 'letter-location'));

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
}

let timerPaused = false;

function showDialog(message) {
    const dialog = document.createElement('dialog');
    const dialogMessage = document.createElement('p');
    const okButton = document.createElement('button');

    dialogMessage.textContent = message;
    okButton.textContent = "OK";

    okButton.classList.add('dialog-button');

    dialog.appendChild(dialogMessage);
    dialog.appendChild(okButton);

    document.body.appendChild(dialog);

    if (timer) {
        clearInterval(timer);
        timerPaused = true;
    }

    okButton.addEventListener('click', () => {
        dialog.close();
        document.body.removeChild(dialog);

        if (timerPaused) {
            timer = setInterval(() => {
                if (--timeRemaining <= 0) endGame('time');
                updateHUD();
            }, 1000);
            timerPaused = false;
        }
    });

    dialog.showModal();
}


function renderGrid() {
    let gridContainer = document.getElementById('zipcode-grid');

    if (!gridContainer) {
        gridContainer = document.createElement('div');
        gridContainer.id = 'zipcode-grid';
        gridContainer.classList.add('grid-container');
        document.body.appendChild(gridContainer);
    }

    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    const levels = Object.values(data.addresses);
    const availableLevels = levels.slice(0, gameSettings.level);
    const uniqueSortAsValues = [
        ...new Set(
            availableLevels.flatMap(level =>
                level.map(({ sortAs }) => sortAs)
            )
        )
    ];

    uniqueSortAsValues.forEach(sortAs =>
        gridContainer.appendChild(createGridItem(sortAs))
    );

    setupGridItemListeners();
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