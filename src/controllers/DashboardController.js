const Local = require("../models/Local");
const Usuario = require("../models/Usuario");


class DashboardController {
    async home(req, res) {

        try {


            const usuariosTotal = await Usuario.count()
            const usuariosOnline = await Usuario.count({ where: { isLogged: true } })
            const locaisTotal = await Local.count()
            const locais = await Local.findAll({
                include: {
                    model: Usuario,
                    as: "usuario",
                    attributes: ['nome']


                }
            })

            const data = {
                usuariosTotal: usuariosTotal,
                usuariosOnline: usuariosOnline,
                locaisTotal: locaisTotal,
                locais: locais

            }

            return res.status(200).json({ ...data })
        }
        catch (error) {
            return res.status(500).json({ message: "Erro ao recuperar dados" })
        }
    }
}

module.exports = new DashboardController();