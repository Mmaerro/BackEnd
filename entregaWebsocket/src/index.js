//*importaciones
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import express, { json } from "express";
import viewsRouter from "./routes/views.routes.js";
import { __dirname, __filename } from "./path.js";
import { engine } from "express-handlebars";
import multer from "multer";
import * as path from "path";
import { Server } from "socket.io";

//*Configuraciones
const app = express();
const PORT = 8080;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

//*ejecutar el server
const server = app.listen(PORT, () => {
  console.log(`Server On PORT ${PORT}`);
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

//*HBS
app.get("/api", (req, res) => {
  res.render("index");
});
