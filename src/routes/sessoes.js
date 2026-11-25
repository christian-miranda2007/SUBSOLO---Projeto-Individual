var express = require("express");
var router = express.Router();

var sessaoController = require("../controllers/sessaoController");

router.post("/cadastrar", function (req, res) {
    sessaoController.cadastrar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    sessaoController.listar(req, res);
});

module.exports = router;