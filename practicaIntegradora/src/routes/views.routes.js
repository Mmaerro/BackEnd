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
      await productModel.create([
        {
          title: prods.title,
          description: prods.description,
          category: prods.category,
          price: prods.price,
          stock: prods.stock,
          code: "que pongo aca?",
        },
      ]);
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
  req.io.on("connection", async (socket) => {
    console.log("Cliente desde view");
    socket.on("newMessage", async (content) => {
      console.log(content.emailUser);

      await messageModel.create([
        {
          user: content.emailUser,
          message: content.message,
        },
      ]);

      const mensajes = await messageModel.find();
      const mensajeDatas = JSON.parse(JSON.stringify(mensajes));

      req.io.emit("messages", mensajeDatas);
    });
    socket.on("messageDelete", async (_id) => {
      await messageModel.findByIdAndRemove(_id);
    });
  });
  res.render("chat", { mensajes: mensajeData });
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
