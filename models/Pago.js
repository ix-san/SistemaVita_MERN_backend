import db from "../config/db.js";

export default {
  getPagos : function(){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT pago.idPago, residente.nombreCompleto, pago.cantidad, pago.fecharealizo, residente.estado, pago.residente_idResidente FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente';
      db.query(sql,function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  getPagosMonto : function(){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT SUM(pago.cantidad) AS cantidadTotal FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente';
      db.query(sql,function (err, result) {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
  getPagosMontoActivoInactivo : function(estado){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT SUM(pago.cantidad) AS cantidadActivoInactivo FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente WHERE estado=?';
      db.query(sql,estado,function (err, result) {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
  addPago : function (pagoDetails,){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO pago SET ?';
        db.query(sql,pagoDetails,function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  getPago : function(idPago){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT residente.nombreCompleto, pago.cantidad, pago.fecharealizo, pago.fechaRegistroSist FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente WHERE idPago=?';
      db.query(sql,idPago,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  getPagoNuevo : function(cantidad, fecharealizo, residente_idResidente){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT pago.idPago, residente.nombreCompleto, pago.cantidad, pago.fecharealizo, residente.estado FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente WHERE cantidad=? AND fecharealizo=? AND residente_idResidente=?';
      db.query(sql,[cantidad, fecharealizo, residente_idResidente],function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  deletePagoResi : function(idPago){
    return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM pago WHERE idPago=?';
      db.query(sql,idPago,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  deletePagosResi : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM pago WHERE residente_idResidente=?';
      db.query(sql,idResi,function (err, result) {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
  getFechasActivoInactivo : function(selectEstado, fechaInicio, fechaFinal){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT pago.idPago, residente.nombreCompleto, pago.cantidad, pago.fecharealizo, residente.estado FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente WHERE estado=? AND fecharealizo  BETWEEN ? AND ?';
      db.query(sql,[selectEstado, fechaInicio, fechaFinal],function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  getMontoFechasActivoInactivo : function(selectEstado, fechaInicio, fechaFinal){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT SUM(pago.cantidad) AS cantidadTotal FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente WHERE estado=? AND fecharealizo  BETWEEN ? AND ?';
      db.query(sql,[selectEstado, fechaInicio, fechaFinal],function (err, result) {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
  getFechasTodos : function(fechaInicio, fechaFinal){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT pago.idPago, residente.nombreCompleto, pago.cantidad, pago.fecharealizo, residente.estado FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente WHERE fecharealizo  BETWEEN ? AND ?';
      db.query(sql,[fechaInicio, fechaFinal],function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  getMontoFechasTodos : function(fechaInicio, fechaFinal){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT SUM(pago.cantidad) AS cantidadTotal FROM pago CROSS JOIN residente ON pago.residente_idResidente= residente.idResidente WHERE fecharealizo  BETWEEN ? AND ?';
      db.query(sql,[fechaInicio, fechaFinal],function (err, result) {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
}
