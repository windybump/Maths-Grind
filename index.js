let input = document.getElementById('userAnswer');
input.focus();
let exclude = []
let include = [1,2,3,4,5,6,7,8,9,10,11,12]
let timesTables = generateSet(include)
console.log(timesTables)
let count = 0;
let [a,b] = [0,0];
let [nexta,nextb] = [timesTables[0].including,timesTables[0].j];

let streak = 0;
let highScore = 0;

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
            break;
        case "medium":
            include = [1,2,3,4,5,6,9,10,11];
            break;
        case "hard":
            include = [2,3,4,5,6,7,8,9,11,12];
            break;
        case "custom":
            console.log("include numbers:");
            console.log(customNumberArray);
            include = customNumberArray;
    }
    closeNav();
    streak = 0;
    document.getElementById("streak").innerText = "Streak: " + String(streak);
    timesTables = generateSet(include);
    console.log(timesTables)
    count = 0;
    [a,b] = [0,0]; //resets the questions after adjusting the difficulty
    [nexta,nextb] = [timesTables[0].including,timesTables[0].j]; //otherwise the next question from the previous difficulty will show as the current question
    generateQuestion();    
}

function generateQuestion(){
    [a,b] = [nexta,nextb];
    
    count +=1;
    if (Math.random()> 0.5){ //shuffles the order of the numbers so you don't get 2x2 -> 2x5 -> 2x9 etc
        [nexta,nextb] = [timesTables[count].including,timesTables[count].j]
    }else{
        [nexta,nextb] = [timesTables[count].j,timesTables[count].including]
    }
    
    questionText = String(a) + " X " + String(b);
    newQuestionText = String(nexta) + " X " + String(nextb);
    
    document.getElementById("currentQuestion").innerText = questionText;
    document.getElementById("nextQuestion").innerText = newQuestionText;
    if(count == timesTables.length - 1){
        console.log("generating new set of timestables")
        count = 0;
        timesTables = [{including:0,j:0},...generateSet(include)]; //matty hack 
        console.log(timesTables, count);
    }
}

function generateSet(includes){
    let setQuestions = []
    if (includes.length > 1){
        for (let i = 0; i < includes.length; i++){
            let including = includes[i]
            for (let j = i; j < includes.length; j++){  
                    setQuestions.push({including, j: includes[j]})
            }
        }
        setQuestions = shuffle(setQuestions)
    }else{
        for(x=0;x<=2;x++){
            setQuestions.push({including: includes[0], j: includes[0]})
        }
    }  
    return setQuestions    
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
    if (input.value == a*b){
        document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate");
        document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate");
        setTimeout(()=>{generateQuestion(); document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate"); document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate")},270);
        streak += 1;
        if (streak > highScore){
            highScore = streak;
            document.getElementById("highScore").innerText = "High Score: " + String(highScore);
        }
    }else{
        document.getElementById("currentQuestion").classList.add("apply-shake")
        setTimeout(function(){document.getElementById("currentQuestion").classList.remove("apply-shake")}, 310)
        streak = 0;       
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