import db from "../config/db.js";
import usuarioM from "../models/Usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export default {
  obtenerUsers : async (req, res) => {
    if(req.usuario.username.toString() !== process.env.USER1.toString()){
      if (req.usuario.username.toString() !== process.env.USER2.toString()) {
        return res.status(401).json({msg : "Acción no Válida"});
      }
    }
    const listaUsers = await usuarioM.getUsers();
    res.json(listaUsers);
  },
  insertUser :  async (req, res)=>{

    if(req.usuario.username.toString() !== process.env.USER1.toString()){
      if (req.usuario.username.toString() !== process.env.USER2.toString()) {
        return res.status(401).json({msg : "Acción no Válida"});
      }
    }

    //Evitar registros duplicados
    const userDetails =req.body;
    const {userNames, userApePaterno, userApeMaterno} = req.body;
    const {username} = req.body;
    const fullName = (`${userNames} ${userApePaterno} ${userApeMaterno}`);

    const dupli = await usuarioM.searchDupliUser(fullName, username);
      if(dupli){
        const error = new Error ("Usuario o Nombre del Usuario ya Registrado");
        return res.status(400).json({msg: error.message});
      }
      //Registrar Usuario en caso de pasar la condicion anterior
      await usuarioM.addUser(userDetails);
      const userAdd = await usuarioM.getUser(username);
      res.json(userAdd);
  },
 autenticar : async (req, res) => {
   const {username, userpassword} = req.body;

   //Comprobar si el usuario y password existe
   const userSearch = await usuarioM.getUser(username)
     if(!userSearch){
       const error = new Error("El Usuario es Incorrecto");
    return res.status(404).json({ msg: error.message });
     }
     bcrypt.compare(userpassword, userSearch.userpassword, function(err, result) {
       if(result==true){
          res.json({
            idUser : userSearch.idUser,
            username : userSearch.username,
            token : generarJWT(userSearch.idUser),
          });
       }else {
         const error = new Error("La Contraseña es Incorrecta");
         return res.status(403).json({ msg: error.message });
       }
     });
 },
 obtenerUserId : async (req, res) => {
   if(req.usuario.username.toString() !== process.env.USER1.toString()){
     if (req.usuario.username.toString() !== process.env.USER2.toString()) {
       return res.status(401).json({msg : "Acción no Válida"});
     }
   }

   const {id} = req.params;

   if (id.toString() === process.env.USERCODE1.toString() || id.toString() === process.env.USERCODE2.toString()){
       return res.status(401).json({msg : "Usuario no Encontrado"});
   }

   const user = await usuarioM.getUserId(id);

   if(!user){
     const error = new Error ("Usuario no Encontrado");
     return res.status(400).json({msg: error.message});
   }
   res.json(user);
 },
 eliminarUser : async (req, res) => {

   if(req.usuario.username.toString() !== process.env.USER1.toString()){
       return res.status(401).json({msg : "Acción no Válida"});
   }

   const {id} = req.params;

   const user = await usuarioM.getUserId(id);
   if(!user){
     const error = new Error ("Usuario no Encontrado");
     return res.status(400).json({msg: error.message});
   }
   await usuarioM.deleteUser(id);
   res.json({ msg: "Usuario Borrardo Correctamente"});
 },
 perfil : function (req, res){
   const {usuario} = req;
   res.json(usuario);
 }
}
