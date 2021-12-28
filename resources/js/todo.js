// ###########################[TODO LIST]###############################
function showTodoList() {
    if (document.getElementById('todo-list-sidebar').classList.toggle('active')) {
        // Move timer and spotify to the side
        document.getElementsById('pomodoro').classList.toggle('active');
        // document.getElementsById('pomodoro').classList.style.gridColumnStart = 3;
        // document.getElementsById('pomodoro').classList.style.gridColumnEnd = 5;
    } else {
        // Hide to-do list
        // document.getElementById('main-page').classList.toggle('active');
        // Reposition the timer and spotify to the center
    }
}
