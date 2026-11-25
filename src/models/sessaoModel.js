var database = require("../database/config")

function buscarLugar(local) {
    var instrucaoSql = `
        SELECT id_lugar FROM lugar WHERE nome = '${local}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarLugar(local) {
    var instrucaoSql = `
        INSERT INTO lugar (nome) VALUES ('${local}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(idUsuario, idLugar, data, observacoes) {
    var instrucaoSql = `
        INSERT INTO sessoes (data_sessao, id_usuario, id_lugar, observacoes) VALUES ('${data}', ${idUsuario}, ${idLugar}, '${observacoes}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarAlbum(idSessao, idAlbum) {
    var instrucaoSql = `
        INSERT INTO sessoes_albuns (id_sessao, id_album) VALUES (${idSessao}, ${idAlbum});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarManobras(idSessao, manobras) {
    var valores = manobras.map(function (manobra) {
        return `(${idSessao}, ${manobra.idManobra}, ${manobra.finalizado})`;
    }).join(", ");

    var instrucaoSql = `
        INSERT INTO sessoes_manobras (id_sessao, id_manobra, finalizado) VALUES ${valores};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(idUsuario) {
    var instrucaoSql = `
        SELECT s.id_sessao,
               DATE_FORMAT(s.data_sessao, '%d/%m/%Y') AS data,
               l.nome AS lugar,
               (SELECT GROUP_CONCAT(CONCAT(b.nome_banda, ' - ', a.titulo) SEPARATOR ', ')
                  FROM sessoes_albuns sa
                  JOIN album a ON a.id_album = sa.id_album
                  JOIN bandas b ON b.id_banda = a.id_banda
                 WHERE sa.id_sessao = s.id_sessao) AS banda_album,
               (SELECT GROUP_CONCAT(m.nome_trick SEPARATOR ', ')
                  FROM sessoes_manobras sm
                  JOIN manobras m ON m.id_manobra = sm.id_manobra
                 WHERE sm.id_sessao = s.id_sessao) AS manobras,
               (SELECT GROUP_CONCAT(m.nome_trick SEPARATOR ', ')
                  FROM sessoes_manobras sm
                  JOIN manobras m ON m.id_manobra = sm.id_manobra
                 WHERE sm.id_sessao = s.id_sessao AND sm.finalizado = 1) AS acertos
        FROM sessoes s
        JOIN lugar l ON l.id_lugar = s.id_lugar
        WHERE s.id_usuario = ${idUsuario}
        ORDER BY s.data_sessao DESC, s.id_sessao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarLugar,
    cadastrarLugar,
    cadastrar,
    cadastrarAlbum,
    cadastrarManobras,
    listar
};
