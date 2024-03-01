let input = document.getElementById('userAnswer');
input.focus();
input.select();
let exclude = [1,5,10]
let include = [1,2,3,4,5,6,7,8,9,11,12]
let [a,b] = [generateRandom(1, 12, exclude),generateRandom(1, 12, exclude)];
let [nexta,nextb] = [generateRandom(1, 12, exclude),generateRandom(1, 12, exclude)];

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
    if (level == 'easy'){
        exclude = []
    }else if(level == 'medium'){
        exclude = [1,10]
    }else if(level == 'hard'){
        exclude = [1,2,5,10]
    }
    closeNav();
    streak = 0;
    document.getElementById("streak").innerText = "Streak: " + String(streak);
    generateQuestion();
}

function generateQuestion(){
    while(a==nexta && b==nextb){
        nexta = generateRandom(1, 12, exclude);
        nextb = generateRandom(1, 12, exclude);
    }
    a = nexta;
    b = nextb;

    nexta = generateRandom(1, 12, exclude);
    nextb = generateRandom(1, 12, exclude);
    
    while(a==nexta && b==nextb){
        nexta = generateRandom(1, 12, exclude);
        nextb = generateRandom(1, 12, exclude);
    }
    questionText = String(a) + " X " + String(b);
    newQuestionText = String(nexta) + " X " + String(nextb);
    
    document.getElementById("currentQuestion").innerText = questionText;
    document.getElementById("nextQuestion").innerText = newQuestionText;

}

// GENERATING SETS OF QUESTIONS (STILL NEED TO FINISH)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function generateSet(includes){
    let setQuestions = []
    for (let i = 0; i < includes.length; i++){
        let including = includes[i]
        for (let j = including; j < 13; j++){  
                setQuestions.push({including,j})
        }
    }
    setQuestions = shuffle(setQuestions)

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
console.log(generateSet(include))
// <------------------------------------------------------------------------->
function readAnswer(){
    let answer = document.getElementById('userAnswer');
    console.log(answer);
    document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate");
    document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate");
    setTimeout(()=>{generateQuestion(); document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate"); document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate")},270);
    
    if (answer.value == a*b){
        console.log("correct")
        streak += 1;
        if (streak > highScore){
            highScore = streak;
            document.getElementById("highScore").innerText = "High Score: " + String(highScore);
        }
    }else{
        console.log("wrong")
        streak = 0;
    }
    //generateQuestion();
    document.getElementById("streak").innerText = "Streak: " + String(streak);
    answer.value = "";
}

input.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        event.preventDefault();
        readAnswer();
    }
});