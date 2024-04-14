const { Router } = require('express');
const { getavaliacoes, addAvaliacao, deleteAvaliacao, AvaliacaoPorCodigo, updateAvaliacao} = 
    require('../controllers/avaliacaoController');

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacao')
               .get(getavaliacoes)
               .post(addAvaliacao)
               .put(updateAvaliacao)
               //.delete(deleteCategoria);

rotasAvaliacoes.route('/avaliacao/:codigo') 
               .get(AvaliacaoPorCodigo)              
               .delete(deleteAvaliacao);

module.exports = {rotasAvaliacoes};