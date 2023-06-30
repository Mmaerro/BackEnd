import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.URL_MONGODB_ATLAS)
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log("Error en MongoDB Atlas :", error));
