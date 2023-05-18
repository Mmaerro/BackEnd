import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager("./productos.txt");

const productRouter = Router(); //productRouter va a ser la implementacion de router

productRouter.get("/", async (req, res) => {
  let { limit } = req.query;
  const products = await productManager.getProducts();
  if (!limit) return res.send(JSON.stringify(products));
  res.send(JSON.stringify(products.slice(0, limit)));
});

productRouter.get("/:id", async (req, res) => {
  const product = await productManager.getProductById(req.params.id);
  // res.send(product);
  res.render("product", {
    title: product.title,
    description: product.description,
    price: product.price,
    code: product.code,
    stock: product.stock,
  });
});

productRouter.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  await productManager.addProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });
  res.send("Producto creado!");
});

productRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  const mensaje = await productManager.updateProduct(id, {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  });
  res.send(mensaje);
});

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const mensaje = await productManager.deleteProduct(id);
  res.send(mensaje);
});

export default productRouter;
