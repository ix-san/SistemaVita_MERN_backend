import db from "../config/db.js";
import residenteM from "../models/Residente.js";
import pillM from "../models/Pill.js";

export default {
  agregarPill : async (req, res) => {

    if(req.usuario.username.toString() !== process.env.USER1.toString()){
      if (req.usuario.username.toString() !== process.env.USER2.toString()) {
        return res.status(401).json({msg : "Acción no Válida"});
      }
    }

    const pill = req.body;
    const {residente_idResidente} = req.body;

    const existeResidente = await residenteM.getResi(residente_idResidente);
    if(!existeResidente){
      const error = new Error ("Residente no Encontrado");
      return res.status(400).json({msg: error.message});
    }

    const pillIdentificar = await pillM.getPillAgregar(residente_idResidente);
    if(pillIdentificar){
      pill.desayuno = req.body.desayuno || pill.desayuno;
      pill.comida = req.body.comida || pill.comida;
      pill.cena = req.body.cena || pill.cena;
      pill.notas = req.body.notas || pill.notas;
      pill.residente_idResidente = pill.residente_idResidente;

      await pillM.updatePill(pill, residente_idResidente);
      const pillCargada = await pillM.getPill(residente_idResidente)
      res.json(pillCargada);
    }else {
      pillM.addPill(pill);
      const pillCargada = await pillM.getPill(residente_idResidente)
      res.json(pillCargada);
    }
  },
  obtenerPill : async (req, res) => {
    const {id} = req.params;

    const pill = await pillM.getPill(id);
    if(!pill){
      const error = new Error ("No hay Medicamentos");
      return res.status(400).json({msg: error.message});
    }
    res.json(pill);
  },
}
