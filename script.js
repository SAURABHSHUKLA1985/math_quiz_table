const questionText = document.getElementById("question-text");
const userAnswer = document.getElementById("user-answer");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let score = 0;
let questionsRemaining = 10;
let countdown;

function generateQuestion() {
    if (questionsRemaining > 0) {
        const num1 = Math.floor(Math.random() * 14) + 2; // Random number between 2 and 15
        const num2 = Math.floor(Math.random() * 9) + 2; // Random number between 2 and 10
        const correctAnswer = num1 * num2;

        questionText.textContent = `What is ${num1} x ${num2}?`;
        userAnswer.value = "";
        userAnswer.focus();

        clearInterval(countdown);
        let timeLeft = 10;
        updateTimer(timeLeft);

        countdown = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer(timeLeft);
            } else {
                clearInterval(countdown);
                checkAnswer();
            }
        }, 1000);
    } else {
        if (score > 8) {
            congratulationsScreen();
        } else {
            quizCompletedScreen();
        }
    }
}

function checkAnswer() {
    const userResponse = parseInt(userAnswer.value);
    const num1 = parseInt(questionText.textContent.split(" ")[2]);
    const num2 = parseInt(questionText.textContent.split(" ")[4]);
    const correctAnswer = num1 * num2;

    if (userResponse === correctAnswer) {
        score++;
    }
    questionsRemaining--;
    scoreElement.textContent = `Score: ${score}`;

    generateQuestion();
}

function updateTimer(timeLeft) {
    timerElement.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
}

userAnswer.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function congratulationsScreen() {
    questionText.textContent = "Congratulations!";
    userAnswer.style.display = "none";
    timerElement.style.display = "none";
    scoreElement.textContent = `Final Score: ${score}`;
}

function quizCompletedScreen() {
    questionText.textContent = "Quiz completed!";
    userAnswer.style.display = "none";
    timerElement.textContent = "Time's up!";
}

generateQuestion();
