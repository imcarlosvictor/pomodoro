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
// Active phase timer
let active_timer;
// Phase timer background IDs
let background_ID = document.body.style;
let todo_list_ID = document.getElementById('todo-list-sidebar').style;



// Handles start and stop button logic
function handleTimer() {
    let result = handleCountdownUI()
    if (result) {
       timer_interval = setInterval(start, 1000);
    } else {
        stop(timer_interval);
    }
}

// FIX: timer
function start(active_timer) {
    let active;
    if (active_timer == 'pomodoro') {
        active = pomodoro_to_seconds;
    } else if (active_timer == 'short') {
        active = shortbreak_to_seconds;
    } else if (active_timer == 'long') {
        active = longbreak_to_seconds;
    }

    // Timer display parameters
    const minutes = Math.floor(active / 60);
    let seconds = active % 60;
    // Show extra 0 if the seconds text is single digit
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Update the element
    timer_ID.innerHTML = `${minutes}:${seconds}`;
    active--;
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

function changeTimer(timer) {
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
    active_timer = timer;
}

// document.body.onload = function() {
//     pomodoro_ID.toggle();
// }