window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
};

// global variables
let clicks = 0;
let timeScore;

// start button initiates game and starts counter
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

const startGame = () => {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
};

// end button stops the game
document.getElementById('endGame').addEventListener("click", endGame);

const endGame = () => {
    const endTimer = () => {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    };
    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
};

// createRandom number function
let randomOrderArray = [];
const setRandomTileOrder = (numberOfTiles) => {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.floor(Math.random() * numberOfTiles) + 1;

        if (!randomOrderArray.includes(randomNum)) {
            randomOrderArray.push(randomNum);
        }
    }
};

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

const setTiles = () => {
    tiles.forEach((tile, index) => {
        tile.innerHTML = randomOrderArray[index];

        // Replace numerical values with icon pairs
        if (tile.innerHTML < 3) {
            tile.innerHTML = rocket;
            tile.setAttribute("icon", "rocket")
        } else if (tile.innerHTML < 5) {
            tile.innerHTML = bacteria;
            tile.setAttribute("icon", "bacteria")
        } else if (tile.innerHTML < 7) {
            tile.innerHTML = cocktail;
            tile.setAttribute("icon", "cocktail")
        } else if (tile.innerHTML < 9) {
            tile.innerHTML = football;
            tile.setAttribute("icon", "football")
        } else if (tile.innerHTML < 11) {
            tile.innerHTML = pizza;
            tile.setAttribute("icon", "pizza")
        } else if (tile.innerHTML < 13) {
            tile.innerHTML = kiwi;
            tile.setAttribute("icon", "kiwi")
        } else {
            console.log("Error: too many tiles");
        }
    });
};

// Timer Function
let count = 0;
let timer;

const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => {
        document.getElementById("timer").innerText = ++count;

        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").innerText = "Game Over";
        }
    }, 1000);
};

// Icon assign variables
const football = `<i class="fas fa-football-ball"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
// Assume other icon variables are defined here

let selectedTile = '';
let tileIcon;
let tileIcons = [];
let tileIds = [];

// displayTile function
const displayTile = (e) => {
    const tile = e.target;
    tile.classList.remove("hideTile");
    tile.classList.add("displayTile");
    
    tileIcon = tile.getAttribute("icon");
    tileIcons.push(tileIcon);
    const tileId = tile.getAttribute("id");
    tileIds.push(tileId);

    countMoves();
    
    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds);
    }
};

const checkMatch = (tileIcons, tileIds) => {
    const length = tileIcons.length;
    if (tileIcons[length - 2] !== tileIcons[length - 1]) {
        console.log("no match");
        setTimeout(() => {
            const tile1 = document.getElementById(tileIds[length - 2]);
            const tile2 = document.getElementById(tileIds[length - 1]);
            tile1.classList.remove("displayTile");
            tile2.classList.remove("displayTile");
        }, 1000);
    } else {
        console.log("match");
        const tile1 = document.getElementById(tileIds[length - 2]);
        const tile2 = document.getElementById(tileIds[length - 1]);
        tile1.style.backgroundColor = "green";
        tile2.style.backgroundColor = "green";
        tile1.setAttribute("guess", "correct");
        tile2.setAttribute("guess", "correct");
    }

    if (tileIcons.length === 12) {
        endGame();
    }
};

// countClicks -> calculates number of user clicks -> needed to calculate score
const countMoves = () => {
    clicks += 1;
    document.getElementById("clicks").innerText = clicks;
};

// ClearTiles -> Clear tiles when new game is started;
const clearTiles = () => {
    tiles.forEach(tile => {
        tile.style.fontSize = "0em";
        tile.style.backgroundColor = "#44445a";
    });
};

// CalculateScore function
const calculateScore = () => {
    let score = 1000 - (clicks * 10 + count * 2);
    alert(`Your score is ${score}`);
};

// ResetTiles function
const resetTiles = () => {
    tiles.forEach(tile => {
        tile.classList.remove("displayTile");
        tile.style.backgroundColor = "#44445a";
        tile.innerHTML = "";
        tile.removeAttribute("icon");
        tile.removeAttribute("guess");
    });
    clearTiles();
    clicks = 0;
    count = 0;
    document.getElementById("clicks").innerText = 0;
    document.getElementById("timer").innerText = 0;
};



