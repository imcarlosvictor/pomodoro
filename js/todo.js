// ###########################[TODO LIST]###############################
function showTodoList() {
    if (document.getElementById('todo-list-sidebar').classList.toggle('active')) {
        // Show to-do list
        document.getElementById('main-page').classList.toggle('active');
        // Move timer and spotify to the side
    } else {
        // Hide to-do list
        document.getElementById('main-page').classList.toggle('active');
        // Reposition the timer and spotify to the center
    }
}
