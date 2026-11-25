var database = require("../database/config")

function listar(idUsuario) {
    console.log("ACESSEI O MANOBRA MODEL \n function listar():", idUsuario);
    var instrucaoSql = `
        SELECT m.id_manobra, m.nome_trick, m.categoria, um.statuss
        FROM usuario_manobras um
        JOIN manobras m ON m.id_manobra = um.id_manobra
        WHERE um.id_usuario = ${idUsuario}
        ORDER BY m.nome_trick;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorNome(nome) {
    var instrucaoSql = `
        SELECT id_manobra FROM manobras WHERE nome_trick = '${nome}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarNoCatalogo(nome, categoria) {
    var instrucaoSql = `
        INSERT INTO manobras (nome_trick, categoria) VALUES ('${nome}', '${categoria}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function vincularAoUsuario(idUsuario, idManobra, status) {
    var instrucaoSql = `
        INSERT INTO usuario_manobras (id_usuario, id_manobra, statuss) VALUES (${idUsuario}, ${idManobra}, '${status}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idUsuario, idManobra, status) {
    var instrucaoSql = `
        UPDATE usuario_manobras SET statuss = '${status}' WHERE id_usuario = ${idUsuario} AND id_manobra = ${idManobra};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluir(idUsuario, idManobra) {
    var instrucaoSql = `
        DELETE FROM usuario_manobras WHERE id_usuario = ${idUsuario} AND id_manobra = ${idManobra};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    buscarPorNome,
    cadastrarNoCatalogo,
    vincularAoUsuario,
    editar,
    excluir
};