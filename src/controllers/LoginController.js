const Usuario = require('../models/Usuario');
const { sign } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

class LoginController {
    async login(req, res) {
        /*
           #swagger.tags = ['Login'],
           #swagger.parameters = ['body'] ={
             in: 'body',
             description: 'Realizar login!',
             schema: {
                $email: 'taline.araujo@hotmail.com',
                $senha: 'teste123'
             }   
          }
        */
        try {
            const email = req.body.email;
            const senha = req.body.senha;

            if (!email) {
                return res.status(400).json({ message: 'O email é obrigatório!' });
            }

            if (!senha) {
                return res.status(400).json({ message: 'A senha é obrigatória!' });
            }

            const usuario = await Usuario.findOne({
                where: { email: email, senha: senha }
            });

            if (!usuario) {
                return res.status(404).json({ message: 'Não foi encontrado usuário correspondente aos dados fornecidos' });
            }

            const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome };
            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '1h' });

            
            return res.json({ user: { id: usuario.id, nome: usuario.nome, email: usuario.email }, token: token });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Erro ao logar!' });
        }
    }
}

module.exports = new LoginController();
