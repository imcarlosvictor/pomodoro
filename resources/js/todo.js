const taskInput = document.querySelector('.task-userinput');
const addTaskButton = document.querySelector('.add-task-btn');
const todoList = document.querySelector('.todo-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', recoverTasks);
addTaskButton.addEventListener('click', addTask);
todoList.addEventListener('click', deleteCheck);

// Local storage to store user tasks
var all_tasks;

function showTodoList() {
    let todo_active = document.getElementById('todo-list-sidebar').classList.toggle('active');
    if (!todo_active) {
        // Shift the timer to the right side
        document.getElementById('pomodoro-block').style.gridColumnStart = 2;
        document.getElementById('pomodoro-block').style.gridColumnEnd = 4;
    } else {
        document.getElementById('pomodoro-block').style.gridColumnStart = 3;
        document.getElementById('pomodoro-block').style.gridColumnEnd = 5;
    }
}

function addTask(event) {
    if (!taskInput.value) {
        alert('Task must have a name');
    } else {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-inputs');
        // Create list
        const newTask = document.createElement('li');
        newTask.innerText = taskInput.value;
        newTask.classList.add('user-task-item');
        taskDiv.appendChild(newTask);
        // Add task to local storage
        saveLocalTodos(taskInput.value);
        // Create edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="far fa-edit"></i>';
        editButton.classList.add('edit-btn');
        taskDiv.appendChild(editButton);
        todoList.appendChild(taskDiv);
        // Create check mark button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        taskDiv.appendChild(deleteButton);
        todoList.appendChild(taskDiv);
        // Clear task input
        taskInput.value = "";
    }
}

function deleteCheck(e) {
    // Update task
    const item = e.target;
    if (item.classList[0] === 'edit-btn') {
        const task = item.parentElement;
        let new_task = window.prompt('Enter new task: ');
        task.innerText = new_task;
        // Add to list
        const newTask = document.createElement('li');
        newTask.innerText = new_task;
        newTask.classList.add('user-task-item');
        // Create edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="far fa-edit"></i>';
        editButton.classList.add('edit-btn');
        task.appendChild(editButton);
        // Create check mark button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        task.appendChild(deleteButton);
    }

    // Delete task 
    if (item.classList[0] === 'delete-btn') {
        const task = item.parentElement;
        removeLocalTasks(task);
        task.remove();
    }

    // Track first element in todo list
    let user_task = todoList.firstElementChild;
    // Iterate through the tasks until the text of the current task matches to the event text
    for (var i=0; i<todoList.childNodes.length; i++) {
        if (user_task.textContent === item.textContent) {
            user_task.classList.toggle('completed');
            break;
        } else {
            user_task = user_task.nextElementSibling;
        }
    }
}

function parseLocalStorage() {
    if (localStorage.getItem('all_tasks') === null) {
        // Create a new array
        all_tasks = [];
    } else {
        // Parse the existing array
        all_tasks = JSON.parse(localStorage.getItem('all_tasks'));
    }
}

function saveLocalTodos(task) {
    parseLocalStorage();
    // Add task to array 
    all_tasks.push(task);
    localStorage.setItem('all_tasks', JSON.stringify(all_tasks));
}

function recoverTasks() {
    parseLocalStorage();

    all_tasks.forEach(function(task) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-inputs');
        // Create list
        const newTask = document.createElement('li');
        newTask.innerText = task;
        newTask.classList.add('user-task-item');
        taskDiv.appendChild(newTask);
        // Create edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="far fa-edit"></i>';
        editButton.classList.add('edit-btn');
        taskDiv.appendChild(editButton);
        todoList.appendChild(taskDiv);
        // Create check mark button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        taskDiv.appendChild(deleteButton);
        todoList.appendChild(taskDiv);
    })
}

function removeLocalTasks(task) {
    parseLocalStorage();
    const taskIndex = task.children[0].innerText;
    all_tasks.splice(all_tasks.indexOf(taskIndex), 1);
    localStorage.setItem('all_tasks', JSON.stringify(all_tasks));
}