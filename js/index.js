const players = [
  {name: "Fernando",
   round_score: 0,
   score: 0,
   turn: 0},

   {name: "Janine",
    round_score: 0,
    score: 0,
    turn: 0}
]

const btnRoll = document.getElementById("rollBtn")
const btnReset = document.getElementById("resetBtn")

const dice = document.getElementsByClassName("dice")
const scores = document.getElementsByClassName("score")

let turnCounter = 0

// starts the game with player 1 = index 0 -> turnCounter == 0
setActive(turnCounter, "dice")


btnRoll.addEventListener("click", async () => {

  if (players[0].turn === players[players.length - 1].turn) {
    for (const die of dice) {
     die.textContent = "-"
    }
  }

  const result = Math.floor((Math.random()  * (6) + 1))
  // set result in die element
  dice[turnCounter].textContent = result

  // save sum of score
  players[turnCounter].score += result
  scores[turnCounter].textContent = players[turnCounter].score

  // save player's roundScore
  players[turnCounter].round_score = result


  // save player's turn
  players[turnCounter].turn++

  // moves turn to the next player
  if (turnCounter == players.length - 1) {
    turnCounter = 0
  } else {
    turnCounter ++
  }


  setActive(turnCounter, "dice")

})



// Sets message and add Active box to the player in turn
function setActive(activeIndex, inactiveClassName, otherClass=null) {
  const player = players[turnCounter]
  const message = document.getElementById("message").textContent = `${player.name}, it is your turn!`

  // gives everyOne the inactive class
  for (const die of dice) {
    die.className = inactiveClassName
  }
  // gives the player in turn the active class
  dice[activeIndex].classList.add("active")
}
