
var buttonColours = ["red", "blue", "green", "yellow"];
var clickedPattern = [];
var gamePattern = [];
var started = 0;
var idx = 0;
var level = 0;

$(document).keypress(function() {
  if(started == 1) return;
  else {
    started = 1;
    nextSequence();
  }
});

$(".btn").click(function() {
    var currButtonId = this.id;
    clickedPattern.push(currButtonId);
    playSound(this.id);
    $("#" + currButtonId).addClass("pressed");
    setTimeout(function() {
        $("#" +     currButtonId).removeClass("pressed");
    },100);

    if(clickedPattern.length <= gamePattern.length) {
      if(gamePattern[idx] == this.id){
        idx++;
      }
      else{
        gameOver();
        return;
      }
      if(clickedPattern.length == gamePattern.length){
        idx = 0;
        setTimeout(nextSequence ,800);
      }
    }

});

function gameOver() {
  clickedPattern = [];
  gamePattern = [];
  $("body").addClass("game-over");
  setTimeout(function() {
      $("body").removeClass("game-over");
  },100);
  playSound("wrong");
  $("h1").text("Press A Key to Start");
  level = 0;
  started = 0;
  idx = 0;
}

function nextSequence() {
  clickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
