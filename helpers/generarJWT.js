import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return jwt.sign({id}, process.env.JWT_lihim,{
    expiresIn: '2h', // expira en 2 horas
  });
}
export default generarJWT;
