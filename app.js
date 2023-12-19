// Prevent animation on load

setTimeout(() => {
    document.body.classList.remove("preload");
}, 500);

const target = 1;

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const userScoreNumber = document.querySelector(".score__number");
const aiScoreNumber = document.querySelector(".pcscore__number");
let score = 0;

// Game Logic
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
        }, idx * 1000);
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerText = "you win against PC";
            resultDivs[0].classList.toggle("winner");
            userScoreNumber.innerText = parseInt(userScoreNumber.innerText) + 1;
        } else if (aiWins) {
            resultText.innerText = "you lose against PC";
            resultDivs[1].classList.toggle("winner");
            aiScoreNumber.innerText = parseInt(aiScoreNumber.innerText) + 1;
        } else {
            resultText.innerText = "draw";
        }
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
        checkWinner();
    }, 1000);
}

function checkWinner() {
    let winnerAnnouncement = "";
    const image = document.createElement("img");
    if (aiScoreNumber.innerText == target) {
        winnerAnnouncement = "Better Luck Next Time!";
        image.setAttribute("src", "/images/loser.svg");
    }
    if (userScoreNumber.innerText == target) {
        winnerAnnouncement = "Hurray You Won The Game!";
        image.setAttribute("src", "/images/winner.svg");
    }

    if (
        aiScoreNumber.innerText == target ||
        userScoreNumber.innerText == target
    ) {
        const btn = document.querySelector(".play-again");
        btn.addEventListener("click", () => {
            location.reload();
        });
        const body = document.querySelector("body");
        body.setAttribute("class", "aftergame");
        body.innerHTML = "";
        const resultString = document.createElement("h3");
        resultString.setAttribute("class", "results__text");
        resultString.innerText = winnerAnnouncement;
        body.appendChild(image);
        body.appendChild(resultString);
        body.appendChild(btn);
    }
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-modal");
});
