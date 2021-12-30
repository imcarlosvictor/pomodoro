const taskInput = document.querySelector('.task-userinput');
const addTaskButton = document.querySelector('.add-task-btn');
const todoList = document.querySelector('.todo-list');

// Event Listeners
document.addEventListener('DOMContentLoaded', recoverTasks);
addTaskButton.addEventListener('click', addTask);
todoList.addEventListener('click', taskManager);

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

function taskManager(e) {
    // Update task
    const item = e.target;

    if (item.classList[0] === 'edit-btn') {
        const task = item.parentElement;
        let new_task = window.prompt('Enter new task name: ');
        while(!new_task) {
            alert('Enter a task name');
            window.prompt('Enter new task name' );
        }

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

// function deleteAllTasks() {
//     let user_task = todoList.firstElementChild;
//     for (var i=0; i<todoList.List.childNodes.length; i++) {
//         removeLocalTasks(user_task);
//         user_task.remove();        
//     }
// }

/*
Check the local storage if there is an existing array holding tasks from before
*/
function parseLocalStorage() {
    if (localStorage.getItem('all_tasks') === null) {
        // Create new array
        all_tasks = [];
    } else {
        // Parse the existing array
        all_tasks = JSON.parse(localStorage.getItem('all_tasks'));
    }
}

/*
Add task to the local storage
*/
function saveLocalTodos(task) {
    parseLocalStorage();
    // Add task to array 
    all_tasks.push(task);
    localStorage.setItem('all_tasks', JSON.stringify(all_tasks));
}

/* 
Create a list of elements for each task in the local storage
*/
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

/*
Remove tasks from the local storage
*/
function removeLocalTasks(task) {
    parseLocalStorage();
    const taskIndex = task.children[0].innerText;
    all_tasks.splice(all_tasks.indexOf(taskIndex), 1);
    localStorage.setItem('all_tasks', JSON.stringify(all_tasks));
}