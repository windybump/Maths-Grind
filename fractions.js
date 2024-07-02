//  generates random number and excludes numbers   
function generateRandom(min, max, excludes) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (excludes.includes(num)) ? generateRandom(min, max, excludes) : num;
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
    for (let i = 0; i < 10; i++){
        const a = generateRandom(-10,10,[0])
        const b = generateRandom(-10,10,[0])
        const c = generateRandom(-10,10,[0])
        let question = `${a}x + ${b} = ${c}`;
    }
    console.log(setQuestions)
    return setQuestions    
}