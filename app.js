// Globals
let todos = []
let users = []

// Event Events
document.addEventListener('DOMContentLoaded', initApp)

// Basic Logic
function printTodo({id, userId, title, complite}) {

}

// Events Logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then(values => {
    [todos, users] = values

    // Отправить в разметку

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

 