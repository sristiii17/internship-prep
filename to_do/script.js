let taskList = document.getElementById("taskList");

loadTasks();

function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value === ""){
        alert("Please enter a task");
        return;
    }

    createTask(input.value);

    saveTasks();

    input.value = "";
}

function createTask(taskTextValue){

    let li = document.createElement("li");

    let taskText = document.createElement("span");

    taskText.innerText = taskTextValue;

    li.appendChild(taskText);

    li.addEventListener("click", function(){

        li.classList.toggle("completed");

        saveTasks();
    });

    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function(event){

        event.stopPropagation();

        li.remove();

        saveTasks();
    };

    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTasks(){

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(li){

        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function(task){

        createTask(task.text);

        let lastTask = taskList.lastChild;

        if(task.completed){
            lastTask.classList.add("completed");
        }
    });
}

document.getElementById("taskInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }
});