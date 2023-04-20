import { promises as fs } from "fs";
class Product {
  constructor(
    title = "",
    description = "",
    price = 0,
    thumbnail = "",
    code = "",
    stock = 0
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(producto) {
    const prodsJSON = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(prodsJSON);
    producto.id = prods.length + 1;
    prods.push(producto);
    await fs.writeFile(this.path, JSON.stringify(prods));
    return "Producto creado";
  }

  async getProducts() {
    const prods = await fs.readFile(this.path, "utf-8");
    return JSON.parse(prods);
  }

  async getProductById(id) {
    const prodsJSON = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(prodsJSON);
    if (prods.some((prod) => prod.id === parseInt(id))) {
      return prods.find((prod) => prod.id === parseInt(id));
    } else {
      return "Producto no encontrado";
    }
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock }
  ) {
    const prodsJSON = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(prodsJSON);
    if (prods.some((prod) => prod.id === parseInt(id))) {
      let index = prods.findIndex((prod) => prod.id === parseInt(id));
      prods[index].title = title;
      prods[index].description = description;
      prods[index].price = price;
      prods[index].thumbnail = thumbnail;
      prods[index].code = code;
      prods[index].stock = stock;
      await fs.writeFile(this.path, JSON.stringify(prods));
      return "Producto actualizado";
    } else {
      return "Producto no encontrado";
    }
  }

  async deleteProduct(id) {
    const prodsJSON = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(prodsJSON);
    if (prods.some((prod) => prod.id === parseInt(id))) {
      const prodsFiltrados = prods.filter((prod) => prod.id !== parseInt(id));
      await fs.writeFile(this.path, JSON.stringify(prodsFiltrados));
      return "Producto eliminado";
    } else {
      return "Producto no encontrado";
    }
  }
}

const prod1 = new Product(
  "Producto prueba 1",
  "prueba1",
  2300,
  "sin imagen",
  "aasd3",
  25
);
const prod2 = new Product(
  "Producto prueba 2",
  "prueba2",
  2300,
  "sin imagen2",
  "hola",
  25
);

const prod = new ProductManager("./info.txt");
prod.addProduct(prod2);
prod.getProducts().then((prod) => console.log(prod));
