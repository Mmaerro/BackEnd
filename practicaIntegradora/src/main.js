const socket = io();

//* Listado de productos en tiempo real
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

//*Chat

const botonChat = document.getElementById("botonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes");
const val = document.getElementById("chatBox");
let user;

Swal.fire({
  title: "Identificacion de Usuario",
  text: "Por favor ingrese su nombre de usuario",
  input: "text",
  inputValidator: (valor) => {
    return !valor && "Ingrese un valor valido";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
  console.log(user);
});

botonChat.addEventListener("click", () => {
  if (val.value.trim().length > 0) {
    //Consultar si el input no esta vacio
    socket.emit("mensaje", { usuario: user, mensaje: val.value });
    val.value = "";
  }
});

socket.on("mensajes", (arrayMensajes) => {
  parrafosMensajes.innerHTML = ""; //Para evitar duplicados
  arrayMensajes.forEach((mensaje) => {
    parrafosMensajes.innerHTML += `<p>${mensaje.usuario} : ${mensaje.mensaje}</p>`;
  });
});
