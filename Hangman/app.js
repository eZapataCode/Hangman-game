const wordContainer = document.querySelector(".word-container");
const letterForm = document.querySelector(".letter-form");
const startGameBtn = document.querySelector(".btn-start");
const tryAgainBtn = document.querySelectorAll(".btn-try-again");
const hangImage = document.querySelector(".hang-image");

let chances = 0;

/* <==| EVENTS |==> */

letterForm.addEventListener('submit', e =>
    searchCoincidences(e));

startGameBtn.addEventListener('click', () => {
    const menuContainer = document.querySelector('.start-game-container');
    menuContainer.classList.add('hide');
    getRandomWord();
});

tryAgainBtn.forEach((btn) => btn.addEventListener('click', restartGame));
/* <==| FUNCTIONS |==> */

function getRandomWord() {
    const randomNumber = Math.floor(Math.random() * 6);
    const randomWord = words[randomNumber].word;
    createLetterBlocks(randomWord);
}

function createLetterBlocks(randomWord) {
    const letters = [...randomWord];
    letters.forEach(letter => {
        const letterBlock = document.createElement('div');
        letterBlock.classList.add('letter-block');
        letterBlock.innerHTML = `<div class="letter-container">${letter}</div>`;
        wordContainer.appendChild(letterBlock);
    });
};

function searchCoincidences(e) {
    e.preventDefault();
    const guess = letterForm.letterInput;
    const letterContainers = document.querySelectorAll('.letter-container');
    let hasGuessedWord = false;

    letterContainers.forEach((ltr, index) => {
        if (ltr.innerHTML === guess.value) {
            ltr.classList.add('show')
            hasGuessedWord = true;
        }
    });
    guess.value = '';
    checkLoseWin(hasGuessedWord);
}

function checkLoseWin(hasGuessedWord) {

    if (!hasGuessedWord) {
        chances++;
        hangImage.setAttribute('src', `img/hang${chances}.png`)
    }

    if (chances === 6) {
        const gameOverContainer = document.querySelector('.gameover-menu-container');
        gameOverContainer.classList.remove('hide');
        return
    }

    const letterContainers = [...document.querySelectorAll('.letter-container')];

    const lettersRest = letterContainers.filter(letter => (letter.classList[1] !== 'show'));

    if (lettersRest.length === 0) {
        const youWinContainer = document.querySelector('.win-menu-container');
        youWinContainer.classList.remove('hide');
    };
}

function restartGame() {
    const gameOverContainer = document.querySelector('.gameover-menu-container');
    const youWinContainer = document.querySelector('.win-menu-container');
    gameOverContainer.classList.add('hide');
    youWinContainer.classList.add('hide');

    hangImage.setAttribute('src', 'img/hang0.png')
    wordContainer.innerHTML = '';
    chances = 0;
    getRandomWord();
}
