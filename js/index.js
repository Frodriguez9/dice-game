const players = [
  {name: "Fernando",
   round_score: 0,
   total_score: 0,
   turn: 0},

   {name: "Janine",
    round_score: 0,
    total_score: 0,
    turn: 0}
]

const updatePlayer = (index, rollScore) => {
  // save sum of score
  players[index].total_score += rollScore
  // save player's roundScore
  players[index].round_score = rollScore
  // save player's turn
  players[index].turn++
}

const btnRoll = document.getElementById("rollBtn")
const btnReset = document.getElementById("resetBtn")

const dice = document.getElementsByClassName("dice")
const scores = document.getElementsByClassName("score")

const message = document.getElementById("message")

let turnCounter = 0

//check that all players had had their turn and resets die score to "-"
const setStage = () => {
  if (players[0].turn === players[players.length - 1].turn) {
    for (const die of dice) {
     die.textContent = "-"
    }
  }
}

const rollDie = playerIndex => {
  const result = Math.floor((Math.random()  * (6) + 1))
  updatePlayer(playerIndex, result)
  // display result after rolling die in die element
  dice[playerIndex].textContent = result
  // display total score
  scores[playerIndex].textContent = players[playerIndex].total_score

  // moves turn to the next player
  if (turnCounter == players.length - 1) {
    turnCounter = 0
  } else {
    turnCounter ++
  }

  setActive(turnCounter, "dice")
}

// starts the game with player1 = index 0 -> turnCounter == 0
setActive(turnCounter, "dice")


btnRoll.addEventListener("click", () => {
  setStage()
  rollDie(turnCounter)

  //check if there is a winner
  if (players[0].turn === players[players.length - 1].turn) {
    console.log("Equal turns")
    for (const player of players) {
      if (player.total_score >= 12) {
        message.textContent = `${player.name}, you WON!`
      }
    }
  }


})



// Sets message and add Active box to the player in turn
function setActive(activeIndex, inactiveClassName, otherClass=null) {
  const player = players[turnCounter]
  message.textContent = `${player.name}, it is your turn!`


  // gives everyOne the inactive class
  for (const die of dice) {
    die.className = inactiveClassName
  }
  // gives the player in turn the active class
  dice[activeIndex].classList.add("active")
}
