const addBtn = document.querySelector(".button");
const taskList = document.querySelector(".task-list");

setEventListeners();

function setEventListeners() {
    addBtn.addEventListener("click", addTaskFromEvent);
    taskList.addEventListener("click", doneTask);
    taskList.addEventListener("click", removeTask);
}

function addTaskFromEvent(e){
    const taskTextArea = document.getElementById("todo");
    if (taskTextArea.value === "") return;
    addTaskToList(taskTextArea.value);
    taskTextArea.value = "";

}

function doneTask(e){
    if (e.target.classList.contains("btn-done")) {
        const task = e.target.previousSibling.previousSibling;
        task.innerHTML = task.textContent.strike();
    }
}

function removeTask(e){
    if (e.target.classList.contains("btn-remove")) {
        const task = e.target.previousSibling;
        const lineBreak = task.parentElement.nextSibling;
        task.parentElement.remove();
        lineBreak.remove();
    }
}

function addTaskToList(task) {
    const newTask = createNewTask(task);
    taskList.appendChild(newTask);
    const hrElement = generateLineBreak();
    taskList.appendChild(hrElement);
}

function createNewTask(task) {
    const newTask = document.createElement("li");
    newTask.classList.add("task-list-item");

    const btnRemove = document.createElement("img");
    btnRemove.classList.add("btn-remove");
    btnRemove.src = "img/remove.png";

    const btnDone = document.createElement("img");
    btnDone.classList.add("btn-done");
    btnDone.src = "img/done.png";

    const taskSpan = document.createElement("span");
    taskSpan.innerText = task;
    taskSpan.classList.add("task-span");


    newTask.appendChild(taskSpan);
    newTask.appendChild(btnRemove);
    newTask.appendChild(btnDone);

    return newTask;
}

function generateLineBreak() {
    const hrElement = document.createElement("hr");
    hrElement.classList.add("line-break");
    return hrElement;
}