import TaskManager from "./taskManager";
import {createTaskElement} from "./taskRenderer";

const displayController = function () {
    const dialog = document.querySelector("dialog");
    const addTaskBtn = document.querySelector(".add-task-btn");
    const form = document.querySelector("form");
    const list = document.querySelector('.list');
    const modalHeader = dialog.querySelector('.modal-header');
    const submitBtn = form.querySelector('.add-modal-btn');

    // Form inputs
    const titleInput = form.querySelector('#title');
    const descriptionInput = form.querySelector('#description');
    const dueDateInput = form.querySelector('#due-date');
    const priorityInput = form.querySelector('#priority');
    const projectInput = form.querySelector('#project');

    let editingTaskId = null;


    function openAddModal()
    {
        editingTaskId = null;
        form.reset();
        modalHeader.textContent = 'Add Task';
        submitBtn.textContent = 'Add';
        dialog.showModal();
    }

    function openEditModal(id)
    {
        editingTaskId = id;
        const currentTask = TaskManager.getTaskInfo(id);
        if (!currentTask) return;

        modalHeader.textContent = 'Edit Task';
        submitBtn.textContent = 'Update';

        titleInput.value = currentTask.title;
        descriptionInput.value = currentTask.description;
        dueDateInput.value = currentTask.dueDate;
        priorityInput.value = currentTask.priority;
        projectInput.value = currentTask.project.toLowerCase();
        dialog.showModal();
    }


    function closeModal() 
    {
        editingTaskId = null;
        dialog.close();
        form.reset();
    }

    
    
    
    

    // Add Task 
    addTaskBtn.addEventListener("click", openAddModal);

    list.addEventListener('click', (e) => {
        const currentList = e.target.closest('li');
        if (!currentList) return;

        const id = currentList.dataset.id;

        // Delete a task
        if (e.target.closest('.delete-task-btn')) 
        {
            TaskManager.deleteTask(id);
            renderTasks();
            return;
        }

        // Completing a task
        if (e.target.closest('.task-checkbox')) 
        {
            TaskManager.toggleTaskCompleted(id);
            renderTasks();
            return;
        }

        // Editing a task
        if (e.target.closest('.edit-task-btn')) 
        {
            openEditModal(id);
            return;
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        const project = projectInput.value;

        if (!title || !dueDate || !project) return;

        const updatedValues = 
        {
            title,
            description,
            dueDate,
            priority,
            project
        };

        if (editingTaskId) 
        {
            TaskManager.updateTask(editingTaskId, updatedValues);
            editingTaskId = null;
        } 
        else 
        {
            TaskManager.addTask(title, description, dueDate, priority, project);
        }

        renderTasks();
        closeModal();
    });

    
    form.addEventListener("click", (e) => {
        if (e.target.classList.contains("cancel-modal-btn")) 
        {
            closeModal();
        }
    });

    function renderTasks() {
        const tasks = TaskManager.getAllTasks();
        list.innerHTML = '';

        tasks.forEach(task => 
        {
            const taskElement = createTaskElement(task);
            list.append(taskElement);
        });
    }

    renderTasks();
};

export default displayController;
