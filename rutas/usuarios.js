const { Router } = require('express');
const bodyParser = require('body-parser');
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, getUsuario,crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuariosController');
const urlencodedParser = bodyParser.urlencoded({extended: false})
const router = Router();

router.get("/", getUsuarios);
router.get("/:dni", getUsuario);
router.get("/?", getUsuario);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio.").not().isEmpty(),
   check("apellido", "El apellido es obligatorio.").not().isEmpty(),
   check("dni", "El dni es obligatorio").isLength({max:8}),
    check("email", "El email es obligatorio.").isEmail(),
    check("celular", "El celular es obligatorio").isLength({max:9}),
    check("nacimiento", "La fecha de nacimiento es obligatorio.").not().isEmpty(),
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