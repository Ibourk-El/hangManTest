import { quetions } from "./quetions.js";
console.log(quetions);
let answerBox = document.getElementById("answer-box");
let chanceEl = document.getElementById("chance");
let quetionBox = document.getElementById("quetion");
let menu = document.getElementById("menu");
let startBtn = document.querySelector(".start");
let restartBtn = document.querySelector(".restart");
let menuBtn = document.querySelector(".menu-btn");
let cards = document.querySelectorAll(".card");
let btnsMenu = document.querySelector(".btns");

//
let catigory = "football";
let catigoryQuetion = quetions[catigory];
let questionIndex = 0;
let letters = "azertyuiopmlkjhgfdsqwxcvbn ";
let chance = 10;
let heightOfCloser = 100;
let porsontge = 0;
//
// to chose the catigory
cards.forEach((item, i) => {
  item.addEventListener("click", (e) => {
    catigory = e.target.getAttribute("data-catigory");
    cards[i].classList.add("active");
    resetVars();
  });
});
// start geme
startBtn.addEventListener("click", (e) => {
  menu.style.display = "none";
  console.log("hell");
});

// restart game
restartBtn.addEventListener("click", (e) => {
  resetVars();
  e.target.parentElement.style.display = "none";
});

// return to menu
menuBtn.addEventListener("click", (e) => {
  menu.style.display = "flex";
  e.target.parentElement.style.display = "none";
});

// add tiris to answer Box
function addTiris(word) {
  let text = "";
  for (let i = 0; i < word.length; i++) {
    text += "-";
  }
  return text;
}

// letters box
function createLetterBox(value) {
  let span = document.createElement("span");
  span.className = "letter";
  span.innerHTML = value;
  addEventToLetter(span);
  span.classList.add("clicked");
  return span;
}
// add chars to answer box
function addCharToAnswerBox(value) {
  let span = document.createElement("span");
  span.className = "answer-letter";
  span.innerHTML = value;
  return span;
}
// for keyboard
function pushLettersToBox(className, letters, elFun) {
  let Box = document.getElementById(className);
  let len = letters.length;
  for (let i = 0; i < len; i++) {
    Box.appendChild(elFun(letters[i]));
  }
}
//add enents keyBord
function addEventToLetter(letterBox) {
  letterBox.addEventListener("click", (e) => {
    if (letterBox.classList.contains("clicked")) {
      if (
        checkIfLetterInAnsewr(
          catigoryQuetion[questionIndex].answer,
          e.target.innerHTML
        )
      ) {
        e.target.classList.add("true");
        toTheNextQuetion(heightOfCloser);
      } else {
        e.target.classList.add("false");
        chance--;
        chanceEl.innerHTML = chance;
        lose(chance);
      }
      letterBox.classList.remove("clicked");
    }
  });
}
//
function checkIfLetterInAnsewr(answer, char) {
  let len = answer.length;
  let isFinedIt = false;
  for (let i = 0; i < len; i++) {
    if (answer[i].toLowerCase() === char) {
      answerBox.children[i].innerHTML = answer[i];
      isFinedIt = true;
      heightOfCloser -= porsontge;
      removeThCloser(heightOfCloser);
    }
  }
  return isFinedIt;
}
// show btns menu win lose
function lose(x) {
  if (x == 0) {
    btnsMenu.style.display = "flex";
  }
}

// to show a part of the image
function removeThCloser(pos) {
  let closeBox = document.getElementById("close");
  closeBox.style.height = pos + "%";
}
// next quetion
function toTheNextQuetion(hOfC) {
  if (hOfC < 0) {
    if (questionIndex < catigoryQuetion.length) {
      questionIndex++;
      resetVars();
    } else {
      console.log("hello");
    }
  }
}
// to reset data
function resetVars() {
  catigoryQuetion = quetions[catigory];
  let letterStyle = document.querySelectorAll(".letter");
  for (let i = 0; i < letterStyle.length; i++) {
    letterStyle[i].className = "letter clicked";
  }
  answerBox.innerHTML = "";
  quetionBox.innerHTML = catigoryQuetion[questionIndex].question;
  pushLettersToBox(
    "answer-box",
    addTiris(catigoryQuetion[questionIndex].answer),
    addCharToAnswerBox
  );
  heightOfCloser = 100;
  chance = 10;
  porsontge = 100 / catigoryQuetion[questionIndex].answer.length;
  removeThCloser(heightOfCloser);
  quetionBox.innerHTML = catigoryQuetion[questionIndex].question;
}

pushLettersToBox("keyboard-box", letters, createLetterBox);
pushLettersToBox(
  "answer-box",
  addTiris(catigoryQuetion[questionIndex].answer),
  addCharToAnswerBox
);
