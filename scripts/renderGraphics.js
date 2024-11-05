import { stockholmAddresses } from "./data.js";

export function renderGraphics() {
    const gridContainer = document.getElementById('zipcode-grid');

    for (const [zipcode] of Object.entries(stockholmAddresses)) {
        const gridItem = document.createElement('button');
        gridItem.className = 'grid-item';

        const zip = document.createElement('h3');
        zip.textContent = zipcode.slice(-2);

        gridItem.appendChild(zip);
        gridContainer.appendChild(gridItem);
    }
}
