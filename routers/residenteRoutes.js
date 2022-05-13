import express from "express";
const router = express.Router();
import db from "../config/db.js";
import residenteC from "../controllers/residenteController.js";
import checkAuth from "../middleware/checkAuth.js";

router.post("/listaActivoInactivo", checkAuth, residenteC.obtenerlistaActivoInactivo);
router.post("/listaTodos", checkAuth, residenteC.obtenerlistaTodos);

router
    .route("/")
    .get(checkAuth, residenteC.obtenerResidentes)
    .post(checkAuth, residenteC.nuevoResidente);

router
    .route("/:id")
    .get(checkAuth, residenteC.obtenerResidente)
    .put(checkAuth, residenteC.editarResidente)
    .delete(checkAuth, residenteC.eliminarResidente);

export default router;
