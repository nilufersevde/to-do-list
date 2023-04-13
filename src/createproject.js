import createTask from "./createtask";

export default function createProject(title) {
    const taskarray = [];

    function addTask(task){
        taskarray.push(createTask(task));
    }

    function deleteTask(task) {
        const index = taskarray.indexOf(task);
        if (index > -1) {
          taskarray.splice(index, 1);
        }
      }

    return {title,
        taskarray,
        addTask,
        deleteTask
    }
}

