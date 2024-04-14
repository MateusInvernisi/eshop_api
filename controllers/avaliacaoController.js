const {getAvaliacoesDB, addAvaliacaoDB, deleteAvaliacaoDB, getAvaliacaoPorCodigoDB, updateAvaliacaoDB } = require('../usecases/avaliacaoUseCases');

const getavaliacoes = async (request, response) => {
    await getAvaliacoesDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar as categorias: ' + err
          }))
}

const addAvaliacao = async (request, response) => {
  await addAvaliacaoDB(request.body)
        .then(data => response.status(200).json({
              status : "success", message : "Produto criado",
              objeto : data
        }))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

const deleteAvaliacao = async (request, response) => {
  await deleteAvaliacaoDB(request.params.codigo)
        .then(data => response.status(200).json({
              status : "success", message : data
        }))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

const AvaliacaoPorCodigo = async (request, response) => {
  await getAvaliacaoPorCodigoDB(request.params.codigo)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

const updateAvaliacao = async (request, response) => {
  await updateAvaliacaoDB(request.body)
        .then(data => response.status(200).json({
              status : "success", message : "Avaliação alterada",
              objeto : data
        }))
        .catch(err => response.status(400).json({
          status : 'error',
          message : err
        }))
}

module.exports = {
    getavaliacoes, addAvaliacao, deleteAvaliacao, AvaliacaoPorCodigo, updateAvaliacao
}