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

var isRunning = false;

$("#timer").createTimer({
  autostart: false,
  time_in_seconds: 5,
  buzzer: finished,
  tick: function(timer, time_in_seconds, formatted_time) {
    alert("HERO");
  }
});

$("#pausePlayButton").click(function() {
    if (isRunning == false) {
        isRunning = true;
        pausePlayButton.innerHTML = "Pause";
        jQuery("#timer").startTimer();
    } else {
        isRunning = false;
        pausePlayButton.innerHTML = "Start";
        $("#timer").pauseTimer();
    }
});

$("#resetTimerButton").click(function() {

})

var finished = function(timer) {
  alert("HI!");
}
