const gameContainer = document.querySelector(".game-container");
const movesCounter = document.querySelector(".moves span");
const timerDisplay = document.querySelector(".timer span");
const startButton = document.querySelector(".start button");

const faces = [
    "image/cat.jpg", "image/cow.jpg", "image/dog.jpg",
    "image/fox.jpg", "image/pig.jpg", "image/rabbit.jpg",
    "image/cat.jpg", "image/cow.jpg", "image/dog.jpg",
    "image/fox.jpg", "image/pig.jpg", "image/rabbit.jpg"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let boardDisabled = true;
let moves = 0;
let score = 0;
let maxScore = faces.length / 2;
let sec = 0;
let min = 0;
let interval = null;

// Shuffle function
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Create game board dynamically
function createBoard() {
    gameContainer.innerHTML = ""; // Clear existing cards
    shuffle(faces);
    faces.forEach((face) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="front"></div>
            <div class="back"><img src="${face}" alt=""></div>
        `;
        card.addEventListener("click", flipCard);
        gameContainer.appendChild(card);
    });

    cards = document.querySelectorAll(".card");
}

// Start game function
function start() {
    score = 0;
    moves = 0;
    sec = 0;
    min = 0;
    firstCard = null;
    secondCard = null;
    boardDisabled = false;

    movesCounter.innerText = "0";
    timerDisplay.innerText = "00:00";
    startButton.innerText = "Restart";

    createBoard();
    startTimer();
}

// Flip card logic
function flipCard() {
    if (boardDisabled || this.classList.contains("show")) return;

    this.classList.add("show");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        movesCounter.innerText = moves;

        let firstImg = firstCard.querySelector("img").src;
        let secondImg = secondCard.querySelector("img").src;

        if (firstImg === secondImg) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = null;
            secondCard = null;
            score++;

            if (score === maxScore) {
                clearInterval(interval);
                startButton.innerText = "New Game";
            }
        } else {
            boardDisabled = true;
            setTimeout(() => {
                firstCard.classList.remove("show");
                secondCard.classList.remove("show");
                firstCard = null;
                secondCard = null;
                boardDisabled = false;
            }, 800);
        }
    }
}

// Timer function
function startTimer() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
        sec++;
        if (sec === 60) {
            min++;
            sec = 0;
        }
        timerDisplay.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }, 1000);
}

// Event listener for start button
startButton.addEventListener("click", start);
