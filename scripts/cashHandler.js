import { displayMessage } from './domRenderer.js';
import { showDialog } from './dialogHandler.js'; // Import the showDialog function

export function attemptToStealCash(letter, caughtProbability, onSteal) {
    showDialog(`This letter contains cash. Do you want to steal $${letter.cashAmount}?`, {
        actionText: "Steal Cash",
        cancelText: "Decline",
        onAction: () => {
            // If the player attempts to steal, there's a chance of being caught
            let amountStolen = 0;

            if (Math.random() < caughtProbability) {
                displayMessage("You were caught stealing! Cash pocketed: $0", 'info-box warning');
                amountStolen = 0; // Caught stealing, no cash gained
            } else {
                displayMessage(`You pocketed $${letter.cashAmount}`, 'info-box success');
                amountStolen = letter.cashAmount; // Successfully stole the cash
            }

            // Call the callback with the stolen amount
            onSteal(amountStolen);
        },
        onCancel: () => {
            displayMessage("You declined the cash.", 'info-box info');
            onSteal(0); // No cash taken
        }
    });
}
