const socket = io();

const formProduct = document.getElementById("formProducto");
const listar = document.getElementById("listar");

function validarForm(form) {
  for (let campo in form) {
    if (form[campo].value === "") {
      return false;
    } else {
      return true;
    }
  }
}
formProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  const prodsIterator = new FormData(e.target); //transforma un objeto html a un objeto iterator

  //transforma de un objeto iterator a un obketo simple {}
  const prods = Object.fromEntries(prodsIterator);
  const camposValidos = validarForm(formProduct);
  if (camposValidos) {
    socket.emit("nuevoProducto", prods);
    console.log("¡Formulario válido!");
    formProduct.reset();
  } else {
    console.log("Por favor, completa todos los campos del formulario.");
  }
});

socket.on("listado", (arrayProds) => {
  console.log(arrayProds);
  listar.innerHTML = ""; //Para evitar duplicados
  arrayProds.forEach((prods) => {
    console.log(prods.title);
    listar.innerHTML += `<dl>
    <dt><b>${prods.title}</b></dt>
    <dd><b>Descripcion:</b> ${prods.description}</dd>
    <dd><b>Precio:</b> ${prods.price}</dd>
    <dd><b>Stock:</b> ${prods.stock}</dd>
    <dd><b>Category:</b> ${prods.category}</dd>
  </dl>`;
  });
});
