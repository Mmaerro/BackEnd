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
    this.id = Product.agregarID();
  }

  static agregarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProductById(id) {
    const productFilter = this.products.find((element) => element.id === id);
    if (productFilter) {
      return productFilter;
    }
    return "Not Found";
  }

  getProducts() {
    return this.products;
  }

  addProducts(producto) {
    if (this.products.find((e) => e.code === producto.code)) {
      return "El valor - CODE - ya esta en uso ingrese otro";
    } else {
      this.products.push(producto);
      return "Producto creado con exito!!!";
    }
  }
}
const productManager = new ProductManager();
const producto1 = new Product(
  "Producto prueba 1",
  "prueba1",
  2300,
  "sin imagen",
  "aasd3",
  25
);
const producto2 = new Product(
  "Producto prueba 2",
  "prueba2",
  2300,
  "sin imagen2",
  "hola",
  25
);
const producto3 = new Product(
  "Producto prueba 3",
  "prueba1",
  2300,
  "sin imagen3",
  "alo",
  25
);
const producto4 = new Product(
  "Producto prueba 4",
  "prueba4",
  2300,
  "sin imagen4",
  "chau",
  25
);

productManager.addProducts(producto1);
productManager.addProducts(producto2);
productManager.addProducts(producto3);
productManager.addProducts(producto3);
console.log(productManager.addProducts(producto1));
console.log(productManager.getProductById(2));
console.log(productManager.getProductById(5));
console.log(productManager.getProducts());
