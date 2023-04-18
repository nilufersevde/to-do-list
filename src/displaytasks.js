export default function displayTasks(project) {

     let table = document.querySelector("table");
     const mainPlace = document.querySelector(".main-place");

     for (let i=table.rows.length; i < project.taskarray.length; i++) {
         let row = table.insertRow(i);
         row.setAttribute('data-index', i);
         row.classList.add("row");

         let statusbutton = document.createElement("button");
         statusbutton.innerText = "X";
         statusbutton.classList.add("delete-button");
         let cellstatus = row.insertCell(0); 
         cellstatus.appendChild(statusbutton);

         let title = row.insertCell(1);
         title.innerHTML = project.taskarray[i].title;
         title.classList.add("tb");

         let importance = row.insertCell(2);
         importance.innerHTML = project.taskarray[i].importance;
         importance.classList.add("tb");

         let dueDate = row.insertCell(3);
         dueDate.innerHTML = project.taskarray[i].dueDate;
         dueDate.classList.add("tb") 

         let details= document.createElement("button");
         details.innerText = "Details";
         details.classList.add("details");
         let celldetail = row.insertCell();
         celldetail.appendChild(details);

         let edit = document.createElement("button");
         edit.innerText = "edit";
         edit.classList.add("edit");
         let celledit = row.insertCell();
         celledit.appendChild(edit);

         let deletebutton = document.createElement("button");
         deletebutton.innerText = "X";
         deletebutton.classList.add("delete-button");
         let celldelete = row.insertCell(); 
         celldelete.appendChild(deletebutton);
     } } 