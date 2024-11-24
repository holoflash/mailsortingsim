export function graphics(headerTitleText) {
    const body = document.body;
    body.textContent = '';

    const headerTitle = document.createElement('div');
    headerTitle.id = 'header-title';
    headerTitle.textContent = headerTitleText;
    body.appendChild(headerTitle);

    const instructions = document.createElement('div');
    instructions.id = 'instructions';
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

export function displayMessage(content, type = 'info-box') {
    const messageDisplay = document.getElementById('message');
    messageDisplay.className = type;
    messageDisplay.textContent = content;
}

export function renderGrid(addresses, level, checkAnswer) {
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

    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 4; col++) {
            const gridItem = createGridItem('');
            gridContainer.appendChild(gridItem);
        }
    }

    const levels = Object.values(addresses);
    const availableLevels = levels.slice(0, level);
    const uniqueSortAsValues = [
        ...new Set(
            availableLevels.flatMap(level =>
                level.map(({ sortAs }) => sortAs)
            )
        )
    ];

    uniqueSortAsValues.forEach((sortAs, index) => {
        const gridItem = gridContainer.children[index];
        const label = gridItem.querySelector('h3');
        label.textContent = sortAs;

        gridItem.classList.remove('disabled');

        if (/\d/.test(sortAs)) {
            gridItem.classList.add('grid-item-number');
        } else {
            gridItem.classList.add('grid-item-text');
        }
    });

    document.querySelectorAll('.grid-item-text, .grid-item-number').forEach(item => {
        item.addEventListener('click', () => checkAnswer(item.textContent));
    });
}

function createGridItem(labelText) {
    const gridItem = document.createElement('button');
    gridItem.className = 'grid-item';

    const label = document.createElement('h3');
    label.textContent = labelText;
    gridItem.appendChild(label);

    if (!labelText) {
        gridItem.classList.add('disabled');
        gridItem.style.cursor = 'default';
    }

    if (/\d/.test(labelText)) {
        gridItem.classList.add('grid-item-number');
    } else if (labelText) {
        gridItem.classList.add('grid-item-text');
        gridItem.style.cursor = 'pointer';
    }

    return gridItem;
}

export function updateHUD(messages, gameSettings, timeRemaining) {
    document.getElementById('lives').textContent = messages.livesMessage.replace("{lives}", gameSettings.lives);
    document.getElementById('cash').textContent = messages.cashMessage.replace("{cash}", gameSettings.cash);
    document.getElementById('timer').textContent = messages.timerMessage.replace("{time}", timeRemaining);
}

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
    letterContainer.appendChild(createInfoLine(`${letter.firstName} ${letter.lastName}`.trim(), 'letter-name'));
    letterContainer.appendChild(createInfoLine(letter.street, 'letter-street'));
    letterContainer.appendChild(createInfoLine(`${letter.zipCode} ${letter.county}`.trim(), 'letter-zip-county'));
    letterContainer.appendChild(createInfoLine(`${letter.city} ${letter.country}`.trim(), 'letter-location'));
    letterDetailsDisplay.appendChild(letterContainer);
}

export function disableGameButtons() {
    const gameButtons = document.querySelectorAll('.grid-item, .cash-button');
    gameButtons.forEach(button => {
        button.disabled = true;
    });
}
export function renderDialog(messageParts) {
    const dialog = document.createElement('dialog');

    const pigeonImage = document.createElement('img');
    pigeonImage.src = './src/art/pigeon.svg';
    pigeonImage.alt = 'Pigeon';

    const dialogMessage = document.createElement('div');

    messageParts.forEach(part => {
        const p = document.createElement('p');
        p.textContent = part;
        dialogMessage.appendChild(p);
    });

    const okButton = document.createElement('button');
    okButton.textContent = "OK";
    okButton.classList.add('dialog-button');

    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');

    dialogContainer.appendChild(pigeonImage);
    dialogContainer.appendChild(dialogMessage);
    dialogContainer.appendChild(okButton);

    dialog.appendChild(dialogContainer);
    document.body.appendChild(dialog);

    return dialog;
}

