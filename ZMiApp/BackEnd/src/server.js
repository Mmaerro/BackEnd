import "dotenv/config";
import cors from "cors";

import productRouter from "./routes/Products.routes.js";
import apiRouter from "./routes/api.routes.js";
import express, { json } from "express";
import { __dirname, __filename } from "./path.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_APP,
      process.env.BUILD_APP,
    ],
  })
);

app.use("/api/product", productRouter);
app.use("/api/app", apiRouter);
// app.use("/api/carts", cartRouter);
// app.use("/api/", viewsRouter);
// app.use("/api/users", usersRouter);
const server = app.listen(process.env.PORT, () => {
  console.log("Server on PORT:", process.env.PORT);
});
