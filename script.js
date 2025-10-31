// --- 1. LANGUAGE DATA (UPDATED FOR HALLOWEEN THEME) ---
const LANGUAGES = {
    'en': {
        title_h1: "BARTOUR BERLIN",
        title_h2: "HALLOWEEN BINGO",
        start_heading: "WELCOME, MORTAL! 😈",
        start_message: "Enter your name to start playing for a **FREE SHOT**!",
        start_placeholder: "Your Spooky Name Here",
        start_button: "SUMMON THE GAME",
        win_message_prefix: "WINS THE PRIZE!",
        win_message_suffix: "You Won! The spirits are pleased. Notify your tour guide!",
        win_instruction: "Show this screen to your Bartour Host immediately for your treat!",
        reset_button: "RESET GAME",
        name_alert: "Please enter a name to start the game!",
        dares: [
            "Take a Group Selfie 📸👻",
            "Show us your Spooky laugh 😈😂",
            "Cheers with a random stranger 🍻🤝",
            "Get a picture with someone in a cool Halloween outfit 🎃📸",
            "Do a quick Halloween pose for 3 seconds 🧛‍♀️🧟",
            "Swap a costume piece with someone 🎭🤝",
            "Show a funny Dance Move 🕺💃",
            "Use a Halloween-themed pick-up line on someone 😉🕸️",
            "Finish a drink without using your hands 🥤🚫🖐️"
        ]
    },
    'de': {
        title_h1: "BARTOUR BERLIN",
        title_h2: "HALLOWEEN BINGO",
        start_heading: "WILLKOMMEN, STERBLICHER! 😈",
        start_message: "Bitte geben Sie Ihren Namen ein, um um einen **KOSTENLOSEN SHOT** zu spielen!",
        start_placeholder: "Ihr Spukiger Name hier",
        start_button: "SPIEL BESCHWÖREN",
        win_message_prefix: "GEWINNT DEN PREIS!",
        win_message_suffix: "Sie haben gewonnen! Die Geister sind zufrieden. Benachrichtigen Sie Ihren Tour Guide!",
        win_instruction: "Zeigen Sie diesen Bildschirm sofort Ihrem Bartour-Host für Ihre Belohnung!",
        reset_button: "SPIEL ZURÜCKSETZEN",
        name_alert: "Bitte geben Sie einen Namen ein, um das Spiel zu starten!",
        dares: [
            "Gruppen-Selfie 📸👻",
            "Zeig uns dein Grusel-Lachen 😈😂",
            "Stoßt mit einem zufälligen Fremden an 🍻🤝",
            "Foto mit jmd. in coolem Halloween-Outfit 🎃📸",
            "Mach eine schnelle Halloween-Pose für 3s 🧛‍♀️🧟",
            "Tausch ein Kostümteil mit jmd. 🎭🤝",
            "Zeig einen lustigen Dance-Move 🕺💃",
            "Benutze eine Halloween-Anmachspruch 😉🕸️",
            "Trink ein Getränk ohne Hände 🥤🚫🖐️"
        ]
    },
    'es': {
        title_h1: "BARTOUR BERLIN",
        title_h2: "BINGO DE HALLOWEEN",
        start_heading: "¡BIENVENIDO, MORTAL! 😈",
        start_message: "¡Ingrese su nombre para comenzar a jugar por un **CHUPITO GRATIS**!",
        start_placeholder: "Tu Nombre Espeluznante Aquí",
        start_button: "INVOCAR EL JUEGO",
        win_message_prefix: "¡GANA EL PREMIO!",
        win_message_suffix: "¡Has ganado! Los espíritus están contentos. ¡Notifica a tu guía!",
        win_instruction: "¡Muestre esta pantalla a su anfitrión de Bartour inmediatamente para su premio!",
        reset_button: "REINICIAR JUEGO",
        name_alert: "¡Por favor, introduzca un nombre para empezar el juego!",
        dares: [
            "Tómate una Selfie Grupal 📸👻",
            "Enséñanos tu Risa Espeluznante 😈😂",
            "Choca copas con un extraño al azar 🍻🤝",
            "Foto con alguien con un disfraz de Halloween genial 🎃📸",
            "Haz una pose rápida de Halloween por 3s 🧛‍♀️🧟",
            "Intercambia una pieza de disfraz con alguien 🎭🤝",
            "Muestra un paso de baile divertido 🕺💃",
            "Usa una frase de ligue temática de Halloween 😉🕸️",
            "Termina una bebida sin usar las manos 🥤🚫🖐️"
        ]
    }
};

let currentLang = 'en'; // Default language is English
let playerName = "";
const completedDares = new Array(LANGUAGES[currentLang].dares.length).fill(false);

// GLOBAL ELEMENT REFERENCES
const startPopup = document.getElementById('start-popup');
const nameInput = document.getElementById('name-input');
const startGameButton = document.getElementById('start-game-button');


