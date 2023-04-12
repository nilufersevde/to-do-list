import createTask from "./createtask";

export default function createProject(title) {
    const taskarray = [];

    function addTask(task){
        const newtask = createTask(task)
        taskarray.push(newtask);
    }
    return {title,
        taskarray,
        addTask,
    }
}

