import "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import viewsRouter from "./routes/views.routes.js";
import { __dirname, __filename } from "./path.js";
import { engine } from "express-handlebars";
import multer from "multer";
import * as path from "path";
import { Server } from "socket.io";

//*routes

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//*Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: storage });

//*ServerIO

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Cliente conectado index");
});
app.use((req, res, next) => {
  req.io = io;
  return next();
});

//*Routes
app.use("/api", express.static(__dirname + "/public"));
app.use("/api/product", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/", viewsRouter);
app.post("/api/upload", upload.single("product"), (req, res) => {
  //Imagenes
  console.log(req.body);
  console.log(req.file);
  res.send("Imagen subida");
});

//CONECTAR CON LA BASE DE DATOS a traves de mongoose
mongoose
  .connect(process.env.URL_MONGODB_ATLAS)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("Error en MongoDB Atlas: ", err));

app.listen(process.env.PORT, () => {
  console.log("Server on port", process.env.PORT);
});
