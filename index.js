import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import usuarioRoutes from "./routers/usuarioRoutes.js"
import residenteRoutes from "./routers/residenteRoutes.js"
import pagoRoutes from "./routers/pagoRoutes.js"
import pillRoutes from "./routers/pillRoutes.js"


const app = express();
app.use(express.json()); //Leer la info que viene como json

dotenv.config();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

//routers
app.use("/api/usuario", usuarioRoutes);
app.use("/api/residente", residenteRoutes);
app.use("/api/pago", pagoRoutes);
app.use("/api/pill", pillRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
})
