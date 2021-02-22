const form = document.querySelector("#addForm");
const todoList = document.querySelector("#todoList");
const completedList = document.querySelector("#completedList");


setEventListeners();

// Set event listeners
function setEventListeners() {

    // Complete task
    todoList.addEventListener("click", completeTask);

    // Remove task
    todoList.addEventListener("click", removeTask);

    // Submitting task
    form.addEventListener("submit", appendTask);

    // Loading existing tasks
    document.addEventListener("DOMContentLoaded", getTasksOnLoad)
}


// Adding new task
function appendTask(e) {
    e.preventDefault();
    tasks = getTasksFromStorage();
    const task = document.querySelector("#task");
    if (task.value != "") {
        newTask = addNewTask(task.value);
        todoList.append(newTask);
        addTaskToStorage(task.value);
        task.value = "";
    }
}

// Mark task as complete
function completeTask(e) {
    if (e.target.classList.contains("check-task")) {
        // Creating new list element
        const task = e.target.previousSibling.innerHTML;
        const completedTask = document.createElement("li");
        completedTask.classList.add("list-group-item");

        // Creating row into the list element
        const row = document.createElement("div");
        row.classList.add("row");
        completedTask.appendChild(row);

        // Adding text to the row
        const rowText = document.createElement("div");
        rowText.classList.add("mr-auto");
        rowText.innerHTML = `<strike>${task}</strike>`;

        // Append the completed task to the list
        row.appendChild(rowText);
        completedList.append(completedTask);
        e.target.parentElement.parentElement.remove();
    }
}

// Remove task from list
function removeTask(e) {
    if (e.target.classList.contains("remove-task")) {
        const taskToDelete = e.target.previousSibling.previousSibling.innerHTML;
        console.log(taskToDelete);
        e.target.parentElement.parentElement.remove();
        removeTaskFromStorage(taskToDelete);
    }
}

// Load tasks from browser's local storage
function getTasksFromStorage() {
    let tasks;
    const tasksList = localStorage.getItem("tasks");

    if (tasksList === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasksList);
    }
    return tasks;
}

// Adding task to the local storage
function addTaskToStorage(task) {
    tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Removing task from the local storage
function removeTaskFromStorage(taskToDelete) {
    tasks = getTasksFromStorage();

    tasks.forEach((task, index) => {
        if (task === taskToDelete) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Load existing tasks on load
function getTasksOnLoad() {
    let tasks = getTasksFromStorage();

    for (const task of tasks) {
        newTask = addNewTask(task);
        todoList.append(newTask);
    }

    tasks.forEach(task => {
        console.log(task);
    });
}

// Adding new task to the list
function addNewTask(task) {
    const newTask = document.createElement("li");
    newTask.classList.add("list-group-item");

    const btnCheck = document.createElement("button");
    btnCheck.classList.add("btn", "btn-success", "btn-sm", "mr-1");
    btnCheck.type = "button";
    btnCheck.innerText = "Done";
    btnCheck.classList.add("check-task");

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-danger", "btn-sm");
    btnDelete.type = "button";
    btnDelete.innerText = "X";
    btnDelete.classList.add("remove-task");

    const taskRow = document.createElement("div");
    taskRow.classList.add("row");
    newTask.appendChild(taskRow);

    const taskText = document.createElement("div");
    taskText.classList.add("mr-auto");
    taskText.innerText = task;

    taskRow.appendChild(taskText);
    taskRow.appendChild(btnCheck);
    taskRow.appendChild(btnDelete);

    return newTask;
}