import db from "../config/db.js";
import bcrypt from "bcrypt";
const salt = 10;

export default {
  getUsers : function(){
    return new Promise ((resolve, reject) => {
      let sql = 'SELECT idUser, userFullName, username, create_time FROM user WHERE idUser>2';
      db.query(sql,function (err, result) {
          if (err) reject(err);
          resolve(result);
      });
    });
  },
  searchDupliUser : function (searchName, searchUserName){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM user WHERE userFullName =? OR username =?';
        db.query(sql,[searchName, searchUserName],function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  addUser : function (userDetails){
    return new Promise((resolve, reject) => {
        let sql = 'INSERT INTO user SET ?';
        bcrypt.hash(userDetails.userpassword, salt).then(function(hash) {
          userDetails.userpassword = hash;
          db.query(sql,userDetails,function (err, result) {
              if (err) reject(err);
              resolve(result[0]);
          });
        });
    });
  },
  getUser : function (searchUserName){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM user WHERE username =?';
        db.query(sql, searchUserName, function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  getUserId : function (idUser){
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM user WHERE idUser =?';
        db.query(sql, idUser, function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  //checkAuth
  searchUserId : function (idUser) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT idUser, username, rol_idRol FROM user WHERE idUser = ?';
        db.query(sql, idUser, function (err, result) {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
  },
  deleteUser : function(idResi){
    return new Promise ((resolve, reject) => {
      let sql = 'DELETE FROM user WHERE idUser=?';
      db.query(sql,idResi,function (err, result) {
          if (err) reject(err);
          resolve(result[0]);
      });
    });
  },
}
