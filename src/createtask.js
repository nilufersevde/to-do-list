export default function createTask(title, description, dueDate, importance) {
    function setImportance(importance) {
        this.importance = importance;
    }
    return{
        title,
        description,
        dueDate,
        importance,
        setImportance,
    }
}

