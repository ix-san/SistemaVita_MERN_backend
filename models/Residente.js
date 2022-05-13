import db from "../config/db.js";

export default {
  getResis : function(){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT * FROM residente';
      db.query(sql,function (err, result) {
          if (err) reject(err);
          resolve(result);
      });
    });
  },
  getResisActivoInactivo : function(selectEstado){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT * FROM residente WHERE estado =?';
      db.query(sql,selectEstado,function (err, result) {
          if (err) reject(err);
          resolve(result);
      });
    });
  },
  getResi : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT * FROM residente WHERE idResidente =?';
      db.query(sql,idResi,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  searchResi : function (searchFullName){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM residente WHERE nombreCompleto =?';
        db.query(sql,searchFullName,function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  searchDuplResiId : function (searchFullName, id){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM residente WHERE nombreCompleto =? AND idResidente!=?';
        db.query(sql,[searchFullName,id],function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  addResi : function (resiDetails,){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO residente SET ?';
        db.query(sql,resiDetails,function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  editResi : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT nombres, apellidoP, apellidoM, fechaNacimiento, edad, padecimiento, estado, datosEmergNombres, datosEmergApellidoP, datosEmergApellidoM, datosEmergParentezco, datosEmergTel1, datosEmergTel2 FROM residente WHERE idResidente=?';
      db.query(sql,idResi,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  updateResi : function(resiDetails, idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'UPDATE  residente SET ? WHERE idResidente=?';
      db.query(sql,[resiDetails, idResi],function (err, result) {
          if (err) reject(err);
          resolve(result);
      });
    });
  },
  deleteResi : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM residente WHERE idResidente=?';
      db.query(sql,idResi,function (err, result) {
          if (err) reject(err);
          resolve(result);
      });
    });
  },
}
