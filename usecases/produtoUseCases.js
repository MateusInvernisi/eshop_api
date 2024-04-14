const { pool } = require('../config');
const Produto = require('../entities/Produto');

const getProdutosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT produtos.*, categorias.nome AS nome_categoria 
        FROM produtos 
        LEFT JOIN categorias ON produtos.categoria = categorias.codigo 
        ORDER BY produtos.nome`);
        return rows.map((produto) => new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque,
            produto.ativo, produto.valor, produto.data_cadastro, produto.nome_categoria));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addProdutoDB = async (body) => {
    try {
        const { nome, descricao, quantidade_estoque ,ativo, valor, data_cadastro, categoria} = body;
        const results = await pool.query(`INSERT INTO produtos (nome, descricao, quantidade_estoque ,ativo, valor, data_cadastro, categoria) 
                                        VALUES ($1, $2, $3, $4, $5, $6, $7) returning 
                                        codigo, nome, descricao, quantidade_estoque ,ativo, valor, data_cadastro, categoria`, 
        [nome, descricao, quantidade_estoque ,ativo, valor, data_cadastro, categoria]);
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, 
                           produto.valor, produto.data_cadastro, produto.categoria);
    } catch (err) {
        throw "Erro ao inserir o produto: " + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM produtos
        WHERE codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return `Produto de código ${codigo} removida com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover o produto teste git: " + err;
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT p.*, 
                                        (SELECT nome FROM categorias WHERE codigo = p.categoria) AS nome_categoria
                                        FROM produtos p WHERE p.codigo = $1`, [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`;
        } else {
            const produto = results.rows[0];
            return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo, 
                produto.valor, produto.data_cadastro, produto.nome_categoria);
        }
    } catch (err) {
        throw "Erro ao recuperar o Produto: " + err;
    }
}

const updateProdutoDB = async (body) => {
    try {
        const { codigo, ativo } = body;        
        const results = await pool.query(`UPDATE produtos SET ativo = $2  WHERE codigo = $1 
        RETURNING codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, 
            (SELECT nome FROM categorias WHERE codigo = produtos.categoria) AS categoria`,
        [codigo, ativo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome, produto.descricao, produto.quantidade_estoque, produto.ativo,
            produto.valor, produto.data_cadastro, produto.categoria);
    } catch (err) {
        throw "Erro ao alterar o produto: " + err;
    }
}




module.exports = {
    getProdutosDB, addProdutoDB, deleteProdutoDB, getProdutoPorCodigoDB, updateProdutoDB
}
