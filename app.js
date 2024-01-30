// Globals
const todoList = document.getElementById('todo-list')
const userSelect = document.getElementById('user-todo')
const form = document.querySelector("form")
let todos = []
let users = []

// Event Events
document.addEventListener('DOMContentLoaded', initApp)
form.addEventListener('submit', handleSubmit)

// Basic Logic
function getUserName(userId) {
  const user = users.find(u => u.id === userId)
  return user.name
}

function createUserOption(user) {
  const option = document.createElement('option')
  option.value = user.id
  option.innerText = user.name
  
  userSelect.append(option)
}


function printTodo({id, userId, title, complited}) {
  const li = document.createElement('li')
  li.className= "todo-item"
  li.dataset.id = id
  li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(userId)}</b></span>`

  const status = document.createElement("input")
  status.type = "checkbox"
  status.checked = complited

  const close = document.createElement("span")
  close.innerHTML = "&times;"
  close.className = "close"

  li.prepend(status)
  li.append(close)

  todoList.prepend(li)
}

// Events Logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then(values => {
    [todos, users] = values

    // Отправить в разметку
    todos.forEach((todo) => printTodo(todo))
    users.forEach((user) => createUserOption(user))
  })
}

function handleSubmit(event) {
  event.preventDefault()

 
  createTodo({
    "userId": Number(form.user.value),
    "title": form.todo.value,
    "completed": false
  })

}

// Async logic
async function getAllTodos(){
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()

  return data
}

async function getAllUsers(){
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return data
}

async function createTodo(todo) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const newTodo = await response.json()
  printTodo(newTodo)
}