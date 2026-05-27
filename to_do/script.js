function addTask(){

    let input = document.getElementById("taskInput");

    let li = document.createElement("li");

    li.innerText = input.value;

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}