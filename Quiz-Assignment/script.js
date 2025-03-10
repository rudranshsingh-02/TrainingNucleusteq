let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

async function startGame() {
    questions = await fetchQuestions();
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        localStorage.setItem("quizScore", score);
        window.location.href = "results.html";
        return;
    }
    clearTimeout(timer);

    // Reset UI
    document.getElementById("feedback").textContent = "";
    document.getElementById("options").innerHTML = "";

    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = questionData.question;

    const options = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.onclick = () => handleAnswer(button, option, questionData.correct_answer);
        document.getElementById("options").appendChild(button);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = 15;
    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

function handleAnswer(selectedButton, selected, correct) {
    clearInterval(timer);
    document.querySelectorAll(".option-button").forEach(button => button.disabled = true);
    if (selected === correct) {
        score++;
        selectedButton.style.backgroundColor = "#A7BEAE";
        document.getElementById("feedback").textContent = "Correct ✅";
    } else {
        selectedButton.style.backgroundColor = "#B85042";
        document.getElementById("feedback").textContent = `Incorrect ❌ Correct: ${correct}`;
    }
    updateScoreDisplay();
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}

function showCorrectAnswer() {
    const correct = questions[currentQuestionIndex].correct_answer;
    document.getElementById("feedback").textContent = `Time's up! Correct Answer: ${correct}`;
    document.querySelectorAll(".option-button").forEach(button => button.disabled = true);
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}

function updateScoreDisplay() {
    document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
}

startGame();
