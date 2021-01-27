
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTarjetas, crearTarjeta, actualizarTarjeta, borrarTarjeta, getTarjetaByDni } = require('../controller/tarjetaController');

const router = Router();

router.get("/", getTarjetas);
router.get("/:dni", getTarjetaByDni);

router.post(
 "/",
 [
   validarCampos
 ],
 crearTarjeta
);

router.put(
 "/:id",
 [

   validarCampos
 ],
 actualizarTarjeta
);

router.delete("/:id", borrarTarjeta);

/**exportamos el router */
module.exports = router;