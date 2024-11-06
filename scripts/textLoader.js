import { messages } from './data_gr.js';

export function getMessage(key, replacements = {}) {
    let message = messages[key] || '';

    for (const [placeholder, value] of Object.entries(replacements)) {
        message = message.replace(`{${placeholder}}`, value);
        message = message.replace(`\${${placeholder}}`, value);
    }

    return message;
}
