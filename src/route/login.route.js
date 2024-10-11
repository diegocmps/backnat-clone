const { Router } = require('express');
const loginRoutes = Router();
const LoginController = require('../controllers/LoginController');
const { auth } = require('../middleware/auth');

loginRoutes.post('/', LoginController.login)
loginRoutes.post('/logout', auth, LoginController.logout)


module.exports = loginRoutes;
