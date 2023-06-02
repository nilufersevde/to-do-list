export default function displayTasks(project) {
    
    let table = document.querySelector("table");
    const storedTaskArray = localStorage.getItem(`taskarray_${project.id}`);
    
    if (storedTaskArray) {
        project.taskarray = JSON.parse(storedTaskArray); 
    }

    for (let i=table.rows.length; i < project.taskarray.length; i++) {
         let row = table.insertRow(i);
         row.setAttribute('data-index', project.taskarray[i].id);
         row.classList.add("row");
        
        let completecheck = row.insertCell(0);
        completecheck.innerHTML = `
        <label for="accept">
            <input type="checkbox" class="check" name="check"></input>
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

         let dueDate = row.insertCell(3);
         dueDate.innerHTML = project.taskarray[i].dueDate;
         dueDate.classList.add("cell")
        

         let details= document.createElement("img");
         details.classList.add("details");
         details.src = "images/file.png" 
         let celldetail = row.insertCell();
         celldetail.appendChild(details);
         celldetail.classList.add("cell")

         let edit = document.createElement("img");
         edit.classList.add("edit-button");
         edit.src = "images/edit.png"
         let celledit = row.insertCell();
         celledit.appendChild(edit);
         celledit.classList.add("cell")

         let deletebutton = document.createElement("img");
         deletebutton.src = "images/bin.png"
         deletebutton.classList.add("delete-button");
         let celldelete = row.insertCell(); 
         celldelete.appendChild(deletebutton);
         celldelete.classList.add("cell")

         //displaying the task according to completed status
         const checkbox = row.querySelector('.check');
         if ( project.taskarray[i].completed == true) {
           checkbox.checked = true;
           title.classList.add('crossed-out', 'slanted');
           row.classList.add("opacity");
         }


        //toggling between checked and not checked 
        const checkboxes = table.querySelectorAll('.check');
        checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function() {

        let title1 = this.closest('.row').querySelector('.tb');
        let row1 =this.closest('.row');

        if (checkbox.checked) {
          title1.classList.add('crossed-out', 'slanted');
          row1.classList.add("opacity");

        } else {
          title1.classList.remove('crossed-out', 'slanted');
          row1.classList.remove("opacity");
          
      }

    });
  });
     } 
    
     ;} 