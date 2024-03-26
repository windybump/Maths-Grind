let input = document.getElementById('userAnswer');
input.focus();

let exclude = []
let include = [1,2,3,4,5,6,7,8,9,10,11,12]
let shuffleOn = true;

let timesTables = generateSet(include)

let [a,b] = [0,0];
let [nexta,nextb] = [timesTables[0].including,timesTables[0].j];

let difficultyState = "Full"
let count = 0; //counts through the array of times tables
let streak = 0;
let highScore = 0;
let highestStreak = 0;
let correct = 0;
let firstTimeCorrect = 0;
let firstTime = true;
let countdownStarted = false;



document.getElementById("shuffleToggle").checked = true;
document.getElementById("difficultyState").innerText = difficultyState;
document.getElementById("myBtn").addEventListener("click",(event)=>{event.preventDefault();readAnswer()} );
generateQuestion();
document.getElementById("streak").innerText = "Streak: " + String(streak);
document.getElementById("highScore").innerText = "High Score: " + String(highScore);
//  generates random number and excludes numbers   
function generateRandom(min, max, excludes) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (excludes.includes(num)) ? generateRandom(min, max, excludes) : num;
}

function difficulty(level){
    switch (level){
        case "easy":
            include = [1,2,3,4,5,10,11];
            difficultyState = "Easy"
            break;
        case "medium":
            include = [1,2,3,4,5,6,9,10,11];
            difficultyState = "Medium"

            break;
        case "hard":
            include = [3,4,5,6,7,8,9,11,12];
            difficultyState = "Hard"
            break;
        case "full":
            include = [1,2,3,4,5,6,7,8,9,10,11,12];
            difficultyState = "Full"
            break;
        case "custom":
            include = customNumberArray;
            difficultyState = "Custom"
            break;
        case "singular":
            include = ["singular", singularNumber]
            difficultyState = "Singular: "+include[1];
    }

    closeNav();
    document.getElementById("difficultyState").innerText = difficultyState;
    restart(); 
}

function generateQuestion(){
    firstTime = true;
    [a,b] = [nexta,nextb];
    
    count +=1;
    if (shuffleOn == true){
        if (Math.random()> 0.5){ //shuffles the order of the numbers so you don't get 2x2 -> 2x5 -> 2x9 etc
            [nexta,nextb] = [timesTables[count].including,timesTables[count].j]
        }else{
            [nexta,nextb] = [timesTables[count].j,timesTables[count].including]
        }
    }else{
        [nexta,nextb] = [timesTables[count].including,timesTables[count].j]
    }
    
    questionText = String(a) + " X " + String(b);
    newQuestionText = String(nexta) + " X " + String(nextb);
    
    document.getElementById("currentQuestion").innerText = questionText;
    document.getElementById("nextQuestion").innerText = newQuestionText;
    if(count == timesTables.length - 1){
        count = 0;
        timesTables = [{including:0,j:0},...generateSet(include)]; //matty hack 
    }
}

function generateSet(includes){
    let setQuestions = []
    if (isNaN(includes[0])){
        let max = Math.max(Number(includes[1])+1, 13);
        for (let i = 1; i < max; i++){
            setQuestions.push({including: i,j:includes[1]});
        }
        if (shuffleOn == true){
            setQuestions = shuffle(setQuestions);
        }
    }else{
        if (includes.length > 1){
            for (let i = 0; i < includes.length; i++){
                let including = includes[i]
                for (let j = i; j < includes.length; j++){  
                        setQuestions.push({including, j: includes[j]});
                }
            }
            if (shuffleOn == true){
                setQuestions = shuffle(setQuestions);
            }
        }else{
            for(x=0;x<=2;x++){
                setQuestions.push({including: includes[0], j: includes[0]})
            }
        }  
    }
    console.log(setQuestions)
    return setQuestions    
}
function checkShuffle(toggleSwitch){
    shuffleOn = toggleSwitch.checked;
    console.log(toggleSwitch.checked);
    restart();
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

function readAnswer(){
    if (countdownStarted == false){
        countdownStarted = true;
        timer();
    }
    if (input.value == a*b){
        document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate");
        document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate");
        correct +=1;
        if (firstTime == true){
            firstTimeCorrect += 1;
        }
        setTimeout(()=>{generateQuestion(); document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate"); document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate")},270);
        streak += 1;
        if (streak > highScore){
            highScore = streak;
            document.getElementById("highScore").innerText = "High Score: " + String(highScore);
        }
        
    }else{
        firstTime = false;
        if (highestStreak < streak){
            highestStreak = streak;
        }
        streak = 0;  
        
        document.getElementById("currentQuestion").classList.add("apply-shake")
        setTimeout(function(){document.getElementById("currentQuestion").classList.remove("apply-shake")}, 310)
             
    }
    document.getElementById("streak").innerText = "Streak: " + String(streak);
    input.value = "";
    input.focus();
}

input.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        event.preventDefault();
        readAnswer();
    }
});


function getScore(modal){
    input.blur();
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    

    span.onclick = function() {
        restart();
    }
    window.onclick = function(event) {
        if (event.target == modal) {
        restart();
        }
    }
    if (highestStreak < streak){
        highestStreak = streak;
    }
    
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (time == 0){
        document.getElementById('time').innerText="Endless";
    }else{
        document.getElementById('time').innerHTML=`${minutes}:${seconds}`;
    }


    document.getElementById('difficulty').innerText = difficultyState;
    let score = Math.floor((firstTimeCorrect/correct)*highestStreak**2);
    if (shuffleOn){
        document.getElementById('shuffle').innerText = "On";
        document.getElementById('score').innerText = score;
    }else{
        document.getElementById('shuffle').innerText = "Off";
        document.getElementById('score').innerText = "No score when shuffle is off";
    }
    document.getElementById('correct').innerText = correct;
    document.getElementById('highestStreak').innerText = highestStreak;
    document.getElementById('firstTimeCorrect').innerText = firstTimeCorrect;

    
    
}

function restart(){
    highestStreak = 0;
    streak = 0;
    correct = 0;
    firstTimeCorrect = 0;
    countdownStarted = false;
    document.getElementById("scoreModal").style.display = "none";
    updateTime(time);
    input.value = "";
    input.focus();
    document.getElementById("streak").innerText = "Streak: " + String(streak);
    timesTables = generateSet(include);
    count = 0;
    [a,b] = [0,0]; //resets the questions after adjusting the difficulty
    [nexta,nextb] = [timesTables[0].including,timesTables[0].j]; //otherwise the next question from the previous difficulty will show as the current question
    generateQuestion();   
}