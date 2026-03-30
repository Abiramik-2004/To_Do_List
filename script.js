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
// ===== GLOBAL DATE CONTROL =====
let currentDate = new Date();
let selectedDate = new Date().toISOString().split("T")[0];

// ===== LOAD CALENDAR =====
function loadCalendar() {
  const calendarDates = document.getElementById("calendarDates");
  const monthYear = document.getElementById("monthYear");

  if (!calendarDates) return;

  calendarDates.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  monthYear.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  // empty slots
  for (let i = 0; i < firstDay; i++) {
    calendarDates.innerHTML += `<div></div>`;
  }

  for (let i = 1; i <= totalDays; i++) {

    let fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

    let isActive = fullDate === selectedDate ? "active" : "";

    calendarDates.innerHTML += `
      <div class="${isActive}" onclick="selectDate('${fullDate}')">
        ${i}
      </div>
    `;
  }
}

// ===== SELECT DATE =====
function selectDate(date) {
  selectedDate = date;
  loadCalendar();
  loadTasksByDate();
}

// ===== NEXT / PREVIOUS MONTH =====
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadCalendar();
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadCalendar();
}

// ===== LOAD TASKS BY SELECTED DATE =====
function loadTasksByDate() {
  const list = document.getElementById("todayTasks");
  if (!list) return;

  let tasks = getTasks();

  tasks = tasks.map((task, index) => ({ ...task, index }));

  tasks = tasks.filter(task => task.date === selectedDate);

  tasks.sort((a, b) => a.time.localeCompare(b.time));

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<li>No tasks for this date</li>";
    return;
  }

  tasks.forEach(task => {
    list.innerHTML += `
      <li class="${task.completed ? 'completed' : ''}">
        <input type="checkbox"
          ${task.completed ? "checked" : ""}
          onclick="toggleComplete(${task.index})">

        ${task.text} - ${formatTime(task.time)}
      </li>
    `;
  });
}

// ===== INIT UPDATE =====
loadTasks();
loadCalendar();
loadTasksByDate();

