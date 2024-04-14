const { pool } = require('../config');
const Avaliacao = require('../entities/Avaliacao');

const getAvaliacoesDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT avaliacoes.*, produtos.nome AS produto 
        FROM avaliacoes 
        LEFT JOIN produtos ON avaliacoes.produto = produtos.codigo 
        ORDER BY avaliacoes.codigo`);
        return rows.map((avaliacao) => new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto,
        avaliacao.nota, avaliacao.data, avaliacao.produto));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addAvaliacaoDB = async (body) => {
    try {
        const {autor, email, texto, nota, data, produto} = body;
        const results = await pool.query(`INSERT INTO avaliacoes (autor, email, texto, nota, data, produto) 
                                        VALUES ($1, $2, $3, $4, $5, $6) returning 
                                        codigo, autor, email, texto, nota, data, produto`, 
        [autor, email, texto, nota, data, produto]);
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto, avaliacao.nota, avaliacao.data, avaliacao.produto);
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }
}

const deleteAvaliacaoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM avaliacoes
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Avaliacao de código ${codigo} removida com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover o avaliacao: " + err;
    }
}

const getAvaliacaoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT a.*, 
                                        (SELECT nome FROM produtos WHERE codigo = a.produto) AS produto
                                        FROM avaliacoes a WHERE a.codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const avaliacao = results.rows[0];
            return new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto, avaliacao.nota, 
                avaliacao.data, avaliacao.produto);
        }
    } catch (err) {
        throw "Erro ao recuperar a avaliação: " + err;
    }
}

const updateAvaliacaoDB = async (body) => {
    try {
        const { codigo, texto } = body;        
        const results = await pool.query(`UPDATE avaliacoes SET texto = $2  WHERE codigo = $1 
        RETURNING codigo, autor, email, texto, nota, data, produto, 
            (SELECT nome FROM produtos WHERE codigo = avaliacoes.produto) AS produto`,
        [codigo, texto]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const avaliacao = results.rows[0];
        return new Avaliacao(avaliacao.codigo, avaliacao.autor, avaliacao.email, avaliacao.texto, avaliacao.nota, 
            avaliacao.data, avaliacao.produto);
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }
}



module.exports = {
    getAvaliacoesDB, addAvaliacaoDB, deleteAvaliacaoDB, getAvaliacaoPorCodigoDB, updateAvaliacaoDB
}