/* +----------------------+
 * | Pomodoro Timer       |
 * |                      |
 * | Keith Yong           |
 * | January 2015         |
 * +----------------------+
 */

var isRunning = false;
var isWork = true;
var pomodoro_time_seconds = 3;
var break_time_seconds = 2;
var timer_done_sound = new Audio("sounds/KitchenTimerSound.mp3");

document.title = "Pomodoro Timer";

var work_bg = document.getElementById("work_background");
var break_bg = document.getElementById("break_background");

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

$("#resetTimerButton").click(function() {
    resetTimer();
});

var finishedWork = function(timer) {
    isWork = false;
    resetTimer();
    document.title = "Pomodoro Finished!";
    playTimerDoneSound();
    transitionToBreakBackground();

    $("#timer").createTimer({
        autostart: false,
        time_in_seconds: break_time_seconds,
        buzzer: finishedBreak,
        tick: setTitleAsTimeLeft("#timer")
    });
}

var finishedBreak = function(timer) {
    isWork = true;
    resetTimer();
    document.title = "Break Finished!";
    playTimerDoneSound();
    transitionToWorkBackground();
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

function resetTimer() {
    $("#timer").resetTimer({
        time_in_seconds: pomodoro_time_seconds
    });
    startPause();
    resetTitle();
}

function startPause() {
    isRunning = false;
    pausePlayButton.innerHTML = "Start";
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
