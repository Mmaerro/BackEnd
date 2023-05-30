const socket = io();

const fromUser = document.getElementById("createUserForm");
fromUser.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita el envío del formulario por defecto
  alert("hola");
  const email = document.getElementById("email").value;
  const nickname = document.getElementById("nickname").value;
  const photo = document.getElementById("photo").files[0];

  const formData = new FormData();
  formData.append("email", email);
  formData.append("nickname", nickname);
  formData.append("photo", photo);

  socket.emit("createUser", formData);
});
