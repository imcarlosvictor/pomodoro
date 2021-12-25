
// Initialize timers
let pomodoro_minute = 25;
let shortbreak_minute = 5;
let longbreak_minute = 10;
// Convert timer to seconds
let pomodoro_to_seconds = pomodoro_minute * 60;
let shortbreak_to_seconds = shortbreak_minute * 60;
let longbreak_to_seconds = longbreak_minute * 60;

// Handles start and stop button logic
function startTimer() {
    if (document.getElementById('btn-start-timer').classList.toggle('active')) {
        document.getElementById('btn-start-timer').innerHTML = 'Stop';
        setInterval(updateTimer, 1000);
    } else {
        document.getElementById('btn-start-timer').innerHTML = 'Start';
    }
}

function updateTimer() {
    // Timer display parameters
    const minutes = Math.floor(pomodoro_to_seconds / 60);
    let seconds = pomodoro_to_seconds % 60;
    // Show extra 0 if the seconds text is single digit
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Update the element
    const timer_element = document.getElementById('timer');
    timer_element.innerHTML = `${minutes}:${seconds}`;
    pomodoro_to_seconds--;
}

// ############################################################
// Todo list
function showTodoList() {
    if (document.getElementById('todo-list-sidebar').classList.toggle('active')) {
        document.getElementById('main-page').classList.toggle('active');
    } else {
        document.getElementById('main-page').classList.toggle('active');
    }
}
