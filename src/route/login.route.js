const { Router } = require('express');
const loginRoutes = Router();
const LoginController = require('../controllers/LoginController');

loginRoutes.post('/', LoginController.login)


module.exports = loginRoutes;
