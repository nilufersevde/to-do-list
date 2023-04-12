import createTask from "./createtask";

export default function createProject(title) {
    const taskarray = [];
    function addTask(task){
        taskarr.push.createTask(task);
    }
    return {title,
        taskarray,
        addTask,
    }
}

const project =  createProject(title);
project.addTask("çiş","işicem","2 ocak");
console.log(project)
