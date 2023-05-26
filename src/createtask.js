export default function createTask(title, description, dueDate, importance, project, completed) {
    return{
        title,
        description,
        dueDate,
        importance,
        project,
        completed:false,
    }
}