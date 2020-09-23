const clear = document.querySelector(".clear");
clear.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
})








const dateElement = document.getElementById("date");
const options = {weekday: "short", month: "short", day: "numeric", year: "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);






const list = document.getElementById("list");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH ="lineThrough";

function addToDo(toDo, id, done, trash ){

if(trash){return};

const DONE = done ? CHECK: UNCHECK;
const LINE = done ? LINE_THROUGH : "";

    const text = `<li class="item">
             <i class="co fa ${DONE}     complete" job="complete" id="${id}"></i>
             <p class="text ${LINE}">${toDo}</p>
             <i class="de fa fa-trash" job="delete" id="${id}"></i>
             </li>`            
  const position =  "beforeend";           

  list.insertAdjacentHTML(position, text);
}
//addToDo("kkkkk"); //to test the function.

let LIST = [];
let id = 0;


const input = document.getElementById("input");

document.addEventListener("keyup", function(event){
  if(event.keyCode == 13){
    const toDo = input.value;
    if(toDo){
      addToDo(toDo, id, false, false);
      LIST.push(
        {
        name: toDo,
        id: id,
        done: false,
        trash: false
        }
      );
      input.value = "";
      id++; 
    }   
  }
});

function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false: true;
}

function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}
 
list.addEventListener("click", function(event){
  let element = event.target;
  const elementJOB = event.target.attributes.job.value;
  if(elementJOB == "complete"){
    return completeToDo(element); 
  }else if(elementJOB == "delete"){
    return removeToDo(element);
  }
})

//TO SAVE TO-DO LIST TO LOCALSTORAGE
localStorage.setItem('key', 'value');
let variable = localStorage.getItem('key');

localStorage.setItem('toDO', JSON.stringify(LIST));
let = LIST;
let = id;
let data = localStorage.getItem('toDO'); //TO RESTORE LIST OF ARR.
if(data){
  LIST =JSON.parse(data);
  loadToDo(LIST);
  id = LIST.length; //id of the next input.
}else{
  LIST = [];
  id = 0;
}

function loadToDo(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  })
}