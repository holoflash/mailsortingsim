// dialogHandler.js

export function showDialog(message, options = {}) {
    // Create dialog and buttons dynamically
    const dialog = document.createElement('dialog');
    const dialogMessage = document.createElement('p');
    const actionButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    // Set the dialog content
    dialogMessage.textContent = message;
    actionButton.textContent = options.actionText || "Take Action";
    cancelButton.textContent = options.cancelText || "Cancel";

    // Add classes for styling
    actionButton.classList.add('dialog-button', 'action-button');
    cancelButton.classList.add('dialog-button', 'cancel-button');

    // Append content to the dialog
    dialog.appendChild(dialogMessage);
    dialog.appendChild(actionButton);
    dialog.appendChild(cancelButton);

    // Append the dialog to the body
    document.body.appendChild(dialog);

    // Function to handle when the player clicks on the action button
    const onActionClick = () => {
        options.onAction(); // Execute the action function
        dialog.close(); // Close the dialog
        document.body.removeChild(dialog); // Remove the dialog from DOM
    };

    // Function to handle when the player clicks on the cancel button
    const onCancelClick = () => {
        if (options.onCancel) options.onCancel(); // Execute cancel function if provided
        dialog.close(); // Close the dialog
        document.body.removeChild(dialog); // Remove the dialog from DOM
    };

    // Add event listeners to the buttons
    actionButton.addEventListener('click', onActionClick);
    cancelButton.addEventListener('click', onCancelClick);

    // Show the dialog
    dialog.showModal(); // This makes the dialog modal (blocks interaction with the rest of the page)
}
