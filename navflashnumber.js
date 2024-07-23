let customNumberArray = [];
let inputNumAmount = document.getElementById('numberAmount');
let inputNumSpeed = document.getElementById('numberSpeed');
let singularNumber = 0; 

function openNav() {
        navMenu = document.getElementById("myNav");
        navMenu.style.transform = "translate(0)";
        resetInputs();
        
}

function closeNav() {
    document.getElementById("myNav").style.transform = "translate(-100%)";
    
}
function showToolTip(){
  document.getElementById("easy-tooltip").classList.add('show-tooltip');
}

function applySettings(){
  checkInt = Number(inputNumAmount.value)
  switch(true){
    case isNaN(checkInt):
      badInput("This isn't a number")
      break;
    case checkInt > 25:
      badInput("Too big, number must be 25 or smaller")
      break;
    case checkInt < 1:
      badInput("Can't be 0 or negative")
      break;
    default:
      arrayLength = inputNumAmount.value;
      numDelay = inputNumSpeed.value;
      resetInputs();
      closeNav();
  }
  
  
}

function resetInputs(){
  inputNumAmount.value = arrayLength;
  inputNumSpeed.value = numDelay;
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

