let customNumberArray = [];
let inputInclude = document.getElementById('inputInclude');
let inputSingular = document.getElementById('inputSingular');
let singularNumber = 0; 

function openNav() {
        navMenu = document.getElementById("myNav");
        navMenu.style.transform = "translate(0)";
        document.getElementById("setDifficulty").style.display ="block";
        document.getElementById("customNav").style.display ="none";
        document.getElementById("customLink").style.display ="block";
        document.getElementById("singularNav").style.display ="none";
        document.getElementById("singularLink").style.display ="block";
        
}

function closeNav() {
    document.getElementById("myNav").style.transform = "translate(-100%)";
    clearInputs();
    input.focus();
}
function showToolTip(){
  document.getElementById("easy-tooltip").classList.add('show-tooltip');
}
function openCustom(){
    document.getElementById("setDifficulty").style.display ="none";
    document.getElementById("singularLink").style.display ="none";
    document.getElementById("customNav").style.display ="block";
    document.getElementById('inputInclude').focus();
    document.getElementById('inputInclude').select();
}
function openSingular(){
  document.getElementById("setDifficulty").style.display ="none";
  document.getElementById("customLink").style.display ="none";
  document.getElementById("singularNav").style.display ="block";
  document.getElementById('inputSingular').focus();
  document.getElementById('inputSingular').select();
}
function submitNumbers(type){
  if (type == 'custom'){
    if(customNumberArray.length == 0){
      closeNav();
    }else{
    difficulty(type);
    closeNav();
    }
  }else if (type == 'singular'){
    singularNumber = inputSingular.value;
    switch(true){
      case isNaN(singularNumber):
        badInput("This isn't a number")
        break;
      case singularNumber > 1000:
        badInput("Too big, number must be 1000 or smaller")
        break;
      case singularNumber < 1:
        badInput("Can't be 0 or negative")
        break;
      default:
        difficulty(type);
        inputSingular.value = "";
        closeNav();
      }
  }
}
function addNumber(){
  checkInt = Number(inputInclude.value)
  switch(true){
    case isNaN(checkInt):
      badInput("This isn't a number")
      break;
    case checkInt > 50:
      badInput("Too big, number must be 49 or smaller")
      break;
    case checkInt < 1:
      badInput("Can't be 0 or negative")
      break;
    default:
      clearInputs();
      for (i = 1; i <= checkInt; i++){ 
        customNumberArray.push(i)  
        html = '<div id = "tag'+i+'" class = "number-tag">\
                <a href = "javascript:void(0)" class = "remove-num" id = "'+i+'" onclick="remove(this)">'+i+'</a>\
                </div>'
        document.getElementById('includeNumbers').innerHTML += (html);
      }
  }
  inputInclude.value = "";
  inputInclude.focus();
}

function remove(button){
  let number = button.id;
  let tag = document.getElementById('tag'+number);

  tag.remove();
  let index = customNumberArray.indexOf(Number(number));
  customNumberArray.splice(index,1);
  inputInclude.focus();
}

function clearInputs(){
  const myNode = document.getElementById("includeNumbers");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  customNumberArray = [];
  inputInclude.value = "";
  inputSingular.value = "";
}

function badInput(message) { //still quite buggy
  var popup = document.getElementById("badInput");
  popup.classList.remove("show")
  popup.innerText = message
  popup.classList.add("show");
  setTimeout(function(){popup.classList.remove("show")}, 2000)
}

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

document.getElementById("addNumber").addEventListener("click",(event)=>{event.preventDefault();addNumber()} );
inputInclude.addEventListener("keypress", function(event){
  if (event.key == "Enter"){
      event.preventDefault();
      addNumber();
  }
});

inputSingular.addEventListener("keypress", function(event){
  if (event.key == "Enter"){
      event.preventDefault();
      submitNumbers('singular');
  }
});