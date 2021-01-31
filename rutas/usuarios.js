const { Router } = require('express');
const bodyParser = require('body-parser');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, getUsuario,crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuariosController');
const urlencodedParser = bodyParser.urlencoded({extended: false})
const router = Router();

router.get("/", getUsuarios);
router.get("/:dni", getUsuario);
router.get("/?", getUsuario);

router.post(
  "/",
  [ check('nombre', 'El nombre es obligatorio').exists().isLength({min:5}),

  check('apellido', 'El apellido es obligatorio').exists().isLength({min:5}),

  check('dni', 'Solo se puede ingresar maximo 8 digitos del dni').isLength({max: 8}),

  check('email', 'El email es obligatorio').isEmail().normalizeEmail(),

  check('celular', 'Solo se puede ingresar maximo 9 digitos del celular').isLength({max:9}),

  check('nacimiento', 'La fecha de nacimiento es obligatoria').not().isEmpty,
      validarCampos,
  
      
  ],
  crearUsuario , (req, res) => {
    const errors = validatorResult(req)
  if(!errors.isEmpty()){
    return res.status(500).json(errors.array)
  }
  }
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