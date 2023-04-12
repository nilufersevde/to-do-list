export default function createTask(title, description, dueDate, importance = "low", completed = "incomplete") {
    function setCompleted(completed) {
        this.completed = completed;
    }
    function setImportance(importance) {
        this.importance = importance;
    }
    return{
        title,
        description,
        completed,
        dueDate,
        importance,
        setCompleted,
        setImportance,
    }
}

