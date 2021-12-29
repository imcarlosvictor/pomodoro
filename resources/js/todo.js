const taskInput = document.querySelector('.task-userinput');
const addTaskButton = document.querySelector('.add-task-btn');
const todoList = document.querySelector('.todo-list');
const activeTask = document.querySelector('.task-inputs');

// Event Listeners
addTaskButton.addEventListener('click', addTask);
todoList.addEventListener('click', deleteCheck);
activeTask.addEventListener('click', completedTask);


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
        // Create check mark button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        taskDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(taskDiv);
        taskInput.value = "";
    }
}

function completedTask() {
    document.getElementById('task-inputs').classList.toggle('active');
}

function deleteCheck(e) {
    console.log(e.target);
    const item = e.target;
    // Delete todo
    if (item.classList[0] === 'delete-btn') {
        const task = item.parentElement;
        task.remove();
    }
}