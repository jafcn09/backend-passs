const { response } = require('express');
const Usuario = require('../models/usuario');


const login = async(req, res = response) => {
  const { dni} = req.body;
  try {
    /**verificar dni  */
    const usuarioDB = await Usuario.findOne({enabled: '1',dni});
    if (!usuarioDB) {
      return res.status(400).json({

       
        status:100,
        data:{
          ok: 'no se reconoce',
          cambio: 'El dni no existe'
        }
        
      });
    }


    res.json({
      status: 200,
      data: {
        ok:  'bienvenido',
        cambio: 'Dni '+usuarioDB.dni + 'exitoso.',
       }

     
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
     
      status: 300,
      data:{
        ok: 'no se reconoce',
        cambio: 'Hable con el administrador.'
      }
      
    });
  }
}

const getUsuarioByDni = async(req, res) => {
  const  dni= req.params.dni;
    const  usuario  = await Usuario.findOne({dni: dni});
    return res.json({
      status:200,
      data:{
        ok: 'bien',
        msg: 'usuario encontrado por su dni',
        usuario
      }
    
  
    });
    
  }
  


module.exports = {
  login,
  getUsuarioByDni
}