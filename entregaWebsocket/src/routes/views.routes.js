import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager("./productos.txt");

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();

  req.io.on("connection", async (socket) => {
    console.log("Cliente desde View");
    socket.on("nuevoProducto", async (prods) => {
      await productManager.addProduct(prods);
      const productss = await productManager.getProducts();
      req.io.emit("listado", productss);
    });
  });

  res.render("realtimeproducts", { products });
});

viewsRouter.get("/home", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.send(error);
  }
});

export default viewsRouter;
