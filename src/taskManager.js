
const TaskManager = (function()
{
    /* LOCALE STORAGE */
    const TASK_KEY = "todo-tasks";

    let tasks = loadTasks();

    function loadTasks()
    {
        const stored = localStorage.getItem(TASK_KEY);

        if(stored)
        {
            return JSON.parse(stored);
        }

        return [];
    }

    function saveTasks()
    {
        localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
    }



    function addTask(title, description, dueDate, priority, projectId)
    {
        tasks.push({id: crypto.randomUUID(), title, description, dueDate, priority, projectId, completed: false});
        saveTasks();

    }

    function deleteTask(id)
    {
        const index = tasks.findIndex(task => task.id === id);
        if(index !== -1)
        {
                tasks.splice(index, 1);
        }
        saveTasks();
    }

    

    function toggleTaskCompleted(id)
    {
        const task = tasks.find(task => task.id === id)
        if(task)
        {
            task.completed = !task.completed;
        }
        saveTasks();
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
        saveTasks();
    }


    return {addTask, deleteTask, toggleTaskCompleted, getAllTasks, getTaskInfo, updateTask};

})();

export default TaskManager;