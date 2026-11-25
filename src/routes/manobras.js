var express = require("express");
var router = express.Router();

var manobraController = require("../controllers/manobraController");

router.get("/listar/:idUsuario", function (req, res) {
    manobraController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    manobraController.cadastrar(req, res);
});

router.put("/editar/:idUsuario/:idManobra", function (req, res) {
    manobraController.editar(req, res);
});

router.delete("/excluir/:idUsuario/:idManobra", function (req, res) {
    manobraController.excluir(req, res);
});

module.exports = router;