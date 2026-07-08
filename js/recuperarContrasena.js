document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const email = document.getElementById("email");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const usuario = StorageNE.buscarUsuarioPorCorreo(email.value);
        if (!usuario) {
            alert("No existe una cuenta con ese correo.");
            return;
        }

        StorageNE.actualizarUsuario(usuario.id, {
            contrasena: "123456"
        });

        alert("Tu contrasena fue restablecida a 123456. Inicia sesion y cambiala desde tu perfil.");
        window.location.href = "iniciarSesion.html";
    });
});
