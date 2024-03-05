let customNumberArray = []
let inputInclude = document.getElementById('inputInclude');
function openNav() {
        document.getElementById("myNav").style.transform = "translate(0)";
        document.getElementById("setDifficulty").style.display ="block";
        document.getElementById("customNav").style.display ="none";
}

function closeNav() {
    document.getElementById("myNav").style.transform = "translate(-100%)";
    clearCustom();
}

function openCustom(){
    console.log("custom selected")
    document.getElementById("setDifficulty").style.display ="none";
    document.getElementById("customNav").style.display ="block";
    document.getElementById('inputInclude').focus();
    document.getElementById('inputInclude').select();
}

function submitNumbers(){
  if(customNumberArray.length == 0){
    closeNav();
  }else{
  difficulty('custom');
  closeNav()
  }
}

function addNumber(){
  let inputInclude = document.getElementById('inputInclude');
  checkInt = Number(inputInclude.value)
  if (!isNaN(checkInt) && (checkInt|0) === checkInt && checkInt > 0 && customNumberArray.includes(checkInt) == false){
    clearCustom();
    for (i = 1; i <= checkInt; i++){ 
      customNumberArray.push(i)
      
      html = '<div id = "tag'+i+'" class = "number-tag">\
              <a href = "javascript:void(0)" class = "removeNum" id = "'+i+'" onclick="remove(this)">'+i+'</a>\
              </div>'
      document.getElementById('includeNumbers').innerHTML += (html);
    }
  }
  console.log(customNumberArray)

  inputInclude.value = "";
  inputInclude.focus();
}

function remove(button){
  let number = button.id;
  console.log(number)
  let tag = document.getElementById('tag'+number);
  console.log(tag);
  tag.remove();
  let index = customNumberArray.indexOf(Number(number));
  customNumberArray.splice(index,1);
  inputInclude.focus();
  console.log(customNumberArray);
}

function clearCustom(){
  const myNode = document.getElementById("includeNumbers");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  customNumberArray = [];
  inputInclude.value = "";
}


document.getElementById("addNumber").addEventListener("click",(event)=>{event.preventDefault();addNumber()} );

inputInclude.addEventListener("keypress", function(event){
  if (event.key == "Enter"){
      event.preventDefault();
      addNumber();
  }
});