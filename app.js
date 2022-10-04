// Definitions for UI Variables

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-task')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// load all event listeners
loadEventListeners()

// load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // add task event
  form.addEventListener('submit', addTask)
  // Remove task event
  taskList.addEventListener('click', removeTask)
  // Clear task event
  clearBtn.addEventListener('click', clearTasks)
  // Filter task event
  filter.addEventListener('keyup', filterTasks)
}

// Get Task from LS
function getTasks() {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){
        // Create li element
    const li = document.createElement('li')
    // Add a class to the element
    li.className = 'collection-item'
    // Create a textnode and Append to the li
    li.appendChild(document.createTextNode(task))
    // Create new link element
    const link = document.createElement('a')
    // Add a class to the link
    link.className = 'delete-item secondary-content'
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link)

    // Append li to the ul
    taskList.appendChild(li)

  })

}

// Add Tasks Function

function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task')
  }

  // Create li element
  const li = document.createElement('li')
  // Add a class to the element
  li.className = 'collection-item'
  // Create a textnode and Append to the li
  li.appendChild(document.createTextNode(taskInput.value))
  // Create new link element
  const link = document.createElement('a')
  // Add a class to the link
  link.className = 'delete-item secondary-content'
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append link to li
  li.appendChild(link)
  // Append li to the ul
  // console.log(li)
  taskList.appendChild(li)
  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value)
  // Clear input
  taskInput.value = ''

  e.preventDefault()
}

// Store Task Function
function storeTaskInLocalStorage(task) {
  let tasks
    if(localStorage.getItem('tasks') === null){
      tasks = []
    }else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task Function
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Do you want to really delete item?')) {
      e.target.parentElement.parentElement.remove()

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Tasks Function
function clearTasks() {
  // slow approach using the innerHTML
  // taskList.innerHTML = ''

  // fast approach using removeChild because it improves performance significantly
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  // https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements

  // Clear from LS
  clearTasksFromLocalStorage()

}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear()
}


// Filter Tasks Function
function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent
      if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block'
      }else{
        task.style.display = 'none'
      }
  }) 

}
