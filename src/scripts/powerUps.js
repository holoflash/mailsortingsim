import * as render from './render.js';
import { Player } from './game.js';
import * as data from '../data/data_en.js';

export const cashPowerUp = {
    getAmount: () => Math.floor(Math.random() * 100) + 1,

    handleAction: (amount, caughtProbability) => {
        const caught = Math.random() < caughtProbability;
        const amountStolen = caught ? 0 : amount;
        const messageKey = amountStolen ? 'pocketCashMessage' : 'caughtStealingMessage';
        const messageType = amountStolen ? 'info-box success' : 'info-box warning';

        render.displayMessage(data.messages[messageKey].replace("{amount}", amount), messageType);

        if (caught) {
            Player.lives--;
            Player.cash -= amount;
            render.updateLivesDisplay(Player.lives);
            render.updateCashDisplay(Player.cash);

            if (Player.lives <= 0) {
                render.displayMessage(data.messages.firedMistakesMessage, 'info-box warning');
                render.removeGridItemClickListeners();
            }
        } else {
            Player.cash += amount;
            render.updateCashDisplay(Player.cash);
        }
    }
};

export function handleCashPowerUp(onEffect) {
    const amount = cashPowerUp.getAmount();
    cashPowerUp.handleAction(amount, Player.caughtProbability);
}
