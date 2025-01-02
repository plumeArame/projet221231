// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearAllButton = document.getElementById('clearAllButton');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

// Load tasks from localStorage on page load
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task));
  updateCounters();
};

// Add a new task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = { text: taskText, completed: false };
    renderTask(task);
    saveTask(task);
    taskInput.value = '';
    updateCounters();
  }
});

// Render a single task
function renderTask(task) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.completed) li.classList.add('completed');
  
  // Mark as completed
  li.addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    updateTaskInStorage(task.text, task.completed);
    updateCounters();
  });

  // Remove task
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', () => {
    li.remove();
    removeTaskFromStorage(task.text);
    updateCounters();
  });

  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in localStorage
function updateTaskInStorage(taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex(task => task.text === taskText);
  if (taskIndex > -1) tasks[taskIndex].completed = completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Clear all tasks
clearAllButton.addEventListener('click', () => {
  localStorage.removeItem('tasks');
  taskList.innerHTML = '';
  updateCounters();
});

// Update task counters
function updateCounters() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(task => task.completed).length;
}