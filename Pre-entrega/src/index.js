//*importaciones
import express, { json } from "express";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import multer from "multer";

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

//*Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //
const upload = multer({ storage: storage }); //

//*Routes
app.use("/api/product", productRouter);
app.use("/api/carts", cartRouter);
app.use("static", express.static(__dirname + "/publico"));
app.post("/upload", upload.single("product"), (req, res) => {
  //Imagenes
  console.log(req.body);
  console.log(req.file);
  res.send("Imagen subida");
});

//*ejecutar el server
app.listen(PORT, () => {
  console.log(`Server On PORT ${PORT}`);
});
