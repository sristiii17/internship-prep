let lapCount = 0;

let seconds = 0;

let timer = null;

function updateDisplay(){

    let hrs = Math.floor(seconds / 3600);

    let mins = Math.floor((seconds % 3600) / 60);

    let secs = seconds % 60;

    document.getElementById("display").innerText =
        String(hrs).padStart(2, '0') + ":" +
        String(mins).padStart(2, '0') + ":" +
        String(secs).padStart(2, '0');
}

function startTimer(){

    if(timer !== null){
        return;
    }

    timer = setInterval(function(){

        seconds++;

        updateDisplay();

    }, 1000);
}

function stopTimer(){

    clearInterval(timer);

    timer = null;
}

function resetTimer(){

    stopTimer();

    seconds = 0;

    updateDisplay();

    lapCount = 0;

    document.getElementById("lapList").innerHTML = "";
}

function recordLap(){

    if(seconds === 0 || timer === null){
        return;
    }

    lapCount++;

    let lap = document.createElement("li");

    lap.innerText =
    `Lap ${lapCount} - ${
        document.getElementById("display").innerText
    }`;

    document
    .getElementById("lapList")
    .appendChild(lap);
}

document.addEventListener("keydown", function(event){

    if(event.code === "Space"){

        event.preventDefault();

        if(timer === null){
            startTimer();
        }
        else{
            stopTimer();
        }
    }

    if(event.key.toLowerCase() === "r"){
        resetTimer();
    }

    if(event.key.toLowerCase() === "l"){
        recordLap();
    }
});