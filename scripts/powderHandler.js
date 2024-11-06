import { displayMessage } from './domRenderer.js';
import { showDialog } from './dialogHandler.js'; // Import the showDialog function

export function attemptToInhalePowder(letter, onInhale, intoxication, poison) {
    showDialog("This letter contains a strange white powder. Do you want to inhale it?", {
        actionText: "Inhale Powder",
        cancelText: "Decline",
        onAction: () => {
            if (letter.effectType === 'intoxication') {
                intoxication++; // If it's a rush, increase intoxication
                displayMessage(`Intoxication increased: ${intoxication}`, 'info-box info');
            } else if (letter.effectType === 'poison') {
                poison++; // If it's poison, increase the poison value
                displayMessage(`Poison increased: ${poison}`, 'info-box warning');
            }

            // Ensure that the updated values are passed back to the caller
            onInhale(intoxication, poison); // Pass the updated values back
        },
        onCancel: () => {
            displayMessage("You declined the Inhale Powder.", 'info-box info');
            onInhale(intoxication, poison); // Ensure the state is still passed back
        }
    });
}
