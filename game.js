/*масив з кольорами*/

var buttonColours = ["red", "blue", "green", "yellow"];

/*пустий масив для рандомного числа*/
var gamePattern = [];

/*масив, що буде зберігати колір що клікнули*/
var userClickedPattern = [];

var startGame = false;

var level = 0;
/*створюємо подію при натисканні на  кнопку клавіотурою*/
$(document).keypress(function() {

  if (!startGame) {
    $("#level-title").text("Level " + level);
    nextSequence();
    startGame = true;
  }
});

/*створюємо подію при натисканні на  кнопку мишею*/

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

/*функція для перевірки правильності відповіді*/

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
      playSound("wrong");

      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);


      startOver();
    }

}


/*функція для рандому, вибору кольору рандомно + до нього звук*/
function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}
/*функція для програвання музики*/
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/*функція для анімації картинок*/
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {

  level = 0;
  startGame = false;
  gamePattern = [];

}
