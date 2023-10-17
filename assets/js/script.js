"use strict";

const terminalBody = document.getElementById("terminal-body");
const inputField = document.getElementById("terminal-input");
const commandHistory = [];
let historyIndex = -1;

// Display the banner when the page loads
window.onload = function() {
    displayLines(banner);
};


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
        const command = inputField.value;
        
        // Add the command to command history
        commandHistory.push(command);
        historyIndex = commandHistory.length - 1;

        // Create a new output line and append it to the body
        const outputLine = document.createElement("div");
        outputLine.className = "output-line";
        outputLine.innerHTML = `<span>guest@stijntassenoy.be:~$ </span>${command}`;
        terminalBody.appendChild(outputLine);

        // Handle different commands here
        switch (command.toLowerCase()) {
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
                defaultResponse.textContent = "Command not recognized. Type 'help' to see a list of available commands.";
                terminalBody.appendChild(defaultResponse);
        }

        // Clear the input field
        inputField.value = "";

    } else if (event.key === "ArrowUp") {
        // Handle history navigation (pressing the up arrow key)
        if (historyIndex >= 0) {
            inputField.value = commandHistory[historyIndex];
            historyIndex--;
        }
    } else if (event.key === "ArrowDown") {
        // Handle history navigation (pressing the down arrow key)
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputField.value = commandHistory[historyIndex];
        } else {
            // Clear the input field when reaching the most recent command in history
            inputField.value = "";
        }
    }
});
