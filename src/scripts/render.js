import * as data from '../data/data_en.js';
import { checkAnswer } from './game.js';

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
    letterDetailsDisplay.appendChild(letterContainer);
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
    const sortAsValues = [];

    for (const addressInfo of Object.values(data.addresses)) {
        if (!sortAsValues.includes(addressInfo.sortAs)) {
            sortAsValues.push(addressInfo.sortAs);
        }
    }
    sortAsValues.forEach(sortAs => {
        gridContainer.appendChild(createGridItem(sortAs));
    });
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
