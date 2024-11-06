import { messages, addresses } from './data_gr.js';

function createGridItem(labelText) {
    const gridItem = document.createElement('button');
    gridItem.className = 'grid-item';

    const label = document.createElement('h3');
    label.textContent = labelText;

    gridItem.appendChild(label);
    return gridItem;
}

export function renderGraphics() {
    document.title = messages.title;
    document.getElementById("header-title").textContent = messages.headerTitle;
    document.getElementById("instructions").textContent = messages.instructions;

    const gridContainer = document.getElementById('zipcode-grid');

    for (const [zipcode] of Object.entries(addresses)) {
        const zipCodeDisplay = zipcode.slice(-2);
        gridContainer.appendChild(createGridItem(zipCodeDisplay));
    }

    gridContainer.appendChild(createGridItem(messages.outLabel));
}

export function updateScoreDisplay(score, cash) {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = messages.scoreMessage.replace("{score}", score).replace("{cash}", cash);
}

export function updateTimerDisplay(timeRemaining) {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = messages.timerMessage.replace("{time}", timeRemaining);
}

export function updateElementalDisplay(poison, intoxication) {
    const poisonDisplay = document.getElementById('elemental');
    poisonDisplay.textContent = messages.elementalMessage.replace("{poison}", poison).replace("{intoxication}", intoxication);
}

export function displayLetterDetails(letter) {
    const letterDetailsDisplay = document.getElementById('letter-details');
    letterDetailsDisplay.textContent = '';

    const createInfoLine = (label, value, className = "info-line") => {
        const line = document.createElement('div');
        line.textContent = `${label}: ${value}`;
        line.className = className;
        return line;
    };

    letterDetailsDisplay.appendChild(createInfoLine('Name', `${letter.firstName} ${letter.lastName}`));
    letterDetailsDisplay.appendChild(createInfoLine('Street', letter.street));
    letterDetailsDisplay.appendChild(createInfoLine('Zip Code', letter.zipCode || messages.unknownZipCode));
    letterDetailsDisplay.appendChild(createInfoLine('County', letter.county));
    letterDetailsDisplay.appendChild(createInfoLine('Location', `${letter.city}, ${letter.country}`));

    if (letter.requiresOutgoing) {
        displayMessage(messages.outgoingLetterMessage, "info-line warning");
    }
}

export function displayMessage(content, type = 'info-box') {
    const messageDisplay = document.getElementById('message');
    messageDisplay.className = type;
    messageDisplay.textContent = content;
}
