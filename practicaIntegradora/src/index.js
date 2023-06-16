import "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import viewsRouter from "./routes/views.routes.js";
import usersRouter from "./routes/user.routes.js";
import { __dirname, __filename } from "./path.js";
import { engine } from "express-handlebars";
import multer from "multer";
import * as path from "path";
import { Server } from "socket.io";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import mongoStore from "connect-mongo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//*Middleware

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

//*Conectar a la base de datos mongoDB a traves de mongoose
mongoose
  .connect(process.env.URL_MONGODB_ATLAS)
  .then(() => console.log("DB is connected"))
  .catch((error) => console.log("Error en MongoDB Atlas :", error));

const server = app.listen(process.env.PORT, () => {
  console.log("Server on port", process.env.PORT);
});
//*ServerIO
const io = new Server(server, { cors: { origin: "*" } });

app.use((req, res, next) => {
  req.io = io;
  return next();
});

// sessions mongo
app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.URL_MONGODB_ATLAS,
      ttl: 60,
    }),
    secret: "sessionSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

//*Routes
app.use("/api/", express.static(__dirname + "/public"));
app.use("/api/product", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/", viewsRouter);
app.use("/api/users", usersRouter);

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

// await messageModel.create([
//   {
//     user: "mat@mati.com",
//     message: "hola",
//   },
// ]);
// import CartModel from "./models/Cart.js";

// await CartModel.create([
//   {
//     id_prod: "646cfc8560ca3d35fd83e08d",
//     cant: 3,
//   },
// ]);
