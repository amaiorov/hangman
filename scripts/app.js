/**
 * Hangman game implementation
 */

var Hangman = function Hangman() {
  // private variables
 
  // initialze usable characters (a-z)
  var validChars = (function() {
    var arr = [];
    for (var i = 97; i <= 122; i++)
      arr.push(String.fromCharCode(i));
    return arr;
  })();
  var usedChars = [];
  var minWordLength = 5;
  var word = '';
  var currentWord = '';
  var guesses = 7;
  var gameOver = true;
  // an ASCII representation of the poor guy's progressive states
  var gallows = [
    ' O',
    ' O\n\\',
    ' O\n\\|',
    ' O\n\\|/',
    ' O\n\\|/\n |',
    ' O\n\\|/\n |\n/',
    ' X\n\\|/\n |\n/ \\',
  ];

// public methods
/**
 * Get valid characters array
 * @return {Array} validChars
 */
  this.getValidChars = function getValidChars() {
    return validChars;
  };
/**
 * Set word
 * @param {String} w
 */
  this.setWord = function setWord(w) {
    word = w;
  };
/**
 * Set current word state (guessed state)
 * @param {String} w
 */
  this.setCurrentWord = function setCurrentWord(w) {
    currentWord = w;
  };
/**
 * Update current word state, replace underscores with character
 * @param {String} c
 */
  this.updateWord = function update(c) {
    // mask word with underscores (except used characters + passed value)
    var r = new RegExp('[^' + usedChars.join('') + c + ']', 'gi');
    currentWord = word.replace(r, '_');
    this.updateDisplay(currentWord);
  };
/**
 * Update DOM
 * @param {String} w
 */
  this.updateDisplay = function updateDisplay(w) {
     $word.innerHTML = w;
  }
/**
 * Determine if the letter is correct and handle game over
 * @param {String} c
 * @return {Boolean}
 */
  this.guess = function guess(c) {
    if (this.isGameOver()) {
      return false;
    }
    // check if letter has already been used
    // IE8 does not support array.indexOf, using String method
    if (usedChars.join('').indexOf(c) !== -1) {
      this.log('Already used this letter');
      return false;
    }
    // check letter is within valid range
    if (validChars.join('').indexOf(c) === -1) {
      this.log('Not a valid letter');
      return false;
    }
    // store letter to list of used characters
    usedChars.push(c);
    if (word.indexOf(c) === -1) {
      // incorrect guess
      $guy.innerText = gallows[gallows.length - guesses];
      guesses--;
      this.log('Incorrect guess');
      // no more guesses left; lose
      if (guesses === 0) {
        this.log('You lose');
        this.setGameOver();
      }
      return false;
    } else {
      // correct guess
      this.updateWord(c);
      this.log('Correct guess');
      // word matches current state; win
      if (currentWord === word) {
        this.log('You win');
        this.setGameOver();
      }
      return true;
    }
  };
/**
 * Current game is finished
 */
  this.setGameOver = function setgameOver() {
    gameOver = true;
    $reset.classList.remove('hidden');
  };
/**
 * Get game state
 * @return {Boolean}
 */
  this.isGameOver = function isGameOver() {
    return gameOver;
  };
/**
 * Set up initial game parameters
 * @param {String} w
 * @return {Boolean}
 */
  this.init = function init(w) {
    // check length of word
    if (w.length < minWordLength) {
      alert('Word too short - ' + minWordLength + ' character minimum');
      return false;
    // check word for invalid characters
    } else if (w.match(new RegExp('[^' + validChars.join('') + ']', 'gi'))) {
      alert('Invalid word - use only a-z');
      return false;
    }
    console.log('init');
    gameOver = false;
    this.setWord(w);
    // mask current word state with underscores
    this.setCurrentWord(w.replace(/./gi, '_'));
    this.updateDisplay(currentWord);
    $input.classList.add('hidden');
    $start.classList.add('hidden');
  };
/**
 * Reset parameters to default values
 */
  this.reset = function reset() {
    usedChars = [];
    word = currentWord = '';
    guesses = 7;
    gameOver = true;
    this.updateDisplay(word);
    this.log('');
    $guy.innerText = '';
    $input.value = '';
    $input.classList.remove('hidden');
    $start.classList.remove('hidden');
    $reset.classList.add('hidden');
  };
/**
 * Show a message in the DOM
 * @param {String} m
 */
  this.log = function log(m) {
    $log.innerHTML = m;
  };
};

// DOM elements
var $body = document.body;
var $start = document.querySelector('#start');
var $reset = document.querySelector('#reset');
var $input = document.querySelector('#text-input');
var $word = document.querySelector('#word');
var $gallows = document.querySelector('#gallows');
var $guy = document.querySelector('#guy');
var $log = document.querySelector('#log');

// instantialize Hangman instance
var h = new Hangman();

var startHandler = function startHandler(event) {
  h.init($input.value);
};

var resetHandler = function resetHandler(event) {
  h.reset();
};

var keyHandler = function keyHandler(event) {
  switch (true) {
    // a-z was pressed
    case event.which >=97 && event.which <=122:
      if (!h.isGameOver()) {
        // convert event charCode to String and guess
        h.guess(String.fromCharCode(event.which));
      }
      break;
    // enter was pressed
    case event.which === 13:
    // console.log(event.target);
      if (h.isGameOver() && event.target.id === 'text-input') {
        startHandler();
      } else if (h.isGameOver()) {
        h.reset();
      }
      break;
    default :
  }
}

$start.addEventListener('click', startHandler);
$reset.addEventListener('click', resetHandler);
$body.addEventListener('keypress', keyHandler);