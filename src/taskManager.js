
const TaskManager = (function()
{
    const tasks = 
    [

        {
            id : crypto.randomUUID(),
            title : "Cleaning",
            description : "Clean the house",
            dueDate: "2025-09-14",
            priority : "high",
            project : "Default",
            completed : false

        }
    ];

    function addTask(title, description, dueDate, priority, project)
    {
        tasks.push({id: crypto.randomUUID(), title, description, dueDate, priority, project, completed: false});
    }

    function deleteTask(id)
    {
        const index = tasks.findIndex(task => task.id === id);
        if(index !== -1)
        {
                tasks.splice(index, 1);
        }
    }

    function readTask(id)
    {
        const task = tasks.find(task => task.id === id);
        return task;
        
    }

    function toggleTaskCompleted(id)
    {
        const task = tasks.find(task => task.id === id)
        if(task)
        {
            task.completed = !task.completed;
        }
    }

    function getAllTasks()
    {
        return [...tasks];
    }  

    function getTaskInfo(id)
    {
        const task = tasks.find(task => task.id === id);
        return task;
    }
    
    function updateTask(id, updatedValues)
    {
        const task = tasks.find(task => task.id === id);
        if(!task)
        {
            return;
        }
        Object.assign(task, updatedValues);
    }
    return {addTask, readTask, deleteTask, toggleTaskCompleted, getAllTasks, getTaskInfo, updateTask};

})();

export default TaskManager;