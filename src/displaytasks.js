export default function displayTasks(project) {

     let table = document.querySelector("table");

     for (let i=table.rows.length; i < project.taskarray.length; i++) {
         let row = table.insertRow(i);
         row.setAttribute('data-index', i);
         row.classList.add("row");
        
        let completecheck = row.insertCell(0);
        completecheck.innerHTML = `
        <label for="accept">
            <input type="checkbox" id="check" name="check" value="yes"></input>
        </label>` 

         let title = row.insertCell(1);
         title.innerHTML = project.taskarray[i].title;
         title.classList.add("tb");

         let importance = row.insertCell(2);
         importance.innerHTML = project.taskarray[i].importance;
         importance.classList.add("importance");
         if (project.taskarray[i].importance == "High") {
            importance.classList.add("task-high");
          } else if (project.taskarray[i].importance == "Medium") {
            importance.classList.add("task-medium");
          } else if (project.taskarray[i].importance == "Low") {
            importance.classList.add("task-low");
          }
          console.log(importance.classList)
         

         let dueDate = row.insertCell(3);
         dueDate.innerHTML = project.taskarray[i].dueDate;
        

         let details= document.createElement("button");
         details.innerText = "Details";
         details.classList.add("details");
         let celldetail = row.insertCell();
         celldetail.appendChild(details);

         let edit = document.createElement("button");
         edit.innerText = "edit";
         edit.classList.add("edit-button");
         let celledit = row.insertCell();
         celledit.appendChild(edit);

         let deletebutton = document.createElement("button");
         deletebutton.innerText = "X";
         deletebutton.classList.add("delete-button");
         let celldelete = row.insertCell(); 
         celldelete.appendChild(deletebutton);
     } } 