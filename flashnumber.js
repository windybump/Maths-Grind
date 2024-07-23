let input = document.getElementById('userAnswer');
input.style.display ="none";
document.getElementById('myBtn').style.display="none";
let exclude = []
let include = [1,2,3,4,5,6,7,8,9,10,11,12]
let shuffleOn = true;

let numDelay = 1000;
let arrayLength = 5; // set number for now
let flashArray = [];
let showingNumbers = false;



let difficultyState = "Full"
let streak = 0;
let highScore = 0;
let highestStreak = 0;
let correct = 0;



document.getElementById("numberAmount").value = arrayLength;
document.getElementById("numberSpeed").value = numDelay;
document.getElementById("difficultyState").innerText = difficultyState;
document.getElementById("myBtn").addEventListener("click",(event)=>{event.preventDefault();readAnswer()} );

//  generates random number and excludes numbers   
function generateRandom(min, max, excludes) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (excludes.includes(num)) ? generateRandom(min, max, excludes) : num;
}

function difficulty(level){
    switch(level){
      case "easy":
            numDelay = 1500;
            arrayLength = 5;
            difficultyState = "Easy"
            break;
        case "medium":
            numDelay = 1000;
            arrayLength = 10;
            difficultyState = "Medium"
            break;
        case "hard":
            numDelay = 700;
            arrayLength = 15;
            difficultyState = "Hard"
            break;
    }
    resetInputs();
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
    input.value = ""
    input.style.display ="none";
    document.getElementById('myBtn').style.display="none";
    if (showingNumbers==false){
    showingNumbers = true;
    flashArray = generateSet(include, arrayLength);
    let shownNumber = document.getElementById('currentNumber')
    shownNumber.style.fontSize = "10vw";
    for (var i = 0; i < arrayLength; i++){
            console.log("show number " + String(flashArray[i]))
            shownNumber.innerText = String(flashArray[i])
            await delay(numDelay);
            shownNumber.innerText = ""
            await delay(100);
    }
    input.style.display ="block";
    document.getElementById('myBtn').style.display="block";
    input.focus()
    showingNumbers = false;
    }
}

function readAnswer(){
    console.log("read answer?")
    let shownNumber = document.getElementById('currentNumber')
    result = document.getElementById('result')
    sum = flashArray.reduce(add,0)
 
    if (input.value == sum){
        shownNumber.style.fontSize = "3vw"; 
        shownNumber.innerText = "correct"
        flashArray = []
        input.style.display ="none";
        document.getElementById('myBtn').style.display="none";
    }else{
           shownNumber.style.fontSize = "3vw"; 
        shownNumber.innerText = "try again"
    }

    input.value = ""
}
function add(accumulator, a) {
    return accumulator + a;
  }

input.addEventListener("keypress", function(event){
    if (showingNumbers == false){
        if (event.key == "Enter"){
            event.preventDefault();
            readAnswer();
        }
    }
    
});


function getScore(modal){
    
    
}

function restart(){
    
}