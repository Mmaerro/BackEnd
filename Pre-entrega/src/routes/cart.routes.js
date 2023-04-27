import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager("./cart.txt");

const cartRouter = Router(); 
cartRouter.post("/", async (req, res) => {
  await cartManager.createCarrito();
  res.send("Carrito creado");
});

cartRouter.get("/:cid", async (req, res) => {
  const cartsProducts = await cartManager.getCartById(req.params.cid);
  res.send(cartsProducts);
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;
  const { cid, pid } = req.params;
  res.send(await cartManager.addProductCart(cid, quantity, pid));
});

cartRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description, price, thumnail, code, stock } = req.body;
  const mensaje = await cartManager.updateProduct(id, {
    title,
    description,
    price,
    thumnail,
    code,
    stock,
  });
  res.send(mensaje);
});

cartRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const mensaje = await cartManager.deleteProduct(id);
  res.send(mensaje);
});

export default cartRouter;
