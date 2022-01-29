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
// Start button timer
const start_btn = document.getElementById('btn-start-timer');
// Timer interval for countdown
let interval_timer;
// Tracks which phase timer is active on the user's screen
var active_phase_timer = 'pomodoro';
var countdown_timer;
var countdown_timer_active = false;
// Phase Change Counter
var phase_count = 0;

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
    // Handle phase change automatically
    if (countdown_timer == 0 || countdown_timer % 2 == 0) {
        active_phase_timer = 'short';
        phase_count++;
        setActiveTimer();
    } else if (countdown_timer == 1 || countdown_timer % 3 == 0) {
        active_phase_timer = 'pomodoro';
        phase_count++;
        setActiveTimer();
    } else {
        active_phase_timer = 'long';
        phase_count = 0;
        setActiveTimer();
    }
}

function stop() {
    // Stop updating the element
    clearInterval(interval_timer);
    // Reset the timer
    setActiveTimer();
    countdown_timer_active = false;
}

// TODO: Allow user to edit timer
function changeTimer() {
    // change the time for either timer
}

// #######################################################
// Set Timer
// #######################################################
/*
* Reset the timer to its orignal state
*/
function setActiveTimer() {
    // Set time
    if (active_phase_timer == 'pomodoro') {
        countdown_timer = pomodoro_minute * 60;
    } else if (active_phase_timer == 'short') {
        countdown_timer = shortbreak_minute * 60;
    } else if (active_phase_timer == 'long') {
        countdown_timer = longbreak_minute * 60;
    }
}

/*
* Handles start and stop button logic
*/
function handleTimer() {
    setActiveTimer();
    let result = handleCountdownUI()
    if (result) {
        countdown_timer_active = true;
        interval_timer = setInterval(start, 1000);
    } else {
        stop();
    }
}


// #######################################################
// User Interface
// #######################################################
/*
* Updates the timer and button interface on click
*/
function handleCountdownUI() {
    // Countdown ID 
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

function changePhase(phase) {
    if (countdown_timer_active) {
        let result = confirm('Countdown timer is active. Are you sure you want to end your session?');
        if (result) {
            // Stop timer
            stop(interval_timer);
            // Reset start timer button 
            start_btn.classList.toggle('active');
            start_btn.innerHTML = 'Start';
            // Change page
            changeTimerDisplay(phase);
        } 
    } else {
        changeTimerDisplay(phase);
    }
}

function changeTimerDisplay(current_phase) {
    // Change page
    active_phase_timer = current_phase;
    // Phase timer background IDs
    let background_ID = document.body.style;
    let todo_list_ID = document.getElementById('todo-list-sidebar').style;
    //
    if (current_phase == 'pomodoro') {
        timer_ID.innerHTML = '25:00';
        background_ID.backgroundColor = '#fd5d5d';
        todo_list_ID.backgroundColor = '#FF7A7A';
        pomodoro_ID.classList.toggle('active');
    } else if (current_phase == 'short') {
        timer_ID.innerHTML = '05:00';
        background_ID.backgroundColor = '#3DBC69';
        todo_list_ID.backgroundColor = '#64D48A';
        short_break_ID.classList.toggle('active');
    } else if (current_phase== 'long') {
        timer_ID.innerHTML = '10:00';
        background_ID.backgroundColor = '#4DA2BD';
        todo_list_ID.backgroundColor = '#6DBCD4';
        long_break_ID.classList.toggle('active');
    }
}

function changeTimer() {
    let new_time = window.prompt('Enter minutes: ');
    new_time = new_time < 10 ? '0' + new_time : new_time;
    if (active_phase_timer === 'pomodoro') {
        pomodoro_minute = new_time;        
    } else if (active_phase_timer === 'short') {
        shortbreak_minute = new_time;
    } else if (active_phase_timer === 'long') {
        longbreak_minute = new_time;
    }
    timer_ID.innerHTML = new_time + ':00';
}