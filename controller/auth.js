const { response } = require('express');
const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
  const { email, celular} = req.body;
  try {
    /**verificar email */
    const usuarioDB = await Usuario.findOne({enabled: '1', email, celular});
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe.' /**usuario deshabilitado*/
      });
    }


    /**generar token JWT */
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: 'Usuario '+usuarioDB.email+ usuarioDB.celular+' autenticado.',
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador.'
    });
  }
}



const renewToken = async(req, res = response) => {
  /**generar nuevo token */
  const uid = req.uid;
  const token = await generarJWT(uid);
  /**obtener el usuario por UID */
  const usuario = await Usuario.findById(uid);
  /**por si el usuario esta deshabilitado */
  if (usuario.enabled != 1) {
    return res.status(400).json({
      ok: false,
      msg: 'El usuario no existe.' /**usuario deshabilitado*/
    });
  }

  res.json({
    ok: true,
    token,
    usuario
  })
}

module.exports = {
  login,
  renewToken
}