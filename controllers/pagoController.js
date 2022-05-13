import db from "../config/db.js";
import residenteM from "../models/Residente.js";
import pagoM from "../models/Pago.js";

export default {
  obtenerPagos : async (req, res) => {
    const activo = 'activo'
    const inactivo = 'inactivo'

    const listaPago = await pagoM.getPagos();
    const listaPagoMonto = await pagoM.getPagosMonto();
    const listaPagoMontoActivos = await pagoM.getPagosMontoActivoInactivo(activo);
    const listaPagoMontoInactivos = await pagoM.getPagosMontoActivoInactivo(inactivo);

    res.json({
      listaPago: listaPago,
      listaPagoMonto: listaPagoMonto,
      listaPagoMontoActivos: listaPagoMontoActivos,
      listaPagoMontoInactivos: listaPagoMontoInactivos,
    });
  },
  agregarPago : async (req, res) => {

    if(req.usuario.username.toString() !== process.env.USER1.toString()){
      if (req.usuario.username.toString() !== process.env.USER2.toString()) {
        return res.status(401).json({msg : "Acción no Válida"});
      }
    }

    const {cantidad, fecharealizo, residente_idResidente} = req.body;

    const existeResidente = await residenteM.getResi(residente_idResidente);
    if(!existeResidente){
      const error = new Error ("Residente no Encontrado");
      return res.status(400).json({msg: error.message});
    }
      await pagoM.addPago(req.body);
      const pagoAgregado = await pagoM.getPagoNuevo(cantidad, fecharealizo, residente_idResidente)
      res.json(pagoAgregado);
  },
  obtenerPago : async (req, res) => {
    const {id} = req.params;

    const pago = await pagoM.getPago(id);

    if(pago.length === 0){
      const error = new Error ("Pago no Encontrado");
      return res.status(400).json({msg: error.message});
    }
    res.json(pago);
  },
  eliminarPago : async (req, res) => {
    if(req.usuario.username.toString() !== process.env.USER1.toString()){
        return res.status(401).json({msg : "Acción no Válida"});
    }
    const {id} = req.params;

    const pago = await pagoM.getPago(id);
    if(pago.length === 0){
      const error = new Error ("Pago no Encontrado.");
      return res.status(400).json({msg: error.message});
    }
    await pagoM.deletePagoResi(id);
    res.json({ msg: "Pago Borrado Correctamente."});
  },
  obtenerFechasActivoInactivo : async (req, res) => {

    const {fechaInicio, fechaFinal, selectEstado} = req.body;

    const listaPagosBuscadorAI = await pagoM.getFechasActivoInactivo(selectEstado, fechaInicio, fechaFinal)
    const montoFechasAI = await pagoM.getMontoFechasActivoInactivo(selectEstado, fechaInicio, fechaFinal)

    res.json({
      listaPagosBuscadorAI: listaPagosBuscadorAI,
      montoFechasAI: montoFechasAI,
    });

  },
  obtenerFechasTodos : async (req, res) => {

    const {fechaInicio, fechaFinal} = req.body;

    const listaPagosBuscadorTodos = await pagoM.getFechasTodos(fechaInicio, fechaFinal)
    const montoFechasTodos = await pagoM.getMontoFechasTodos(fechaInicio, fechaFinal)

    res.json({
      listaPagosBuscadorTodos: listaPagosBuscadorTodos,
      montoFechasTodos: montoFechasTodos,
    });

  },
}
