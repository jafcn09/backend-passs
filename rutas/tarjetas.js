
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTarjetas, crearTarjeta, actualizarTarjeta, borrarTarjeta } = require('../controller/tarjetaController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get("/", getTarjetas);

router.post(
 "/",
 [
   validarJWT,
   validarCampos
 ],
 crearTarjeta
);

router.put(
 "/:id",
 [
   validarJWT,

   validarCampos
 ],
 actualizarTarjeta
);

router.delete("/:id", validarJWT, borrarTarjeta);

/**exportamos el router */
module.exports = router;