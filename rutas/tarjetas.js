
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTarjetas, crearTarjeta, actualizarTarjeta, borrarTarjeta, getTarjetaByDni } = require('../controller/tarjetaController');
const { check } = require('express-validator');

const router = Router();

router.get("/", getTarjetas);
router.get("/:dni", getTarjetaByDni);

router.post(
 "/",
 [ 
   check('nombre', 'El nombre es obligatorio').exists().isLength({min:5}),
   check('dueño', 'El dueño es obligatorio').exists().isLength({min:5}),
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