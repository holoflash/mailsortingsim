// domRenderer.js

import { stockholmAddresses } from "./data.js";

// Utility function to create a grid item with a label
function createGridItem(labelText) {
    const gridItem = document.createElement('button');
    gridItem.className = 'grid-item';

    const label = document.createElement('h3');
    label.textContent = labelText;

    gridItem.appendChild(label);
    return gridItem;
}

// Renders the initial grid based on Stockholm addresses
export function renderGraphics() {
    const gridContainer = document.getElementById('zipcode-grid');

    // Render dynamic zip code boxes
    for (const [zipcode] of Object.entries(stockholmAddresses)) {
        const zipCodeDisplay = zipcode.slice(-2); // Display the last two digits of the zip code
        gridContainer.appendChild(createGridItem(zipCodeDisplay));
    }

    // Render static OUT box
    gridContainer.appendChild(createGridItem("OUT"));
}

// Updates the score and cash display
export function updateScoreDisplay(score, cash) {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = `Score: ${score} | Cash: $${cash}`;
}

// Updates the timer display
export function updateTimerDisplay(timeRemaining) {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Time remaining: ${timeRemaining} seconds`;
}

// Updates the poison display
export function updateElementalDisplay(poison, intoxication) {
    const poisonDisplay = document.getElementById('elemental');
    poisonDisplay.textContent = `Poison: ${poison} | Intoxication: ${intoxication}`;;
}

// Displays the current letter’s information
export function displayLetterDetails(letter) {
    const letterDetailsDisplay = document.getElementById('letter-details');
    letterDetailsDisplay.innerHTML = ''; // Clear previous content

    const createInfoLine = (value, className = 'info-line') => {
        const line = document.createElement('div');
        line.textContent = value;
        line.className = className;
        return line;
    };

    letterDetailsDisplay.appendChild(createInfoLine(`${letter.firstName} ${letter.lastName}`));
    letterDetailsDisplay.appendChild(createInfoLine(letter.street));
    letterDetailsDisplay.appendChild(createInfoLine(letter.zipCode || "???"));
    letterDetailsDisplay.appendChild(createInfoLine(letter.county || "???"));
    letterDetailsDisplay.appendChild(createInfoLine(`${letter.city}, ${letter.country}`));

    if (letter.requiresOutgoing) {
        letterDetailsDisplay.appendChild(createInfoLine("This letter needs to be sorted as OUTGOING!", 'info-line warning'));
    }
}

// Displays a message to the player
export function displayMessage(content, type = 'info-box') {
    const messageDisplay = document.getElementById('message');
    messageDisplay.className = type;
    messageDisplay.textContent = content;
}
