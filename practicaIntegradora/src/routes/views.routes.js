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

  res.render("realTimeProducts", { products: productData });
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

viewsRouter.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  try {
    const {
      docs,
      total,
      totalPages,
      nextPage,
      prevPage,
      hasPrevPage,
      hasNextPage,
      page: currentPage,
    } = await productModel.paginate({}, { page, limit });
    const paginationPages = [];

    for (let i = 1; i <= totalPages; i++) {
      paginationPages.push({
        page: i,
        isCurrent: i === currentPage,
      });
    }
    const productData = JSON.parse(JSON.stringify(docs));
    res.render("products", {
      products: productData,
      totalProducts: total,
      totalPages,
      hasPrevPage,
      hasNextPage,
      currentPage,
      itemsPerPage: limit,
      prevPage,
      nextPage,
      paginationPages,
    });
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).send("Ha ocurrido un error al obtener los productos");
  }
});
// viewsRouter.get("/register", async (req, res) => {
//   res.render("register");
// });

// viewsRouter.post("/register", async (req, res) => {
//   const { email, password, firstName, lastName, age } = req.body;
//   const newUsuario = {
//     first_name: firstName,
//     last_name: lastName,
//     email: email,
//     age: age,
//     rol: "user",
//     password: password,
//   };

//   const user = new userModel(newUsuario);
//   await user.save();

//   res.redirect("/login");
// });

// viewsRouter.get("/login", async (req, res) => {
//   res.render("login");
// });

// viewsRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await userModel.findOne({ email: email });

//     if (!user) {
//       // Si el usuario no existe, muestra un mensaje de error o redirecciona a una página de error
//       return res.render("login", {
//         error: "Correo electrónico o contraseña incorrectos",
//       });
//     }

//     // Verificar la contraseña del usuario
//     const isPasswordValid = await user.comparePassword(password);

//     if (!isPasswordValid) {
//       // Si la contraseña no coincide, muestra un mensaje de error o redirecciona a una página de error
//       return res.render("login", {
//         error: "Correo electrónico o contraseña incorrectos",
//       });
//     }

//     // Si el correo electrónico y la contraseña son válidos, se puede iniciar sesión correctamente
//     // Puedes guardar la información de inicio de sesión en la sesión o generar un token de autenticación

//     // Redireccionar al usuario a la página deseada después del inicio de sesión exitoso
//     res.redirect("/products");
//   } catch (error) {
//     console.error("Error al iniciar sesión:", error);
//     res.status(500).send("Ha ocurrido un error al iniciar sesión");
//   }
// });

viewsRouter.get("/", (req, res) => {
  res.render("login");
});

viewsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

viewsRouter.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

viewsRouter.get("/errorSignup", (req, res) => {
  res.render("errorSignup");
});

viewsRouter.get("/profile", (req, res) => {
  console.log(req);
  res.render("profile");
});
export default viewsRouter;
