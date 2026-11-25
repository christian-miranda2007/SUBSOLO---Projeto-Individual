var sessaoModel = require("../models/sessaoModel");

function cadastrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var local = req.body.localServer;
    var data = req.body.dataServer;
    var idAlbum = req.body.idAlbumServer;
    var manobras = req.body.manobrasServer;
    var observacoes = req.body.observacoesServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (local == undefined) {
        res.status(400).send("Seu local está undefined!");
    } else if (data == undefined) {
        res.status(400).send("Sua data está undefined!");
    } else if (manobras == undefined || manobras.length == 0) {
        res.status(400).send("Suas manobras estão undefined!");
    } else {

        var idSessao;

        // Se o lugar já existe, usa o id dele; se não, cadastra antes
        sessaoModel.buscarLugar(local)
            .then(
                function (resultadoLugar) {
                    if (resultadoLugar.length > 0) {
                        return resultadoLugar[0].id_lugar;
                    }

                    return sessaoModel.cadastrarLugar(local)
                        .then(
                            function (resultadoCadastro) {
                                return resultadoCadastro.insertId;
                            }
                        );
                }
            ).then(
                function (idLugar) {
                    return sessaoModel.cadastrar(idUsuario, idLugar, data, observacoes || "");
                }
            ).then(
                function (resultadoSessao) {
                    idSessao = resultadoSessao.insertId;

                    if (idAlbum != undefined && idAlbum != "") {
                        return sessaoModel.cadastrarAlbum(idSessao, idAlbum);
                    }
                }
            ).then(
                function () {
                    return sessaoModel.cadastrarManobras(idSessao, manobras);
                }
            ).then(
                function () {
                    res.json({ idSessao: idSessao });
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao registrar a sessão! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    sessaoModel.listar(idUsuario)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar as sessões! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    listar
}
