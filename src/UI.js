import createProjec from "./createproject";
import displayTasks from "./displaytasks";
import displayProjects from "./displayprojects";
import {
    isToday,
    toDate,
    isThisWeek,
  } from "date-fns";

import createTask from "./createtask";

//creating and displaying projects

export default function createUI() {
   
    //DOM elements 

    const addProjectButton = document.querySelector(".create-project");
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
    let element = document.createElement("div");
    const addTaskButton = document.createElement("button");
    const deleteTaskButton = document.querySelector(".delete-button");
    addTaskButton.innerText = "+" ;
    mainPlace.appendChild(element);
    mainPlace.appendChild(addTaskButton);
    addTaskButton.style.visibility = "hidden";
    mainPlace.appendChild(table);
    let currentTask = " ";
    let editing = false;
    const submitButton = document.querySelector(".add");


    /*----Default Projects----- */

    const allTasks = createProjec("All tasks");
    const today = createProjec("today");
    const thisWeek = createProjec("This week");
    const important = createProjec("important");

    const projectArray = [];
    let currentproject = allTasks;

    displayProjects(projectArray);
    displayTasks(currentproject);
    element.innerHTML = "All Tasks";
    addTaskButton.style.visibility = "visible";


    defaultProjects.addEventListener("click", function(e) {
        if (e.target.classList.contains("default-project")) {
          element.innerHTML = " ";
          element.innerHTML = e.target.innerText;
          table.innerHTML = " ";
          addTaskButton.style.visibility = "visible";
          if (e.target.id == "allTasks") {
            displayTasks(allTasks);
          }
          else if  (e.target.id == "today") {
            displayTasks(today);
            addTaskButton.style.visibility = "hidden";
          }
          else if (e.target.id == "thisWeek") {
            displayTasks(thisWeek);
            addTaskButton.style.visibility = "hidden";
          }
          else {
            displayTasks(important);
            addTaskButton.style.visibility = "hidden";
        };
    } })

    /*------------*/


    /*-------Modal Project------ */
    addProjectButton.addEventListener("click", () => {
        modalProject.style.display = "block";
   })

    function  closeForm() {
        modalProject.style.display = "none";
        formProject.reset();
    }
    closeButtonProject.addEventListener("click",closeForm);

    //creats projects when submit form, adding them to project array and displaying them in the page
    modalProject.addEventListener("submit", (e) => {
        e.preventDefault();
        //getting the value from the form for the title
        let projectTitle = document.getElementById("title").value;
        const project = createProjec(projectTitle);
        projectArray.push(project);
        project.id = projectArray.indexOf(project);//fixing the index with id in case removing another project changes it
        displayProjects(projectArray);
        closeForm();
        }
    )
    /*------*/


    /*---projectlisteventlisteners */

    projectList.addEventListener('click', function(e) {
        //when click on the delete button removes the project
        if (e.target.classList.contains("delete_button")) {
          //targeting the project element that contains clicked delete button
          const dataIndex = e.target.parentNode.getAttribute("data-index");
          const targetedproject = projectArray.find(item => item.id == dataIndex);
          const index = projectArray.indexOf(targetedproject);
          if (currentproject == targetedproject) {
            element.innerHTML = " ";
            table.innerHTML = " ";
            element.innerHTML = "All Tasks";
            currentproject = allTasks;
            displayTasks(currentproject);

          }
          projectArray.splice(index,1);
          e.target.parentNode.remove();
        }
    
    //when click on a project displays it's tasks
        else if (e.target.classList.contains("project_element")) {
          const dataIndex = e.target.getAttribute("data-index");
          element.innerHTML = " "
          table.innerHTML = " "
          currentproject = projectArray.find(item => item.id == dataIndex);
          element.innerText = currentproject.title;
          addTaskButton.style.visibility = "visible";
          displayTasks(currentproject);
    } })
    /*----------*/


    /*------Modal Task-------*/
    addTaskButton.addEventListener("click", () => {
        modalTask.style.display = "block";
   })

    function  closeFormTask() {
            modalTask.style.display = "none";
            formTask.reset();
    }

    closeButtonTask.addEventListener("click",closeFormTask);

    //creates a task, and displays it in the projects page when submit the task form
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        //getting the values from the form
        if (editing == false) {
        let taskName = document.getElementById("name").value;
        let taskDescription = document.getElementById("description").value;
        let taskDueDate = document.getElementById("due-date").value;
        let taskImportance = document.querySelector('input[name="importance"]:checked').value;
        const task = createTask(taskName,taskDescription,taskDueDate,taskImportance);
        //adding task to taskarray
        currentproject.addTask(task);
        if (currentproject !==allTasks) {allTasks.addTask(task)};
        let formattedDate = toDate(new Date(taskDueDate));
        if (isToday(formattedDate)) {
            today.addTask(task);
        }
        if (isThisWeek(formattedDate)) {
            thisWeek.addTask(task);
        }
        if (taskImportance == "High" ) {
            important.addTask(task);
        }
        closeFormTask();
        displayTasks(currentproject);
        }})
    /*--------*/


    /*----Pop up form for the task details ----*/
    let pop_up = document.createElement("div");
    pop_up.classList.add = "pop-up";
    mainPlace.appendChild(pop_up);
    pop_up.style.display = "none";
    function openPopUp(currentTask) {
        pop_up.style.display = "block";
        pop_up.innerHTML = `
         <div class="popup">
            <div class="popup__close">X</div>
            <div class="popup__content">
            	<div class="popup title">${currentTask.title}</div>
            	<div class="popup priority"><span>Priority: </span>${currentTask.importance}</div>
            	<div class="popup due"><span>Due Date: </span>${currentTask.dueDate}</div>
            	<div class="popup details"><span>Description: </span>${currentTask.description}</div>
            </div>
        </div>
         `; }

    document.addEventListener("click", function (e) {

        if (e.target.classList.contains("popup__close")) {
            pop_up.style.display = "none";
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


   table.addEventListener("click", (e)=> {
        if (e.target.classList.contains("edit-button")) {
            editing = true;
            modalTask.style.display = "block";
            const dataIndex = e.target.parentNode.parentNode.getAttribute("data-index");
            currentTask = currentproject.taskarray.find(item => item.id == dataIndex);
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

            let beforeEditImportance = currentTask.importance;

            let beforeEditDate = toDate(new Date(currentTask.dueDate));

        submitButton.addEventListener("click", editTaskSave)
        function editTaskSave(){
            currentTask.title = document.getElementById("name").value;
            currentTask.description = document.getElementById("description").value;;
            currentTask.dueDate = document.getElementById("due-date").value;
            currentTask.importance = document.querySelector('input[name="importance"]:checked').value;
            table.rows[dataIndex].cells[1].innerHTML = currentTask.title;
            table.rows[dataIndex].cells[2].innerHTML = currentTask.importance;
            table.rows[dataIndex].cells[3].innerHTML = currentTask.dueDate;

            let currentDate = toDate(new Date(currentTask.dueDate));

            if ((isToday(beforeEditDate)) && (isToday(currentDate)==false)) {
                today.deleteTask(currentTask);
            }

            if ((isThisWeek(beforeEditDate)) && (isThisWeek(currentDate)==false)) {
                thisWeek.deleteTask(currentTask);
            }
            if ((isToday(beforeEditDate)==false) && (isToday(currentDate))) {
                today.addTask(currentTask);
            }

            if ((isThisWeek(beforeEditDate)==false) && (isThisWeek(currentDate))) {
                thisWeek.addTask(currentTask);
            }
            if ((beforeEditImportance == "High") & (currentTask.importance != "High")) {
                important.deleteTask(currentTask);
            }
            if ((beforeEditImportance != "High") & (currentTask.importance == "High")) {
                important.addTask(currentTask);
            }
            
            editing = false;
            closeFormTask();

            if (editing == false) {
                submitButton.removeEventListener("click",biseyler)
            }
        }

        //
}})

/*------------ */


/*-----Delete Task----- */

table.addEventListener("click",(e)=>{
    if (e.target.classList.contains("delete-button")) {
        const dataIndex = e.target.parentNode.parentNode.getAttribute("data-index");
        currentTask = currentproject.taskarray.find(item => item.id == dataIndex);
        currentproject.deleteTask(currentTask);
        allTasks.deleteTask(currentTask);
        today.deleteTask(currentTask);
        thisWeek.deleteTask(currentTask);
        important.deleteTask(currentTask);
        e.target.parentNode.parentNode.remove();}

})
}