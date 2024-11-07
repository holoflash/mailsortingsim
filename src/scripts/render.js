import * as data from '../data/data_en.js';
import { checkAnswer } from './game.js';

export let gridItemClickHandlers = [];

export function displayLetterDetails(letter) {
    const letterDetailsDisplay = document.getElementById('letter-details');
    letterDetailsDisplay.textContent = '';

    const createInfoLine = (label = "", value, className = "info-line") => {
        const line = document.createElement('div');
        line.textContent = `${label}: ${value}`;
        line.className = className;
        return line;
    };

    letterDetailsDisplay.appendChild(createInfoLine(data.messages.labels.name, `${letter.firstName} ${letter.lastName}`));
    letterDetailsDisplay.appendChild(createInfoLine(data.messages.labels.street, letter.street));
    letterDetailsDisplay.appendChild(createInfoLine(data.messages.labels.zipCode, letter.zipCode || data.messages.unknownZipCode));
    letterDetailsDisplay.appendChild(createInfoLine(data.messages.labels.county, letter.county));
    letterDetailsDisplay.appendChild(createInfoLine(data.messages.labels.location, `${letter.city}, ${letter.country}`));

    if (letter.requiresOutgoing) {
        displayMessage(data.messages.outgoingLetterMessage, "info-line warning");
    }
}

export function createGridItem(labelText) {
    const gridItem = document.createElement('button');
    gridItem.className = 'grid-item';

    const label = document.createElement('h3');
    label.textContent = labelText;

    gridItem.appendChild(label);
    return gridItem;
}

export function graphics() {
    document.title = data.messages.title;
    document.getElementById("header-title").textContent = data.messages.headerTitle;
    document.getElementById("instructions").textContent = data.messages.instructions;

    const gridContainer = document.getElementById('zipcode-grid');

    for (const [zipcode] of Object.entries(data.addresses)) {
        const zipCodeDisplay = zipcode.slice(-2);
        gridContainer.appendChild(createGridItem(zipCodeDisplay));
    }

    gridContainer.appendChild(createGridItem(data.messages.outLabel));
}

export function updateScoreDisplay(score, cash) {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = data.messages.scoreMessage.replace("{score}", score).replace("{cash}", cash);
}

export function updateTimerDisplay(timeRemaining) {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = data.messages.timerMessage.replace("{time}", timeRemaining);
}

export function updateElementalDisplay(poison, intoxication) {
    const poisonDisplay = document.getElementById('elemental');
    poisonDisplay.textContent = data.messages.elementalMessage.replace("{poison}", poison).replace("{intoxication}", intoxication);
}

export function displayMessage(content, type = 'info-box') {
    const messageDisplay = document.getElementById('message');
    messageDisplay.className = type;
    messageDisplay.textContent = content;
}

export function showDialog(message, options = {}) {
    const dialog = document.createElement('dialog');
    const dialogMessage = document.createElement('p');
    const actionButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    dialogMessage.textContent = message;
    actionButton.textContent = options.actionText || "Take Action";
    cancelButton.textContent = options.cancelText || "Cancel";

    actionButton.classList.add('dialog-button', 'action-button');
    cancelButton.classList.add('dialog-button', 'cancel-button');

    dialog.appendChild(dialogMessage);
    dialog.appendChild(actionButton);
    dialog.appendChild(cancelButton);

    document.body.appendChild(dialog);

    const onActionClick = () => {
        options.onAction();
        dialog.close();
        document.body.removeChild(dialog);
    };

    const onCancelClick = () => {
        if (options.onCancel) options.onCancel();
        dialog.close();
        document.body.removeChild(dialog);
    };

    actionButton.addEventListener('click', onActionClick);
    cancelButton.addEventListener('click', onCancelClick);

    dialog.showModal();
}

export function removeGridItemClickListeners() {
    const gridItems = document.querySelectorAll('.grid-item');
    render.gridItemClickHandlers.forEach(handler => {
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
