const express = require('express');
const cors = require('cors');

const { v4: uuidv4, v4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username} = request.headers

  const user = users.find((user) => user.username === username)

  if(!user){
    return response.status(400).json({error: "User not found."})
  }

  request.username = username

  return next()
}

app.post('/users', (request, response) => {
    const {name, username} = request.body

    const user ={
      id : v4(),
      name,
      username,
      todos: []
    }

    users.push(user)

    return response.status(201).json(user)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
   const {username} = request

   const {todos} = users.find((user) => user.username === username)

   return response.json(todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {username} = request
  const {title, done, deadline} = request.body

  const user = users.find((user) => user.username === username)
  
  const todo = {
    id : v4(),
    title,
    done,
    deadline,
    created_at: new Date()
  }

  user.todos.push(todo)

  return response.status(201).json(user)

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;