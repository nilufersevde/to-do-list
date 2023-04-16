export default function createTaskUI(project) {
     const modalTask = document.querySelector(".modal-task");
     const mainPlace = document.querySelector(".main-place");
     const addTaskButton = document.createElement("button");
     const formTask = document.querySelector(".form-task");
     const table = document.createElement("table");
     mainPlace.appendChild(table);


     function displayTasks(project) {
     for (let i=table.rows.length; i <project.taskarray.length; i++) {
         let row = table.insertRow(i);
         row.setAttribute('data-index', i);
         row.classList.add("row");
         let statusbutton = document.createElement("button");
         let cell = row.insertCell(0);
         cell.appendChild(statusbutton);
         statusbutton.addEventListener("click", status);
         function status() {
             this.classList.toggle("comnpleted");
             this.classList.toggle("not_completed");
         }
         let title = row.insertCell(1);
         title.innerHTML = project.taskarray[i].title;
         title.classList.add("tb");
         let importance = row.insertCell(2);
         importance.innerHTML = project.taskarray[i].importance;
         importance.classList.add("tb")
         let dueDate = row.insertCell(3);
         dueDate.innerHTML = project.taskarray[i].dueDate;
         dueDate.classList.add("tb")
         
         //creating the delete button 
         let deletebutton = document.createElement("button");
         deletebutton.innerText = "X";
         deletebutton.classList.add("delete_button");
         let cell2 = row.insertCell(4);
         cell2.appendChild(deletebutton);
     } } 

     displayTasks(project);

     addTaskButton.innerText = "+" ;
     mainPlace.appendChild(addTaskButton);
  
     addTaskButton.addEventListener("click", () => {
         modalTask.style.visibility = "visible";
    })

     function  closeForm() {
         modalTask.style.visibility = "hidden";
         formTask.reset();
     }
     closeButton.addEventListener("click",closeForm);
  
     modalTask.addEventListener("submit", (e) => {
      e.preventDefault();
      //getting the values from the form
      let taskName = document.getElementById("name").value;
      let taskDescription = document.getElementById("description").value;
      let taskDueDate = document.getElementById("due-date").value;
      let taskImportance = document.getElementById("importance").value;
      //adding task to taskarray
      project.addTask(taskName,taskDescription,taskDueDate,taskImportance);
      console.log(project.taskarray)
      closeForm();
      displayTasks(project);
      }
  )}
