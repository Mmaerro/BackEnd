import { Router } from "express";
import { productModel } from "../persistencia/models/Products.js";

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
  res.render("product", { product });
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

  try {
    // Crear un nuevo documento de producto utilizando el modelo definido con Mongoose
    const product = new productModel({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    // Guardar el producto en la base de datos
    await product.save();

    res.send("Producto creado!");
  } catch (error) {
    console.error("Error al crear el producto", error);
    res.status(500).send("Ha ocurrido un error al crear el producto");
  }
});

productRouter.put("/:id", async (req, res) => {
  const productId = req.params.id;
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

  try {
    // Buscar el producto por su ID y actualizar sus campos
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      },
      { new: true } // Devuelve el producto actualizado en la respuesta
    );

    if (updatedProduct) {
      res.send("Producto actualizado!");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    res.status(500).send("Ha ocurrido un error al actualizar el producto");
  }
});

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const mensaje = await productModel.findByIdAndDelete(id);
  res.send(mensaje);
});

export default productRouter;
