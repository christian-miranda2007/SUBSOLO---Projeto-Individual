var manobraModel = require("../models/manobraModel");
 
function listar(req, res) {
    var idUsuario = req.params.idUsuario;
 
    manobraModel.listar(idUsuario)
        .then(
            function (resultado) {
                res.status(200).json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar as manobras! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
 
function cadastrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var categoria = req.body.categoriaServer;
    var status = req.body.statusServer;
 
    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (categoria == undefined) {
        res.status(400).send("Sua categoria está undefined!");
    } else if (status == undefined) {
        res.status(400).send("Seu status está undefined!");
    } else {
 

        manobraModel.buscarPorNome(nome)
            .then(
                function (resultadoBusca) {
                    if (resultadoBusca.length > 0) {
                        return resultadoBusca[0].id_manobra;
                    }
 
                    return manobraModel.cadastrarNoCatalogo(nome, categoria)
                        .then(
                            function (resultadoCadastro) {
                                return resultadoCadastro.insertId;
                            }
                        );
                }
            ).then(
                function (idManobra) {
                    return manobraModel.vincularAoUsuario(idUsuario, idManobra, status);
                }
            ).then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao cadastrar a manobra! Erro: ", erro.sqlMessage);
 
                    if (erro.errno == 1062) {
                        res.status(409).send("Essa manobra já está cadastrada!");
                    } else {
                        res.status(500).json(erro.sqlMessage);
                    }
                }
            );
    }
}
 
function editar(req, res) {
    var idUsuario = req.params.idUsuario;
    var idManobra = req.params.idManobra;
    var status = req.body.statusServer;
 
    if (status == undefined) {
        res.status(400).send("Seu status está undefined!");
    } else {
 
        manobraModel.editar(idUsuario, idManobra, status)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao editar a manobra! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
 
function excluir(req, res) {
    var idUsuario = req.params.idUsuario;
    var idManobra = req.params.idManobra;
 
    manobraModel.excluir(idUsuario, idManobra)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao excluir a manobra! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
 
module.exports = {
    listar,
    cadastrar,
    editar,
    excluir
}
 