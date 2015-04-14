/* GAME PARAMETERS */
var HC_MIN = 1,
    HC_MAX = 100;
var DEFAULT_FEEDBACK = "Make your Guess!";
var FEEDBACK = ["Very Hot!", "Hot", "Warm", "Cool", "Cold", "Ice Cold..."];

/* GAME VARS */
var secretNumber;
var numGuesses;


$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$('.what').click(function() {
    	$('.overlay').fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$('a.close').click(function() {
  		$('.overlay').fadeOut(1000);
  	});

  	$('.new').click(function() {
  		newGame();
  	});

  	$('#guessButton').click(function() {
  		makeGuess();
  	});

  	$('#userGuess').keypress(function() {
  		if (event.keyCode == 13) {
  			event.preventDefault();
  			$('#guessButton').click();
  		}
  	});

    // Set up the game
    newGame();
});

function newGame() {
	setFeedback(DEFAULT_FEEDBACK);
	clearUserGuess();
	clearGuessList();
	resetGuessCount();
	generateSecretNumber();
}

function clearUserGuess() {
	$('#userGuess').val('');
}

function clearGuessList() {
	$('#guessList').children().remove();
}

function resetGuessCount() {
	$('#count').text('0');
	numGuesses = 0;
}

function generateSecretNumber() {
	secretNumber = rng(HC_MIN, HC_MAX);
}

function makeGuess() {
  var guess = $('#userGuess').val();
  guess = parseInt(guess);
  if (guess >= HC_MIN && guess <= HC_MAX) {
    getFeedback(guess);
  }
  else {
    alert('Please enter a number between 1 and 100.');
  }
  $('#userGuess').val('');
}

function getFeedback(guess) {
  // Get the absolute difference between guess and number
  var feedbackIndex = Math.abs(secretNumber - guess);
  // Divide by 10 to find index
  feedbackIndex = Math.floor(feedbackIndex/10);
  if (feedbackIndex >= FEEDBACK.length) {
    feedbackIndex = FEEDBACK.length - 1;
  }
  setFeedback(FEEDBACK[feedbackIndex]);
}

/* Borrowed from this JSFiddle: http://jsfiddle.net/alanwsmith/GfAhy/ */
function rng(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}