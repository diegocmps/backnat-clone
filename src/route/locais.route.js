const { Router } = require("express");
const { auth } = require("../middleware/auth");
const LocalController = require("../controllers/LocalController");

const localRoutes = Router();

localRoutes.post('/', auth, LocalController.adicionarLocal);
localRoutes.get('/', auth, LocalController.getLocaisUsuarioLogado);
localRoutes.get('/:localId/maps', auth, LocalController.getLinkGoogleMaps);
localRoutes.delete('/:localId', auth, LocalController.deletarLocal);
localRoutes.put('/:localId', auth, LocalController.atualizarLocal);




module.exports = localRoutes;