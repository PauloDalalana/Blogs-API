const express = require('express');
const validateLogin = require('./middlewares/validateLogin');
const validateUser = require('./middlewares/validateUser');
const loginController = require('./constrollers/loginController');
const createUserController = require('./constrollers/CreateUserController');

// ...

const app = express();
// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLogin, loginController.login);
app.post('/user', validateUser, createUserController.createUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
