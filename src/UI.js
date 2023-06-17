import createProjec from "./createproject";
import displayTasks from "./displaytasks";
import displayProjects from "./displayprojects";
import createTask from "./createtask";
import {
    isToday,
    toDate,
    isThisWeek,
  } from "date-fns";


export default function createUI() {
   
    //DOM elements 
    const pagecontent = document.querySelector(".content")
    const addProjectButton = document.querySelector(".create-project");
    addProjectButton.classList.add("addPage");
    const modalProject = document.querySelector(".modal-project");
    const projectList = document.querySelector(".project-list");
    const closeButtonTask = document.querySelector(".close-modal-task");
    const closeButtonProject = document.querySelector(".close-modal-project");
    const mainPlace = document.querySelector(".main-place");
    const defaultProjects = document.querySelector(".default");
    const formProject = document.querySelector(".form-project");
    const modalTask = document.querySelector(".modal-task");
    const formTask = document.querySelector(".form-task");
    const table = document.querySelector("table");
    let headerAndButton = document.createElement("div");
    let element = document.createElement("div");
    element.classList.add("project-header-place")
    const addTaskButton = document.createElement("button");
    const pop_up_place = document.querySelector(".pop-up-place") 
    addTaskButton.innerText = "+" ;
    addTaskButton.classList.add("addPage");
    addTaskButton.classList.add("addTaskButton");
    headerAndButton.appendChild(element);
    headerAndButton.appendChild(addTaskButton);
    headerAndButton.classList.add("header-and-button");
    mainPlace.appendChild(headerAndButton);
    addTaskButton.style.visibility = "hidden";
    mainPlace.appendChild(table);
    let currentTask = " ";
    let editing = false;
    const submitButton = document.querySelector(".add");
    const allTasksDiv = document.querySelector("#allTasks");
    const todayDiv = document.querySelector(".today");
    const thisWeekDiv = document.querySelector(".thisWeek");
    const importantDiv = document.querySelector(".important");
    allTasksDiv.classList.add("active");
    let isEventListenerAdded = false;
    

    /*----Default Projects----- */
    
    //creating the default projects every time open the page 
    const allTasks = createProjec("All tasks");
    const today = createProjec("today");
    const thisWeek = createProjec("This week");
    const important = createProjec("important");


    let projectArray = []; //creating the project array to add the newly created projects
    let currentproject = allTasks;

    // Retrieve projectArray from local storage
    const storedProjectArray = localStorage.getItem("projectArray");

    if (storedProjectArray) {
    projectArray = JSON.parse(storedProjectArray);
    //since JSON does not have functions, we have to create a new project with the retrieved projects assigned values
    projectArray.forEach((project, index) => { // Add the index parameter
        const { id, title, taskarray } = project;
        const p = createProjec(title);
        p.id = id;
        p.taskarray = taskarray;
        // Replace the project in projectArray with the modified project
        projectArray[index] = p;
    });
    }

    // Convert projectArray to a plain array before storing it in local storage
    const projectsToStore = Object.values(projectArray);

    // Store the updated projectArray in local storage
    localStorage.setItem("projectArray", JSON.stringify(projectsToStore));

    displayProjects(projectArray);

    displayTasks(allTasks);
    element.innerHTML = "All Tasks";
    addTaskButton.style.visibility = "visible";
    

    //displaying one of the default projects when clicked 
    defaultProjects.addEventListener("click", function(e) {
        if (e.target.classList.contains("all")) //checking if one of the default projects clicked 
         {
          element.innerHTML = " ";
          table.innerHTML = " ";
          addTaskButton.style.visibility = "visible";

          if (e.target==allTasksDiv || e.target.parentElement==allTasksDiv) {
            displayTasks(allTasks);
            if (document.querySelector(".active")){
            document.querySelector(".active").classList.remove("active")};
            allTasksDiv.classList.add("active");
            element.innerHTML="All Tasks";
            currentproject = allTasks;
          }

          else if  (e.target==todayDiv || e.target.parentElement==todayDiv) {
            displayTasks(today);
            addTaskButton.style.visibility = "hidden";
            if (document.querySelector(".active")){
                document.querySelector(".active").classList.remove("active")}
            todayDiv.classList.add("active");
            element.innerHTML="Today";
            currentproject = today;
          }

          else if (e.target==thisWeekDiv || e.target.parentElement==thisWeekDiv) {
            displayTasks(thisWeek);
            addTaskButton.style.visibility = "hidden";
            if (document.querySelector(".active")){
                document.querySelector(".active").classList.remove("active")}
            thisWeekDiv.classList.add("active");
            element.innerHTML="This week";
            currentproject = thisWeek;
          }

          else if (e.target==importantDiv || e.target.parentElement==importantDiv){
            displayTasks(important);
            addTaskButton.style.visibility = "hidden";
            if (document.querySelector(".active")){
                document.querySelector(".active").classList.remove("active")}
            importantDiv.classList.add("active");
            element.innerHTML="Important";
            currentproject = important;
        };
    } })

    /*------------*/

    /*------checkbox------*/

    //when click on the checkbox, changes the status of completed of the task and stores it in the local storage 
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("check")) {
    
             let taskIndex = e.target.parentNode.parentNode.parentNode.getAttribute("data-index");
             let currentTask = currentproject.taskarray.find((task) => task.id == taskIndex);
         
             if (e.target.checked) {
                currentTask.completed = true;
             } else {
                currentTask.completed = false;
             }
            
        //updating the default projects after changing the completed status of the task 
        const storedAllTaskArray = localStorage.getItem(`taskarray_${0}`)
        if (storedAllTaskArray)  {allTasks.taskarray = JSON.parse(storedAllTaskArray)};
        const allTasksIndex = allTasks.taskarray.findIndex(item => item.id == currentTask.id);
        allTasks.taskarray.splice(allTasksIndex, 1, currentTask);
        console.log("allTasksIndex",allTasksIndex)

        const storedTodayTaskArray = localStorage.getItem(`taskarray_${1}`)
        if (storedTodayTaskArray)  {today.taskarray = JSON.parse(storedTodayTaskArray)};
        const todayIndex = today.taskarray.findIndex(item => item.id == currentTask.id);
        if (todayIndex !== -1) {
            today.taskarray.splice(todayIndex, 1, currentTask);
        }
        console.log("todayIndex",todayIndex);

        const storedThisWeekTaskArray = localStorage.getItem(`taskarray_${2}`)
        if (storedThisWeekTaskArray)  {thisWeek.taskarray = JSON.parse(storedThisWeekTaskArray)};
        const thisWeekIndex = thisWeek.taskarray.findIndex(item => item.id == currentTask.id);
        if (thisWeekIndex !== -1) {
            thisWeek.taskarray.splice(thisWeekIndex, 1, currentTask);
        }
        console.log("thisWeekIndex",thisWeekIndex);

        const storedImportantTaskArray = localStorage.getItem(`taskarray_${3}`)
        if (storedImportantTaskArray)  {important.taskarray = JSON.parse(storedImportantTaskArray)};
        const importantIndex = important.taskarray.findIndex(item => item.id == currentTask.id);
        if (importantIndex !== -1) {
            important.taskarray.splice(importantIndex, 1, currentTask);
        } 
        console.log("importantIndex",importantIndex);
        
        //updating the task's project's task array 
        if (currentTask.project !== "All tasks") {
        const targetedproject = projectArray.find(item => item.title == currentTask.project);
        console.log(targetedproject);
        const storedTasksProjectArray = localStorage.getItem(`taskarray_${targetedproject.id}`)
        if (storedTasksProjectArray)  {targetedproject.taskarray = JSON.parse(storedTasksProjectArray)};
        const originalProjectIndex = targetedproject.taskarray.findIndex(item => item.id == currentTask.id);
        targetedproject.taskarray[originalProjectIndex] = currentTask;
        localStorage.setItem(`taskarray_${targetedproject.id}`, JSON.stringify(targetedproject.taskarray));}
        
        //updating the local storage of the projects 
        localStorage.setItem(`taskarray_${0}`, JSON.stringify(allTasks.taskarray));
        localStorage.setItem(`taskarray_${1}`, JSON.stringify(today.taskarray));
        localStorage.setItem(`taskarray_${2}`, JSON.stringify(thisWeek.taskarray));
        localStorage.setItem(`taskarray_${3}`, JSON.stringify(important.taskarray));
            
    
            } } )


    /*-------Modal Project------ */
    addProjectButton.addEventListener("click", () => {
        modalProject.style.display = "block";
        pagecontent.classList.add("blur");
   })

    function  closeForm() {
        modalProject.style.display = "none";
        formProject.reset();
        pagecontent.classList.remove("blur");
    }
    closeButtonProject.addEventListener("click",closeForm);

    //creats projects when submit form, adding them to project array and displaying them in the page
    modalProject.addEventListener("submit", (e) => {
        e.preventDefault();
        //getting the value from the form for the title
        let projectTitle = document.getElementById("title").value;
        const project = createProjec(projectTitle);
        projectArray.push(project);
        localStorage.setItem("projectArray", JSON.stringify(projectArray));
        displayProjects(projectArray);
        project.projectID();
        closeForm();
        }
    )
    /*------*/


    /*---projectlisteventlisteners */

    projectList.addEventListener('click', function(e) {
        //when click on the delete button removes the project
        if (e.target.classList.contains("delete-button-project")) {
          //targeting the project element that contains clicked delete button
          const dataIndex = e.target.parentNode.getAttribute("data-index");
          const targetedproject = projectArray.find(item => item.id == dataIndex);
          const index = projectArray.indexOf(targetedproject);
          
          //deleting all the tasks from the deleted project in every project
          for (let i=0; i<targetedproject.taskarray.length; i++) {
            const storedTaskArray = localStorage.getItem(`taskarray_${dataIndex}`);
            if (storedTaskArray) {
            targetedproject.taskarray = JSON.parse(storedTaskArray);
            }
            let tasktodelete = targetedproject.taskarray[i];
            allTasks.deleteTask(0,tasktodelete);
            today.deleteTask(1,tasktodelete);
            thisWeek.deleteTask(2,tasktodelete);
            important.deleteTask(3,tasktodelete);

            localStorage.setItem(`taskarray_${0}`, JSON.stringify(allTasks.taskarray));
            localStorage.setItem(`taskarray_${1}`, JSON.stringify(today.taskarray));
            localStorage.setItem(`taskarray_${2}`, JSON.stringify(thisWeek.taskarray));
            localStorage.setItem(`taskarray_${3}`, JSON.stringify(important.taskarray));
          }
         
         //if delete the project while displaying it, display All Tasks as a default
         if (currentproject == targetedproject) {
            element.innerHTML = " ";
            table.innerHTML = " ";
            element.innerHTML = "All Tasks";
            currentproject = allTasks;
            allTasksDiv.classList.add("active");
            displayTasks(currentproject);
         }

          projectArray.splice(index,1);
          e.target.parentNode.remove();
          localStorage.setItem("projectArray", JSON.stringify(projectArray));
        }
    


    //when click on a project displays it's tasks
        else if (e.target.classList.contains("project_element")) {
          const dataIndex = e.target.getAttribute("data-index");
          element.innerHTML = " "
          table.innerHTML = " "
          document.querySelector(".active").classList.remove("active");
          e.target.classList.add("active");
          currentproject = projectArray.find(item => item.id == dataIndex);
          
          element.innerText = currentproject.title;
          addTaskButton.style.visibility = "visible";
          displayTasks(currentproject);
    } })
    /*----------*/


    /*------Modal Task-------*/
    addTaskButton.addEventListener("click", () => {
        modalTask.style.display = "block";
        pagecontent.classList.add("blur");
   })

    function  closeFormTask() {
            modalTask.style.display = "none";
            pagecontent.classList.remove("blur");
            formTask.reset();
            editing = false ;
    }

    closeButtonTask.addEventListener("click",closeFormTask);

           //creates a task, and displays it in the projects page when submit the task form
        submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        //getting the values from the form
        if (editing == false) {
            if (isEventListenerAdded == true) {
            submitButton.removeEventListener("click",editTaskSave)}//removing the Event Listener for the editing if it was added
            let taskName = document.getElementById("name").value;
            let taskDescription = document.getElementById("description").value;
            let taskDueDate = document.getElementById("due-date").value;
            let taskImportance = document.querySelector('input[name="importance"]:checked').value;
            let taskProject = currentproject.title; 
            const task = createTask(taskName,taskDescription,taskDueDate,taskImportance, taskProject);

            //adding task to taskarray
            currentproject.addTask(currentproject.id,task);

            //adding task to the default projects 
            if (currentproject !==allTasks) {allTasks.addTask(allTasks.id,task)};

            let formattedDate = toDate(new Date(taskDueDate));
            if (isToday(formattedDate)) {
                today.addTask(1,task);
            }
            if (isThisWeek(formattedDate)) {
                thisWeek.addTask(2,task);
            }
            if (taskImportance == "High" ) {
                important.addTask(3,task);
            }

            currentproject.taskID();//increasing the task id by for the new task 
            closeFormTask();
            displayTasks(currentproject);
        }})

    /*--------*/



    /*----Pop up form for the task details ----*/
    let pop_up = document.createElement("div");
    pop_up.classList.add = "pop-up";
    pop_up_place.appendChild(pop_up);
    pop_up.style.display = "none";
    function openPopUp(currentTask) {
        pop_up.style.display = "block";
        pagecontent.classList.add("blur");
        pop_up.innerHTML = `
         <div class="pop-up-div">
            <div class="popup__close">X</div>
            <div class="popup__content">
            	<div class="popup title">${currentTask.title}</div>
                <div class="popup details"><span>Project: </span>${currentTask.project}</div>
            	<div class="popup priority"><span>Priority: </span>${currentTask.importance}</div>
            	<div class="popup due"><span>Due Date: </span>${currentTask.dueDate}</div>
            	<div class="popup details"><span>Description: </span>${currentTask.description}</div>
            </div>
        </div>
         `; }

    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("popup__close")) { 
            pop_up.style.display = "none";
            pagecontent.classList.remove("blur");
          }

        if (e.target.classList.contains("details")) {
              const targetelement = e.target.parentNode.parentNode;
              const dataIndex = targetelement.getAttribute("data-index");
              currentTask = currentproject.taskarray.find(item => item.id == dataIndex);
              openPopUp(currentTask);
          }
    })
   /*------------------*/    



   /*------EDİT------- */
   
   function editTaskSave(){

        let beforeEditImportance = currentTask.importance;
        let beforeEditDate = toDate(new Date(currentTask.dueDate));

        currentTask.title = document.getElementById("name").value;
        currentTask.description = document.getElementById("description").value;;
        currentTask.dueDate = document.getElementById("due-date").value;
        currentTask.importance = document.querySelector('input[name="importance"]:checked').value;
        const rowIndex = currentproject.taskarray.findIndex(item => item.id == dataIndexEdit);

        table.rows[rowIndex].cells[1].innerHTML = currentTask.title;
        table.rows[rowIndex].cells[2].innerHTML = currentTask.importance;
        table.rows[rowIndex].cells[3].innerHTML = currentTask.dueDate;

        let currentDate = toDate(new Date(currentTask.dueDate)); 

        //deleting or adding tasks to the default projects depending on the editing 
        if ((isToday(beforeEditDate)) && (isToday(currentDate)==false)) {
            today.deleteTask(1,currentTask);
        }

        if ((isToday(beforeEditDate)==false) && (isToday(currentDate))) {
            today.addTask(1,currentTask);
        }

        if ((isThisWeek(beforeEditDate)) && (isThisWeek(currentDate)==false)) {
            thisWeek.deleteTask(2,currentTask);
        }
       
        if ((isThisWeek(beforeEditDate)==false) && (isThisWeek(currentDate))) {
            thisWeek.addTask(2,currentTask);
        }
        if ((beforeEditImportance == "High") & (currentTask.importance != "High")) {
            important.deleteTask(3,currentTask);
        }
        if ((beforeEditImportance != "High") & (currentTask.importance == "High")) {
            important.addTask(3,currentTask);
        }

        console.log(currentTask.id,"currentTask.id3")
        

        //removing the importance class from before the add the new one 
        const importanceCell = table.rows[rowIndex].cells[2];
        const classList = importanceCell.classList;
        if (classList.length > 0) {
            const lastAddedClass = classList[classList.length - 1];
            importanceCell.classList.remove(lastAddedClass);
        }

        // Add the appropriate class based on the updated importance(for red,green or yellow background)
        if (currentTask.importance == "High") {
            importanceCell.classList.add("task-high");
          } else if (currentTask.importance == "Medium") {
            importanceCell.classList.add("task-medium");
          } else if (currentTask.importance == "Low") {
            importanceCell.classList.add("task-low");
          }

        //updating the default projects after editing the task 
        const storedAllTaskArray = localStorage.getItem(`taskarray_${0}`)
        if (storedAllTaskArray)  {allTasks.taskarray = JSON.parse(storedAllTaskArray)};
        const allTasksIndex = allTasks.taskarray.findIndex(item => item.id == currentTask.id);
        allTasks.taskarray.splice(allTasksIndex, 1, currentTask);
        console.log("allTasksIndex",allTasksIndex)

        const storedTodayTaskArray = localStorage.getItem(`taskarray_${1}`)
        if (storedTodayTaskArray)  {today.taskarray = JSON.parse(storedTodayTaskArray)};
        const todayIndex = today.taskarray.findIndex(item => item.id == currentTask.id);
        if (todayIndex !== -1) {
            today.taskarray.splice(todayIndex, 1, currentTask);
        }
        console.log("todayIndex",todayIndex);

        const storedThisWeekTaskArray = localStorage.getItem(`taskarray_${2}`)
        if (storedThisWeekTaskArray)  {thisWeek.taskarray = JSON.parse(storedThisWeekTaskArray)};
        const thisWeekIndex = thisWeek.taskarray.findIndex(item => item.id == currentTask.id);
        if (thisWeekIndex !== -1) {
            thisWeek.taskarray.splice(thisWeekIndex, 1, currentTask);
        }
        console.log("thisWeekIndex",thisWeekIndex);

        const storedImportantTaskArray = localStorage.getItem(`taskarray_${3}`)
        if (storedImportantTaskArray)  {important.taskarray = JSON.parse(storedImportantTaskArray)};
        const importantIndex = important.taskarray.findIndex(item => item.id == currentTask.id);
        if (importantIndex !== -1) {
            important.taskarray.splice(importantIndex, 1, currentTask);
        } 
        console.log("importantIndex",importantIndex);
        
        //updating the task's project's task array
        if (currentTask.project !== "All tasks") {
        const targetedproject = projectArray.find(item => item.title == currentTask.project);
        const storedTasksProjectArray = localStorage.getItem(`taskarray_${targetedproject.id}`)
        if (storedTasksProjectArray)  {targetedproject.taskarray = JSON.parse(storedTasksProjectArray)};
        const originalProjectIndex = targetedproject.taskarray.findIndex(item => item.id == currentTask.id);
        targetedproject.taskarray[originalProjectIndex] = currentTask;
        
        localStorage.setItem(`taskarray_${targetedproject.id}`, JSON.stringify(targetedproject.taskarray));}
    
        
        //updating the local storage of the projects 
        
        localStorage.setItem(`taskarray_${0}`, JSON.stringify(allTasks.taskarray));
        localStorage.setItem(`taskarray_${1}`, JSON.stringify(today.taskarray));
        localStorage.setItem(`taskarray_${2}`, JSON.stringify(thisWeek.taskarray));
        localStorage.setItem(`taskarray_${3}`, JSON.stringify(important.taskarray));
        
    
        currentTask.id = dataIndexEdit;
        submitButton.removeEventListener("click", editTaskSaveHandler);//removing the event listener since we will add it the next time when click on the edit button 
        pagecontent.classList.remove("blur");
        editing = false;
        closeFormTask();
        
    }

   let editTaskSaveHandler = null;  
   let dataIndexEdit = " ";
   table.addEventListener("click", (e)=> {
        if (e.target.classList.contains("edit-button")) {

            pagecontent.classList.add("blur");
            editing = true; //using the same modal for both adding a task and editing the task
            modalTask.style.display = "block";
            dataIndexEdit = e.target.parentNode.parentNode.getAttribute("data-index");
            currentTask = currentproject.taskarray.find(item => item.id == dataIndexEdit);
            document.getElementById("name").value = currentTask.title;
            document.getElementById("description").value = currentTask.description;
            document.getElementById("due-date").value = currentTask.dueDate;
            if (currentTask.importance == "High") {
                document.formTask.importance[0].checked = true;
            }
            else if (currentTask.importance == "Medium") {
                document.formTask.importance[1].checked = true;
            }
            else {
                document.formTask.importance[2].checked = true;
            }

            if (editTaskSaveHandler) {
                submitButton.removeEventListener("click", editTaskSaveHandler);
              }
          
              // Assign the new event listener function to the variable
              editTaskSaveHandler = () => {
                editTaskSave();
              };
          
              submitButton.addEventListener("click", editTaskSaveHandler);
        isEventListenerAdded = true;
}})

