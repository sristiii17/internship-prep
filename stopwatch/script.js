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
}