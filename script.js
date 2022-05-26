var letters = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m']
];
var attempts = [
  [],
  [],
  [],
  [],
  [],
  []
];

var boardSize = 6;
var numAttempt = 0;
var numLetter = 0;
var answer = ''


function addLetter(letter) {
  if(numLetter < 6) {
    attempts[numAttempt].push(letter);
    numLetter++;
  }
  else {
    console.log('no more space');
  }
  updateBoard();
}

function removeLetter() {
  if(numLetter > 0) {
    numLetter--;
    attempts[numAttempt].pop();
  }
  else {
    console.log('no letters to delete')
  }
  updateBoard();
}

function attempt() {
  if(numAttempt <= 6) {
    if(numLetter == 6) {      
      if(attempts[numAttempt].join('') == answer) {
        console.log("you win");
      }
      else {      
        numAttempt++;
        numLetter = 0;
        console.log(numAttempt);
      }
    }
    else {
      console.log("need more letters");
    }
  }
  else {
    if(attempts[numAttempt].join() == answer) {
        console.log("you win");
    }
    else {
      console.log('game over');
      document.querySelector('.answer').innerHTML(answer);
    }    
  }  
  updateBoard();
}

function updateCorrect(letter, index, row) {
  console.log('update: ', letter + ' ' + index + ' ' + row);
  if(row < numAttempt) {
    var ans = answer.split('');
    if(ans[index] == letter) {
      return 'green';
    }
    else if(ans.indexOf(letter) != -1) {
      return 'yellow';
    }
    else {
      return '';
    }
  }
  else {
    return '';
  }
}

function populateLetters() {
  var template = '';
  for(var i = 0; i < letters.length; i++) {
    var letterRow = letters[i];
    template += '<div class="keyboard-row">';
    for(var j = 0; j < letterRow.length; j++) {
      template += `<button onclick="addLetter('${letterRow[j]}')" class="keyboard-letter"><span>${letterRow[j]}</span></button>`;
    }
    template += '</div>';
  }
  document.querySelector('.keyboard').innerHTML = template;
}

function updateBoard() {
  var template = '';
  for(var i = 0; i < boardSize; i++) {
    var arr = attempts[i];
    template += '<div class="row">';
    for(var j = 0; j < boardSize; j++) {
      var letter = arr[j] || '';
      template += `<div class='${updateCorrect(letter, j, i)} letter'>${letter}</div>`;
    }
    template += '</div>';
  }
  document.querySelector('.game').innerHTML = template;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

answer = words[randomNumber(0, words.length - 1)];
console.log(answer);

updateBoard();
populateLetters();