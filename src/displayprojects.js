const projectList = document.querySelector(".project-list");

export default function displayProjects(projectArray) {
    //displays the last element that has added to projectArray
    for (let i=document.querySelectorAll(".project-list div").length; i <projectArray.length; i++) {
        //creating the project element
        let element = document.createElement("div");
        element.innerText = projectArray[i].title;
        element.classList.add("project_element");
        //setting data-index to easily find the element in the projectArray
        element.setAttribute('data-index', projectArray[i].id); //because of the default projects 
        projectList.appendChild(element);
        //adding delete button to project element 
        let deletebutton = document.createElement("img");
        deletebutton.src = "images/bin.png";
        deletebutton.classList.add("delete-button-project");
        element.appendChild(deletebutton);
    }
}

