const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuariosController');

const router = Router();

router.get("/", getUsuarios);

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

router.delete("/:id", borrarUsuario);

/**exportamos el router */
module.exports = router;