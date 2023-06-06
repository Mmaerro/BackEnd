import { Router } from "express";
import { ProductManager } from "../ProductManager.js";
import { productModel } from "../models/Products.js";

const productManager = new ProductManager("./productos.txt");

const productRouter = Router(); //productRouter va a ser la implementacion de router

productRouter.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort === "desc" ? -1 : 1;
  const query = req.query.query || "";

  const options = {
    limit: limit,
    page: page,
    sort: { price: sort }, 
  };

  const queryOptions = {
    category: { $regex: query, $options: "i" }, // Filtrar por categoría con expresión regular (insensible a mayúsculas y minúsculas)
    stock: { $gt: 0 }, // Filtrar por stock mayor a 0
  };
  try {
    //Filtrado //Configuracion de paginas
    const products = await productModel.find();
    if (!limit) return res.send(JSON.stringify(products));
    const result = await productModel.paginate(queryOptions, options);
    res.send(JSON.stringify(result));
    console.log(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
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
