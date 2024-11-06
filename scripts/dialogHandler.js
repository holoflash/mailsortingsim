export function showDialog(message, options = {}) {
    const dialog = document.createElement('dialog');
    const dialogMessage = document.createElement('p');
    const actionButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    dialogMessage.textContent = message;
    actionButton.textContent = options.actionText || "Take Action";
    cancelButton.textContent = options.cancelText || "Cancel";

    actionButton.classList.add('dialog-button', 'action-button');
    cancelButton.classList.add('dialog-button', 'cancel-button');

    dialog.appendChild(dialogMessage);
    dialog.appendChild(actionButton);
    dialog.appendChild(cancelButton);

    document.body.appendChild(dialog);

    const onActionClick = () => {
        options.onAction();
        dialog.close();
        document.body.removeChild(dialog);
    };

    const onCancelClick = () => {
        if (options.onCancel) options.onCancel();
        dialog.close();
        document.body.removeChild(dialog);
    };

    actionButton.addEventListener('click', onActionClick);
    cancelButton.addEventListener('click', onCancelClick);

    dialog.showModal();
}
