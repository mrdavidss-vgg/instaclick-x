// ==UserScript==
// @name         InstaClick X
// @namespace    http://tampermonkey.net/
// @version      X.1
// @description  Instant Clicking. + Mods!
// @author       mrdavidss and pookie deepseek v3
// @match        *://*/*
// @grant        none
// ==/UserScript==
  
  (function () {
    'use strict';
     const blockedDomains = [
    'doubleclick.net', // Google Ads
    'googleadservices.com', // Google Ads
    'googlesyndication.com', // Google Ads
    'adservice.google.com', // Google Ads
    'ads.google.com', // Google Ads
    'ad.doubleclick.net', // Google Ads
    'adclick.g.doubleclick.net', // Google Ads
    'adform.net', // Adform
    'adnxs.com', // AppNexus
    'adsrvr.org', // The Trade Desk
    'amazon-adsystem.com', // Amazon Ads
    'rubiconproject.com', // Rubicon Project
    'pubmatic.com', // PubMatic
    'openx.net', // OpenX
    'criteo.com', // Criteo
    'taboola.com', // Taboola
    'outbrain.com', // Outbrain
    'revcontent.com', // RevContent
    'zemanta.com', // Zemanta
    'adroll.com', // AdRoll
    'advertising.com', // AOL Advertising
    'yieldmanager.com', // YieldManager
    'adtechus.com', // AdTech
    'advertising.yahoo.com', // Yahoo Ads
    'ads.yahoo.com', // Yahoo Ads
    'ads.facebook.com', // Facebook Ads
    'ads.twitter.com', // Twitter Ads
    'ads.linkedin.com', // LinkedIn Ads
    'ads.pinterest.com', // Pinterest Ads
    'ads.tiktok.com', // TikTok Ads
    'ads.snapchat.com', // Snapchat Ads
    'ads.reddit.com', // Reddit Ads
    'ads.microsoft.com', // Microsoft Ads
    'ads.bing.com', // Bing Ads
    'adsrvr.org', // The Trade Desk
    'advertising.amazon.com', // Amazon Ads
    'advertising.apple.com', // Apple Ads
    'advertising.twitch.tv', // Twitch Ads
    'advertising.youtube.com', // YouTube Ads
    'advertising.vrv.co', // VRV Ads
    'advertising.hulu.com', // Hulu Ads
    'advertising.disneyplus.com', // Disney+ Ads
    'advertising.netflix.com', // Netflix Ads
    'advertising.hbomax.com', // HBO Max Ads
    'advertising.peacocktv.com', // Peacock TV Ads
    'advertising.paramountplus.com', // Paramount+ Ads
    'advertising.sling.com', // Sling TV Ads
    'advertising.philo.com', // Philo Ads
    'advertising.fubo.tv', // Fubo TV Ads
    'advertising.pluto.tv', // Pluto TV Ads
    'advertising.tubitv.com', // Tubi TV Ads
    'advertising.crackle.com', // Crackle Ads
    'advertising.vudu.com', // Vudu Ads
    'advertising.imdb.com', // IMDb Ads
    'advertising.rottentomatoes.com', // Rotten Tomatoes Ads
    'advertising.metacritic.com', // Metacritic Ads
    'advertising.ign.com', // IGN Ads
    'advertising.gamespot.com', // GameSpot Ads
    'advertising.polygon.com', // Polygon Ads
    'advertising.kotaku.com', // Kotaku Ads
    'advertising.theverge.com', // The Verge Ads
    'advertising.techcrunch.com', // TechCrunch Ads
    'advertising.engadget.com', // Engadget Ads
    'advertising.gizmodo.com', // Gizmodo Ads
    'advertising.lifehacker.com', // Lifehacker Ads
    'advertising.jalopnik.com', // Jalopnik Ads
    'advertising.deadspin.com', // Deadspin Ads
    'advertising.kinja.com', // Kinja Ads
    'advertising.gawker.com', // Gawker Ads
    'advertising.buzzfeed.com', // BuzzFeed Ads
    'advertising.vice.com', // Vice Ads
    'advertising.vox.com', // Vox Ads
    'advertising.theatlantic.com', // The Atlantic Ads
    'advertising.newyorker.com', // The New Yorker Ads
    'advertising.wired.com', // Wired Ads
    'advertising.washingtonpost.com', // Washington Post Ads
    'advertising.nytimes.com', // New York Times Ads
    'advertising.wsj.com', // Wall Street Journal Ads
    'advertising.forbes.com', // Forbes Ads
    'advertising.businessinsider.com', // Business Insider Ads
    'advertising.cnbc.com', // CNBC Ads
    'advertising.bloomberg.com', // Bloomberg Ads
    'advertising.reuters.com', // Reuters Ads
    'advertising.apnews.com', // Associated Press Ads
    'advertising.bbc.com', // BBC Ads
    'advertising.cnn.com', // CNN Ads
    'advertising.foxnews.com', // Fox News Ads
    'advertising.msnbc.com', // MSNBC Ads
    'advertising.nbcnews.com', // NBC News Ads
    'advertising.cbsnews.com', // CBS News Ads
    'advertising.abcnews.com', // ABC News Ads
    'advertising.usatoday.com', // USA Today Ads
    'advertising.latimes.com', // Los Angeles Times Ads
    'advertising.chicagotribune.com', // Chicago Tribune Ads
    'advertising.bostonglobe.com', // Boston Globe Ads
    'advertising.sfchronicle.com', // San Francisco Chronicle Ads
    'advertising.houstonchronicle.com', // Houston Chronicle Ads
    'advertising.dallasnews.com', // Dallas Morning News Ads
    'advertising.denverpost.com', // Denver Post Ads
    'advertising.thestbernard.news.com'];
    const currentDomain = window.location.hostname;
    if (blockedDomains.includes(currentDomain)) {
        return; // Stop execution on blocked domains
    }
    let isClicking = false;
    let clickInterval;
    let cpsCapUnlocked = false;
    let keybind = null;
    let currentX = 0;
    let currentY = 0;

    // Dictionary to store version information
    const versionInfo = {
        Version: "X.1" // Default version
    };

    // Load saved data from localStorage
    function loadSavedData() {
        try {
            const savedCpsCapUnlocked = localStorage.getItem('cpsCapUnlocked');
            const savedKeybind = localStorage.getItem('keybind');
            const savedCpsValue = localStorage.getItem('cpsValue');

            if (savedCpsCapUnlocked !== null) {
                cpsCapUnlocked = savedCpsCapUnlocked === 'true';
            }
            if (savedKeybind !== null) {
                keybind = savedKeybind;
            }
            if (savedCpsValue !== null) {
                cpsInput.value = savedCpsValue;
            }
        } catch (error) {
            console.error('Failed to load saved data:', error);
        }
    }

    // Save data to localStorage
    function saveData() {
        try {
            localStorage.setItem('cpsCapUnlocked', cpsCapUnlocked);
            localStorage.setItem('keybind', keybind);
            localStorage.setItem('cpsValue', cpsInput.value);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }

    // Create the main UI
    function createUI() {
        const ui = document.createElement('div');
        ui.style.position = 'fixed';
        ui.style.top = '20px';
        ui.style.left = '20px';
        ui.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        ui.style.color = 'white';
        ui.style.padding = '6px 12px';
        ui.style.borderRadius = '5px';
        ui.style.zIndex = '9999';
        ui.style.display = 'flex';
        ui.style.alignItems = 'center';
        ui.style.gap = '6px';
        ui.style.fontSize = '12px';
        ui.style.cursor = 'grab';

        const text = document.createElement('span');
        text.textContent = 'InstaClick X.1';
        text.style.fontSize = '12px';

        const cpsInput = document.createElement('input');
        cpsInput.type = 'number';
        cpsInput.placeholder = 'CPS';
        cpsInput.style.width = '61px';
        cpsInput.style.height = '25px'; // Set height explicitly
        cpsInput.style.padding = '3px';
        cpsInput.style.backgroundColor = 'black';
        cpsInput.style.color = 'white';
        cpsInput.style.border = '1px solid #444';
        cpsInput.min = 1;
        cpsInput.max = 100;
        cpsInput.value = 35;

        const keybindInput = document.createElement('input');
        keybindInput.type = 'text';
        keybindInput.placeholder = 'Keybind';
        keybindInput.style.width = '65px'; // Wider text box
        keybindInput.style.height = '25px'; // Match height of cpsInput
        keybindInput.style.padding = '3px';
        keybindInput.style.backgroundColor = 'black';
        keybindInput.style.color = 'white';
        keybindInput.style.border = '1px solid #444';
        keybindInput.style.fontSize = '10px'; // Smaller text size
        keybindInput.maxLength = 1;

        const button = document.createElement('button');
        button.textContent = 'Start';
        button.style.padding = '3px 10px';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#2196F3'; // Blue button
        button.style.color = 'white';
        button.style.fontSize = '12px';

        const modsButton = document.createElement('button');
        modsButton.textContent = 'Mod Menu';
        modsButton.style.padding = '3px 10px';
        modsButton.style.border = 'none';
        modsButton.style.borderRadius = '3px';
        modsButton.style.cursor = 'pointer';
        modsButton.style.backgroundColor = '#2196F3'; // Blue button
        modsButton.style.color = 'white';
        modsButton.style.fontSize = '12px';

        ui.appendChild(text);
        ui.appendChild(cpsInput);
        ui.appendChild(keybindInput);
        ui.appendChild(button);
        ui.appendChild(modsButton);
        document.body.appendChild(ui);

        return { ui, cpsInput, keybindInput, button, modsButton };
    }

    // Create the mods UI
    function createModsUI() {
        const modsUI = document.createElement('div');
        modsUI.style.position = 'fixed';
        modsUI.style.top = '20px';
        modsUI.style.left = '20px';
        modsUI.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        modsUI.style.padding = '10px';
        modsUI.style.borderRadius = '5px';
        modsUI.style.zIndex = '9999';
        modsUI.style.display = 'none'; // Hidden by default
        modsUI.style.flexDirection = 'column';
        modsUI.style.gap = '8px';
        modsUI.style.fontSize = '12px';

        // Add a title for the mods UI
        const modsTitle = document.createElement('span');
        modsTitle.textContent = 'InstaMod Menu X';
        modsTitle.style.fontWeight = 'bold';

        // Add a "Break CPS Cap" button
        const breakCpsCapButton = document.createElement('button');
        breakCpsCapButton.textContent = 'Unlock CPS Cap';
        breakCpsCapButton.style.padding = '3px 10px';
        breakCpsCapButton.style.backgroundColor = '#2196F3'; // Blue button
        breakCpsCapButton.style.color = 'white';

        // Add a red "X" button to exit mods
        const exitButton = document.createElement('button');
        exitButton.textContent = 'X';
        exitButton.style.position = 'absolute';
        exitButton.style.top = '5px';
        exitButton.style.right = '5px';
        exitButton.style.width = '20px';
        exitButton.style.height = '20px';
        exitButton.style.padding = '0';
        exitButton.style.border = 'none';
        exitButton.style.borderRadius = '3px';
        exitButton.style.backgroundColor = '#ff0000';
        exitButton.style.color = 'white';
        exitButton.style.cursor = 'pointer';
        exitButton.style.display = 'flex';
        exitButton.style.alignItems = 'center';
        exitButton.style.justifyContent = 'center';

        // Append elements to the mods UI
        modsUI.appendChild(modsTitle);
        modsUI.appendChild(breakCpsCapButton);
        modsUI.appendChild(exitButton);
        document.body.appendChild(modsUI);

        return { modsUI, breakCpsCapButton, exitButton };
    }

    // Create a visible cursor
    function createCursor() {
        const cursor = document.createElement('div');
        cursor.style.position = 'fixed';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'black';
        cursor.style.borderRadius = '25%';
        cursor.style.pointerEvents = 'none'; // Prevent cursor from blocking clicks
        cursor.style.zIndex = '10000';
        cursor.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(cursor);
        return cursor;
    }

    // Track cursor position
    function trackCursor(e) {
        currentX = e.clientX || e.touches[0].clientX;
        currentY = e.clientY || e.touches[0].clientY;
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
    }

    // Simulate clicks
    function simulateClick() {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: currentX,
            clientY: currentY
        });
        const target = document.elementFromPoint(currentX, currentY);
        if (target && !target.closest('.instaclick-ui')) { // Prevent clicks on UI elements
            target.dispatchEvent(event);
        }
    }

    // Toggle clicking
    function toggleClicking(cps) {
        if (isClicking) {
            clearInterval(clickInterval);
            button.textContent = 'Start';
            button.style.backgroundColor = '#2196F3'; // Blue button
        } else {
            // Check if CPS exceeds the limit and CPS cap is not unlocked
            if (cps > 100 && !cpsCapUnlocked) {
                alert('You went over the CPS limit of 100!');
                cpsInput.value = 100; // Reset to the maximum allowed value
                return; // Stop execution if CPS is over the limit
            }

            const actualCps = cpsCapUnlocked ? cps : Math.min(cps, 100);
            clickInterval = setInterval(simulateClick, 1000 / actualCps);
            button.textContent = 'Stop';
            button.style.backgroundColor = '#ff0000'; // Red button when active
        }
        isClicking = !isClicking;
    }

    // Function to check for updates
    // Function to check for updates
function checkForUpdates() {
    // Check if the user previously declined the update
    const updateDeclined = localStorage.getItem('updateDeclined');
    if (updateDeclined) {
        console.log('Update was previously declined.');
        return; // Don't show the prompt if the user already declined
    }

    fetch('https://raw.githubusercontent.com/mrdavidss-vgg/instaclick-x/refs/heads/main/client/version')
        .then(response => response.text())
        .then(version => {
            const fetchedVersion = version.trim();
            if (fetchedVersion !== versionInfo.Version) {
                showUpdatePrompt(fetchedVersion);
            } else {
                console.log('You are on the latest version.');
            }
        })
        .catch(error => console.error('Failed to fetch version:', error));
}

// Function to show update prompt
function showUpdatePrompt(newVersion) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '100000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    const prompt = document.createElement('div');
    prompt.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    prompt.style.padding = '20px';
    prompt.style.borderRadius = '10px';
    prompt.style.textAlign = 'center';
    prompt.style.color = 'white';

    const message = document.createElement('p');
    message.textContent = `Do you want to update to version ${newVersion}?`;
    message.style.marginBottom = '20px';

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes';
    yesButton.style.padding = '10px 20px';
    yesButton.style.marginRight = '10px';
    yesButton.style.cursor = 'pointer';
    yesButton.style.backgroundColor = '#2196F3'; // Blue button
    yesButton.style.color = 'white';
    yesButton.style.border = 'none';
    yesButton.style.borderRadius = '5px';

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.style.padding = '10px 20px';
    noButton.style.cursor = 'pointer';
    noButton.style.backgroundColor = '#2196F3'; // Blue button
    noButton.style.color = 'white';
    noButton.style.border = 'none';
    noButton.style.borderRadius = '5px';

    prompt.appendChild(message);
    prompt.appendChild(yesButton);
    prompt.appendChild(noButton);
    overlay.appendChild(prompt);
    document.body.appendChild(overlay);

    yesButton.addEventListener('click', () => {
        window.location.href = 'https://raw.githubusercontent.com/mrdavidss-vgg/instaclick-x/refs/heads/main/clicker.js';
    });

    noButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        localStorage.setItem('updateDeclined', true); // Save the user's choice
    });
}

    // Initialize
    const { ui, cpsInput, keybindInput, button, modsButton } = createUI();
    const { modsUI, breakCpsCapButton, exitButton } = createModsUI();
    const cursor = createCursor();

    // Add class to UI elements for click prevention
    ui.classList.add('instaclick-ui');
    modsUI.classList.add('instaclick-ui');

    // Load saved data
    loadSavedData();

    // Apply loaded data to UI
    if (keybind) {
        keybindInput.value = keybind;
    }
    breakCpsCapButton.textContent = cpsCapUnlocked ? 'Lock CPS Cap' : 'Unlock CPS Cap';
    cpsInput.max = cpsCapUnlocked ? 1000 : 100;

    // Track cursor and touch movements
    document.addEventListener('mousemove', trackCursor);
    document.addEventListener('touchmove', trackCursor, { passive: true });

    // Event listeners
    button.addEventListener('click', () => toggleClicking(cpsInput.value));
    keybindInput.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            keybind = e.key.toUpperCase();
            keybindInput.value = keybind;
            saveData(); // Save keybind
            e.preventDefault();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key.toUpperCase() === keybind && document.activeElement !== keybindInput) {
            toggleClicking(cpsInput.value);
        }
    });

    modsButton.addEventListener('click', () => {
        ui.style.display = 'none';
        modsUI.style.display = 'flex';
    });

    exitButton.addEventListener('click', () => {
        modsUI.style.display = 'none';
        ui.style.display = 'flex';
    });

    breakCpsCapButton.addEventListener('click', () => {
        cpsCapUnlocked = !cpsCapUnlocked;
        breakCpsCapButton.textContent = cpsCapUnlocked ? 'Lock CPS Cap' : 'Unlock CPS Cap';
        cpsInput.max = cpsCapUnlocked ? 1000 : 100;
        saveData(); // Save CPS cap state
    });

    // Save CPS input value when changed
    cpsInput.addEventListener('input', () => {
        if (cpsInput.value > 100 && !cpsCapUnlocked) {
            alert('You went over the CPS limit of 100!');
            cpsInput.value = 100; // Reset to the maximum allowed value
        }
        saveData(); // Save CPS value
    });

    // Check for updates on script load
    checkForUpdates();
})();
