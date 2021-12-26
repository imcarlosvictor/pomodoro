// Initialize timers
let pomodoro_minute = 25;
let shortbreak_minute = 5;
let longbreak_minute = 10;
// Convert timer to seconds
let pomodoro_to_seconds = pomodoro_minute * 60;
let shortbreak_to_seconds = shortbreak_minute * 60;
let longbreak_to_seconds = longbreak_minute * 60;
// Timer IDs
const pomodoro_ID = document.getElementById('pomodoro');
const short_break_ID = document.getElementById('short-break');
const long_break_ID = document.getElementById('long-break');
// Countdown ID 
const timer_ID = document.getElementById('pomo-timer');
const start_btn = document.getElementById('btn-start-timer');
// Timer interval
let timer_interval;



// Handles start and stop button logic
function handleTimer() {
    let res = handleCountdownUI()
    if (res) {
       timer_interval = setInterval(start, 1000);
    } else {
        stop(timer_interval);
    }

    // if (!res) {
    //     stop(timer_interval);
    // }
}

// TODO: Make the function reusable with the other timers
function start() {
    // Timer display parameters
    const minutes = Math.floor(pomodoro_to_seconds / 60);
    let seconds = pomodoro_to_seconds % 60;
    // Show extra 0 if the seconds text is single digit
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Update the element
    timer_ID.innerHTML = `${minutes}:${seconds}`;
    pomodoro_to_seconds--;
}

function stop(interval) {
    // Stop the timer
    clearInterval(interval);
    pomodoro_to_seconds = pomodoro_minute * 60;
}

// TODO: Allow user to edit timer
function changeTimer() {
    // change the time for either timer
}

// Updates the timer and button interface on click
function handleCountdownUI() {
    if (start_btn.classList.toggle('active')) {
        start_btn.innerHTML = 'Stop';
        return true;
    } else {
        // Update interface
        timer_ID.innerHTML = '25:00';
        start_btn.innerHTML = 'Start';
        return false;
    }
}

function changeTimer() {
    if (pomodoro_ID.classList.click()) {
        timer_ID.innerHTML = '25:00';
    } else if (short_break_ID.classList.click()) {
        timer_ID.innerHTML = '5:00';
    } else if (long_break_ID.classList.click()) {
        timer_ID.innerHTML = '10:00';
    }
}

// document.body.onload = function() {
//     pomodoro_ID.toggle();
// }