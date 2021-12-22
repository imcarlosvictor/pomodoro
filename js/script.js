function show() {
    if (document.getElementById('todo-list-sidebar').classList.toggle('active')) {
        document.getElementById('main-page').classList.toggle('active');
    } else {
        document.getElementById('main-page').classList.toggle('active');
    }
}