function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value === ""){
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    li.innerText = input.value;

    let deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function(){
        li.remove();
    }

    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}

document.getElementById("taskInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTask();
    }
});