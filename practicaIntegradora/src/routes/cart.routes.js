import { Router } from "express";
import mongoose from "mongoose";
import { CartManager } from "../CartManager.js";
import cartModel from "../models/Cart.js";
import { productModel } from "../models/Products.js";

const cartManager = new CartManager("./cart.txt");

const cartRouter = Router(); //cartRouter va a ser la implementacion de router

// DELETE de producto en especifico
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    cart.products = cart.products.filter(
      (product) => product._id.toString() !== pid
    );
    await cart.save();
    console.log(cart);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product from cart",
      error: error.message,
    });
  }
});

// Aagregar producto al carrito
cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartModel.findById(cid);

    // Verificar si el producto ya existe en el carrito
    const existingProduct = cart.products.find(
      (product) => product.id_prod.toString() === pid);
    if (existingProduct) {
      // El producto ya existe, actualizar la cantidad
      existingProduct.quantity = quantity;
    } else {
      // El producto no existe, agregarlo al carrito
      const addProductToCart = {
        id_prod: new mongoose.Types.ObjectId(pid),
        quantity: quantity,
      };
      cart.products.push(addProductToCart);
    }

    await cart.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar el producto al carrito",
      error: error.message,
    });
  }
});
// eliminartodos los productos de un carrito en especifico
cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);

    cart.products = [];
    await cart.save();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart", error: error.message });
  }
});
//traer todos los productos con sus datos
cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid).populate("products.id_prod");

    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error obtentiendo", error: error.message });
  }
});

export default cartRouter;
