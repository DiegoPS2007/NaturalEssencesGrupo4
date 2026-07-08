document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const repetirPassword = document.getElementById("repetir-password");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const datosUsuario = {
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            correo: email.value.trim(),
            contrasena: password.value
        };

        if (!datosUsuario.nombre || !datosUsuario.apellido || !datosUsuario.correo || !datosUsuario.contrasena) {
            alert("Completa todos los campos obligatorios.");
            return;
        }

        if (datosUsuario.contrasena.length < 6) {
            alert("La contrasena debe tener minimo 6 caracteres.");
            return;
        }

        if (datosUsuario.contrasena !== repetirPassword.value) {
            alert("Las contrasenas no coinciden.");
            return;
        }

        if (StorageNE.buscarUsuarioPorCorreo(datosUsuario.correo)) {
            alert("Este correo ya esta registrado.");
            return;
        }

        const usuario = StorageNE.crearUsuario(datosUsuario);
        StorageNE.iniciarSesion(usuario.id, true);
        alert("Cuenta creada correctamente.");
        window.location.href = "perfil.html";
    });
});
