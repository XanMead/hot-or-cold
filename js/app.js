/* GAME PARAMETERS */
var HC_MIN = 1,
    HC_MAX = 100;
var DEFAULT_FEEDBACK = "Make your Guess!";
var FEEDBACK = ["Very Hot!", "Hot", "Warm", "Cool", "Cold", "Ice Cold..."];
var WIN_TEXT = "You guessed it!";

/* GAME VARS */
var secretNumber;
var numGuesses;


$(document).ready(function(){
	
    /* nAPALM uNNECESSARY html5 cAUSE wE gOT tHAT cOVERED*/
    $('#userGuess').removeAttr("required");

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

/*** GAME SET-UP ***/
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
  setNumGuesses(0);
	numGuesses = 0;
}

function generateSecretNumber() {
	secretNumber = rng(HC_MIN, HC_MAX);
  console.log("PSSST. THE SECRET NUMBER IS " + secretNumber);
}

/*** CORE FUNCTIONALITY ***/
function makeGuess() {
  var guess = $('#userGuess').val();
  guess = parseInt(guess);
  if (guess >= HC_MIN && guess <= HC_MAX) {
    giveFeedbackOn(guess);
  }
  else {
    alert('Please enter a number between 1 and 100.');
  }
  $('#userGuess').val('');
}

function giveFeedbackOn(guess) {
  var feedback;
  if (guess == secretNumber) {
    feedback = WIN_TEXT;
  }
  else {
    // Get the absolute difference between guess and number
    var feedbackIndex = Math.abs(secretNumber - guess);
    // Divide by 10 to find index
    feedbackIndex = Math.floor(feedbackIndex/10);
    if (feedbackIndex >= FEEDBACK.length) {
      feedbackIndex = FEEDBACK.length - 1;
    }
    feedback = FEEDBACK[feedbackIndex];
  }
  setFeedback(feedback);
  incrementGuesses();
  addToGuessList(guess);
}

/*** HELPER FUNCTIONS ***/
function incrementGuesses() {
  numGuesses++;
  setNumGuesses(numGuesses);
}

function setFeedback(message) {
  $('#feedback').text(message);
}

function setNumGuesses(num) {
  $('#count').text(num);
}

function addToGuessList(guess) {
  $('<li></li>').appendTo('#guessList').text(guess);
}

/* Borrowed from this JSFiddle: http://jsfiddle.net/alanwsmith/GfAhy/ */
function rng(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}