import jwt from "jsonwebtoken";
import usuarioM from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  let token;
  if(
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ){
      try{
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_lihim);

        req.usuario = await usuarioM.searchUserId(decoded.id);

        return next();
      }catch(error){
        return res.status(404).json({msg:'Hubo un error'})
        console.log(error);
      }
  }
  if(!token){
    const error = new Error("Token No valido");
    return res.status(401).json({msg : error.message});
  }
  next();
};

export default checkAuth;
