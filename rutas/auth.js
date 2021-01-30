const { Router } = require('express');
const { check } = require('express-validator');
const { login, getUsuarioByDni } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
  [
     
  
    validarCampos
  ],
  login
);

router.get("/:dni", getUsuarioByDni);




/**exportamos el router */
module.exports = router;