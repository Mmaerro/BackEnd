import { promises as fs } from "fs";
export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  async addProduct(producto) {
    const prodsJSON = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(prodsJSON);
    producto.id = ProductManager.incrementarID();
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
    { title, description, code, price, status, stock, category, thumbnails }
  ) {
    const prodsJSON = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(prodsJSON);
    if (prods.some((prod) => prod.id === parseInt(id))) {
      let index = prods.findIndex((prod) => prod.id === parseInt(id));
      prods[index].title = title;
      prods[index].description = description;
      prods[index].code = code;
      prods[index].price = price;
      prods[index].status = status;
      prods[index].stock = stock;
      prods[index].category = category;
      prods[index].thumbnails = thumbnails;
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

// const prod1 = new Product(
//   "Arroz",
//   "Arroz grano medio",
//   90,
//   "sin imagen",
//   "no se",
//   25
// );
// const prod2 = new Product(
//   "Fideos",
//   "Fideos Moñita",
//   60,
//   "sin imagen2",
//   "fideo",
//   15
// );
// const prod3 = new Product(
//   "Azucar",
//   "Azucar Rubia",
//   100,
//   "sin imagen2",
//   "rubia",
//   35
// );
// const prod4 = new Product(
//   "Azucar",
//   "Azucar morena",
//   50,
//   "sin imagen2",
//   "morena",
//   5
// );

// prod.getProducts().then((prod) => console.log(prod));
