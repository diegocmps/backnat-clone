const usuarioRoutes = require('./usuario.routes');
const localRoutes = require('./locais.route');
const loginRoutes = require('./login.route');

const { Router } = require("express");

const route = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dashboardRoutes = require('./dashboard.route');


route.use('/usuario', usuarioRoutes);

route.use('/login', loginRoutes);

route.use('/local', localRoutes);

route.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

route.use('/dashboard', dashboardRoutes);

module.exports = route;