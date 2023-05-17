import { promises as fs } from "fs";

export class CartManager {
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

  async createCarrito() {
    const cartsJSON = await fs.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsJSON);
    const carrito = {
      id: CartManager.incrementarID(),
      products: [],
    };
    carts.push(carrito);
    await fs.writeFile(this.path, JSON.stringify(carts));
    return "Carrito creado";
  }

  async getCartById(id) {
    const cartsJSON = await fs.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsJSON);
    if (carts.some((cart) => cart.id === parseInt(id))) {
      return carts.find((cart) => cart.id === parseInt(id));
    } else {
      return "Carrito no encontrado";
    }
  }

  async addProductCart(idCart, quantity, id) {
    const cartsJSON = await fs.readFile(this.path, "utf-8");
    const carts = JSON.parse(cartsJSON);
    const carrito = carts.find((cart) => cart.id === parseInt(idCart));
    if (carrito.products.some((product) => product.idProd === id)) {
      const cp = carrito.products.find((cart) => cart.idProd === id);
      cp.quantity = quantity;
      await fs.writeFile(this.path, JSON.stringify(carts));
      return "Cantidad Actualizada";
    } else {
      const producto = {
        idProd: id,
        quantity: quantity,
      };
      carrito.products.push(producto);
      await fs.writeFile(this.path, JSON.stringify(carts));
      return "Producto agregado";
    }
  }
}
