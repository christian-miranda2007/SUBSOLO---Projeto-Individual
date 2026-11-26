var database = require("../database/config")

function bandasMaisOuvidas(idUsuario) {
    console.log("ACESSEI O GRAFICO MODEL \n function bandasMaisOuvidas():", idUsuario);
    var instrucaoSql = `
        SELECT nome_banda, qtd_sessoes
        FROM vw_bandas_mais_ouvidas
        WHERE id_usuario = ${idUsuario}
        ORDER BY qtd_sessoes DESC, nome_banda
        LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function manobrasMaisAcertadas(idUsuario) {
    console.log("ACESSEI O GRAFICO MODEL \n function manobrasMaisAcertadas():", idUsuario);
    var instrucaoSql = `
           SELECT nome_trick, total_acertos
        FROM vw_manobras_mais_acertadas
        WHERE id_usuario = ${idUsuario}
        ORDER BY total_acertos DESC, nome_trick
        LIMIT 6;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    bandasMaisOuvidas,
    manobrasMaisAcertadas
};
