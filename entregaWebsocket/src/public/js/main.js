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

const forms = document.querySelectorAll(".form");

for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener("submit", (e) => {
    e.preventDefault();

    const hiddenInput = forms[i].querySelector(
      "input[type='text'][style='display: none;']"
    ); // Obtén el campo de entrada oculto
    const id = hiddenInput.value; // Obtén el valor del campo de entrada
    console.log(id);
    socket.emit("EliminarProds", id);
    e.target.remove();
  });
}

socket.on("listado", (arrayProds) => {
  listar.innerHTML = ""; //Para evitar duplicados
  arrayProds.forEach((prods) => {
    listar.innerHTML += `
    <form class="form">
    <dl>
    <dt><b>${prods.title}</b></dt>
    <dd><b>Descripcion:</b> ${prods.description}</dd>
    <dd><b>Precio:</b> ${prods.price}</dd>
    <dd><b>Stock:</b> ${prods.stock}</dd>
    <dd><b>Category:</b> ${prods.category}</dd>
  </dl>
  <input type="text" value="${this.id}" style="display: none;" />
  <input type="submit" value="Eliminar" />
</form>`;
  });
});
