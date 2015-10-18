/* +----------------------+
 * | Pomodoro Timer       |
 * |                      |
 * | Keith Yong           |
 * | January 2015         |
 * +----------------------+
 */


var config = {
    initial_time_mode: "2510",
    status_work_text: "WORK",
    status_break_text: "BREAK"
};

var state = {
    "is_running": false,
    "is_work": true,
    "sound_enabled": true,
    "time_mode": "4515"
};


/* Global options variables */
var pomodoro_time_seconds = 0, break_time_seconds = 0;
updateTimeMode(config.initial_time_mode);

/* Audio file for timer done sound */
var timer_done_sound = new Audio("sounds/KitchenTimerSound.mp3");

/* HTML element variables */
var work_bg = document.getElementById("work_background");
var break_bg = document.getElementById("break_background");
var statusLine = document.getElementById("status");
var sound_toggle_icon = document.getElementById("sound_toggle_icon");
var time_mode_switch = document.getElementById("time_mode_switch");
var onoffswitch_time_mode = $("#onoffswitch_time_mode");

/* Initial setup */
setUpWorkTimer();
document.title = "Pomodoro Timer";

/* onClick events */
$("#pausePlayButton").click(function() {
    if (state.is_running === false) {
        resumeTimer(state.is_work);
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

$(time_mode_switch).click(function() {
    timeModeToggleClick();
});

/* +--- soundToggleClick ------------------------+
 * | Called when user clicks sound toggle icon.  |
 * | Toggles sound on/off. Changes icon image.   |
 * +---------------------------------------------+ */
function soundToggleClick() {
    if (state.sound_enabled === true) {
        sound_toggle_icon.src="images/soundoff.svg";
        state.sound_enabled = false;
    } else {
        sound_toggle_icon.src="images/soundon.svg";
        state.sound_enabled = true;
    }
}

/* +--- timeModeToggleClick() --------------------+
 * | Called when user timemode switch.           |
 * | Toggles time_mode 25/45.                    |
 * +---------------------------------------------+ */
function timeModeToggleClick() {
    if (time_mode_switch.checked === true) {
        state.time_mode = "4515";
    } else {
        state.time_mode = "2510";
    }
    setUpWorkTimer();
}

/* +--- setUpBreakTimer -------------------------+
 * | Sets up the timer to handle a break.        |
 * | Sets up initial global state variables.     |
 * | Sets up status line, and button text.       |
 * +---------------------------------------------+ */
function setUpBreakTimer() {
    if (onoffswitch_time_mode.hasClass('work_mode'))
        onoffswitch_time_mode.toggleClass('work_mode break_mode');

    statusLine.innerHTML = config.status_break_text;
    pausePlayButton.innerHTML = "Start Break";
    transitionToBreakBackground();
    state.is_running = false;
    state.is_work = false;

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
    if (onoffswitch_time_mode.hasClass('break_mode'))
        onoffswitch_time_mode.toggleClass('break_mode work_mode');

    if (state.time_mode === "2510") {
        pomodoro_time_seconds = 1500;
        break_time_seconds = 600;
    } else if (state.time_mode === "4515") {
        pomodoro_time_seconds = 2700;
        break_time_seconds = 900;
    } else {
        console.log("Invalid config, time_mode must be 2510 or 4515")
    }

    statusLine.innerHTML = config.status_work_text;
    pausePlayButton.innerHTML = "Start Work";
    transitionToWorkBackground();
    state.is_running = false;
    state.is_work = true;

    $("#timer").createTimer({
        autostart: false,
        time_in_seconds: pomodoro_time_seconds,
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
 * | Pauses the timer. Sets state.is_running to false.  |
 * | Sets the button text to be "Resume".        |
 * +---------------------------------------------+ */
function pauseTimer() {
    state.is_running = false;
    pausePlayButton.innerHTML = "Resume";
    $("#timer").pauseTimer();
}

/* +--- resumeTimer -----------------------------+
 * | Resumes the timer.                          |
 * | Sets the button text to be "Pause".         |
 * +---------------------------------------------+ */
function resumeTimer(is_work) {
    state.is_running = true;
    pausePlayButton.innerHTML = "Pause";

    var buzzerCallbackFunc;
    if (state.is_work === true)
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
    if (state.sound_enabled === true)
        timer_done_sound.play();
}

/* +--- updateTimeMode -------------------------+
 * | Updates the state.time_mode variable.      |
 * +--------------------------------------------+ */
function updateTimeMode(mode) {
    if (mode === "2510") {
        state.time_mode = mode;
        pomodoro_time_seconds = 1500;
        break_time_seconds = 600;
    } else if (mode === "4515") {
        state.time_mode = mode;
        pomodoro_time_seconds = 2700;
        break_time_seconds = 900;
    } else {
        console.log("Invalid config, time_mode must be 2515 or 4515")
        return;
    }
}
