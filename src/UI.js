import createProjec from "./createproject";
import displayTasks from "./displaytasks";
import displayProjects from "./displayprojects";

//creating and displaying projects
export default function createUI() {

    const addProjectButton = document.querySelector(".create-project");
    const modalProject = document.querySelector(".modal-project");
    const projectList = document.querySelector(".project-list");
    const closeButtonTask = document.querySelector(".close-modal-task");
    const closeButtonProject = document.querySelector(".close-modal-project");
    const mainPlace = document.querySelector(".main-place");
    const formProject = document.querySelector(".form-project");
    const modalTask = document.querySelector(".modal-task");
    const formTask = document.querySelector(".form-task");
    let table = document.querySelector("table");
    let element = document.createElement("div");
    const addTaskButton = document.createElement("button");
    addTaskButton.innerText = "+" ;
    mainPlace.appendChild(element);
    mainPlace.appendChild(addTaskButton);
    addTaskButton.style.visibility = "hidden";
    mainPlace.appendChild(table);
    const projectArray = [];
    let currentproject = " ";

    displayProjects(projectArray);

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
        displayProjects(projectArray);
        closeForm();
        }
    )

    //when click on the delete button removes the project
    projectList.addEventListener('click', function removeProject(e) {
        if (e.target.classList.contains("delete_button")) {
          //targeting the project element that contains clicked delete button
          const targetelement = e.target.parentNode;
          targetelement.remove();
          const index = targetelement.getAttribute("data-index");
          //deleting element from projectArray
          projectArray.splice(index,1);
        }
    })

    //when click on a project displays it's tasks
    projectList.addEventListener('click', function openProjectPage(e) {
        if (e.target.classList.contains("project_element")) {
          //mainPlace.innerText = " ";
          const targetelement = e.target;
          const index = targetelement.getAttribute("data-index");
          element.innerHTML = " "
          table.innerHTML = " "
          currentproject = projectArray[index];
          element.innerText =currentproject.title;
          projectpage(currentproject)
    } } ) 

    function projectpage(project) {
        addTaskButton.style.visibility = "visible";
        displayTasks(project);
        mainPlace.appendChild(addTaskButton);
        addTaskButton.addEventListener("click", () => {
            modalTask.style.visibility = "visible";
       })

    closeButtonTask.addEventListener("click",closeFormTask); }

    function  closeFormTask() {
            modalTask.style.visibility = "hidden";
            formTask.reset();
    }

    //creates a task, and displays it in the projects page when submit the task form
    modalTask.addEventListener("submit", (e) => {
            e.preventDefault();
          //getting the values from the form
          let taskName = document.getElementById("name").value;
          let taskDescription = document.getElementById("description").value;
          let taskDueDate = document.getElementById("due-date").value;
          let taskImportance = document.getElementById("importance").value;
          //adding task to taskarray
          currentproject.addTask(taskName,taskDescription,taskDueDate,taskImportance);
          closeFormTask();
          displayTasks(currentproject);
         }
     )
}