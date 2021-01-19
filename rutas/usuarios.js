const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuariosController');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get("/", validarJWT, getUsuarios);

router.post(
  "/",
  [
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    validarCampos
  ],
  actualizarUsuario
);

router.delete("/:id",validarJWT, borrarUsuario);

/**exportamos el router */
module.exports = router;