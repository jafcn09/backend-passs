const { response } = require('express');
const Tarjeta = require('../models/tarjeta');

const getTarjetas = async(req, res) => {
  const desde = Number(req.query.desde) || 0;


  const [ tarjetas, total_reg ] = await Promise.all([
    Tarjeta.find({enabled: '1'},'usuario dueño').skip(desde).limit(5),
    Tarjeta.countDocuments()
  ]);

  res.json({
    ok: true,
    tarjetas,
    total_reg
    // uid: req.uid
  });
}

const crearTarjeta = async(req, res = response) => {
  const uid = req.uid;
  const tarjeta = new Tarjeta({
    tarjetas: uid,
    tipo:uid
  });
  try {
    const tarjetaSave = await tarjeta.save()
    res.json({
      ok: true,
      msg: 'Tarjeta  creada con éxito.',
      msg: tarjetaSave
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error al crear la tarjeta.'
    });
  }
}

const actualizarTarjeta = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid; /**id del usuario q modificara */
  try {
    const tarjetaDB = await Tarjeta.findById(id);
    if (!tarjetaDB) {
      return res.status(404).json({
        ok: true,
        msg: "Tarjeta No ubicada.",
      });
    }
    /**formas de actualizar campos */
    // hospital.nombre = req.body.nombre;
    const cambiosTarjeta = {
      /**extraemos todo lo q viene del body */
      ...req.body,
      usuario: uid /**con esto lo establecemos */,
    };

    const tarjetaActualizada = await Tarjeta.findByIdAndUpdate(
      id,
      cambiosTarjeta,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Se actualizó correctamente.",
      tarjeta: tarjetaActualizada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error a actualizar la tarjeta.",
    });
  }
}

const borrarTarjeta = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const tarjetaDB = await Tarjeta.findById(uid);
    if(!tarjetaDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe una tarjeta con ese id'
      })
    }

    if (tarjetaDB.enabled === '1') {
      await Tarjeta.findByIdAndUpdate(uid, {enabled: '0'}, {new: true});
      res.json({
        ok: true,
        msg: 'Tarjeta deshabilitada.'
      });
    } else {
      await Tarjeta.findByIdAndUpdate(uid, {enabled: '1'}, {new: true});
      res.json({
        ok: true,
        msg: 'Tarjeta habilitada.'
      });
    }

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error al borrar la tarjeta.' 
    });
  }
}

module.exports = {
  getTarjetas,
  crearTarjeta,
  actualizarTarjeta,
  borrarTarjeta
}