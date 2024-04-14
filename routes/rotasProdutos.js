const { Router } = require('express');
const { getProdutos, addProduto, deleteProduto, ProdutoPorCodigo, updateProduto } = 
    require('../controllers/produtoController');

const rotasProdutos = new Router();

rotasProdutos.route('/produto')
               .get(getProdutos)
               .post(addProduto)
               .put(updateProduto)
               //.delete(deleteProduto);

rotasProdutos.route('/produto/:codigo') 
              .get(ProdutoPorCodigo)              
               .delete(deleteProduto);

module.exports = { rotasProdutos };