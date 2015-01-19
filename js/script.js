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
var pomodoro_time_seconds = 1500;
var break_time_seconds = 600;
var status_work_text = "WORK";
var status_break_text = "BREAK";
var timer_done_sound = new Audio("sounds/KitchenTimerSound.mp3");

document.title = "Pomodoro Timer";

var work_bg = document.getElementById("work_background");
var break_bg = document.getElementById("break_background");
var statusLine = document.getElementById("status");

/* Default timer is work timer */
setUpWorkTimer();

$("#pausePlayButton").click(function() {
    if (isRunning === false) {
        resumeTimer(isWork);
    } else {
        pauseTimer();
    }
});

$("#workTimerButton").click(function() {
    setUpWorkTimer();
});

$("#breakTimerButton").click(function() {
    setUpBreakTimer();
});

var finishedWork = function(timer) {
    playTimerDoneSound();
    document.title = "Pomodoro Finished!";
    setUpBreakTimer();
}

var finishedBreak = function(timer) {
    playTimerDoneSound();
    document.title = "Break Finished!";
    setUpWorkTimer();
}

function setUpBreakTimer() {
    statusLine.innerHTML = status_break_text;
    pausePlayButton.innerHTML = "Start Break";
    transitionToBreakBackground();
    isRunning = false;
    isWork = false;

    $("#timer").createTimer({
        autostart: false,
        time_in_seconds: break_time_seconds,
        buzzer: finishedBreak
    });
}

function setUpWorkTimer() {
    statusLine.innerHTML = status_work_text;
    pausePlayButton.innerHTML = "Start Work";
    transitionToWorkBackground();
    isRunning = false;
    isWork = true;

    $("#timer").createTimer({
        autostart: false,
        time_in_seconds: pomodoro_time_seconds,
        buzzer: finishedWork
    });
}

function pauseTimer() {
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
        buzzer: buzzerCallbackFunc
    });
}

function resetTitle() {
    document.title = "25:00";
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

