/*********** BUSINESS PART **********/
/**
 * Represents a Player.
 * @constructor
 * @param {integer} roundScore - The rounded score of the player.
 * @param {integer} globalScore - The global score of the player.
 * @param {integer} nomber - The player's number.
 */
class Player {
  constructor(roundScore, globalScore, number) {
    this.roundScore = roundScore;
    this.globalScore = globalScore;
    this.number = number;
  }

  /**
   * Function that represents the Roll operation and populate the player object
   * @returns {integer} The number of the dice
   */
  rollDice() {
    const diceOutput = Math.floor(Math.random() * 6) + 1;
    if (diceOutput === 1) {
      this.roundScore = 0;
    } else {
      this.roundScore += diceOutput;
    }
    return diceOutput;
  }

  /**
   * Function that represents the Hold operation, populate the player object
   *  and returns the global score
   * @param {integer} roundScore The obtained rounded score
   * @returns {integer} The global score of the player
   */
  hold(roundScore) {
    this.globalScore += roundScore;
    this.roundScore = 0;
    return this.globalScore;
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

// Add event listener to 'New Game' buton
document.querySelector('.btn-new').addEventListener('click', init)

// Add event listener to 'Roll' buton
document.querySelector('.btn-roll').addEventListener('click', function () {

  activePlayer = getActivePlayer();

  if (gamePlaying) {

    // Get dice and display it
    const dice = activePlayer.rollDice()

    // Update UI
    if (dice === 1) {
      document.querySelector('#score-' + activePlayer.number).textContent = activePlayer.globalScore
      nextPlayer()
    } else {
      document.querySelector('#current-' + activePlayer.number).textContent = activePlayer.roundScore
      const diceDom = document.querySelector('.dice')
      diceDom.style.display = 'block'
      diceDom.src = 'dice-' + dice + '.png'
    }
  }
})

// Add event listener to 'Hold' buton
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {

    activePlayer = getActivePlayer()
    const holding = Number.parseInt(document.querySelector('#current-' + activePlayer.number).textContent)
    const globalScore = activePlayer.hold(holding)

    // Update the UI
    document.querySelector('#score-' + activePlayer.number).textContent = globalScore
    document.querySelector('#current-' + activePlayer.number).textContent = '0'

    // Check if player wins the game
    if (activePlayer.globalScore >= winScore) {
      alert('La joueur ' + String.toString(activePlayer) + 'a gagné !')
      gamePlaying = false
      init()
    } else {
      nextPlayer()
    }
  }

})

/**
 * Function that returns the active player
 * @returns {Player} The active player
 */
function getActivePlayer() {
  const currentPanel = document.querySelector('.player-0-panel')
  if (currentPanel.classList.contains('active')) {
    return player1
  }
  return player2
}

/**
 * Function for UI design for the next player
 */
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

/**
 * Function (RE)init all elements from scratch
 */
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

