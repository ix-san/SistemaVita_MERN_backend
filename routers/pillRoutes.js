import express from "express";
const router = express.Router();
import db from "../config/db.js";
import pillC from "../controllers/pillController.js";
import checkAuth from "../middleware/checkAuth.js";

router.post("/",checkAuth, pillC.agregarPill);

router
    .route("/:id")
    .get(checkAuth, pillC.obtenerPill);


export default router;