/*------------*/


/*-----Delete Task----- */

table.addEventListener("click",(e)=>{
    if (e.target.classList.contains("delete-button")) {

        const dataIndex = e.target.parentNode.parentNode.getAttribute("data-index");
        currentTask = currentproject.taskarray.find(item => item.id == dataIndex);
        currentproject.deleteTask(currentproject.id,currentTask);

        if (currentproject != allTasks) {
        allTasks.deleteTask(0,currentTask)};
        if (currentproject != today) {
        today.deleteTask(1,currentTask)};
        if (currentproject != thisWeek){
        thisWeek.deleteTask(2,currentTask)};
        if (currentproject != important){
        important.deleteTask(3,currentTask)};

            
        if (currentTask.project != "All tasks") {
        //finding the tasks's original project to make sure we are deleting the task from that project as well
        const originalproject = projectArray.find(item => item.title == currentTask.project);
        const Index = originalproject.taskarray.findIndex(item => item.id == currentTask.id);
        if (Index !== -1) {
            originalproject.deleteTask(originalproject.id,currentTask);
        }  }

        
        e.target.parentNode.parentNode.remove();
        currentTask = null;}

})   }


/** -------MENU-------- */

const openMenu = document.querySelector(".open_menu");
const menu = document.querySelector(".menu")
const pageContent = document.querySelector('.main-place');
openMenu.addEventListener("click", ()=> {
    menu.classList.toggle("open");
    pageContent.classList.toggle("open");
})