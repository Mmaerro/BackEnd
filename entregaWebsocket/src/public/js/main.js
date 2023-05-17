const socket = io();

const formProduct = document.getElementById("formProducto");
const listar = document.getElementById("listar");
const error = document.getElementById("error");
error.style.display = "none";

formProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  const prodsIterator = new FormData(e.target); //transforma un objeto html a un objeto iterator

  //transforma de un objeto iterator a un obketo simple {}
  const prods = Object.fromEntries(prodsIterator);
  const camposValidos = validarForm(formProduct);
  if (camposValidos) {
    socket.emit("nuevoProducto", prods);
    formProduct.reset();
  } else {
    error.style.display = "block";
    setInterval(function () {
      error.style.display = "none";
    }, 2000);
  }
});
function validarForm(form) {
  for (let campo in form) {
    if (form[campo].value === "") {
      return false;
    } else {
      return true;
    }
  }
}
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
