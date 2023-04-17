export default function displayTasks(project) {

     let table = document.querySelector("table");

     for (let i=table.rows.length; i < project.taskarray.length; i++) {
         let row = table.insertRow(i);
         row.setAttribute('data-index', i);
         console.log(row.getAttribute("data-index"));
         row.classList.add("row");
         let title = row.insertCell(0);
         title.innerHTML = project.taskarray[i].title;
         console.log(title.innerHTML);
         title.classList.add("tb");
         let importance = row.insertCell(1);
         importance.innerHTML = project.taskarray[i].importance;
         importance.classList.add("tb")
         let dueDate = row.insertCell(2);
         dueDate.innerHTML = project.taskarray[i].dueDate;
         dueDate.classList.add("tb")
         let deletebutton = document.createElement("button");
         deletebutton.innerText = "X";
         deletebutton.classList.add("delete_button");
         let cell2 = row.insertCell(3);
         cell2.appendChild(deletebutton);
         console.log(table.innerHTML);
         
     } } 