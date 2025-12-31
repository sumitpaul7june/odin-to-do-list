const ProjectManager = (function ()
{
    const STORAGE_KEY = "todo-projects";

    /* INTERNAL STATE */

    let projects = loadProjects();

    /* LOCALE STORAGE */

    function loadProjects()
    {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored)
        {
            return JSON.parse(stored);
        }

        return [
            {
                id: crypto.randomUUID(),
                title: "Default"
            }
        ];
    }

    function saveProjects()
    {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    /* PROJECT ACTIONS */

    function addProject(title)
    {
        const project =
        {
            id: crypto.randomUUID(),
            title
        };

        projects.push(project);
        saveProjects();
    }

    function getAllProjects()
    {
        return [...projects];
    }

    function getInitialProjectId()
    {
        return projects[0].id;
    }

    function getProjectById(id)
    {
        return projects.find(project => project.id === id) || null;
    }

    /* PUBLIC API */

    return { addProject, getAllProjects, getInitialProjectId, getProjectById};

})();

export default ProjectManager;
