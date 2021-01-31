
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTarjetas, getTarjeta, crearTarjeta, actualizarTarjeta, borrarTarjeta } = require('../controller/tarjetaController');
const { check } = require('express-validator');

const router = Router();

router.get("/", getTarjetas);
router.get("/:id", getTarjeta);

router.post(
 "/",
 [ 
   check('titular', 'El titular es obligatorio').exists().isLength({min:5}),
   check('nombre', 'El nombre es obligatorio').exists().isLength({min:5}),
   check('tipo', 'El tipo de tarjeta es obligatorio').exists().isLength({min:5}),
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