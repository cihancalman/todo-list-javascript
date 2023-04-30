let todos = [
];
if(localStorage.getItem("todos") !== null){
    todos = JSON.parse(localStorage.getItem("todos"));

}


let input = document.querySelector("#txtTask");

let editId;
let isEditTask= false;

function displayTasks(filter){

if(todos.length ==0){
    console.log("oldu");
    document.getElementById("todo").innerHTML = `
 
  
<p>Add new to-do</p>
 `
}
else{
     document.getElementById("todo").innerHTML = `
    

 <ul class="list-group list-group-flush px-0 py-2 bg-light " id="task-list"></ul>
 `
 let ul = document.getElementById("task-list");
    ul.innerHTML = "";
    
    
    
        for (let todo of todos){
            let isCheck;
            if (todo.status =="done") {
                isCheck= "checked";
            } else {
               isCheck = ""; 
            }
        
       if(filter == todo.status || filter =="all") 
       {let li = `
        <li class="list-group-item bg-white d-flex flex-sm-row justify-content-between">
                <div><input class="form-check-input me-1" onclick="updateStatus(this)" type="checkbox" ${isCheck} value="" id="${todo.id}">
                <label class="form-check-label ${isCheck} " for="1">${todo.task}</label>
                </div>
                <div class = "">
                <a href="#" class="text-decoration-none" onclick ="editTask(${todo.id},'${todo.task}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>
                </a>
                <a href="#" class="text-decoration-none" onclick="deleteTask(${todo.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg></a></div>
              </li>
        `
        
        ul.insertAdjacentHTML("beforeend",li);}
        
    }
}

}
displayTasks(document.querySelector("span.active").id);


document.getElementById("addNewTask").addEventListener("click",newTask);
document.getElementById("addNewTask").addEventListener("keypress",function(event){

    if(event.key=="Enter"){
        document.getElementById("addNewTask").click();
    }
    event.preventDefault();
});

let filters = document.querySelectorAll(".filters span");

for(let span of filters){
    span.addEventListener("click",function(){
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTasks(span.id);
        
    })
}

function newTask(event){
if (input.value =="") {
    alert("error");
} else {
    if(isEditTask == false){
    todos.push({"id":todos.length+1,"task":input.value,"status":"pending"}); //add task
    input.value="";
    }
    else{
    // edit task
    for(let todo of todos){
        if(todo.id == editId){
            todo.task = input.value;
            isEditTask=false;
            input.value = "";
            break;
            
        }
    }
    
    }
    }
    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("todos",JSON.stringify(todos));
    event.preventDefault();
}

function deleteTask(id){
    let deletedId;
    for(item in todos){
        if(todos[item].id == id){
            deletedId = item;
            break;
        }
    }
    todos.splice(deletedId,1);
    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function editTask(taskId,taskName){

    editId = taskId;
    isEditTask = true;
    input.value = taskName;
    input.focus();
    input.classList.add("active");
    localStorage.setItem("todos",JSON.stringify(todos));
   
}

function updateStatus(selectedTask){
    let label = selectedTask.nextElementSibling;
    let taskid = selectedTask.id;
    if (selectedTask.checked) {
        label.classList.add("checked");
        for(let todo of todos){
            if(todo.id == taskid){
                todo.status="done";
                console.log(todo.status);
                break;
            }
        }
        
        
    } else {
        label.classList.remove("checked");
        for(let todo of todos){
            if(todo.id == taskid){
                todo.status ="pending";
                console.log(todo.status);
                break;
            }

        }
        
    }
    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("todos",JSON.stringify(todos));
}