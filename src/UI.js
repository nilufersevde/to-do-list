import createProjec from "./createproject";
import displayTasks from "./displaytasks";
import displayProjects from "./displayprojects";
import {
    isToday,
    toDate,
    isThisWeek,
    isBefore,
    endOfToday,
    add,
    format,
  } from "date-fns";

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
    addTaskButton.innerText = "+" ;
    mainPlace.appendChild(element);
    mainPlace.appendChild(addTaskButton);
    addTaskButton.style.visibility = "hidden";
    mainPlace.appendChild(table);
    let currentTask = " ";


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
          }
          else if (e.target.id == "thisWeek") {
            displayTasks(thisWeek);
          }
          else {
            displayTasks(important);
        };
    } })

    /*------------*/


    /*-------Modal Project------ */
    addProjectButton.addEventListener("click", () => {
        modalProject.style.visibility = "visible";
   })

    function  closeForm() {
        modalProject.style.visibility = "hidden";
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
          const targetelement = e.target.parentNode;
          const dataIndex = targetelement.getAttribute("data-index");
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
          targetelement.remove();
        }
    
    //when click on a project displays it's tasks
        else if (e.target.classList.contains("project_element")) {
          const dataIndex = e.target.getAttribute("data-index");
          element.innerHTML = " "
          table.innerHTML = " "
          currentproject = projectArray.find(item => item.id == dataIndex);
          console.log(currentproject);
          element.innerText = currentproject.title;
          addTaskButton.style.visibility = "visible";
          displayTasks(currentproject);
    } })
    /*----------*/


    /*------Modal Task-------*/
    addTaskButton.addEventListener("click", () => {
        modalTask.style.visibility = "visible";
   })

    function  closeFormTask() {
            modalTask.style.visibility = "hidden";
            formTask.reset();
    }

    closeButtonTask.addEventListener("click",closeFormTask);

    //creates a task, and displays it in the projects page when submit the task form
    modalTask.addEventListener("submit", (e) => {
            e.preventDefault();
        //getting the values from the form
        let taskName = document.getElementById("name").value;
        let taskDescription = document.getElementById("description").value;
        let taskDueDate = document.getElementById("due-date").value;
        let taskImportance = document.querySelector('input[name="importance"]:checked').value;
        //adding task to taskarray
        currentproject.addTask(taskName,taskDescription,taskDueDate,taskImportance);
        if (currentproject !==allTasks) {allTasks.addTask(taskName,taskDescription,taskDueDate,taskImportance)};
        let formattedDate = toDate(new Date(taskDueDate));
        console.log(formattedDate);
        console.log(isThisWeek(formattedDate));
        if (isToday(formattedDate)) {
            thisWeek.addTask(taskName,taskDescription,taskDueDate,taskImportance);
        }
        if (isThisWeek(formattedDate)) {
            today.addTask(taskName,taskDescription,taskDueDate,taskImportance);
        }
        console.log(thisWeek.taskarray);
        closeFormTask();
        displayTasks(currentproject);
        }
    )
    /*--------*/


    /*----Pop up form for the task details ----*/
    let pop_up = document.createElement("div");
    pop_up.classList.add = "pop-up";
    mainPlace.appendChild(pop_up);
    pop_up.style.visibility = "hidden";
    function openPopUp(currentTask) {
        pop_up.style.visibility = "visible";
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
            pop_up.style.visibility = "hidden";
          }
    })

    table.addEventListener("click", function (e) {

            if (e.target.classList.contains("details")) {
              const targetelement = e.target.parentNode.parentNode;
              const dataIndex = targetelement.getAttribute("data-index");
              currentTask = currentproject.taskarray[dataIndex];
              openPopUp(currentTask);
            }
    })
   /*------------------*/    
}