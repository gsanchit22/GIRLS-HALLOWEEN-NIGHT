// --- 1. POLISH GAME DATA ---
const GAME_TITLE_H1 = "BINGO SEKSI CIPEК";
const GAME_TITLE_H2 = "HALLOWEEN PARTY";
const START_HEADING = "Witaj, śmiertelniku. Wpisz swoje imię, aby rozpocząć grę. 😈";
const START_PLACEHOLDER = "Twoje Imie";
const START_BUTTON = "ROZPOCZNIJ GRĘ";
const WIN_MESSAGE_PREFIX = "WYGRYWA NAGRODĘ!";
const WIN_MESSAGE_SUFFIX = "Gratulacje! Czas na darmowego shota. Zgłoś się do gospodarza!";
const WIN_INSTRUCTION = "Pokaż ten ekran gospodarzowi imprezy natychmiast po odbiór nagrody!";
const RESET_BUTTON = "ZACZNIJ OD NOWA";
const NAME_ALERT = "Proszę podaj imię, aby rozpocząć grę!";

const DARES = [
    "Zaśpiewaj przy wszystkich twoja ulubiona piosenkę 🎤🎶",
    "Zrób toast za duchy obecne w pokoju. 👻🥂",
    "Wypij łyk z zamkniętymi oczami – ktoś wybiera co. 🙈🥃",
    "Zrób rundę „do dna” z osobą po prawej. 🍻➡️",
    "Przez minutę pij ze szklanki bez użycia rąk. 🥤🚫🖐️",
    "Wypij shota i powiedz najstraszniejsze słowo, jakie znasz. 😨🥃",
    "Zrób shota, a potem przez 30 sekund udawaj pijanego zombie. 🧟‍♀️😵",
    "Zrób toast, używając tylko słów zaczynających się na „P”. 🇵🇱🗣️",
    "Podpierdol komuś element bielizny(stanik, skarpetki, majtki) 😈"
];

let playerName = "";
const completedDares = new Array(DARES.length).fill(false);

// GLOBAL ELEMENT REFERENCES
const startPopup = document.getElementById('start-popup');
const nameInput = document.getElementById('name-input');
const startGameButton = document.getElementById('start-game-button');


// --- CORE GAME LOGIC FUNCTIONS ---

function setupBoard() {
    // Set up board listeners (squares)
    const squares = document.querySelectorAll('.square');
    squares.forEach((square, index) => {
        square.textContent = DARES[index]; 
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
    // Logic remains "Blackout" (all squares completed)
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
        message.innerHTML = `🎉 **${playerName.toUpperCase()} ${WIN_MESSAGE_PREFIX}** 🎉<br>${WIN_MESSAGE_SUFFIX}`;
        instruction.textContent = WIN_INSTRUCTION; 
        winPopup.classList.remove('hidden');
    }
}

function handleCloseModal(event) {
    const modalToClose = event.currentTarget.closest('.modal');
    if (modalToClose) {
        modalToClose.classList.add('hidden');
    }
}

function resetGame() {
    document.getElementById('win-popup').classList.add('hidden');
    
    completedDares.fill(false);
    
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.classList.remove('completed'));
    
    nameInput.value = "";
    startGame();
}


// --- UI / EVENT FUNCTIONS (Simplified for single language) ---

function updatePageText() { 
    // 1. Header
    document.getElementById('header-h1').textContent = GAME_TITLE_H1;
    document.getElementById('header-h2').textContent = GAME_TITLE_H2;

    // 2. Start Pop-up
    document.getElementById('start-heading').innerHTML = START_HEADING;
    document.getElementById('start-message').textContent = ""; 
    nameInput.placeholder = START_PLACEHOLDER;
    startGameButton.textContent = START_BUTTON; 

    // 3. Reset Button
    document.getElementById('reset-button').textContent = RESET_BUTTON;
    
    // 4. Dares 
    setupBoard(); 
}

function handleStartGameClick() {
    let name = nameInput.value.trim();
    
    if (name.length > 0) {
        playerName = name;
        startPopup.classList.add('hidden');
    } else {
        alert(NAME_ALERT);
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

    // Removed all language dropdown listeners

    document.getElementById('reset-button').onclick = resetGame;
}

function startGame() {
    updatePageText();
    startPopup.classList.remove('hidden');
    nameInput.focus(); 
    setupListeners();
}


// --- EXECUTION START ---
document.addEventListener('DOMContentLoaded', startGame);