// --- CORE GAME LOGIC FUNCTIONS ---

function setupBoard() {
    // Set up board listeners (squares)
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.textContent = LANGUAGES[currentLang].dares[index]; 
        square.classList.remove('completed');
        square.onclick = () => handleSquareClick(index, square);
    });
}

function handleSquareClick(index, squareElement) {
    if (completedDares[index]) {
        completedDares[index] = false;
        squareElement.classList.remove('completed');
    } else {
        completedDares[index] = true;
        squareElement.classList.add('completed');
    }
    checkForBingo();
}

function checkForBingo() {
    // Current logic: Check for "Blackout" (all squares completed)
    let allDaresCompleted = completedDares.every(dare => dare === true);
    if (allDaresCompleted) {
        showWinScreen(true);
    }
}

function showWinScreen(didWin) {
    const winPopup = document.getElementById('win-popup');
    const message = document.getElementById('win-message');
    const instruction = document.getElementById('win-instruction');
    
    if (didWin) {
        const langData = LANGUAGES[currentLang];
        // Note the use of .toUpperCase() for a punchy win message!
        message.innerHTML = `🎉 **${playerName.toUpperCase()} ${langData.win_message_prefix}** 🎉<br>${langData.win_message_suffix}`;
        instruction.textContent = langData.win_instruction; 
        winPopup.classList.remove('hidden');
    }
}

function handleCloseModal(event) {
    const modalToClose = event.currentTarget.closest('.modal');
    if (modalToClose) {
        modalToClose.classList.add('hidden');
    }
}

function resetGame(newLang = currentLang) {
    document.getElementById('win-popup').classList.add('hidden');
    
    completedDares.fill(false);
    
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.classList.remove('completed'));
    
    nameInput.value = "";
    currentLang = newLang;
    startGame();
}


// --- UI / EVENT FUNCTIONS (Called by startGame) ---

function translatePage(lang) {
    currentLang = lang;
    const langData = LANGUAGES[lang];

    // 1. Header
    document.getElementById('header-h1').textContent = langData.title_h1;
    document.getElementById('header-h2').textContent = langData.title_h2;

    // 2. Start Pop-up
    document.getElementById('start-heading').innerHTML = langData.start_heading;
    document.getElementById('start-message').innerHTML = langData.start_message;
    nameInput.placeholder = langData.start_placeholder;
    startGameButton.textContent = langData.start_button; 

    // 3. Reset Button
    document.getElementById('reset-button').textContent = langData.reset_button;
    
    // 4. Dares 
    setupBoard(); 
}

function setLanguage(lang) {
    const langOptionsContainer = document.getElementById('lang-options');
    const langDropdownButton = document.getElementById('current-lang-display');
    const langData = LANGUAGES[lang];
    
    let flag = '';
    let langName = '';
    
    // Updated flag logic
    if (lang === 'en') { flag = '🇬🇧'; langName = 'English'; }
    else if (lang === 'de') { flag = '🇩🇪'; langName = 'Deutsch'; }
    else if (lang === 'es') { flag = '🇪🇸'; langName = 'Español'; }

    // Update the main display button text (using the full name for clarity in the display)
    langDropdownButton.innerHTML = `<span class="flag-icon">${flag}</span> ${langName}`;
    
    // Update the 'active' class on the list items
    langOptionsContainer.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    if (lang !== currentLang) {
        resetGame(lang); 
    }
}

function toggleLanguageDropdown() {
    const langOptionsContainer = document.getElementById('lang-options');
    langOptionsContainer.classList.toggle('show');
}


function handleStartGameClick() {
    let name = nameInput.value.trim();
    
    if (name.length > 0) {
        playerName = name;
        startPopup.classList.add('hidden');
    } else {
        alert(LANGUAGES[currentLang].name_alert);
    }
}

function setupListeners() {
    // Attach listener for the start button
    startGameButton.onclick = handleStartGameClick;

    // Attach listeners for ALL close buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.onclick = handleCloseModal;
    });

    // Attach listener for the dropdown button
    const langDropdownButton = document.getElementById('current-lang-display');
    langDropdownButton.onclick = toggleLanguageDropdown;
    
    // Attach listeners for language option links
    const langOptionsContainer = document.getElementById('lang-options');
    langOptionsContainer.querySelectorAll('a').forEach(option => {
        const lang = option.getAttribute('data-lang');
        option.onclick = (e) => {
            e.preventDefault(); 
            setLanguage(lang);
            toggleLanguageDropdown(); // Close the dropdown after selection
        };
    });

    document.getElementById('reset-button').onclick = resetGame;
}

function startGame() {
    translatePage(currentLang);
    startPopup.classList.remove('hidden');
    nameInput.focus(); 
    setupListeners();
}


// --- EXECUTION START ---
// The script waits for the entire HTML to load, then calls startGame.
document.addEventListener('DOMContentLoaded', startGame);