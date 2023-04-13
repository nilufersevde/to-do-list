import createProject from "./createproject";

export default function defaultprojects() {
    const projectlist = [];

    function addProject(project) {
        projectlist.push(createProject(project))
    }

    function deleteProject(project) {
        const index = projectlist.indexOf(project);
        if (index > -1) {
        projectlist.splice(index, 1);
    }
    }

    return {
        projectlist,
        addProject,
        deleteProject,
    }
}