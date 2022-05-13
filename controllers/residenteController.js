import db from "../config/db.js";
import residenteM from "../models/Residente.js";
import pillM from "../models/Pill.js";
import pagoM from "../models/Pago.js";


export default {
  obtenerResidentes : async (req, res) => {
    const activo = 'activo'
    const inactivo = 'inactivo'

    const listaResidentes = await residenteM.getResis();
    const listaActivos = await residenteM.getResisActivoInactivo(activo);
    const listaInactivos = await residenteM.getResisActivoInactivo(inactivo);

    res.json({
      listaResidentes: listaResidentes,
      listaActivos: listaActivos,
      listaInactivos: listaInactivos,
    });
  },
  obtenerlistaActivoInactivo : async (req, res) => {
    const {selectEstado} = req.body;
    const listaActivosInactivos = await residenteM.getResisActivoInactivo(selectEstado);
    res.json(listaActivosInactivos);
  },
  obtenerlistaTodos : async (req, res) => {
    const activo = 'activo'
    const inactivo = 'inactivo'

    const listaResidentes = await residenteM.getResis();
    const listaActivos = await residenteM.getResisActivoInactivo(activo);
    const listaInactivos = await residenteM.getResisActivoInactivo(inactivo);

    res.json({
      listaResidentes: listaResidentes,
      listaActivos: listaActivos,
      listaInactivos: listaInactivos,
    });
  },
  nuevoResidente : async (req, res) => {

    if(req.usuario.username.toString() !== process.env.USER1.toString()){
      if (req.usuario.username.toString() !== process.env.USER2.toString()) {
        return res.status(401).json({msg : "Acción no Válida"});
      }
    }

    const residente = req.body;
    const {nombres, apellidoP, apellidoM} = req.body;
    const fullName = (`${nombres} ${apellidoP} ${apellidoM}`);
    residente.user_regisUsername = req.usuario.username;

    const dupli = await residenteM.searchResi(fullName)
      if (dupli) {
        const error = new Error ("Residente ya Registrado");
        return res.status(400).json({msg: error.message});
      }
      await residenteM.addResi(residente);
      const resiAdd = await residenteM.searchResi(fullName)
      res.json(resiAdd);

  },
  obtenerResidente : async (req, res) => {
    const {id} = req.params;

    const residente = await residenteM.getResi(id);

    if(!residente){
      const error = new Error ("Residente no Encontrado");
      return res.status(400).json({msg: error.message});
    }
    res.json(residente);
  },
  editarResidente : async (req, res) => {

    if(req.usuario.username.toString() !== process.env.USER1.toString()){
      if (req.usuario.username.toString() !== process.env.USER2.toString()) {
        return res.status(401).json({msg : "Acción no Válida"});
      }
    }

    const {id} = req.params;
    const residente = await residenteM.editResi(id);
    if(!residente){
      const error = new Error ("Residente no Encontrado");
      return res.status(400).json({msg: error.message});
    }
    residente.nombres = req.body.nombres || residente.nombres;
    residente.apellidoP = req.body.apellidoP || residente.apellidoP;
    residente.apellidoM = req.body.apellidoM || residente.apellidoM;
    residente.fechaNacimiento = req.body.fechaNacimiento || residente.fechaNacimiento;
    residente.edad = req.body.edad || residente.edad;
    residente.fechaIngreso = req.body.fechaIngreso || residente.fechaIngreso;
    residente.fechaEgreso = req.body.fechaEgreso || residente.fechaEgreso;
    residente.motivoInactivo = req.body.motivoInactivo || residente.motivoInactivo;
    residente.padecimiento = req.body.padecimiento || residente.padecimiento;
    residente.estado = req.body.estado || residente.estado;
    residente.datosEmergNombres = req.body.datosEmergNombres || residente.datosEmergNombres;
    residente.datosEmergApellidoP = req.body.datosEmergApellidoP || residente.datosEmergApellidoP;
    residente.datosEmergApellidoM = req.body.datosEmergApellidoM || residente.datosEmergApellidoM;
    residente.datosEmergParentezco = req.body.datosEmergParentezco || residente.datosEmergParentezco;
    residente.datosEmergTel1 = req.body.datosEmergTel1 || residente.datosEmergTel1;
    residente.datosEmergTel2 = req.body.datosEmergTel2 || residente.datosEmergTel2;

    const fullName = (`${req.body.nombres} ${residente.apellidoP} ${req.body.apellidoM}`);
    try {
      const dupli = await residenteM.searchDuplResiId(fullName,id)
        if (dupli) {
          const error = new Error ("Residente ya Registrado");
          return res.status(400).json({msg: error.message});
        }
      await residenteM.updateResi(residente, id)
      const resiActualizado = await residenteM.getResi(id);
      res.json(resiActualizado);
    } catch (error) {
      console.log(error);
    }
  },
  eliminarResidente : async (req, res) => {

    if(req.usuario.username.toString() !== process.env.USER1.toString()){
        return res.status(401).json({msg : "Acción no Válida"});
    }

    const {id} = req.params;

    const residente = await residenteM.getResi(id);
    if(!residente){
      const error = new Error ("Residente no Encontrado");
      return res.status(400).json({msg: error.message});
    }
    await residenteM.deleteResi(id);
    await pagoM.deletePagosResi(id);
    await pillM.deletePillResi(id);

    res.json({ msg: "Residente Borrado Correctamente"});
  },
}
