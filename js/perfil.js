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

    function soloLetras(texto) {
        return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(texto.trim());
    }

    function limpiarCampoLetras(campo) {
        campo.value = campo.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    }

    function limpiarTelefono() {
        telefono.value = telefono.value.replace(/\D/g, "").slice(0, 9);
    }

    function limpiarFecha() {
        fecha.value = fecha.value.replace(/[^\d/]/g, "").slice(0, 10);
    }

    function fechaValida(valor) {
        if (!valor.trim()) {
            return true;
        }

        const partes = valor.trim().match(/^(\d{2})\/(\d{2})\/(\d{2}|\d{4})$/);
        if (!partes) {
            return false;
        }

        const dia = Number(partes[1]);
        const mes = Number(partes[2]);
        let anio = Number(partes[3]);

        if (partes[3].length === 2) {
            anio += anio <= 30 ? 2000 : 1900;
        }

        const fechaArmada = new Date(anio, mes - 1, dia);
        return fechaArmada.getFullYear() === anio
            && fechaArmada.getMonth() === mes - 1
            && fechaArmada.getDate() === dia;
    }

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

    nombres.addEventListener("input", () => limpiarCampoLetras(nombres));
    apellidos.addEventListener("input", () => limpiarCampoLetras(apellidos));
    telefono.addEventListener("input", limpiarTelefono);
    fecha.addEventListener("input", limpiarFecha);

    btnEditarPerfil.addEventListener("click", () => {
        habilitarCamposPerfil();
    });

    formDatos.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!nombres.value.trim() || !apellidos.value.trim()) {
            alert("Nombre y apellido son obligatorios.");
            return;
        }

        if (!soloLetras(nombres.value)) {
            alert("El nombre solo debe contener letras.");
            return;
        }

        if (!soloLetras(apellidos.value)) {
            alert("El apellido solo debe contener letras.");
            return;
        }

        if (telefono.value.trim() && !/^\d{9}$/.test(telefono.value.trim())) {
            alert("El telefono debe tener 9 digitos.");
            return;
        }

        if (!fechaValida(fecha.value)) {
            alert("La fecha debe tener el formato dd/mm/aaaa o dd/mm/aa.");
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
