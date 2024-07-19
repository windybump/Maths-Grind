let input = document.getElementById('userAnswer');
input.blur()

let exclude = []
let include = [1,2,3,4,5,6,7,8,9,10,11,12]
let shuffleOn = true;

let arrayLength = 10; // set number for now
let flashArray = []




let difficultyState = "Full"
let count = 0; //counts through the array of times tables
let streak = 0;
let highScore = 0;
let highestStreak = 0;
let correct = 0;
let firstTimeCorrect = 0;
let firstTime = true;
let countdownStarted = false;



document.getElementById("difficultyState").innerText = difficultyState;
document.getElementById("myBtn").addEventListener("click",(event)=>{event.preventDefault();readAnswer()} );
generateQuestion();

//  generates random number and excludes numbers   
function generateRandom(min, max, excludes) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (excludes.includes(num)) ? generateRandom(min, max, excludes) : num;
}

function difficulty(level){
    
}

function generateQuestion(){
    
}
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
function generateSet(includes, size){
    tempArray = []
    for (var i = 0; i<size; i++){
        tempArray.push(generateRandom(1,9,exclude))    
    }
    console.log(tempArray)
    console.log(tempArray.reduce(add,0))
    return tempArray
}

async function start(){
    flashArray = generateSet(include, arrayLength);
    shownNumber = document.getElementById('currentNumber')
    
    for (var i = 0; i < arrayLength; i++){
            console.log("show number " + String(flashArray[i]))
            shownNumber.innerText = String(flashArray[i])
            await delay(1000);
            shownNumber.innerText = ""
            await delay(100);
    }
    
    input.focus()
}

function readAnswer(){
    shownNumber = document.getElementById('currentNumber')
    result = document.getElementById('result')
    sum = flashArray.reduce(add,0)
    if(flashArray.length == 0){
        start()
    }else{
        if (input.value == sum){
            
            shownNumber.innerText = "correct"
            flashArray = []
        }else{
            shownNumber.innerText = "try again"
        }
    }
    input.value = ""
}
function add(accumulator, a) {
    return accumulator + a;
  }

input.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        event.preventDefault();
        readAnswer();
    }
});


function getScore(modal){
    
    
}

function restart(){
    
}