/* +----------------------+
 * | Pomodoro Timer       |
 * |                      |
 * | Keith Yong           |
 * | January 2015         |
 * +----------------------+
 */

var isRunning = false;
var pomodoro_time_seconds = 1500;
var timer_done_sound = new Audio("sounds/KitchenTimerSound.mp3");

document.title = "Pomodoro Timer";

$("#timer").createTimer({
    autostart: false,
    time_in_seconds: pomodoro_time_seconds
});

$("#pausePlayButton").click(function() {
    if (isRunning == false) {
        resumeTimer();
    } else {
        startPause();
    }
});

$("#resetTimerButton").click(function() {
    resetTimer();
});

var finished = function(timer) {
    resetTimer();
    document.title = "Pomodoro Finished!";
    timer_done_sound.play();
}

function resetTimer() {
    $("#timer").resetTimer({
        time_in_seconds: 5
    });
    startPause();
    resetTitle();
}
function startPause() {
    isRunning = false;
    pausePlayButton.innerHTML = "Start";
    $("#timer").pauseTimer();
}

function resumeTimer() {
    isRunning = true;
    pausePlayButton.innerHTML = "Pause";
    jQuery("#timer").startTimer({
        buzzer: finished
    });
}

function resetTitle() {
    document.title = "25:00";
}
