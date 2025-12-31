const ProjectManager = (function()
{
    const STORAGE_KEY = 'todo-projects';


    /* LOCALE STORAGE */
    let projects = loadProjects();

    function loadProjects()
    {
        const stored = localStorage.getItem(STORAGE_KEY);

        if(stored)
        {
            return JSON.parse(stored); 
        }

        return [ {id: crypto.randomUUID(), title : "Default"}];
    }
    
    function saveProjects()
    {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }

    function addProject(title)
    {
        const project = {
            id : crypto.randomUUID(),
            title
        }

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

    function getProjectById(id) {
        return projects.find(project => project.id === id) || null;
      }

    
    return {addProject, getAllProjects, getInitialProjectId, getProjectById};

})();

export default ProjectManager;