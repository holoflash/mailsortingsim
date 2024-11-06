import { displayMessage } from './domRenderer.js';
import { showDialog } from './dialogHandler.js';
import { messages } from './data_gr.js';

export function attemptToInhalePowder(letter, onInhale, intoxication, poison) {
    showDialog(messages.inhalePowderDialogMessage, {
        actionText: messages.inhalePowderActionText,
        cancelText: messages.inhalePowderCancelText,
        onAction: () => {
            if (letter.effectType === 'intoxication') {
                intoxication++;
                displayMessage(`Intoxication increased: ${intoxication}`, 'info-box info');
            } else if (letter.effectType === 'poison') {
                poison++;
                displayMessage(`Poison increased: ${poison}`, 'info-box warning');
            }

            onInhale(intoxication, poison);
        },
        onCancel: () => {
            displayMessage(messages.declineInhalePowderMessage, 'info-box info');
            onInhale(intoxication, poison);
        }
    });
}

export function attemptToStealCash(letter, caughtProbability, onSteal) {
    const dialogMessage = messages.stealCashDialogMessage.replace("${amount}", letter.cashAmount);  // Handle dynamic amount here
    const pocketMessage = messages.pocketCashMessage.replace("${amount}", letter.cashAmount);  // Handle dynamic amount here

    showDialog(dialogMessage, {
        actionText: messages.stealCashActionText,
        cancelText: messages.stealCashCancelText,
        onAction: () => {
            let amountStolen = 0;

            if (Math.random() < caughtProbability) {
                displayMessage(messages.caughtStealingMessage, 'info-box warning');
                amountStolen = 0;
            } else {
                displayMessage(pocketMessage, 'info-box success');
                amountStolen = letter.cashAmount;
            }

            onSteal(amountStolen);
        },
        onCancel: () => {
            displayMessage(messages.declineStealMessage, 'info-box info');
            onSteal(0);
        }
    });
}
