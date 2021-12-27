// Initialize timers
let pomodoro_minute = 25;
let shortbreak_minute = 5;
let longbreak_minute = 10;
// Phase timer tab IDs
const pomodoro_ID = document.getElementById('pomodoro');
const short_break_ID = document.getElementById('short-break');
const long_break_ID = document.getElementById('long-break');
// Timer ID
const timer_ID = document.getElementById('pomo-timer');
// Timer interval for countdown
let interval_timer;
// Tracks which phase timer is active on the user's screen
var active_phase_timer;
var countdown_timer;


// #######################################################
// Timer Functionality
// #######################################################
// FIX: timer
function start() {
    // Timer display parameters
    let minutes = Math.floor(countdown_timer / 60);
    let seconds = countdown_timer % 60;
    // Show extra 0 if the seconds text is single digit
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // Update the element
    timer_ID.innerHTML = `${minutes}:${seconds}`;
    countdown_timer--;
}

function stop(interval) {
    // Stop the timer
    clearInterval(interval);
    setActiveTimer();
}

// TODO: Allow user to edit timer
function changeTimer() {
    // change the time for either timer
}

// #######################################################
// Set Timer
// #######################################################
function setActiveTimer() {
    // Set time
    if (active_phase_timer == 'pomodoro') {
        countdown_timer = pomodoro_minute * 60;
    } else if (active_phase_timer == 'short') {
        countdown_timer = shortbreak_minute * 60;
    } else if (active_phase_timer == 'long') {
        countdown_timer = longbreak_minute * 60;
    }
    console.log(countdown_timer);
}

// Handles start and stop button logic
function handleTimer() {
    setActiveTimer();
    let result = handleCountdownUI()
    if (result) {
       interval_timer = setInterval(start, 1000);
    } else {
        stop(interval_timer);
    }
}

// #######################################################
// User Interface
// #######################################################
// Updates the timer and button interface on click
function handleCountdownUI() {
    // Countdown ID 
    const start_btn = document.getElementById('btn-start-timer');
    if (start_btn.classList.toggle('active')) {
        start_btn.innerHTML = 'Stop';
        return true;
    } else {
        // Update interface
        if (active_phase_timer == 'pomodoro') {
            timer_ID.innerHTML = '25:00';
        } else if (active_phase_timer == 'short') {
            timer_ID.innerHTML = '05:00';
        } else if (active_phase_timer == 'long') {
            timer_ID.innerHTML = '10:00';
        }
        start_btn.innerHTML = 'Start';
        return false;
    }
}

function changeTimerDisplay(timer) {
    active_phase_timer = timer;
    // Phase timer background IDs
    let background_ID = document.body.style;
    let todo_list_ID = document.getElementById('todo-list-sidebar').style;
    // background_ID = document.body.style;
    if (timer == 'pomodoro') {
        timer_ID.innerHTML = '25:00';
        background_ID.backgroundColor = '#fd5d5d';
        todo_list_ID.backgroundColor = '#FF7A7A';
    } else if (timer == 'short') {
        timer_ID.innerHTML = '05:00';
        background_ID.backgroundColor = '#3DBC69';
        todo_list_ID.backgroundColor = '#64D48A';
    } else if (timer == 'long') {
        timer_ID.innerHTML = '10:00';
        background_ID.backgroundColor = '#4DA2BD';
        todo_list_ID.backgroundColor = '#6DBCD4';
    }
}

// document.body.onload = function() {
//     pomodoro_ID.toggle();
// }