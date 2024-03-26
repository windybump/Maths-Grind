let time = 2;
updateTime(time);



function timer(){
    if (time != 0){
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

function setTime(selectedTime){
 switch (selectedTime){
    case 1:
        time = 60;
        break;
    case 2:
        time = 120;
        break;
    case 5:
        time = 300;
        break;
    case 0:   
        time = 0;
    }    
    restart();
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
