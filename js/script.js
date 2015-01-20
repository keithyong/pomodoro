/* +----------------------+
 * | Pomodoro Timer       |
 * |                      |
 * | Keith Yong           |
 * | January 2015         |
 * +----------------------+
 */

/* Global state variables */
var isRunning = false;
var isWork = true;

/* Global options variables */
var soundEnabled = true;
var pomodoro_time_seconds = 1500;
var break_time_seconds = 600;
var status_work_text = "WORK";
var status_break_text = "BREAK";

/* Audio file for timer done sound */
var timer_done_sound = new Audio("sounds/KitchenTimerSound.mp3");

/* HTML element variables */
var work_bg = document.getElementById("work_background");
var break_bg = document.getElementById("break_background");
var statusLine = document.getElementById("status");
var sound_toggle_icon = document.getElementById("sound_toggle_icon");

/* Initial setup */
setUpWorkTimer();
document.title = "Pomodoro Timer";

/* onClick events */
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

/* +--- soundToggleClick ------------------------+
 * | Called when user clicks sound toggle icon.  |
 * | Toggles sound on/off. Changes icon image.   |
 * +---------------------------------------------+ */
function soundToggleClick() {
    if (soundEnabled === true) {
        sound_toggle_icon.src="images/soundoff.svg";
        soundEnabled = false;
    } else {
        sound_toggle_icon.src="images/soundon.svg";
        soundEnabled = true;
    }
}

/* +--- setUpBreakTimer -------------------------+
 * | Sets up the timer to handle a break.        |
 * | Sets up initial global state variables.     |
 * | Sets up status line, and button text.       |
 * +---------------------------------------------+ */
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

/* +--- setUpWorkTimer --------------------------+
 * | Sets up the timer to handle a break.        |
 * | Sets up initial global state variables.     |
 * | Sets up status line, and button text.       |
 * +---------------------------------------------+ */
function setUpWorkTimer() {
    statusLine.innerHTML = status_work_text;
    pausePlayButton.innerHTML = "Start Work";
    transitionToWorkBackground();
    isRunning = false;
    isWork = true;

    $("#timer").createTimer({
        autostart: false,
        time_in_seconds: pomodoro_time_seconds,
        tick: onTick(),
        buzzer: finishedWork
       
    });
}

/* +--- finishedWork ----------------------------+
 * | Called when the timer is finished a work    |
 * | 25 minute block. Plays buzzer sound, and    |
 * | sets up document title appropriately.       |
 * | Calls setUpBreakTimer.                      |
 * +---------------------------------------------+ */
var finishedWork = function(timer) {
    playTimerDoneSound();
    document.title = "Pomodoro Finished!";
    setUpBreakTimer();
}

/* +--- finishedBreak ---------------------------+
 * | Called when the timer is finished a break   |
 * | block. Plays buzzer sound, and              |
 * | sets up document title appropriately.       |
 * | Calls setUpWorkTimer.                       |
 * +---------------------------------------------+ */
var finishedBreak = function(timer) {
    playTimerDoneSound();
    document.title = "Break Finished!";
    setUpWorkTimer();
}

/* +--- pauseTimer ------------------------------+
 * | Pauses the timer. Sets isRunning to false.  |
 * | Sets the button text to be "Resume".        |
 * +---------------------------------------------+ */
function pauseTimer() {
    isRunning = false;
    pausePlayButton.innerHTML = "Resume";
    $("#timer").pauseTimer();
}

/* +--- resumeTimer -----------------------------+
 * | Resumes the timer.                          |
 * | Sets the button text to be "Pause".         |
 * +---------------------------------------------+ */
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

/* +--- transitionToBreakBackground -------------+
 * | Changes the background to break gradient.   |
 * +---------------------------------------------+ */
function transitionToBreakBackground() {
    work_bg.style.opacity = 0;
}

/* +--- transitionToWorkBackground -------------+
 * | Changes the background to work gradient.   |
 * +--------------------------------------------+ */
function transitionToWorkBackground() {
    work_bg.style.opacity = 1;
}

/* +--- playTimerDoneSound ---------------------+
 * | Plays buzzer sound, only if not muted.     |
 * +--------------------------------------------+ */
function playTimerDoneSound() {
    if (soundEnabled === true)
        timer_done_sound.play();
}

function onTick(a, b, c) {
    console.log(c);
}