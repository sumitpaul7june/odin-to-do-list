import TaskManager from "./taskManager";
import { createTaskElement } from "./taskRenderer";
import { viewConfig } from "./viewConfig";
import modalController from "./modalController";
import navController from "./navController";
import ProjectManager from "./projectManager";

const displayController = function ()
{
  const addTaskBtn = document.querySelector(".add-task-btn");
  const list = document.querySelector(".list");
  const projectList = document.querySelector(".project-list");
  const mainContainerTitle = document.querySelector(".main-container span");
  const navItems = document.querySelectorAll("nav div");

  const state =
  {
    currentView: "inbox",
    currentProject: null
  };

  /* HELPER FUNCTIONS FOR UI */

  function clearSidebarSelection()
  {
    navItems.forEach(div => div.classList.remove("active"));
    projectList.querySelectorAll("li").forEach(li => li.classList.remove("active"));
  }

  function updateActiveNav(view)
  {
    clearSidebarSelection();
    const activeNav = document.querySelector(`nav .${view}`);
    if (activeNav) activeNav.classList.add("active");
  }

  function updateActiveProject(projectItem)
  {
    clearSidebarSelection();
    projectItem.classList.add("active");
  }

  /* EVENT HANDLERS */

  addTaskBtn.addEventListener("click", () =>
  {
    modalController.openAddTaskModal(state.currentProject);
  });

  projectList.addEventListener("click", (e) =>
  {
    const projectItem = e.target.closest("li");
    if (!projectItem) return;

    state.currentProject = projectItem.dataset.id;

    updateActiveProject(projectItem);
    mainContainerTitle.textContent = projectItem.textContent;

    renderCurrentView();
  });

  list.addEventListener("click", (e) =>
  {
    const taskItem = e.target.closest("li");
    if (!taskItem) return;

    const id = taskItem.dataset.id;

    if (e.target.closest(".delete-task-btn"))
    {
      TaskManager.deleteTask(id);
      renderCurrentView();
      return;
    }

    if (e.target.closest(".task-checkbox"))
    {
      TaskManager.toggleTaskCompleted(id);
      renderCurrentView();
      return;
    }

    if (e.target.closest(".edit-task-btn"))
    {
      modalController.openEditTaskModal(id);
      return;
    }

    modalController.openTaskInfoModal(id);
  });

  /* NAVIGATION */

  navController.setOnViewChange((view) =>
  {
    state.currentView = view;
    state.currentProject = null;

    updateActiveNav(view);
    mainContainerTitle.textContent = viewConfig[view].title;

    renderCurrentView();
  });

  /* RENDERING */

  function renderProjects()
  {
    projectList.innerHTML = "";

    const projects = ProjectManager.getAllProjects();
    projects.forEach(project =>
    {
      const li = document.createElement("li");
      li.textContent = project.title;
      li.dataset.id = project.id;
      projectList.append(li);
    });
  }

  function renderCurrentView()
  {
    renderView(state.currentView);
  }

  function renderView(view)
  {
    let tasks = TaskManager.getAllTasks();
    const filterFn = viewConfig[view]?.filter;
    if (!filterFn) return;

    tasks = tasks.filter(filterFn);

    if (state.currentProject)
    {
      tasks = tasks.filter(task => task.projectId === state.currentProject);
    }

    list.innerHTML = "";
    tasks.forEach(task =>
    {
      list.append(createTaskElement(task));
    });
  }

  /* INITIAL DATA */

  function addInitialTaskIfNeeded()
  {
    const tasks = TaskManager.getAllTasks();
    if (tasks.length > 0) return;

    const projects = ProjectManager.getAllProjects();
    if (!projects.length) return;

    TaskManager.addTask(
      "Welcome Task",
      "This is your first task 🎉",
      "2025-01-15",
      "medium",
      projects[0].id
    );
  }

  modalController.setOnTaskChange(renderCurrentView);
  modalController.setOnProjectChange(renderProjects);

  renderProjects();
  addInitialTaskIfNeeded();
  updateActiveNav("inbox");
  renderCurrentView();
};

export default displayController;
