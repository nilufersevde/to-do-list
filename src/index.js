import createProjec from "./createproject";

//creating and displaying projects
export default function createProjectUI() {

    const addProjectButton = document.querySelector(".create-project");
    const modalProject = document.querySelector(".modal-project");
    const projectList = document.querySelector(".project-list");
    const closeButton = document.querySelector(".close-modal");
    const mainPlace = document.querySelector(".main-place")
    //creating array for adding new projects
    const projectArray = [];

    function  closeForm() {
        modalProject.style.visibility = "hidden";
        form.reset();
    }
    
    function openForm() {
        modalProject.style.visibility = "visible";
    }
    
    function displayProjects() {
        //displays the last element that has added to projectArray
        for (let i=document.querySelectorAll(".project-list li").length; i <projectArray.length; i++) {
            //creating the project element
            let element = document.createElement("div");
            element.innerText = projectArray[i].title;
            element.classList.add("project_element");
            //setting data-index to easily find the element in the projectArray
            element.setAttribute('data-index', i);
            projectList.appendChild(element);
            //adding delete button to project element 
            let deletebutton = document.createElement("button");
            deletebutton.innerText = "X";
            deletebutton.classList.add("delete_button");
            element.appendChild(deletebutton);
        }
    }

    projectList.addEventListener('click', function openProjectPage(e) {
        if (e.target.classList.contains("project_element")) {
          const targetelement = e.target;
          const index = targetelement.getAttribute("data-index");
          let element = document.createElement("div");
          let project = projectArray[index];
          element.innerText =project.title;
          mainPlace.appendChild(element);

    } } ) 

    projectList.addEventListener('click', function removeBook(e) {
        if (e.target.classList.contains("delete_button")) {
          //targeting the project element that contains clicked delete button
          const targetelement = e.target.parentNode.parentNode;
          targetelement.remove();
          const index = targetelement.getAttribute("data-index");
          //deleting element from projectArray
          projectArray.splice(index,1);
        }
    })

    addProjectButton.addEventListener("click",openForm);

    closeButton.addEventListener("click",closeForm);

    modalProject.addEventListener("submit", (e) => {
        e.preventDefault();
        //getting the value from the form for the title
        let projectTitle = document.getElementById("title").value;
        const project = createProjec(projectTitle);
        projectArray.push(project);
        displayProjects();
        }
    )
}

createProjectUI();





