"use strict";

/*
 * ROCK, PAPER, SCISSORS
 *
 * Rules:
 * - Rock beats Scissors.
 * - Paper beats Rock.
 * - Scissors beats Paper.
 * - Matching choices produce a draw.
 *
 * The first participant to reach 3 points wins.
 * Invalid inputs and draws do not award points.
 * The player can cancel the game at any time.
 */

// ==========================================
// 1. GAME CONFIGURATION
// ==========================================

const CHOICES = ["rock", "paper", "scissors"];
const WINNING_SCORE = 3;

// ==========================================
// 2. COMPUTER SELECTION
// ==========================================

function computerPlay() {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);

  return CHOICES[randomIndex];
}

// ==========================================
// 3. PLAYER SELECTION AND VALIDATION
// ==========================================

function getPlayerChoice() {
  while (true) {
    const input = prompt(
      "Choose Rock, Paper, or Scissors.\n\n" + "Press Cancel to end the game.",
    );

    // Cancel returns null.
    // Exit before using string methods.
    if (input === null) {
      return null;
    }

    // Remove surrounding spaces and
    // convert input to lowercase.
    const choice = input.trim().toLowerCase();

    // Accept only the three valid choices.
    if (CHOICES.includes(choice)) {
      return choice;
    }

    alert(
      "Invalid selection!\n\n" +
        "Please enter Rock, Paper, or Scissors.\n" +
        "Your score has not changed.",
    );
  }
}

// ==========================================
// 4. EVALUATE A SINGLE ROUND
// ==========================================

function playRound(playerSelection, computerSelection) {
  const player = playerSelection.toLowerCase();
  const computer = computerSelection.toLowerCase();

  // Both participants chose the same option.
  if (player === computer) {
    return "draw";
  }

  // Check the three combinations where
  // the player defeats the computer.
  const playerWins =
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper");

  if (playerWins) {
    return "player";
  }

  // If it is not a draw or player victory,
  // the computer must have won.
  return "computer";
}

// ==========================================
// 5. FORMAT TEXT FOR DISPLAY
// ==========================================

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getRoundMessage(result) {
  if (result === "player") {
    return "You won this round!";
  }

  if (result === "computer") {
    return "The computer won this round!";
  }

  return "It's a draw! Nobody earns a point.";
}

// ==========================================
// 6. SHOW GAME INSTRUCTIONS
// ==========================================

function showInstructions() {
  alert(
    "WELCOME TO ROCK, PAPER, SCISSORS!\n\n" +
      "An evil AI has challenged you!\n" +
      "Can you defeat it before it wins?\n\n" +
      "GAME RULES:\n" +
      "- Rock beats Scissors.\n" +
      "- Paper beats Rock.\n" +
      "- Scissors beats Paper.\n" +
      "- First to 3 points wins.\n" +
      "- Draws do not award points.\n" +
      "- Invalid choices do not count.\n" +
      "- Press Cancel to quit safely.\n\n" +
      "HOW TO PLAY:\n" +
      "Enter Rock, Paper, or Scissors\n" +
      "when the prompt appears.\n\n" +
      "RESULTS:\n" +
      "Each round appears in an alert\n" +
      "and in your browser console.\n\n" +
      "HOW TO OPEN THE CONSOLE:\n" +
      "On Windows, press F12 or Ctrl+Shift+J.\n" +
      "Select the Console tab if needed.\n" +
      "On Mac, press Cmd+Option+J in Chrome.\n\n" +
      "Click OK to start!",
  );
}

// ==========================================
// 7. MAIN GAME CONTROLLER
// ==========================================

function game() {
  let playerScore = 0;
  let computerScore = 0;
  let roundNumber = 0;

  console.log("=== ROCK, PAPER, SCISSORS ===");
  console.log("First to 3 points wins!");

  // Continue while BOTH scores are below 3.
  while (playerScore < WINNING_SCORE && computerScore < WINNING_SCORE) {
    // Ask the player for a valid selection.
    const playerSelection = getPlayerChoice();

    // End the entire game if Cancel is pressed.
    if (playerSelection === null) {
      const cancellationMessage =
        "Game cancelled.\n\n" +
        `Final score:\n` +
        `You: ${playerScore}\n` +
        `Computer: ${computerScore}\n\n` +
        "Thanks for playing!";

      console.log(cancellationMessage);
      alert(cancellationMessage);

      return;
    }

    // Generate the computer's selection.
    const computerSelection = computerPlay();

    // Determine who won the round.
    const result = playRound(playerSelection, computerSelection);

    // Count only completed, valid rounds.
    roundNumber++;

    // Update the correct score.
    if (result === "player") {
      playerScore++;
    } else if (result === "computer") {
      computerScore++;
    }

    // Create the round summary.
    const roundMessage =
      `ROUND ${roundNumber}\n\n` +
      `You chose: ${capitalize(playerSelection)}\n` +
      `Computer chose: ${capitalize(computerSelection)}\n\n` +
      `${getRoundMessage(result)}\n\n` +
      `SCOREBOARD\n` +
      `You: ${playerScore}\n` +
      `Computer: ${computerScore}`;

    // Show the result in both places.
    console.log(roundMessage);
    alert(roundMessage);
  }

  // ========================================
  // 8. ANNOUNCE THE FINAL WINNER
  // ========================================

  let finalMessage;

  if (playerScore === WINNING_SCORE) {
    finalMessage = "CONGRATULATIONS!\n\n" + "You defeated the evil AI!";
  } else {
    finalMessage =
      "GAME OVER!\n\n" +
      "The evil AI defeated you!\n" +
      "Better luck next time.";
  }

  finalMessage +=
    `\n\nFINAL SCORE\n` +
    `You: ${playerScore}\n` +
    `Computer: ${computerScore}\n\n` +
    `Total completed rounds: ${roundNumber}`;

  console.log("=== GAME FINISHED ===");
  console.log(finalMessage);

  alert(finalMessage);
}

// ==========================================
// 9. START THE GAME
// ==========================================

showInstructions();
game();
