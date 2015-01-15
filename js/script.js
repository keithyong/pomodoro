/* +----------------------+
 * | Pomodoro Timer       |
 * |                      |
 * | Keith Yong           | 
 * | January 2015         |
 * +----------------------+
 * Basic stopwatch code based on 
 * http://jsfiddle.net/Daniel_Hug/pvk6p/
 *
 * Elapsed time code based on 
 * http://jsfiddle.net/7f6DX/31/
 */

/* Start out with 25 minutes */
var DEFAULT_MINUTES = 25;

var now, before = new Date();
var minutes = 0, seconds = 0;

/* Whether the timer is ticking or not */
var isRunning = false;

/* The setInterval id */
var timeOutId;

/* --- Elements --- */
var pausePlayButton = document.getElementById("pausePlayButton");
var timerString = document.getElementById("timer");

/* Reset the timer on page load */
reset();

/* +-----------------------------------------+
 * | updateTime                              |
 * |                                         |
 * | Given minutes and seconds, updates the  |
 * | innerHTML of the webpage timer.         |
 * +-----------------------------------------+ */
var secondsStr, finalStr;
var updateTime = function(minutes, seconds) {
    if (seconds < 10) {
        secondsStr = '0' + seconds;
    } else {
        secondsStr = seconds;
    }
    finalStr = minutes + ':' + secondsStr;
    timerString.innerHTML = finalStr;
    document.title = finalStr;
}

/* +-----------------------------------------+
 * | decrementByOneSecond                    |
 * |                                         |
 * | Decrement the timer by one second.      |
 * | Calls timer() in the function.          |
 * +-----------------------------------------+ */
var decrementByOneSecond = function() {
    seconds--;

    if (seconds <= -1) {
        seconds = 59;
        minutes--;
    }

    updateTime(minutes, seconds);
    timer();
}

/* +-----------------------------------------+
 * | reset                                   |
 * |                                         |
 * | Sets seconds to zero and minute to      |
 * | 25 minutes                              |
 * +-----------------------------------------+ */
function reset() {
    seconds = 0;
    minutes = DEFAULT_MINUTES;
}

/* +-----------------------------------------+
 * | timer                                   |
 * |                                         |
 * | Set a timeout of 1000 seconds to call   |
 * | decrementByoneSecond.                   |
 * +-----------------------------------------+ */
function timer() {
    timeOutId = setTimeout(decrementByOneSecond, 1000);
}

/* +-----------------------------------------+
 * | Set up the play and pause buttons       |
 * +-----------------------------------------+ */
pausePlayButton.onclick = function() {
    if (isRunning == false) {
        isRunning = true;
        pausePlayButton.innerHTML = "Pause";
        timer();
    } else {
        isRunning = false;
        clearTimeout(timeOutId);
        pausePlayButton.innerHTML = "Start";
    }
}
