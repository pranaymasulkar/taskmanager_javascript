// =======================================================================
// Constants
// =======================================================================
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskModal = document.querySelector("#taskModal");
const submitBtn = document.querySelector("#submitBtn");
const closeModal = document.querySelector("#closeModal");
const taskTitle = document.querySelector("#taskTitle");
const taskCategory = document.querySelector("#taskCategory");
const noTask = document.querySelector("#noTask");

let taskForm = document.querySelector("#taskForm");
let editTaskId = null;

// =======================================================================
// Task Creation Modal Open Close
// =======================================================================
taskModal.style.display = "none";
addTaskBtn.addEventListener("click", () => {
  taskModal.style.display = "flex";
});
closeModal.addEventListener("click", () => {
  taskModal.style.display = "none";
  taskForm.reset();
});
// =======================================================================
// Task Creation (Add Task)
// =======================================================================

const taskData = JSON.parse(localStorage.getItem("task")) || [];

function noTaskFound() {
  noTask.textContent = "No Task Found. Please Add a Task.";
  noTask.style.display = taskData.length === 0 ? "block" : "none";
}

console.log(taskData);

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = e.target.elements.taskTitle.value;
  let category = e.target.elements.taskCategory.value;

  let newTask = {
    id: Date.now(),
    title,
    category,
    status: false,
  };

  if (editTaskId === null) {
    taskData.push(newTask);
  } else {
    const task = taskData.find((elem) => elem.id === editTaskId);
    task.title = title;
    task.category = category;
  }

  localStorage.setItem("task", JSON.stringify(taskData));
  taskModal.style.display = "none";
  editTaskId = null;
  submitBtn.textContent = "Add Task";
  taskForm.reset();
  UI();
  noTaskFound();
});

// =======================================================================
// Card UI
// =======================================================================

const CARD_SECTION = document.querySelector("#card-section");

const UI = () => {
  CARD_SECTION.innerHTML = "";
  taskData.forEach((elem) => {
    const CARD = document.createElement("div");

    const CARD_HEAD = document.createElement("div");

    const CARD_TITLE = document.createElement("h3");
    const CARD_TITLE_TEXT = document.createTextNode(elem.title);

    const CARD_CAT = document.createElement("p");
    const CARD_CAT_TITLE = document.createTextNode(elem.category);

    const CARD_FOOT = document.createElement("div");

    const DEL_BTN = document.createElement("button");
    const EDIT_BTN = document.createElement("button");
    const STATUS_CARD = document.createElement("h2");

    const STATUS_CHECK = document.createElement("input");
    STATUS_CHECK.type = "checkbox";
    STATUS_CHECK.classList.add("task-status");
    STATUS_CHECK.dataset.id = elem.id;
    STATUS_CHECK.checked = elem.status;

    CARD.classList.add("task-card");
    CARD_HEAD.classList.add("card-head");
    CARD_FOOT.classList.add("card-foot");
    CARD_TITLE.classList.add("task-title");
    CARD_CAT.classList.add("task-cat");

    DEL_BTN.classList.add("del-btn");
    EDIT_BTN.classList.add("edit-btn");

    DEL_BTN.textContent = "Delete";
    EDIT_BTN.textContent = "Edit";

    CARD_SECTION.append(CARD);
    CARD.append(STATUS_CHECK, CARD_HEAD, CARD_FOOT);
    CARD_HEAD.append(CARD_CAT, CARD_TITLE);

    CARD_TITLE.append(CARD_TITLE_TEXT);
    CARD_CAT.append(CARD_CAT_TITLE);

    CARD_FOOT.append(DEL_BTN, EDIT_BTN, STATUS_CARD);

    DEL_BTN.dataset.id = elem.id;
    EDIT_BTN.dataset.id = elem.id;

    STATUS_CHECK.dataset.id = elem.id;

    STATUS_CARD.classList.add("status");
    STATUS_CARD.style.display = "none";
    STATUS_CARD.textContent = "Task Completed";

    if (elem.status) {
      CARD.classList.add("completed");
      DEL_BTN.remove();
      EDIT_BTN.remove();
      STATUS_CARD.style.display = "block";
    }
  });
};

// =======================================================================
// Card Edit
// =======================================================================

CARD_SECTION.addEventListener("click", (e) => {});

// =======================================================================
// Card Edit Delete
// =======================================================================

CARD_SECTION.addEventListener("click", (e) => {
  //Edit Btn Find

  if (e.target.classList.contains("edit-btn")) {
    const id = Number(e.target.dataset.id);
    editTaskId = id;
    const editTask = taskData.find((item) => item.id === id);

    taskTitle.value = editTask.title;
    taskCategory.value = editTask.category;
    submitBtn.innerHTML = "Update Task";
    taskModal.style.display = "flex";
  }

  // Delete Btn Find

  if (e.target.classList.contains("del-btn")) {
    const id = Number(e.target.dataset.id);
    // console.log(id);
    const taskIndex = taskData.findIndex((elem) => elem.id === id);
    taskData.splice(taskIndex, 1);

    localStorage.setItem("task", JSON.stringify(taskData));
    console.log(taskData);
    UI();
    noTaskFound();
  }

  // Status Check

  if (e.target.classList.contains("task-status")) {
    const id = Number(e.target.dataset.id);

    const task = taskData.find((item) => item.id === id);

    task.status = e.target.checked;

    localStorage.setItem("task", JSON.stringify(taskData));

    UI();
  }
});

// =======================================================================
// CArd UI
// =======================================================================
UI();
noTaskFound();
