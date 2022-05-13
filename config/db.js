import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connectDB =  mysql.createConnection({
      host:process.env.HOST,
      user: process.env.USERDB,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
connectDB.connect(function(err) {
      if (err) throw err;
        console.log("Conectado a la DB");
    });

export default connectDB;
