
// Initialize timer to 25:00
let startMinute = 25;
let time = startMinute * 60;

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
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // Show extra 0 if the seconds text is single digit
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Update the element
    const countdownEl = document.getElementById('countdown');
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
}

/*
* Displays to-do list 
*/
function show_todo() {
    if (document.getElementById('todo-list-sidebar').classList.toggle('active')) {
        document.getElementById('main-page').classList.toggle('active');
    } else {
        document.getElementById('main-page').classList.toggle('active');
    }
}
