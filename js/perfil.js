document.addEventListener("DOMContentLoaded", () => {
    let usuario = StorageNE.protegerPagina();
    if (!usuario) {
        return;
    }

    const formDatos = document.getElementById("formPerfil");
    const formPassword = document.getElementById("formPassword");
    const btnEditarPerfil = document.getElementById("btnEditarPerfil");
    const nombres = document.getElementById("nombres");
    const apellidos = document.getElementById("apellidos");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const fecha = document.getElementById("fecha");
    const actual = document.getElementById("actual");
    const nueva = document.getElementById("nueva");
    const confirmar = document.getElementById("confirmar");
    const camposPerfil = [nombres, apellidos, telefono, fecha];

    function bloquearCamposPerfil() {
        camposPerfil.forEach((campo) => {
            campo.setAttribute("readonly", "readonly");
        });
    }

    function habilitarCamposPerfil() {
        camposPerfil.forEach((campo) => {
            campo.removeAttribute("readonly");
        });
        nombres.focus();
    }

    function cargarPerfil() {
        usuario = StorageNE.obtenerUsuarioActual();
        StorageNE.pintarDatosMenuUsuario(usuario);
        nombres.value = usuario.nombre || "";
        apellidos.value = usuario.apellido || "";
        correo.value = usuario.correo || "";
        telefono.value = usuario.telefono || "";
        fecha.value = usuario.fechaNacimiento || "";
    }

    correo.setAttribute("readonly", "readonly");
    bloquearCamposPerfil();
    StorageNE.activarCerrarSesion();
    cargarPerfil();

    btnEditarPerfil.addEventListener("click", () => {
        habilitarCamposPerfil();
    });

    formDatos.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!nombres.value.trim() || !apellidos.value.trim()) {
            alert("Nombre y apellido son obligatorios.");
            return;
        }

        usuario = StorageNE.actualizarUsuarioActual({
            nombre: nombres.value.trim(),
            apellido: apellidos.value.trim(),
            telefono: telefono.value.trim(),
            fechaNacimiento: fecha.value.trim()
        });

        cargarPerfil();
        bloquearCamposPerfil();
        alert("Datos actualizados correctamente.");
    });

    formPassword.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (actual.value !== usuario.contrasena) {
            alert("La contrasena actual no es correcta.");
            return;
        }

        if (nueva.value.length < 6) {
            alert("La nueva contrasena debe tener minimo 6 caracteres.");
            return;
        }

        if (nueva.value !== confirmar.value) {
            alert("Las nuevas contraseñas no coinciden.");
            return;
        }

        usuario = StorageNE.actualizarUsuarioActual({
            contrasena: nueva.value
        });

        formPassword.reset();
        alert("Contrasena actualizada correctamente.");
    });
});
