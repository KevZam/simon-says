let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  let colorSound = new Audio("sounds/" + randomChosenColour + ".mp3");
  colorSound.play();
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 300);
}

nextSequence();

$(document).click(function () {
  nextSequence();
});
