let currRow, currCol, secretWord, userWord, popup, gameOn, button;
import{allWords} from './wordList.js';
import{words} from './easyWordList.js';
const regex = /^[A-Z]{1}$/;

setupGame();
function setupGame(){ 
    button=document.querySelector("#button");
    button.addEventListener("click", submitClicked);
    button.innerHTML="Submit";
    gameOn=true;
    window.addEventListener("keydown", checkKey);
    currCol = 0;
    currRow = 0;
    userWord=[];
    popup = document.querySelector("#popup");
    secretWord=(words[Math.floor(Math.random()*words.length)]);
    console.log(secretWord);
    setupGrid();
}

function setupGrid(){
    let grid=document.querySelector("#grid");
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }

    for(let j=0; j<6; j++){
        let row = document.createElement("div");
        row.id="row"+j;
        row.classList.add("row");
        grid.appendChild (row);
        for (let i=0; i<5; i++){
            let tile=document.createElement("div");
            tile.id=row.id+"col"+i;
            tile.classList.add("tile");
            tile.innerHTML="";
            row.appendChild(tile);
        }
    }
}


function checkKey(e){
    if(!gameOn){
        setupGame();
    }else{
        let keyPressed=e.key.toUpperCase();
        let currTile;
        if(currCol<5 && regex.test(keyPressed)){
            document.querySelector(`#row${currRow}col${currCol}`).innerHTML=keyPressed;
            userWord.push(keyPressed);
            currCol++;
        } else if(keyPressed==="ENTER"){
            submitClicked();
        } else if(keyPressed==="BACKSPACE"){
            if(currCol>0){
                document.querySelector(`#row${currRow}col${currCol-1}`).innerHTML="";
                userWord.pop();
                currCol--;
            }
        }
    }
}

function submitClicked(){
    if(gameOn){
        if(userWord.length<5){
            showMessage("Too short");
        }else if(!allWords.includes(userWord.join(""))){
            showMessage("Invalid Word");
        }else{
            checkGame();
        }
    }else{
        setupGame();
    }
}

function showMessage(message){
    popup.innerHTML=(message);
    popup.classList.toggle("hide");
    setTimeout((()=>popup.classList.toggle("hide")),2000);
}

function checkGame(){
    let secretArray=Array.from(secretWord);
    userWord.forEach((letter, index) => {
        let currTile = document.querySelector(`#row${currRow}col${index}`);
        if(!secretArray.includes(letter)){
            currTile.classList.add("noMatchTile");
        }else if(letter===secretArray[index]){
            currTile.classList.add("winningTile");
        }else{
            currTile.classList.add("existsTile");
        }
    });
    if(userWord.toString()!=secretArray.toString() && currRow==5){
        showMessage(`You Lost. <br>Correct Word: ${secretWord}`);
        endGame();
    }else if(userWord.toString()===secretArray.toString()){
        showMessage("Winner");
        endGame();
    }else{
        userWord=[];
        currCol=0;
        currRow++;
    }
}

function endGame(){
    gameOn=false;
    button.innerHTML="New Game";
}