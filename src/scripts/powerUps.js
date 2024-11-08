import * as render from './render.js';
import { gameRules, level } from './game.js';
import * as data from '../data/data_en.js';

const cashPowerUp = {
    getAmount: () => Math.floor(Math.random() * 100) + 1,

    showCashDialog: (amount, onEffect) => {
        const caughtProbability = gameRules[level].caughtProbability;
        const dialogOptions = {
            actionText: data.messages.stealCashActionText,
            cancelText: data.messages.stealCashCancelText,
            onAction: () => cashPowerUp.handleAction(amount, caughtProbability, onEffect),
            onCancel: () => cashPowerUp.handleCancel(onEffect)
        };
        render.showDialog(data.messages.stealCashDialogMessage.replace("{amount}", amount), dialogOptions);
    },

    handleAction: (amount, caughtProbability, onEffect) => {
        const amountStolen = Math.random() < caughtProbability ? 0 : amount;
        const messageKey = amountStolen ? 'pocketCashMessage' : 'caughtStealingMessage';
        const messageType = amountStolen ? 'info-box success' : 'info-box warning';

        render.displayMessage(data.messages[messageKey].replace("{amount}", amount), messageType);
        onEffect(amountStolen);
    },

    handleCancel: (onEffect) => {
        render.displayMessage(data.messages.declineStealMessage, 'info-box info');
        onEffect(0);
    }
};

export function handleCashPowerUp(onEffect) {
    const amount = cashPowerUp.getAmount();
    cashPowerUp.showCashDialog(amount, onEffect);
}
