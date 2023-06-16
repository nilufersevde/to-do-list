let taskId = 0;
let projectId = 4; //because of the default projects 

export default function createProjec(title) {
  let taskarray = [];
  
  // Retrieve stored projectId from local storage
  const storedProjectId = localStorage.getItem("projectId");
  if (storedProjectId) {
    projectId = JSON.parse(storedProjectId)
  } else {
    localStorage.setItem("projectId", JSON.stringify(projectId));//update the projectId in the local storage 
  }
  let id = null;
  // Assign the current projectId and increment it

  if (title=="All tasks") {id=0}
  else if (title=="today") {id=1}
  else if (title=="This week") {id=2}
  else if (title=="important") {id=3}
  else {
  id = projectId;}
  
  localStorage.setItem("projectId", JSON.stringify(projectId));

  // Retrieve stored taskId from local storage
  const storedTaskId = localStorage.getItem("taskId");
  if (storedTaskId) {
    taskId = JSON.parse(storedTaskId);
  } 


  let addTask = function addTask(projectid, task) {
    const storedTaskArray = localStorage.getItem(`taskarray_${projectid}`);
    if (storedTaskArray) {
      taskarray = JSON.parse(storedTaskArray);
    }
    const updatedTaskArray = [...taskarray, task]; // Create a new array by spreading the existing taskarray
    console.log(task.id,"task.id1")
    if (task.id==null) {
      task.id = taskId; //Assign the ID only if it doesn't exist so when we add one task to several projects the id stays the same 
    }
    localStorage.setItem(`taskarray_${projectid}`, JSON.stringify(updatedTaskArray));
  }

  //increasing the taskId when create a new task 
  let taskID = function taskID() {
    taskId++;
    localStorage.setItem("taskId", JSON.stringify(taskId));
  }
   
  //increasing the projectId when create a new project
  function projectID() {
    projectId++
    localStorage.setItem("projectId", JSON.stringify(projectId));
  }

  let deleteTask = function deleteTask(projectid, task) {
    const storedTaskArray = localStorage.getItem(`taskarray_${projectid}`);
    if (storedTaskArray) {
      taskarray = JSON.parse(storedTaskArray);
    }
    const index = taskarray.findIndex(item => item.id === task.id);
      taskarray.splice(index, 1);
      localStorage.setItem(`taskarray_${projectid}`, JSON.stringify(taskarray));
  }

  
  return {
    id,
    title,
    taskarray,
    taskID,
    addTask,
    deleteTask,
    projectID,
  };
}
