import createProjec from "./createproject";

//creating and displaying projects
export default function createProjectUI() {

    const addProjectButton = document.querySelector(".create-project");
    const modalProject = document.querySelector(".modal-project");
    const projectList = document.querySelector(".project-list");
    const closeButton = document.querySelector(".close-modal");
    //creating array for adding new projects
    const projectArray = [];

    function  closeForm() {
        modalProject.style.visibility = "hidden";
        form.reset();
    }
    
    function openForm() {
        modalProject.style.visibility = "visible";
    }
    
    function displayProject() {
        //displays the last element that has added to projectArray
        for (let i=document.querySelectorAll(".project-list li").length; i <projectArray.length; i++) {
            //creating the project element
            let element = document.createElement("div");
            //setting data-index to delete element from projectArray
            element.setAttribute('data-index', i);
            element.innerText = projectArray[i].title;
            projectList.appendChild(element);
            //adding button to project element 
            let deletebutton = document.createElement("button");
            deletebutton.innerText = "X";
            //adding class name to check if the delete button was clicked
            deletebutton.classList.add("delete_button");
            element.appendChild(deletebutton);
        }
    }
    
    projectList.addEventListener('click', function removeBook(e) {
        if (e.target.classList.contains("delete_button")) {
          //deleting project element from the page
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
        displayProject();
        }
    )
}

createProjectUI();