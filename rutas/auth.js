const { Router } = require('express');
const { check } = require('express-validator');
const { login, getUsuarioByDni } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
  [
     check("dni", "Ingrese bien los datos por favor").isLength({max: 8}),
  
    validarCampos
  ],
  login
);

router.get("/:dni", getUsuarioByDni);




/**exportamos el router */
module.exports = router;