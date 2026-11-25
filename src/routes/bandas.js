var express = require("express");
var router = express.Router();
 
var bandaController = require("../controllers/bandaController");
 
router.get("/listar", function (req, res) {
    bandaController.listar(req, res);
});
 
router.get("/albuns/:idBanda", function (req, res) {
    bandaController.listarAlbuns(req, res);
});
 
module.exports = router;
 