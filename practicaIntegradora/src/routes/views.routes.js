import { Router } from "express";
import { messageModel } from "../models/Messages.js";
import { productModel } from "../models/Products.js";
import mongoose from "mongoose";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productModel.find();
  const productData = JSON.parse(JSON.stringify(products));
  req.io.on("connection", async (socket) => {
    console.log("Cliente desde View");
    socket.on("nuevoProducto", async (prods) => {
      const newProduct = {
        title: prods.title,
        description: prods.description,
        category: prods.category,
        price: prods.price,
        stock: prods.stock,
        code: "que pongo aca?",
      };
      await productModel.create(newProduct);
      const productss = await productModel.find();
      req.io.emit("listado", productss);
    });
    socket.on("EliminarProds", async (id) => {
      await productModel.findByIdAndRemove(id);
    });
  });

  res.render("realtimeproducts", { products: productData });
});

viewsRouter.get("/chat", async (req, res) => {
  const mensaje = await messageModel.find();
  const mensajeData = JSON.parse(JSON.stringify(mensaje));
  mensajeData.reverse(); // Invierte el orden de los mensajes
  const mensajesFormateados = mensajeData.map((mensaje) => {
    const fechaCreacion = new Date(mensaje.createdAt);
    const hora = fechaCreacion.getHours();
    const minutos = fechaCreacion.getMinutes();
    return { ...mensaje, hora, minutos };
  });

  req.io.on("connection", async (socket) => {
    console.log("Cliente desde view");
    socket.on("newMessage", async (content) => {
      console.log(content);

      const newMessage = {
        user: content.emailUser,
        message: content.message,
      };

      await messageModel.create(newMessage);
      const mensajes = await messageModel.find();
      //const mensajeDatas = JSON.parse(JSON.stringify(mensajes));

      req.io.emit("messages", mensajes);
    });
    socket.on("messageDelete", async (_id) => {
      await messageModel.findByIdAndRemove(_id);
    });
  });
  res.render("chat", { mensajes: mensajesFormateados });
});
viewsRouter.get("/products", async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
    };

    const { docs, totalPages, totalDocs } = await productModel.paginate(
      {},
      options
    );

    res.render("products", {
      products: docs,
      pageCount: totalPages,
      itemCount: totalDocs,
      currentPage: options.page,
      pages: mongoose.paginate.getArrayPages(req)(3, totalPages, options.page),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
});
viewsRouter.get("/prods", async (req, res) => {
  try {
    const products = await productModel.find();
    const productData = JSON.parse(JSON.stringify(products));
    res.render("products", { products: productData });
  } catch (error) {
    res.send(error);
  }
});
viewsRouter.get("/home", async (req, res) => {
  try {
    const products = await productModel.find();
    res.render("home", { products });
  } catch (error) {
    res.send(error);
  }
});
viewsRouter.get("/detail/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const products = await productModel.findById(pid);
    const productData = JSON.parse(JSON.stringify(products));
    res.render("productDetail", { products: productData });
  } catch (error) {
    res.send(error);
  }
});

export default viewsRouter;
