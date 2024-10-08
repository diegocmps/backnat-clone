const { QueryInterface, Sequelize } = require("sequelize");
const Local = require('../../models/Local');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Local.bulkCreate([
      {
        nome: 'Trilha Morro das Aranhas',
        descricao: 'Trilha de aproximadamente 45 min de subida, com uma vista para as praias do Santinho, Moçambique e Ingleses',
        cep: '88058-700',
        rua: 'Estrada Ver. Onildo Lemos',
        bairro: 'Ingleses do Rio Vermelho',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuarioId: 1,
        latitude: -27.4187,
        longitude: -48.4472
      },
      {
        nome: 'Trilha Gravata',
        descricao: 'Trilha fácil',
        cep: '88061-700',
        rua: 'SC-406',
        bairro: 'Ingleses do Rio Vermelho',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuarioId: 2,
        latitude: -27.4300,
        longitude: -48.4600
      },
      {
        nome: 'Trilha Para Galheta',
        descricao: 'Trilha média, com uma vista linda',
        cep: '88061-423',
        rua: 'Servidão Júlia Alexandre Florindo',
        bairro: 'Barra da Lagoa',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuarioId: 3,
        latitude: -27.4283,
        longitude: -48.4403
      },
      {
        nome: 'Trilha Morro das Feiticeiras',
        descricao: 'Trilha fácil',
        cep: '88056-850',
        rua: 'R. Léa Castro Ramos',
        bairro: 'Praia Brava',
        cidade: 'Florianópolis',
        estado: 'SC',
        usuarioId: 4,
        latitude: -27.4462,
        longitude: -48.4574
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('locais', null, {});
  }
};
