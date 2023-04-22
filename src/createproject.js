export default function createProjec(title) {
    const taskarray = [];

    function addTask(task){
        taskarray.push(task);
        task.id = taskarray.indexOf(task);
    }

    function deleteTask(task){
      const index = taskarray.indexOf(task);
      taskarray.splice(index,1);

    }

    return {title,
        taskarray,
        addTask,
        deleteTask,
    }
}

