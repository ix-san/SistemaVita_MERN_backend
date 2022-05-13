import express from "express";
const router = express.Router();
import db from "../config/db.js";
import pagoC from "../controllers/pagoController.js";
import checkAuth from "../middleware/checkAuth.js";

router.post("/fechasActivoInactivo", checkAuth, pagoC.obtenerFechasActivoInactivo);
router.post("/fechasTodos", checkAuth, pagoC.obtenerFechasTodos);

router
    .route("/")
    .get(checkAuth, pagoC.obtenerPagos)
    .post(checkAuth, pagoC.agregarPago);

router
    .route("/:id")
    .get(checkAuth, pagoC.obtenerPago)
    .delete(checkAuth, pagoC.eliminarPago);


export default router;
