/*********** BUSINESS PART **********/
class Player {
  constructor(roundScore, globalScore, number) {
    this.roundScore = roundScore;
    this.globalScore = globalScore;
    this.number = number;
  }

  rollDice() {
    const diceOutput = Math.floor(Math.random() * 6) + 1;
    if (diceOutput === 1) {
      this.roundScore = 0;
    } else {
      this.roundScore += diceOutput;
      this.globalScore += diceOutput;
    }
    return diceOutput;
  }

  hold() {
    this.globalScore += this.roundScore;
    this.roundScore = 0;
  }

  reset() {
    this.totalScore = 0;
    this.turnScore = 0;
  }

}

/*********** UI **********/

// Global var
let activePlayer, gamePlaying
const winScore = 100
const player1 = new Player(0, 0, 0)
const player2 = new Player(0, 0, 1)

// (RE)Init the game
init()
// Add listener for the 'New Game' button
document.querySelector('.btn-new').addEventListener('click', init)

//Roll Dice button implementation
document.querySelector('.btn-roll').addEventListener('click', function () {

  activePlayer = getActivePlayer();

  if (gamePlaying) {
    // Get dice and display it
    const dice = activePlayer.rollDice()
    let diceDom = document.querySelector('.dice')
    diceDom.style.display = 'block'
    diceDom.src = 'dice-' + dice + '.png'

    // Update UI
    if (dice === 1) {
      document.querySelector('#score-' + activePlayer.number).textContent = '0'
      nextPlayer()
    } else {
      document.querySelector('#current-' + activePlayer.number).textContent = activePlayer.roundScore
    }

  }
})

// Add event listener to 'Encaisser' buton
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {

    //Update the UI
    document.querySelector('#score-' + activePlayer.number).textContent = activePlayer.globalScore

    //Check if player wins the game
    if (activePlayer.globalScore >= winScore) {
      alert('La joueur ' + String.toString(activePlayer) + 'a gagné !')
      gamePlaying = false
      init()
    } else {
      nextPlayer()
    }
  }
})

function getActivePlayer() {
  const currentPanel = document.querySelector('.player-0-panel')
  if (currentPanel.classList.contains('active')) {
    return player1
  }
  return player2
}

function nextPlayer() {

  // Reinit the current scores to 0 
  document.querySelector('#current-0').textContent = 0
  document.querySelector('#current-1').textContent = 0
  // Set Player 1 or 2 active
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
  // Delete the dice for the next player
  document.querySelector('.dice').style.display = 'none'

}

// (RE)init all elements from scratch
function init() {

  // Set the game is in course
  gamePlaying = true

  // Set the dices not to display on start up
  document.querySelector('.dice').style.display = 'none'

  // (RE)init the the style of player part
  document.querySelector('#score-0').textContent = '0'
  document.querySelector('#score-1').textContent = '0'
  document.querySelector('#current-0').textContent = '0'
  document.querySelector('#current-1').textContent = '0'
  document.querySelector('#name-0').textContent = 'Player 1'
  document.querySelector('#name-1').textContent = 'player 2'

  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')

}

