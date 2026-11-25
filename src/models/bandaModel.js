var database = require("../database/config")

function listar() {
    var instrucaoSql = `
        SELECT id_banda, nome_banda FROM bandas ORDER BY nome_banda;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarAlbuns(idBanda) {
    var instrucaoSql = `
        SELECT id_album, titulo, ano FROM album WHERE id_banda = ${idBanda} ORDER BY ano, titulo;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarAlbuns
};
