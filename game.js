let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStarted = false;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];

  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 300);
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
    console.log("success");
  } else {
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    startOver();
    $("body").addClass("game-over");
    $("h1").text("Game over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }

  if (
    userClickedPattern.length === gamePattern.length &&
    gameStarted === true
  ) {
    setTimeout(function () {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
}

$(".btn").click(function (event) {
  if (gameStarted) {
    let userChosenColour = event.target.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    let indexOfLastAnswer = userClickedPattern.length - 1;
    checkAnswer(indexOfLastAnswer);
  }
});

$(document).on("keydown", function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  gameStarted = false;
}
