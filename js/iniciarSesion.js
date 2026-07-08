document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const recordar = document.getElementById("terminos");

    const idRecordado = localStorage.getItem("naturalEssencesRecordar");
    if (idRecordado) {
        const usuarioRecordado = StorageNE.buscarUsuarioPorId(idRecordado);
        if (usuarioRecordado) {
            email.value = usuarioRecordado.correo;
            recordar.checked = true;
        }
    }

    recordar.removeAttribute("required");

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const usuario = StorageNE.buscarUsuarioPorCorreo(email.value);

        if (!usuario || usuario.contrasena !== password.value) {
            alert("Correo o contrasena incorrectos.");
            return;
        }

        StorageNE.iniciarSesion(usuario.id, recordar.checked);
        window.location.href = "perfil.html";
    });
});
