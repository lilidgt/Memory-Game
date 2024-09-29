//defina o array de cartas com imagens(substituindo as letras)
const cardsArray = [
    { name: "A", id: 1, img: "images/dog.jpg" },
    { name: "B", id: 2, img: "images/cat.jpg" },
    { name: "C", id: 3, img: "images/bunny.jpg" },
    { name: "D", id: 4, img: "images/hamster.jpg" },
    { name: "A", id: 5, img: "images/dog.jpg" },
    { name: "B", id: 6, img: "images/cat.jpg" },
    { name: "C", id: 7, img: "images/bunny.jpg" },
    { name: "D", id: 8, img: "images/hamster.jpg" }
];

let firstCard = null;
let secondCard = null;
let isBoardLocked = false;

function createBoard() {
    const gameBoard = document.getElementById("game-board");
    cardsArray.sort(() => 0.5 - Math.random()); //embaralha as cartas

    cardsArray.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.name = card.name;
        cardElement.dataset.id = card.id;
        cardElement.dataset.img = card.img; //adiciona a imagem como dado
        cardElement.addEventListener("click", flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (isBoardLocked || this === firstCard) return;

    this.classList.add("flipped");
    this.style.backgroundImage = `url(${this.dataset.img})`; //mostra a imagem da carta

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        isBoardLocked = true;
        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.style.backgroundImage = ''; //remove a imagem da primeira carta
        secondCard.style.backgroundImage = ''; //remove a imagem da segunda carta
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    isBoardLocked = false;
}

document.getElementById("restart-button").addEventListener("click", restartGame);

function restartGame() {
    var restart_game = document.getElementById("restart-button")
    location.reload(); // Recarrega a págin
}

document.addEventListener("DOMContentLoaded", createBoard);
