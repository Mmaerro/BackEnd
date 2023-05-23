import { Router } from "express";
import { messageModel } from "../models/Messages.js";
import { productModel } from "../models/Products.js";

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

viewsRouter.get("/home", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.send(error);
  }
});

export default viewsRouter;
