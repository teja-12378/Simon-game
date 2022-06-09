var colors=["blue","green","red","yellow"];
var gamePattern=[];
var userClickedPattern=[];

function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*3)+1
  var randomColor=colors[randomNumber];
  gamePattern.push(randomColor);

  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio=new Audio("sounds/"+randomColor+".mp3")
  playSound(randomColor);
  animatePress(randomColor);
}
var isStart=false;
var level=0;
$(document).keypress(function(){
  if(!isStart){
    $("#level-title").text("Level " + level);
    nextSequence();
    isStart=false;
  }
})


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}

function startOver(){
  isStart=false;
  userClickedPattern=[];
  level=0;
}



  $(".btn").click(function(){
    var useChosencolor=this.id;
    userClickedPattern.push(useChosencolor);
    playSound(useChosencolor);
    animatePress(useChosencolor);
    checkAnswer(userClickedPattern.length-1)
  })

 function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
