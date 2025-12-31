import
{
    format,
    parseISO
}
from "date-fns";

/* TASK ELEMENT */

function createTaskElement(task)
{
    const li = document.createElement("li");
    li.classList.add("list-group");
    li.dataset.id = task.id;

    const taskInfo = createTaskInfo(task);

    const taskDueDate = document.createElement("div");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.textContent = formatDate(task.dueDate);

    const taskPriority = document.createElement("span");
    taskPriority.classList.add("task-priority", task.priority);
    taskPriority.textContent = task.priority;

    const taskActions = createTaskActions();

    li.append(taskInfo, taskDueDate, taskPriority, taskActions);
    return li;
}

/* TASK INFO (CHECKBOX + TITLE) */

function createTaskInfo(task)
{
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const taskCheckbox = document.createElement("button");
    taskCheckbox.classList.add("task-checkbox");

    const taskTitle = document.createElement("p");
    taskTitle.textContent = task.title;

    if (task.completed)
    {
        taskCheckbox.classList.add("checked");
        taskTitle.style.textDecoration = "line-through";
    }
    else
    {
        taskCheckbox.classList.remove("checked");
        taskTitle.style.textDecoration = "none";
    }

    taskInfo.append(taskCheckbox, taskTitle);
    return taskInfo;
}

/* TASK ACTION BUTTONS */

function createTaskActions()
{
    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const editTaskBtn = document.createElement("button");
    const deleteTaskBtn = document.createElement("button");

    editTaskBtn.classList.add("edit-task-btn");
    deleteTaskBtn.classList.add("delete-task-btn");

    editTaskBtn.type = "button";
    deleteTaskBtn.type = "button";

    editTaskBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16V20H8L18.5 9.5C19.1 8.9 19.1 7.9 18.5 7.3L16.7 5.5C16.1 4.9 15.1 4.9 14.5 5.5L4 16Z"
                  stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;

    deleteTaskBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H20" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round"/>
            <path d="M6 7V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V7"
                  stroke="currentColor" stroke-width="2"/>
            <path d="M9 4H15" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round"/>
        </svg>
    `;

    taskActions.append(editTaskBtn, deleteTaskBtn);
    return taskActions;
}

/* DATE FORMATTER */

function formatDate(dateString)
{
    if (!dateString) return "";

    const date = parseISO(dateString);
    return format(date, "dd MMM yyyy");
}

export
{
    createTaskElement
};
