//*CHAT
const socket = io();

const formChat = document.getElementById("chat");
const listarMen = document.getElementById("sss");
const mesageError = document.getElementById("mesageError");

formChat.addEventListener("submit", (e) => {
  e.preventDefault();

  const prodsIterator = new FormData(e.target); //transforma un objeto html a un objeto iterator
  //transforma de un objeto iterator a un obketo simple {}
  const content = Object.fromEntries(prodsIterator);
  console.log(prodsIterator);
  console.log(content);
  const camposValidos = validarForm(formChat);
  if (camposValidos) {
    socket.emit("newMessage", content);
    console.log(content);
    formChat.reset();
  } else {
    mesageError.style.display = "block";
    setInterval(function () {
      mesageError.style.display = "none";
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
socket.on("messages", (arrMessages) => {
  listarMen.innerHTML = ""; //Para evitar duplicados
  console.log(arrMessages);
  arrMessages.forEach((mensaje) => {
    listarMen.innerHTML += `
    <div class="mensaje">
    <p><b>${mensaje.user}</b></p>
    <p> ${mensaje.message}</p>
    <button class="btnEliminar" value="${mensaje._id}">Eliminar</button>
  </div>
     `;
  });
});
const btn = document.querySelectorAll(".btnEliminar");
for (let i = 0; btn.length > i; i++) {
  btn[i].addEventListener("click", (e) => {
    let _id = btn[i].value;
    socket.emit("messageDelete", { _id });
    e.target.parentElement.remove();
  });
}
