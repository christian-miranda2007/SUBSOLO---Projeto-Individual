var database = require("../database/config")

function bandasMaisOuvidas(idUsuario) {
    console.log("ACESSEI O GRAFICO MODEL \n function bandasMaisOuvidas():", idUsuario);
    var instrucaoSql = `
        SELECT b.nome_banda, COUNT(DISTINCT s.id_sessao) AS qtd_sessoes
        FROM sessoes s
        JOIN sessoes_albuns sa ON sa.id_sessao = s.id_sessao
        JOIN album a ON a.id_album = sa.id_album
        JOIN bandas b ON b.id_banda = a.id_banda
        WHERE s.id_usuario = ${idUsuario}
        GROUP BY b.id_banda, b.nome_banda
        ORDER BY qtd_sessoes DESC, b.nome_banda
        LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function manobrasMaisAcertadas(idUsuario) {
    console.log("ACESSEI O GRAFICO MODEL \n function manobrasMaisAcertadas():", idUsuario);
    var instrucaoSql = `
        SELECT m.nome_trick, SUM(sm.vezes) AS total_acertos
        FROM sessoes s
        JOIN sessoes_manobras sm ON sm.id_sessao = s.id_sessao
        JOIN manobras m ON m.id_manobra = sm.id_manobra
        WHERE s.id_usuario = ${idUsuario}
        GROUP BY m.id_manobra, m.nome_trick
        HAVING SUM(sm.vezes) > 0
        ORDER BY total_acertos DESC, m.nome_trick
        LIMIT 6;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    bandasMaisOuvidas,
    manobrasMaisAcertadas
};
