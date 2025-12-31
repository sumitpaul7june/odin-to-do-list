import ProjectManager from "./projectManager";
import TaskManager from "./taskManager";

const modalController = (function ()
{
  /* TASK MODAL DOM */

  const taskDialog = document.querySelector(".modal.add-task");
  const taskForm = taskDialog.querySelector("form");

  const taskHeader = taskDialog.querySelector(".modal-header");
  const taskSubmitBtn = taskForm.querySelector(".add-modal-btn");

  const titleInput = taskForm.querySelector("#title");
  const descriptionInput = taskForm.querySelector("#description");
  const dueDateInput = taskForm.querySelector("#due-date");
  const priorityInput = taskForm.querySelector("#priority");
  const projectSelect = taskForm.querySelector("#task-project");

  /* PROJECT MODAL DOM */

  const projectDialog = document.querySelector(".modal.add-project");
  const addProjectBtn = document.querySelector(".add-project-btn");
  const projectForm = projectDialog.querySelector("form");
  const projectInput = projectForm.querySelector("#new-project-name");

  /* INTERNAL STATE */

  let editingTaskId = null;
  let onTaskChange = null;
  let onProjectChange = null;

  /* CALLBACK SETTERS */

  function setOnTaskChange(callback)
  {
    onTaskChange = callback;
  }

  function setOnProjectChange(callback)
  {
    onProjectChange = callback;
  }

  /* PROJECT SELECT DROPDOWN IN TASK MODAL  */

  function addProjectSelect(currentProjectId = null)
  {
    const projects = ProjectManager.getAllProjects();
    projectSelect.innerHTML = "";

    projects.forEach(project =>
    {
      const option = document.createElement("option");
      option.value = project.id;
      option.textContent = project.title;

      if (project.id === currentProjectId)
      {
        option.selected = true;
      }

      projectSelect.append(option);
    });
  }

  /* TASK MODAL ACTIONS */

  function openAddTaskModal(currentProjectId = null)
  {
    editingTaskId = null;
    taskForm.reset();

    addProjectSelect(currentProjectId);

    taskHeader.textContent = "Add Task";
    taskSubmitBtn.textContent = "Add";
    taskDialog.showModal();
  }

  function openEditTaskModal(id)
  {
    editingTaskId = id;
    const task = TaskManager.getTaskInfo(id);
    if (!task) return;

    addProjectSelect(task.projectId);

    taskHeader.textContent = "Edit Task";
    taskSubmitBtn.textContent = "Update";

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    dueDateInput.value = task.dueDate;
    priorityInput.value = task.priority;

    taskDialog.showModal();
  }

  taskForm.addEventListener("submit", (e) =>
  {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) return;

    const taskData =
    {
      title,
      description: descriptionInput.value.trim(),
      dueDate: dueDateInput.value,
      priority: priorityInput.value,
      projectId: projectSelect.value
    };

    if (editingTaskId)
    {
      TaskManager.updateTask(editingTaskId, taskData);
    }
    else
    {
      TaskManager.addTask(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority,
        taskData.projectId
      );
    }

    taskDialog.close();
    if (onTaskChange) onTaskChange();
  });

  taskForm.addEventListener("click", (e) =>
  {
    if (e.target.classList.contains("cancel-modal-btn"))
    {
      taskDialog.close();
    }
  });

  /* PROJECT MODAL ACTIONS */

  function openProjectModal()
  {
    projectForm.reset();
    projectDialog.showModal();
  }

  addProjectBtn.addEventListener("click", openProjectModal);

  projectForm.addEventListener("submit", (e) =>
  {
    e.preventDefault();

    const projectTitle = projectInput.value.trim();
    if (!projectTitle) return;

    ProjectManager.addProject(projectTitle);

    addProjectSelect();
    projectDialog.close();

    if (onProjectChange) onProjectChange();
  });

  projectForm.addEventListener("click", (e) =>
  {
    if (e.target.classList.contains("cancel-modal-btn"))
    {
      projectDialog.close();
    }
  });

  /*  INFO MODAL */

  const infoDialog = document.querySelector(".task-info-modal");
  const infoTitle = infoDialog.querySelector("#info-title");
  const infoDescription = infoDialog.querySelector("#info-description");
  const infoDate = infoDialog.querySelector("#info-date");
  const infoPriority = infoDialog.querySelector("#info-priority");
  const infoProject = infoDialog.querySelector("#info-project");

  const closeInfoBtn = infoDialog.querySelector(".close-info-btn");

  function openTaskInfoModal(taskId)
  {
    const task = TaskManager.getTaskInfo(taskId);
    if (!task) return;

    const project = ProjectManager.getProjectById(task.projectId);

    const formattedPriority =
      task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    infoTitle.textContent = task.title;
    infoDescription.textContent = task.description || "—";
    infoDate.textContent = task.dueDate || "—";
    infoPriority.textContent = formattedPriority;
    infoProject.textContent = project?.title || "—";

    infoDialog.showModal();
  }

  closeInfoBtn.addEventListener("click", () =>
  {
    infoDialog.close();
  });

  /* PUBLIC API */

  return {
    openAddTaskModal,
    openEditTaskModal,
    setOnTaskChange,
    setOnProjectChange,
    openTaskInfoModal
  };

})();

export default modalController;
