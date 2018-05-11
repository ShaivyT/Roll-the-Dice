/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// One method of adding an event listener
// define a function and add that as an argument
// this is our callback function
/*
function btn() {
	// 
}
*/
// One way!
// document.querySelector('.btn-roll').addEventListener('click', btn);

// Method 2 : Use anonymous function
// Anonymous function : No name and cannot be used again

// here we just want that when someone clicks on the button
// an event happens. The basic understanding is that I will not be 
// using this function anywhere else anyway
// so definitely method 2 works best here : Anonymous function!
document.querySelector('.btn-roll').addEventListener('click', function(){

	if (gamePlaying) {
		// 1. Random number
	// Since I don't want the dice variable outside
	// I restrict it's scope to this function

	var dice = Math.floor(Math.random() * 6) + 1;

	var previous_dice = dice;
	if ((previous_dice === 6) && (dice = 6)) {
		lostPlayer();
	}

	// 2. Display the result 
	// changing display none to block

	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	// now we want to change the source attribute
	diceDOM.src = 'dice-' + dice + '.png';

	// 3. Update the round score IF the rolled number was NOT a 1

	// this !== does not do type coercion

	if (dice !== 1) {
		// Add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		// Next player
		nextPlayer();		
	}
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {

	if (gamePlaying) {
		// ADD CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;
		
		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
		// Check if the player WON the game
		if (scores[activePlayer] >= 40) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// next player 
			nextPlayer();
		}
		}

});


function nextPlayer() {

	// ternary operator : a different way to write if else
	// if writing if else is so easy use ternary operator
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// toggle is another way to write this
	// if the class is not there adds it 
	// if the class is there removes it
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	// document.querySelector('.player-0-panel').classList.remove('active');
	// document.querySelector('player-1-panel').classList.add('active');

	document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init); 

function init() {

	scores = [0, 0];
	roundScore = [0];	
	activePlayer = 0;
	gamePlaying = true;

	// how to change the css using DOM manipulation
	// we use the style method in js first then 
	// write the property we want to change 
	// display is the property and none is the value 
	// the value we want to change 
	document.querySelector('.dice').style.display = 'none';

	// we can use the query selector again 
	// but since we are dealing with id's we can use
	// getElementById. It is a faster way 
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');
	
}

function lostPlayer() {
	if (activePlayer === 0) {
		document.querySelector('.player-1-panel').classList.add('winner');
		document.querySelector('.player-0-panel').classList.remove('active');
		gamePlaying = false;
	} else {
		document.querySelector('.player-1-panel').classList.add('winner');
		document.querySelector('.player-0-panel').classList.remove('active');
		gamePlaying = false;
	}
}




// document.querySelector('#current-' + activePlayer).textContent = dice;
// this way we can try to incorporate style to the content
// here we are emphasizing on the dice value and italicizing it 
// we have to write innerHTML so that the content written on RHS 
// in string is interpreted as HTML content and not simply text content
// if it was textContent <em> dice </em> would have been printed on the screen
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;