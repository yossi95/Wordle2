


const tileGrid = document.querySelector(".guess-grid")
const tileGridMatrix = []
const tiles = tileGrid.querySelectorAll("div")
let row = -1, col=0;
let tryes = 0;
tiles.forEach(function(element) {
    if(col % 5 === 0) {
        tileGridMatrix.push([element])
        row++;
    }else {
        tileGridMatrix[row].push(element)
    }
    col++;
})


console.log(tileGridMatrix)
function wordList() {
    let AllWordLists = [
            "אפרסק",
            "אבטיח",
            "פפאיה",
            "לימון",
            "ארטיק",
        //     "ספורט",
        // "מכללה",
        // "אשקלון",
        // "ישראל",
        // "מברשת",
        // "חולצה",
        // "פלאפון",
        // "מרפסת",
        // "מקלדת",
        //
        // "משאית",
        // "גלידה",
        // "מעלית",
        // "רכבים",
    ]
    let words = []
    for(let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * AllWordLists.length)
        const deleted = AllWordLists.splice(randomIndex,1)
        words.push(...deleted)
    }
    return words.map(word => word.split(''));
}

let i = 0 ,j = 0;
const wordsForGameMatrix = wordList()
let userEnteredLetters = []

function attachKeyboard() {

    const keyBoard = document.querySelector(".keyboard")
    const buttons = keyBoard.querySelectorAll("button")


    window.addEventListener('keydown',(event) => {
        for(let button of buttons) {
            const clickedLetter = button.innerText.toLowerCase()
            const keyClicked =  event.key.toLowerCase()
            if(clickedLetter === keyClicked
                || clickedLetter === 'del' && keyClicked === 'backspace') {
                button.click()
            }
        }
    })

    buttons.forEach(function (keyBoardButton) {



        keyBoardButton.addEventListener("click",() => {
            if(tryes === 5) {
                alert("Game over")
                return window.location.reload()
            }
            const clickedLetter = keyBoardButton.innerText
            if(clickedLetter === 'DEL') {
                if(j >= 0)
                    clearCell()
                return;
            }

            if(clickedLetter === 'ENTER') {
                if(j < 5) {
                    alert('Not enough letters')
                    tryes++;
                    return
                }

                if(wordsForGameMatrix.includes(userEnteredLetters)) {
                    alert('not in word list!')
                    tryes++;
                    return
                }
                const word = [...wordsForGameMatrix[i]] // ['a','b'...]
                for(let k = 4; k >= 0; k--) {
                    let char_user = userEnteredLetters[k]
                    let char_word = word[k]
                    if(char_word === char_user) {
                        word[k] = ""; // checked
                        paintTileColorGreen(i, k)
                    } else if(word.includes(char_user)) {
                        word[k] = ""; // checked
                        paintTileColorYellow(i, k)
                    } else {
                        paintTileColorGray(i, k)
                    }
                }
                tryes = 0;
                i++;
                j = 0;
                return;
            }
            // enter a letter
            if(j === 5) return;
            userEnteredLetters[j] = clickedLetter
            tileGridMatrix[i][j].innerText = clickedLetter
            userEnteredLetters.push(clickedLetter)
            j++
        })
    })
}
attachKeyboard()

function clearCell() {
    let col = Math.min(4, j);
    tileGridMatrix[i][col].style.backgroundColor = "none";
    tileGridMatrix[i][col].innerText = "";
    if(j > 0) j--;
}

function paintTileColorGreen(row,col) {
    tileGridMatrix[row][col].style.backgroundColor = "rgb(83, 141, 78)";
}
function paintTileColorYellow(row,col) {
    tileGridMatrix[row][col].style.backgroundColor ="rgb(227,184,22)";
}

function paintTileColorGray(row,col) {
    tileGridMatrix[row][col].style.backgroundColor = "rgb(92,94,94)";
}
