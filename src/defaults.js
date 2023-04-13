import createProject from "./createproject";

export default function defaultprojects() {
    const defaultproject = [];
    
    defaultproject.push(createProject("All Tasks"));
    defaultproject.push(createProject("Today"));
    defaultproject.push(createProject("This Week"));
    defaultproject.push(createProject("Important"));
}