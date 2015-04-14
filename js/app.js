/* GAME PARAMETERS */
var HC_MIN = 1,
    HC_MAX = 100;
var DEFAULT_FEEDBACK = "Make your Guess!";

/* GAME VARS */
var secretNumber;
var numGuesses;


$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});



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


/* Borrowed from this JSFiddle: http://jsfiddle.net/alanwsmith/GfAhy/ */
function rng(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}