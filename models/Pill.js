import db from "../config/db.js";

export default {
  addPill : function (pillDetails,){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO medicamentos SET ?';
        db.query(sql,pillDetails,function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  getPill : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT * FROM medicamentos WHERE residente_idResidente=?';
      db.query(sql,idResi,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  getPillAgregar : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT desayuno, comida, cena, notas FROM medicamentos WHERE residente_idResidente=?';
      db.query(sql,idResi,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  updatePill : function(pillDetails, idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'UPDATE  medicamentos SET ? WHERE residente_idResidente=?';
      db.query(sql,[pillDetails, idResi],function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
  deletePillResi : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM medicamentos WHERE residente_idResidente=?';
      db.query(sql,idResi,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
}
