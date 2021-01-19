const { Router } = require('express');
const { searchAll,searchColeccion } = require('../controller/busquedaController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get("/:search",validarJWT, searchAll);
router.get("/coleccion/:tabla/:search",validarJWT, searchColeccion);

/**exportamos el router */
module.exports = router;