const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDislay = document.querySelector(".message-container");
const wordle = "CLOUD";

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "«",
];

keys.forEach((key) => {
  const buttonEl = document.createElement("button");
  buttonEl.textContent = key;
  buttonEl.setAttribute("id", key);
  buttonEl.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonEl);
});
const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, index) => {
  const rowEl = document.createElement("div");
  rowEl.setAttribute("id", "guessRow-" + index);

  guessRow.forEach((guess, guessIndex) => {
    const tileEl = document.createElement("div");
    tileEl.setAttribute("id", "guessRow-" + index + "-tile-" + guessIndex);
    tileEl.classList.add("tile");

    rowEl.append(tileEl);
  });
  tileDisplay.append(rowEl);
});

const handleClick = (letter) => {
  console.log("clicked " + letter);

  if (letter === "«") {
    deleteLetter();
    return;
  }
  if (letter === "ENTER") {
    checkRow();
    return;
  }
  addLetter(letter);
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = letter;

    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute("data", letter);
    currentTile++;
    console.log("guessRows", guessRows);
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = "";
    guessRows[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
  }
};
const checkRow = () => {
  const guess = guessRows[currentRow].join("");

  if (currentTile > 4) {
    console.log("guess " + guess, "wordle " + wordle);
    flipTile();
    if (wordle === guess) {
      showMessage("Excellent! You won!");
      isGameOver = true;
      return;
    } else {
      if (currentRow >= 5) {
        isGameOver = true;
        showMessage("Game Over");
        return;
      }
      if (currentRow < 5) {
        currentRow++;
        currentTile = 0;
      }
    }
  }
};
const showMessage = (message) => {
  const messageEl = document.createElement("p");
  messageEl.textContent = message;
  messageDislay.append(messageEl);

  setTimeout(() => {
    messageDislay.removeChild(messageEl);
  }, 2000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes;
  const guess = [];
  let checkWordle = wordle;

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute("data"), color: "grey" });
  });
  console.log("guess", guess);
  guess.forEach((guess, index) => {
    if (guess.letter === wordle[index]) {
      guess.color = "green";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = "yellow";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("flip");
      tile.classList.add(guess[index].color);
      addColorToKey(guess[index].letter, guess[index].color);
    }, 500 * index);
  });
};
