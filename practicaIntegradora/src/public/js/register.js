// const socket = io();

// const formRegister = document.getElementById("formRegister");
// const error = document.getElementById("error");

// formRegister.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const regisIterator = new FormData(e.target); //transforma un objeto html a un objeto iterator

//   //transforma de un objeto iterator a un obketo simple {}
//   const campos = Object.fromEntries(regisIterator);
//   const camposValidos = validarForm(formRegister);
//   if (camposValidos) {
//     socket.emit("newRegister", campos);
//     formRegister.reset();
//   } else {
//     error.style.display = "block";
//     setInterval(function () {
//       error.style.display = "none";
//     }, 3000);
//   }
// });

// function validarForm(campos) {
//   const regexLetras = /^[A-Za-z]+$/; // Expresión regular para solo letras
//   const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,10}$/; // Expresión regular para letras y mínimo 1 número, máximo 10 caracteres

//   // Validar campo de nombre y apellido
//   if (
//     !regexLetras.test(campos.firstName.value) ||
//     !regexLetras.test(campos.lastName.value)
//   ) {
//     error.innerHTML = "El nombre y el apellido solo deben contener letras.";
//     return false;
//   }

//   // Validar campo de contraseña
//   if (!regexPass.test(campos.password.value)) {
//     error.innerHTML =
//       "La contraseña debe contener al menos una letra y un número, y tener entre 1 y 10 caracteres.";
//     return false;
//   }

//   // Si todas las validaciones pasan, los campos son válidos
//   return true;
// }
