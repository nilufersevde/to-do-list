import createTask from "./createtask";

export default function createProjec(title) {
    const taskarray = [];

    function addTask(title, description, dueDate, importance){
        taskarray.push(createTask(title, description, dueDate, importance));
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
        deleteTask,
    }
}

