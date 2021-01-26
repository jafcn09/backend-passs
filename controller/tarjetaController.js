const { response } = require('express');
const Tarjeta = require('../models/tarjeta');

const getTarjetas = async(req, res) => {
  const desde = Number(req.query.desde) || 0;


  const [ tarjetas, total_reg ] = await Promise.all([
    Tarjeta.find({enabled: '1'},'usuario dueño, nombre, tarjeta').skip(desde).limit(5),
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
    usuario: uid,
    ...req.body
  });

  try {
    const tarjetaSave = await tarjeta.save()
 
    res.json({
      status:200,
      data: {
        ok: 'se registro correctamente ',
        msg:'se creo la tarjeta',
        msg: tarjetaSave
      }
     
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500, 
      data:{
        ok: 'error',
        msg: 'Esta tarjeta ya esta registrada.'
      }
     
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
        status:404, 
        data:{
          ok: 'Comuniquese con soporte',
          msg: "Ingresar bien los campos.",
        }
      
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
      status:200,
      data:{
        ok: 'cambios correctos',
        msg: "Se actualizó correctamente.",
        tarjeta: tarjetaActualizada,
      }
    
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      data: {
        ok: 'no se pudo actualizar la tarjeta',
        msg: "para mayor ayuda, comuniquese con el administrador.",
      }
     
    });
  }
}

const borrarTarjeta = async(req, res = response) => {
  const uid = req.params.id;

  try {
    const tarjetaDB = await Tarjeta.findById(uid);
    if(!tarjetaDB) {
      return res.status(404).json({
        status:404,
        data:{
          msg: 'No existe una tarjeta asociada'
        }
    
      })
    }
    
    if (tarjetaDB.enabled === '1') {
      await Tarjeta.findByIdAndUpdate(uid, {enabled: '0'}, {new: true});
      res.json({
        ok: true,
        msg: 'Tarjeta deshabilitado.'
      });
    } else {
      await Tarjeta.findByIdAndUpdate(uid, {enabled: '1'}, {new: true});
      res.json({
        ok: true,
        msg: 'tarjeta habilitada.'
      });
    }
    // 
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'error al borrar usuario.' 
    });
  }
}

module.exports = {
  getTarjetas,
  crearTarjeta,
  actualizarTarjeta,
  borrarTarjeta
}