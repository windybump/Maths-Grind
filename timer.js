let time = 60;
updateTime(time);



function timer(){
    
    if (time != 0){
        console.log("timer started")
        sec = time;
        let timer = setInterval(function(){
            updateTime(sec);
            sec--;
            if (sec < 0 || countdownStarted == false) {
                if (sec < 0){
                getScore(document.getElementById("scoreModal"))
                clearInterval(timer);
                }else{
                clearInterval(timer);
                updateTime(time); //quickfix for an issue where interval would increment once before clearing (ie time would reset and then increment once)
                }
            }
        }, 1000);   
    }         
}

function resetTime() {
    updateTime(time);
}

function setTime(selectedTime){
 switch (selectedTime){
    case 1:
        console.log("1 minute")
        time = 60;
        restart();
        break;
    case 2:
        console.log("2 minutes")
        time = 120;
        restart();

        break;
    case 5:
        console.log("5 minutes")
        time = 300;
        restart();   
        break;
    case 0:   
        time = 0;
        restart();

    }    
}

function updateTime(updatedTime){
    let minutes = Math.floor(updatedTime/60);
    let seconds = updatedTime % 60;
    
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (time == 0){
        document.getElementById('safeTimerDisplay').innerText="Endless";
    }else{
        document.getElementById('safeTimerDisplay').innerHTML=`${minutes}:${seconds}`;
    }
    
}
