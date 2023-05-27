let taskId = 0;
let projectId = 4; //because of the default projects 


export default function createProjec(title) {
  let taskarray = [];
  
  // Retrieve stored projectId from local storage
  const storedProjectId = localStorage.getItem("projectId");
  if (storedProjectId) {
    projectId = JSON.parse(storedProjectId)
  } else {
    localStorage.setItem("projectId", JSON.stringify(projectId));
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

  let addTask = function addTask(task) {
    taskarray.push(task);
    console.log("addTaskteki task array", taskarray, id);
    task.id = taskId;
    localStorage.setItem(`taskarray_${title}`, JSON.stringify(taskarray));
  }

  let taskID = function taskID() {
    taskId++;
    localStorage.setItem("taskId", JSON.stringify(taskId));
  }

  function projectID() {
    projectId++
    localStorage.setItem("projectId", JSON.stringify(projectId));
  }

  let deleteTask = function deleteTask(task) {
    const index = taskarray.indexOf(task);
    taskarray.splice(index, 1);
    localStorage.setItem(`taskarray_${title}}`, JSON.stringify(taskarray));
  }

  let loadTaskArray = function loadTaskArray() {
    const storedTaskArray = localStorage.getItem(`taskarray_${id}`);
    if (storedTaskArray) {
      taskarray = JSON.parse(storedTaskArray);
    }
  }

  // Call the loadTaskArray function to retrieve and assign the task array
  loadTaskArray();


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
