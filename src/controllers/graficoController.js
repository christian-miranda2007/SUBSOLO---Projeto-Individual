var graficoModel = require("../models/graficoModel");

function bandasMaisOuvidas(req, res) {
    var idUsuario = req.params.idUsuario;

    graficoModel.bandasMaisOuvidas(idUsuario)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as bandas mais ouvidas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function manobrasMaisAcertadas(req, res) {
    var idUsuario = req.params.idUsuario;

    graficoModel.manobrasMaisAcertadas(idUsuario)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar as manobras mais acertadas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    bandasMaisOuvidas,
    manobrasMaisAcertadas
}
