const PagedResult = require("../classes/PagedResult");
const Local = require("../models/Local");
const Usuario = require("../models/Usuario");


class DashboardController {
    async home(req, res) {

        try {

            const { page = 1, limit = 10 } = req.query;

            const usuariosTotal = await Usuario.count()
            const usuariosOnline = await Usuario.count({ where: { isLogged: true } })
            const locaisTotal = await Local.count()
            const locais = await Local.findAll({
                include: {
                    model: Usuario,
                    as: "usuario",
                    attributes: ['nome']
                },
                order: [['id', 'ASC']],
                limit: limit,
                offset: (page - 1) * limit
            })

            const dados = {
                usuariosTotal: usuariosTotal,
                usuariosOnline: usuariosOnline,
                locaisTotal: locaisTotal,
                locais: locais

            }

            return res.status(200).json(new PagedResult(page, limit, dados, locaisTotal))
        }
        catch (error) {
            return res.status(500).json({ message: "Erro ao recuperar dados" })
        }
    }
}

module.exports = new DashboardController();