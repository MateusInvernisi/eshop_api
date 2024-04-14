// Importa a classe Router do pacote 'express', que é usada para criar roteadores em aplicações Express.js.
const { Router } = require('express');

// Importa as rotas relacionadas a categorias do arquivo
const { rotasCategorias } = require('./rotasCategorias');
const { rotasProdutos } = require('./rotasProdutos')
const { rotasAvaliacoes } = require('./rotasAvaliacoes');

// Cria um novo objeto Router, que será usado para definir as rotas da aplicação.
const rotas = new Router();

// Utiliza as rotas relacionadas a categorias importadas anteriormente.
rotas.use(rotasCategorias);
rotas.use(rotasProdutos);
rotas.use(rotasAvaliacoes);

// Exporta o objeto rotas, que contém todas as rotas definidas para a aplicação.
module.exports = rotas;
