// ===== STORAGE =====
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== ADD TASK =====
function addTask() {
  const input = document.getElementById("taskInput");
  const date = document.getElementById("taskDate");
  const time = document.getElementById("taskTime");

  if (!input.value || !date.value || !time.value) {
    alert("Please fill all fields");
    return;
  }

  const tasks = getTasks();

  tasks.push({
    text: input.value,
    date: date.value,
    time: time.value,
    completed: false   // ✅ NEW
  });

  saveTasks(tasks);

  input.value = "";
  date.value = "";
  time.value = "";

  loadTasks();
}

// ===== DELETE TASK =====
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
  loadTodayTasks();
}

// ===== TOGGLE COMPLETE =====
function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
  loadTodayTasks();
}

// ===== FORMAT TIME =====
function formatTime(time) {
  let [hour, min] = time.split(":");
  hour = parseInt(hour);

  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour}:${min} ${ampm}`;
}

// ===== LOAD ALL TASKS =====
function loadTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  let tasks = getTasks();

  // Sort by date + time
  tasks.sort((a, b) => {
    return new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
  });

  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li class="${task.completed ? 'completed' : ''}">
        <input type="checkbox" 
          ${task.completed ? "checked" : ""} 
          onclick="toggleComplete(${index})">

        <span>${task.text}</span>
        <span>${task.date} | ${formatTime(task.time)}</span>

        <button onclick="deleteTask(${index})">Delete</button>
      </li>
    `;
  });
}

// ===== TODAY TASKS =====
function loadTodayTasks() {
  const todayList = document.getElementById("todayTasks");
  if (!todayList) return;

  const today = new Date().toISOString().split("T")[0];
  let tasks = getTasks();

  // Keep original index for toggle
  tasks = tasks.map((task, index) => ({ ...task, index }));

  tasks = tasks.filter(task => task.date === today);

  tasks.sort((a, b) => a.time.localeCompare(b.time));

  todayList.innerHTML = "";

  tasks.forEach(task => {
    todayList.innerHTML += `
      <li class="${task.completed ? 'completed' : ''}">
        <input type="checkbox"
          ${task.completed ? "checked" : ""}
          onclick="toggleComplete(${task.index})">

        ${task.text} - ${formatTime(task.time)}
      </li>
    `;
  });
}

// ===== CALENDAR =====
const calendarDates = document.getElementById("calendarDates");
const monthYear = document.getElementById("monthYear");

if (calendarDates) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  monthYear.innerText = date.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  for (let i = 0; i < firstDay; i++) {
    calendarDates.innerHTML += `<div></div>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    calendarDates.innerHTML += `<div>${i}</div>`;
  }
}

// ===== INIT =====
loadTasks();
loadTodayTasks();