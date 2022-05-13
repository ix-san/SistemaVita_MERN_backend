import express from "express";
const router = express.Router();
import db from "../config/db.js";
import usuarioC from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

router.post("/login", usuarioC.autenticar); //autenticar usuario
router.get("/perfil", checkAuth, usuarioC.perfil); //autenticar usuario y enviar a perfil

router
    .route("/")
    .get(checkAuth, usuarioC.obtenerUsers)
    .post(checkAuth, usuarioC.insertUser);

router
    .route("/:id")
    .get(checkAuth, usuarioC.obtenerUserId)
    .delete(checkAuth, usuarioC.eliminarUser);

export default router;
