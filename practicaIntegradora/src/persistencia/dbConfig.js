import mongoose from "mongoose";
import "dotenv/config";

//*Conectar a la base de datos mongoDB a traves de mongoose
mongoose
  .connect(process.env.URL_MONGODB_ATLAS)
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log("Error en MongoDB Atlas :", error));
