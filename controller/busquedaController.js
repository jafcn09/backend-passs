const { response } = require('express');
const Usuario = require('../models/usuario');


const searchAll = async(req, res = response) => {
  const buscar = req.params.search;
  const regex = new RegExp(buscar, 'i');

  const [ usuarios ] = await Promise.all([
    Usuario.find({ nombre: regex }),
  ])
  
  res.json({
    ok: true,
    usuarios
  });
}

const searchColeccion = async(req, res = response) => {
  const buscar = req.params.search;
  const tabla = req.params.tabla;
  const regex = new RegExp(buscar, 'i');
  let data = [];

  switch (tabla) {
  
    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;
      
    default:
      return res.status(400).json({
        ok: false,
        msg: 'La tabla tiene que ser usuarios'
      });
    }
      res.json({ ok: true, resultados: data });
}

module.exports = {
  searchAll,
  searchColeccion
}