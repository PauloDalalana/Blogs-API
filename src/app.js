const express = require('express');
const validateLogin = require('./middlewares/validateLogin');
const validateUser = require('./middlewares/validateUser');
const validateToken = require('./middlewares/validateToken');
const loginController = require('./constrollers/loginController');
const createUserController = require('./constrollers/createUserController');
const userController = require('./constrollers/userController');
const categoryController = require('./constrollers/categoryController');
const postController = require('./constrollers/postController');

// ...

const app = express();
// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLogin, loginController.login);
app.post('/user', validateUser, createUserController.createUser);
app.post('/categories', validateToken, categoryController.createCategory);
app.post(
  '/post',
  validateToken,
  postController.validatePostCreation,
  postController.createPost,
);

app.get('/user', validateToken, userController.getAllUsers);
app.get('/user/:id', validateToken, userController.getUserById);
app.get('/categories', validateToken, categoryController.getAllCategories);

// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
