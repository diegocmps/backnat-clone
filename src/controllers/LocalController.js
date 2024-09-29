const Local = require('../models/Local')
const axios = require('axios')

class LocalController {
    async adicionarLocal(req, res) {

        /*
                #swagger.tags = ['Local'],
                #swagger.parameters = ['body'] ={
                   in: 'body',
                   description:'Cadastra novos locais!',
                   schema: {
                    $nome: 'Trilha Morro das aranhas',
                    $descricao: 'Trilha de aproximadamente 45 min de subida, com uma vista para as praias do Santinho, Moçambique e Ingleses',
                    $cep: '88058-700',
                    
                }   
            }
            */
        try {
            const usuarioId = req.payload.sub;

            const {
                nome,
                descricao,
                cep,
            } = req.body;

            if (!nome || !cep || !usuarioId) {
                return res.status(400).json({ message: 'Nome, endereço e CEP são obrigatórios!' });
            }

            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);

            if (response.data.length === 0) {
                return res.status(400).json({ message: 'Endereço não localizado' });
            }

            const { lat, lon } = response.data[0];

            const novoLocal = await Local.create({
                nome,
                descricao,
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
                usuarioId
            });

            res.status(201).json(novoLocal);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Não foi possível cadastrar o local' });
        }
    }
    async atualizarLocal(req, res) {
        /*
         #swagger.tags = ['Local'],
         #swagger.parameters = ['body'] ={
           in: 'body',
           description:'Atualizar endereço!',
           schema: {
            $nome: 'Morro das Aranhas',
            $descrição: 'Trilha facil',
            $cep: '88058-700'
            
        }   
    }
    */
        try {

            const { nome, descricao, cep, } = req.body;


            if (!nome || !cep) {
                return res.status(400).json({ message: 'Nome e endereço são obrigatórios!' });
            }


            const usuarioId = req.payload.sub; // Ajustando para 'usuario_id'
            const localAtualizar = await Local.findOne({ where: { id: req.params.localId, usuarioId: usuarioId } });

            if (!localAtualizar) {
                return res.status(404).json({ message: 'Local não encontrado!' });
            }


            localAtualizar.nome = nome;
            localAtualizar.descricao = descricao;
            localAtualizar.cep = cep;

            await localAtualizar.save();

            res.status(200).json(localAtualizar);

        } catch (error) {
            return res.status(500).json({ error: 'Não foi possível atualizar as informações do local.' });
        }
    }

    async deletarLocal(req, res) {
        /*  #swagger.tags = ['Local'],  
        #swagger.parameters['usuarioId'] = {
            in: 'query',
            description: 'Excluir local',
            type: 'string'
    } 
    */
        try {

            const usuarioId = req.payload.sub; // Ajustando para 'usuarioId'
            const localDeletar = await Local.findOne({ where: { id: req.params.localId, usuarioId: usuarioId } });

            if (!localDeletar) {
                return res.status(404).json({ message: 'Local não encontrado.' })
            }
            await localDeletar.destroy();

            res.status(200).json({ message: 'Local excluído com sucesso.' });

        } catch (error) {
            return res.status(500).json({ message: 'Não foi possivel excluir o local' });
        }
    }

    async getLocaisUsuarioLogado(req, res) {
        /* #swagger.tags = ['Local'],  
        #swagger.parameters['Locais'] = {
            in: 'query',
            description: 'Buscar todos os locais',
            type: 'string'
    } 
    */
        try {
            const usuarioId = req.payload.sub; // Ajuste para acessar o usuario_Id da consulta
            const locais = await Local.findAll({ where: { usuarioId: usuarioId } });


            if (!locais || locais.length === 0) {
                return res.status(404).json({ message: 'Nenhum local cadastrado' });
            }


            res.status(200).json(locais);

        } catch (error) {
            return res.status(500).json({ error: 'Não foi possível obter os locais cadastrados' });
        }
    }
    async getLinkGoogleMaps(req, res) {
        /*
      #swagger.tags = ['Local'],  
      #swagger.parameters['Local_id'] = {
          in: 'query',
          description: 'Filtrar local pelo ID',
          type: 'string'
  }
  
  */
        try {
            const usuarioId = req.payload.sub; // Ajustando para 'usuario_id'
            const local = await Local.findOne({ where: { id: req.params.localId, usuarioId: usuarioId } });

            if (!local) {
                return res.status(404).json({ message: 'Local não encontrado ou acesso não permitido' });
            }

            const googleMapsLink = `https://www.google.com/maps?q=${local.latitude},${local.longitude}`;
            res.status(200).json({ googleMapsLink });
        } catch (error) {
            return res.status(500).json({ error: 'Não foi possível obter o link do Google Maps para o local' });
        }
    }
}

module.exports = new LocalController;