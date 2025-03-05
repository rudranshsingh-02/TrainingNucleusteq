const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const player1Current = document.getElementById("player1-current");
const player2Current = document.getElementById("player2-current");

const rollDiceBtn = document.getElementById("roll-dice");
const saveScoreBtn = document.getElementById("save-score");
const resetGameBtn = document.getElementById("reset-game");

const diceImage = document.getElementById("dice-image");
const winnerAnnouncement = document.getElementById("winner-announcement");

let currentScore = 0;
let activePlayer = 1; // Player 1 starts first
let savedScores = [0, 0]; // Index 0 -> Player 1, Index 1 -> Player 2
let gameActive = true; 

function DiceRoll() {
    if (!gameActive) return; 
    let rollDice = Math.floor(Math.random() * 6) + 1;

    // Update dice image based on roll result
    diceImage.src = `dice-six-faces-${numberToWord(rollDice)}.png`;

    if (rollDice === 1) {
        currentScore = 0;
        switchPlayer();
    } else {
        currentScore += rollDice;
        updateCurrentScore();
    }
}

// Function to convert number to corresponding word 
function numberToWord(number) {
    const words = ["one", "two", "three", "four", "five", "six"];
    return words[number - 1];
}

function updateCurrentScore() {
    if (activePlayer === 1) {
        player1Current.textContent = currentScore;
    } else {
        player2Current.textContent = currentScore;
    }
}

function saveScore() {
    if (!gameActive) return; 

    // Add current score to active player's saved score
    savedScores[activePlayer - 1] += currentScore;

    if (activePlayer === 1) {
        player1Score.textContent = savedScores[0];
    } else {
        player2Score.textContent = savedScores[1];
    }

    if (savedScores[activePlayer - 1] >= 100) {
        declareWinner();
    } else {
        currentScore = 0;
        switchPlayer();
    }
}

function switchPlayer() {
    if (activePlayer === 1) {
        player1Current.textContent = "0";
        activePlayer = 2;
    } else {
        player2Current.textContent = "0";
        activePlayer = 1;
    }

    currentScore = 0;
    document.getElementById("player1-container").classList.toggle("active");
    document.getElementById("player2-container").classList.toggle("active");
}

function declareWinner() {
    gameActive = false; 

    winnerAnnouncement.textContent = `${activePlayer === 1 ? player1Name.value : player2Name.value} Wins!`;

    rollDiceBtn.disabled = true;
    saveScoreBtn.disabled = true;
}

function resetGame() {
    currentScore = 0;
    savedScores = [0, 0];
    activePlayer = 1;
    gameActive = true;

    player1Score.textContent = "0";
    player2Score.textContent = "0";
    player1Current.textContent = "0";
    player2Current.textContent = "0";
    winnerAnnouncement.textContent = "";
    diceImage.src = "dice-six-faces-one.png"; 

    rollDiceBtn.disabled = false;
    saveScoreBtn.disabled = false;

    document.getElementById("player1-container").classList.add("active");
    document.getElementById("player2-container").classList.remove("active");
}

rollDiceBtn.addEventListener("click", DiceRoll);
saveScoreBtn.addEventListener("click", saveScore);
resetGameBtn.addEventListener("click", resetGame);