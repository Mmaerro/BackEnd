import "./persistencia/dbConfig.js";
import "dotenv/config";
import express, { json } from "express";
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
import mongoStore from "connect-mongo";
import passport from "passport";
import "./passportStrategies.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

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
//passport
app.use(passport.initialize());
app.use(passport.session());

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


const server = app.listen(process.env.PORT, () => {
  console.log("Server on port", process.env.PORT);
});

//*ServerIO
const io = new Server(server, { cors: { origin: "*" } });

app.use((req, res, next) => {
  req.io = io;
  return next();
});

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
