"use strict";

const terminalBody = document.getElementById("terminal-body");
const inputField = document.getElementById("terminal-input");
const commandHistory = [];
let historyIndex = -1;

// Display the banner when the page loads
window.onload = function() {
    displayLines(banner);
};


// Focus inputbox on click except when text is selected
document.addEventListener("click", function (event) {
    const selection = window.getSelection();
    if (selection && selection.type === "Range") {
        return; // Do nothing if the user is selecting text
    }

    inputField.focus(); // Focus the input field
});

function displayLines(lines, index = 0) {
    if (index < lines.length) {
        const outputLine = document.createElement("div");
        outputLine.className = "output-line";

        // Replace spaces with non-breaking space entities
        const formattedLine = lines[index].replace(/ /g, "&nbsp;");

        outputLine.innerHTML = formattedLine;
        terminalBody.appendChild(outputLine);
        terminalBody.scrollTop = terminalBody.scrollHeight; // Scroll to the bottom

        setTimeout(() => {
            displayLines(lines, index + 1);
        }, 25); // milliseconds delay between lines
        window.scrollTo(0, document.body.offsetHeight);
    }
}

inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = inputField.value.trim(); // Remove leading/trailing spaces

        // Create a new output line and append it to the terminal body
        const outputLine = document.createElement("div");
        outputLine.className = "output-line";
        outputLine.innerHTML = `<span>guest@stijntassenoy.be:~ $ </span>${command}`;
        terminalBody.appendChild(outputLine);

        // Handle the command
        if (command !== "") {
            // Save to history only if it's not a duplicate of the last entry
            if (command !== commandHistory[commandHistory.length - 1]) {
                commandHistory.push(command);
            }

            // Reset history index to the end of the history
            historyIndex = commandHistory.length;
        }

        // Execute command logic
        switch (command.toLowerCase()) {
            case "":
                // Do nothing for blank input
                break;
            case "help":
                displayLines(help);
                break;
            case "whois":
                displayLines(whois);
                break;
            case "banner":
                displayLines(banner);
                break;
            default:
                const defaultResponse = document.createElement("div");
                defaultResponse.className = "output-line";
                defaultResponse.textContent =
                    "Command not recognized. Type 'help' to see a list of available commands.";
                terminalBody.appendChild(defaultResponse);
        }

        // Clear the input field
        inputField.value = "";
    } else if (event.key === "ArrowUp") {
        // Navigate history (pressing the up arrow key)
        if (historyIndex > 0) {
            historyIndex--;
            inputField.value = commandHistory[historyIndex];
        }
    } else if (event.key === "ArrowDown") {
        // Navigate history (pressing the down arrow key)
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[historyIndex];
        } else {
            inputField.value = ""; // Clear input if at the end of history
        }
    }
});

