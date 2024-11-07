import * as render from './render.js';
import { gameRules, level } from './game.js';
import * as data from '../data/data_en.js';

const powerUpConfig = {
    inhalePowder: {
        effectType: () => Math.random() < 0.5 ? 'intoxication' : 'poison',
        action: (letter, onEffect) => {
            render.showDialog(data.messages.inhalePowderDialogMessage, {
                actionText: data.messages.inhalePowderActionText,
                cancelText: data.messages.inhalePowderCancelText,
                onAction: () => {
                    const effectType = letter.effectType;
                    const effectMessage = effectType === 'intoxication'
                        ? data.messages.intoxicationIncreasedMessage.replace("{intoxication}", ++gameRules[level].intoxication)
                        : data.messages.poisonIncreasedMessage.replace("{poison}", ++gameRules[level].poison);
                    render.displayMessage(effectMessage, 'info-box warning');
                    onEffect(gameRules[level].intoxication, gameRules[level].poison);
                },
                onCancel: () => {
                    render.displayMessage(messages.declineInhalePowderMessage, 'info-box info');
                    onEffect(gameRules[level].intoxication, gameRules[level].poison);
                }
            });
        }
    },
    cash: {
        effectType: () => Math.floor(Math.random() * 100) + 1,
        action: (letter, onEffect) => {
            const caughtProbability = gameRules[level].caughtProbability;
            render.showDialog(data.messages.stealCashDialogMessage.replace("{amount}", letter.cashAmount), {
                actionText: data.messages.stealCashActionText,
                cancelText: data.messages.stealCashCancelText,
                onAction: () => {
                    let amountStolen = Math.random() < caughtProbability ? 0 : letter.cashAmount;
                    render.displayMessage(
                        amountStolen ? data.messages.pocketCashMessage.replace("{amount}", letter.cashAmount)
                            : data.messages.caughtStealingMessage,
                        amountStolen ? 'info-box success' : 'info-box warning'
                    );
                    onEffect(amountStolen);
                },
                onCancel: () => {
                    render.displayMessage(data.messages.declineStealMessage, 'info-box info');
                    onEffect(0);
                }
            });
        }
    }
};

export function handlePowerUp(powerUpType, letter) {
    const powerUp = powerUpConfig[powerUpType];

    if (powerUp) {
        letter.powerUp = powerUpType;
        if (powerUpType === 'inhalePowder') {
            letter.effectType = powerUp.effectType();
        } else if (powerUpType === 'cash') {
            letter.cashAmount = powerUp.effectType();
        }

        powerUp.action(letter, (updatedValue1, updatedValue2) => {
            if (powerUpType === 'inhalePowder') {
                gameRules[level].intoxication = updatedValue1;
                gameRules[level].poison = updatedValue2;
                render.updateElementalDisplay(updatedValue2, updatedValue1);
            } else if (powerUpType === 'cash') {
                gameRules[level].cash += updatedValue1;
                render.updateScoreDisplay(gameRules[level].score, gameRules[level].cash);
            }
        });
    } else {
        letter.powerUp = null;
    }
}

export function getRandomPowerUp() {
    const powerUpTypes = Object.keys(powerUpConfig);
    const randomIndex = Math.floor(Math.random() * powerUpTypes.length);
    return powerUpTypes[randomIndex];
}
