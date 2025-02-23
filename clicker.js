// ==UserScript==
// @name         InstaClick X
// @namespace    http://tampermonkey.net/
// @version      X
// @description  Instant Clicks wherever you drag the cursor!
// @author       mrdavidss and pookie deepseek v3
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the main UI
    function createUI() {
        const ui = document.createElement('div');
        ui.style.position = 'fixed';
        ui.style.top = '20px';
        ui.style.left = '20px';
        ui.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        ui.style.color = 'white';
        ui.style.fontSize = '16px';
        ui.style.fontFamily = 'Arial, sans-serif';
        ui.style.padding = '10px 20px';
        ui.style.borderRadius = '5px';
        ui.style.zIndex = '9999';
        ui.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        ui.style.display = 'flex';
        ui.style.alignItems = 'center';
        ui.style.gap = '10px';
        ui.style.cursor = 'grab';

        // Add text before the CPS input
        const text = document.createElement('span');
        text.textContent = 'InstaClick X';
        text.style.whiteSpace = 'nowrap';

        // Create an input field for CPS
        const cpsInput = document.createElement('input');
        cpsInput.type = 'number';
        cpsInput.placeholder = 'CPS';
        cpsInput.style.width = '60px';
        cpsInput.style.padding = '5px';
        cpsInput.style.border = 'none';
        cpsInput.style.borderRadius = '3px';
        cpsInput.min = 1;
        cpsInput.max = 500; // Limit to a reasonable maximum
        cpsInput.value = 35; // Default value

        // Create an input field for the keybind
        const keybindInput = document.createElement('input');
        keybindInput.type = 'text';
        keybindInput.placeholder = 'Input Keybind';
        keybindInput.style.width = '50px';
        keybindInput.style.padding = '5px';
        keybindInput.style.border = 'none';
        keybindInput.style.borderRadius = '3px';
        keybindInput.maxLength = 1; // Allow only one character

        // Create a start/stop button
        const button = document.createElement('button');
        button.textContent = 'Start';
        button.style.padding = '5px 15px';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';

        // Append text, CPS input, keybind input, and button to the UI
        ui.appendChild(text);
        ui.appendChild(cpsInput);
        ui.appendChild(keybindInput);
        ui.appendChild(button);

        // Add the UI to the document
        document.body.appendChild(ui);

        return { ui, cpsInput, keybindInput, button };
    }

    // Create the transparent cursor box
    function createCursor() {
        const cursor = document.createElement('div');
        cursor.style.position = 'fixed';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Transparent red
        cursor.style.border = '1px solid rgba(0, 0, 0, 0.8)';
        cursor.style.borderRadius = '2px';
        cursor.style.zIndex = '10000';
        cursor.style.pointerEvents = 'none'; // Ensure it doesn't interfere with clicks
        document.body.appendChild(cursor);
        return cursor;
    }

    // Initialize the UI and cursor
    const { ui, cpsInput, keybindInput, button } = createUI();
    const cursor = createCursor();

    // Make the UI draggable
    let isDragging = false;
    let offsetX, offsetY;

    ui.addEventListener('mousedown', (e) => {
        if (e.target === ui || e.target === cpsInput || e.target === keybindInput || e.target === button) {
            isDragging = true;
            offsetX = e.clientX - ui.getBoundingClientRect().left;
            offsetY = e.clientY - ui.getBoundingClientRect().top;
            ui.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        // Update cursor position
        cursor.style.left = `${e.clientX - 5}px`; // Center the cursor box
        cursor.style.top = `${e.clientY - 5}px`;

        // Update UI position if dragging
        if (isDragging) {
            ui.style.left = `${e.clientX - offsetX}px`;
            ui.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        ui.style.cursor = 'grab';
    });

    // Auto-clicker logic
    let clickInterval;
    let isAutoClicking = false;

    function startAutoClicking() {
        if (!isAutoClicking) {
            const cps = parseFloat(cpsInput.value);
            if (isNaN(cps) || cps <= 0) {
                alert('Please enter a valid number for clicks per second.');
                return;
            }
            const clickDelay = 1000 / cps; // Calculate delay in milliseconds
            clickInterval = setInterval(() => {
                simulateClick();
            }, clickDelay);
            isAutoClicking = true;
            button.textContent = 'Stop';
            button.style.backgroundColor = '#f44336'; // Change button color to red when active
        }
    }

    function stopAutoClicking() {
        if (isAutoClicking) {
            clearInterval(clickInterval);
            clickInterval = null;
            isAutoClicking = false;
            button.textContent = 'Start';
            button.style.backgroundColor = '#4CAF50'; // Change button color back to green
        }
    }

    function simulateClick() {
        // Check if the cursor is over the UI
        const cursorRect = cursor.getBoundingClientRect();
        const uiRect = ui.getBoundingClientRect();

        if (
            cursorRect.left >= uiRect.left &&
            cursorRect.right <= uiRect.right &&
            cursorRect.top >= uiRect.top &&
            cursorRect.bottom <= uiRect.bottom
        ) {
            return; // Skip clicking if the cursor is over the UI
        }

        // Simulate a click at the cursor's position
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        document.elementFromPoint(
            parseInt(cursor.style.left) + 5, // Click at the center of the cursor box
            parseInt(cursor.style.top) + 5
        ).dispatchEvent(event);
    }

    // Toggle start/stop on button click
    button.addEventListener('click', () => {
        if (isAutoClicking) {
            stopAutoClicking();
        } else {
            startAutoClicking();
        }
    });

    // Keybind logic
    let keybind = null;

    keybindInput.addEventListener('input', (e) => {
        const key = e.target.value.toUpperCase();
        if (key.length > 0) {
            keybind = key;
        } else {
            keybind = null;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (keybind && e.key.toUpperCase() === keybind) {
            if (isAutoClicking) {
                stopAutoClicking();
            } else {
                startAutoClicking();
            }
        }
    });
})();
