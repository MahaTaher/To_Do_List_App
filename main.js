 let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empTy array to store the tasks 
 let arrayOfTasks=[];
 // check if there is tasks in local storage
 if (localStorage.getItem("tasks"))
 {
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
   }
 // trigger gev data from local storage
 getDataFromLocalStorage();
 addElemnTsTPageFrom(arrayOfTasks);
// add task
submit.onclick= function()
{
   if (input.value !== "")
   {
    addTaskToArray(input.value); // add Task To array Tasks
    input.value=""; // empTy inpuT field
   }
  }
// click on task element
tasksDiv.addEventListener("click",(e) => 
{
    // delete button
    if (e.target.classList.contains("del"))
    {
        //remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // remove task from page
        e.target.parentElement.remove();
  
       }
       // task element
       if (e.target.classList.contains("task"))
       {
        //toggle completed to the task
        togglestatusTaskWith(e.target.getAttribute("data-id"));
        //toggle done classs
        e.target.classList.toggle("done");
       }

   });
  function addTaskToArray(taskText)
  {
    // Task daTa
    const task = 
    {
        id:Date.now(),
        title:taskText,
        completed: false,
       };
       // push Task To array of Tasks
   arrayOfTasks.push(task);
   // add Task To page
  addElemnTsTPageFrom(arrayOfTasks);
  //add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
  console.log(arrayOfTasks);
  console.log(JSON.stringify(arrayOfTasks));
      }
 function addElemnTsTPageFrom(arrayOfTasks)
 {
    // empTy Tasks Div
    tasksDiv.innerHTML="";
    arrayOfTasks.forEach((task) => {
        // create main  div
        let div = document.createElement("div");
        div.className="task";
        // check if task is done
        if (task.completed)
        {
            div.className="task done";
           }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
         // create main  span
        let span = document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        // append button to main div
        div.appendChild(span);
        // add task div to task container
        tasksDiv.appendChild(div);
        
    });
 }
 
 function addDataToLocalStorageFrom(arrayOfTasks)
 {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
 }
/*function  getDataFromLocalStorage()
{
    let data = window.localStorage.getItem("tasks");
    if (data)
    {
        let tasks= JSON.parse(data);
        addDataToLocalStorageFrom(tasks);
    }
}*/
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        // No need to call addDataToLocalStorageFrom(tasks) here
    }
}
function deleteTaskWith(taskId)
{ 
    // for explain 
    /*for (let i=0 ;i< arrayOfTasks.length; i++)
    {
        console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    }*/
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}
function togglestatusTaskWith(taskId)
{
    /*for (let i=0 ;i< arrayOfTasks.length; i++)
    {
        console.log(`${arrayOfTasks[i].id} `);
    }*/
    for (let i=0 ;i< arrayOfTasks.length; i++)
    {
        if(arrayOfTasks[i].id == taskId)
        {
            arrayOfTasks[i].completed == false ?  arrayOfTasks[i].completed = true  : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

