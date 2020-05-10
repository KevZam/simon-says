let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStarted = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

function playSound(name) {
  let colourSound = new Audio("sounds/" + name + ".mp3");
  colourSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    checkGameProgress();
  } else {
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    $("h1").text("Game over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function checkGameProgress() {
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

// handle clicking
$(".btn").click(function (event) {
  let userChosenColour = event.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  let indexOfLastAnswer = userClickedPattern.length - 1;
  checkAnswer(indexOfLastAnswer);
});

// handle start game
$(document).on("keydown", function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  } else {
    console.log("game already in progress");
  }
});

function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}
