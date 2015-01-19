/* +----------------------+
 * | Pomodoro Timer       |
 * |                      |
 * | Keith Yong           |
 * | January 2015         |
 * +----------------------+
 */

var isRunning = false;
var isWork = true;
var soundOn = true;
var pomodoro_time_seconds = 3;
var break_time_seconds = 2;
var timer_done_sound = new Audio("sounds/KitchenTimerSound.mp3");

document.title = "Pomodoro Timer";

var work_bg = document.getElementById("work_background");
var break_bg = document.getElementById("break_background");
var statusLine = document.getElementById("status");

$("#timer").createTimer({
    autostart: false,
    time_in_seconds: pomodoro_time_seconds
});

$("#pausePlayButton").click(function() {
    if (isRunning == false) {
        resumeTimer(isWork);
    } else {
        startPause();
    }
});

$("#workTimerButton").click(function() {
    resetTimer(true);
});

$("#breakTimerButton").click(function() {
    resetTimer(false);
});
/* Start the break */
var finishedWork = function(timer) {
    isWork = false;
    resetTimer();
    document.title = "Pomodoro Finished!";
    playTimerDoneSound();
}

var finishedBreak = function(timer) {
    isWork = true;
    resetTimer();
    playTimerDoneSound();
    document.title = "Break Finished!";
    statusLine.innerHTML = "Work";
    pausePlayButton.innerHTML = "Start Work";
    transitionToWorkBackground();
}

function setUpBreakTimer() {
    statusLine.innerHTML = "Break";
    pausePlayButton.innerHTML = "Start Break";
    transitionToBreakBackground();

    $("#timer").createTimer({
        autostart: false,
        time_in_seconds: break_time_seconds,
        buzzer: finishedBreak,
        tick: setTitleAsTimeLeft("#timer")
    });
}
function transitionToBreakBackground() {
    work_bg.style.opacity = 0;
}

function transitionToWorkBackground() {
    work_bg.style.opacity = 1;
}

function playTimerDoneSound() {
    timer_done_sound.play();
}

function resetTimer(isWork) {
    var timeInSeconds;
    if (isWork === true)
        timeInSeconds = pomodoro_time_seconds;
    else 
        timeInSeconds = break_time_seconds;

    $("#timer").resetTimer({
        autostart: true,
        time_in_seconds: pomodoro_time_seconds
    });
    startPause();
    resetTitle();
}

function startPause() {
    isRunning = false;
    pausePlayButton.innerHTML = "Resume";
    $("#timer").pauseTimer();
}

function resumeTimer(isWork) {
    isRunning = true;
    pausePlayButton.innerHTML = "Pause";
    var buzzerCallbackFunc;
    if (isWork === true)
        buzzerCallbackFunc = finishedWork;
    else
        buzzerCallbackFunc = finishedBreak;
    jQuery("#timer").startTimer({
        buzzer: buzzerCallbackFunc,
        tick: setTitleAsTimeLeft("#timer")
    });
}

function resetTitle() {
    document.title = "25:00";
}

function setTitleAsTimeLeft(timerId) {
}
