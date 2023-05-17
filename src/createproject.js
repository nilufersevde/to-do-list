let newId = 0;

export default function createProjec(title) {
    const taskarray = [];
    
    
    
    function addTask(task){
        taskarray.push(task);
        task.id = newId;
       
    }

    function taskID(task) {
        newId++
    }

    function deleteTask(task){
      const index = taskarray.indexOf(task);
      taskarray.splice(index,1);

    }

    return {title,
        taskarray,
        taskID,
        addTask,
        deleteTask,
    }
}

