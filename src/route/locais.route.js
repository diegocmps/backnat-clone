const { Router } = require("express");
const { auth } = require("../middleware/auth");
const LocalController = require("../controllers/LocalController");

const localRoutes = Router();

localRoutes.post('/', auth, LocalController.adicionarLocal);
localRoutes.get('/', auth, LocalController.getLocaisUsuarioLogado);
localRoutes.get('/:local_id/maps', auth, LocalController.getLinkGoogleMaps);
localRoutes.delete('/:local_id', auth, LocalController.deletarLocal);
localRoutes.put('/:local_id', auth, LocalController.atualizarLocal);




module.exports = localRoutes;