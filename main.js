const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDislay = document.querySelector('.message-container')
const wordle = 'CLOUD'

const keys = [
    'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','«',
]

keys.forEach(key=> {
  const buttonEl = document.createElement('button')  
  buttonEl.textContent = key;
  buttonEl.setAttribute('id', key)
  buttonEl.addEventListener('click', ()=>handleClick(key))
  keyboard.append(buttonEl)

})
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;


guessRows.forEach((guessRow, index)=> {
    const rowEl= document.createElement('div');
    rowEl.setAttribute('id', 'guessRow-' + index)

    guessRow.forEach((guess, guessIndex)=> {
       const tileEl= document.createElement('div')
       tileEl.setAttribute('id', 'guessRow-' + index + '-tile-'+ guessIndex) 
       tileEl.classList.add('tile')

       rowEl.append(tileEl)
    })
    tileDisplay.append(rowEl)
})

const handleClick = (letter) => {
    console.log('clicked '+ letter)

    if(letter === '«'){
       deleteLetter()
        return
    }
    if(letter === 'ENTER'){
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter = (letter) => {
    if(currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-'+ currentRow + '-tile-' +currentTile)
        tile.textContent = letter;

        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++;
        console.log('guessRows', guessRows)
    }
   
}

const deleteLetter = () => {
    if(currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-'+ currentRow + '-tile-' +currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
  
}
const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile > 4){
        console.log('guess '+ guess, 'wordle '+ wordle)
        flipTile()
        if(wordle === guess) {
            showMessage('Magnificent!')
            isGameOver = true
            return
        } else {
            if(currentRow >= 5) {
                isGameOver = true;
                showMessage('Game Over')
                return
            }
            if(currentRow < 5){
                currentRow++
                currentTile = 0
            }
        }
    }
}
const showMessage = (message) => {
    const messageEl = document.createElement('p')
    messageEl.textContent = message;
    messageDislay.append(messageEl)

    setTimeout(()=> {
        messageDislay.removeChild(messageEl)
    }, 2000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () =>{
    const rowTiles = document.getElementById('guessRow-'+ currentRow).childNodes;

    rowTiles.forEach((tile, index )=> {
        const dataLetter = tile.getAttribute('data')

        setTimeout(()=> {
            tile.classList.add('flip')
            if(dataLetter === wordle[index]) {
                tile.classList.add('green')
                addColorToKey(dataLetter, 'green')
            } else if (wordle.includes(dataLetter)){
                tile.classList.add ('yellow')
                addColorToKey(dataLetter, 'yellow')
            } else {
                tile.classList.add('grey')
                addColorToKey(dataLetter, 'grey')
            }
        }, 500 * index)
     
    })
}