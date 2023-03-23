//generate number
let correctNum = Math.floor((Math.random() * 99) + 1);
console.log(correctNum);

//grab guess
const h3 = document.querySelector("h3");
const guess = document.querySelector("#guess");
const guessBtn = document.querySelector("#guessBtn");
const hintBtn = document.querySelector("#hintBtn");
const resetBtn = document.querySelector("#resetBtn");
const body = document.querySelector("body");

//put in array if not guessed. if guessed already, say so
//if right, return win
//if wrong, return lose and give a hint
guessBtn.addEventListener("click", evaluateGuess);
let prevGuesses = [];
let numberOfTries = 0;
let div = document.createElement("div");
body.append(div);

function evaluateGuess() {
    let theirGuess = Number(guess.value);
    if (typeof(theirGuess) != "number") {
        h3.textContent = "That isn't a number...";
    } else if (prevGuesses.includes(theirGuess)) {
        h3.textContent = "You guessed that already!";
    } else if (theirGuess > 100 || theirGuess < 1) {
        h3.textContent = "That guess is out of range."
    } else if (theirGuess === correctNum) {
        h3.textContent = "You win!"
        restartGame();
    } else if (numberOfTries === 4 && theirGuess != correctNum) {
        h3.textContent = "You lose! The correct answer was " + correctNum + ". Press reset to play again.";
        guessBtn.disabled = true;
    } else if (theirGuess > correctNum && theirGuess - correctNum > 20) {
        h3.textContent = "You're cold! Try guessing lower."
        trackGuess(theirGuess);
    }  else if (theirGuess > correctNum && theirGuess - correctNum <= 20 &&  theirGuess - correctNum >= 5) {
        h3.textContent = "You're warm! Try guessing lower."
        trackGuess(theirGuess);
    } else if (theirGuess > correctNum && theirGuess - correctNum < 5) {
        h3.textContent = "You're ON FIRE! Try guessing lower."
        trackGuess(theirGuess);
    } else if (theirGuess < correctNum && correctNum - theirGuess < 5) {
        h3.textContent = "You're ON FIRE! Try guessing higher."
        trackGuess(theirGuess);
    } else if (theirGuess < correctNum && correctNum - theirGuess <= 20 && correctNum - theirGuess >= 5) {
        h3.textContent = "You're warm! Try guessing higher."
        trackGuess(theirGuess);
    } else if (theirGuess < correctNum && correctNum - theirGuess > 20) {
        h3.textContent = "You're cold! Try guessing higher."
        trackGuess(theirGuess);
    } 
}

function restartGame(){
    numberOfTries = 0;
    correctNum = Math.floor((Math.random() * 99) + 1);
    h3.textContent = "Hint: type a number!";
    guessBtn.disabled = false;
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
    prevGuesses = [];
}

//show old guesses
function trackGuess(theirGuess){
    numberOfTries++;
    prevGuesses.push(theirGuess);
    let h4 = document.createElement("h4");
    div.append(h4);
    h4.textContent = theirGuess;
}

//make a reset button
resetBtn.addEventListener("click", restartGame);

//make a better hint button
hintBtn.addEventListener("click", hintMaker);

function hintMaker(){
    let hintArr = [];

    for(let i = 0; i<3; i++) {
        let hint = Math.floor((Math.random() * 99) + 1);
        while (hintArr.includes(hint)) {
            hint = Math.floor((Math.random() * 99) + 1);
            if (hint === correctNum) {
               hint = Math.floor((Math.random() * 99) + 1);
            }
        }
        hintArr.push(hint);
    }

    hintArr[Math.floor(Math.random() * 3)] = correctNum;
    h3.textContent = `The answer is either ${hintArr}`;
}