var input = document.getElementById('userAnswer');
input.focus();
input.select();
var [a,b] = [Math.floor((Math.random() * 12) + 1), Math.floor((Math.random() * 12) + 1)];
var [nexta,nextb] = [Math.floor((Math.random() * 12) + 1), Math.floor((Math.random() * 12) + 1)];

var streak = 0;

document.getElementById("myBtn").addEventListener("click",(event)=>{event.preventDefault();readAnswer()} );
generateQuestion();
document.getElementById("streak").innerText = "Streak: " + String(streak);

function generateQuestion(){
    while(a==nexta && b==nextb){
        nexta = Math.floor((Math.random() * 12) + 1);
        nextb = Math.floor((Math.random() * 12) + 1);
    }
    a = nexta;
    b = nextb;
    
    
    nexta = Math.floor((Math.random() * 12) + 1);
    nextb = Math.floor((Math.random() * 12) + 1);
    
    while(a==nexta && b==nextb){
        nexta = Math.floor((Math.random() * 12) + 1);
        nextb = Math.floor((Math.random() * 12) + 1);
    }
    questionText = String(a) + " X " + String(b);
    newQuestionText = String(nexta) + " X " + String(nextb);
    
    document.getElementById("currentQuestion").innerText = questionText;
    document.getElementById("nextQuestion").innerText = newQuestionText;

}



function readAnswer(){
    let answer = document.getElementById('userAnswer');
    console.log(answer);
    document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate");
    document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate");
    setTimeout(()=>{generateQuestion(); document.getElementById("currentQuestion").classList.toggle("currentQuestion-animate"); document.getElementById("nextQuestion").classList.toggle("nextQuestion-animate")},300);
    
    if (answer.value == a*b){
        console.log("correct")
        streak += 1;
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