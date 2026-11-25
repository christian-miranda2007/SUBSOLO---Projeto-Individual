var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/bandas/:idUsuario", function (req, res) {
    graficoController.bandasMaisOuvidas(req, res);
});

router.get("/manobras/:idUsuario", function (req, res) {
    graficoController.manobrasMaisAcertadas(req, res);
});

module.exports = router;
