document.addEventListener("DOMContentLoaded", () => {
    let usuario = StorageNE.protegerPagina();
    if (!usuario) {
        return;
    }

    const formDireccion = document.getElementById("formDireccion");
    const listaDirecciones = document.getElementById("listaDirecciones");
    const direccionModal = document.getElementById("direccionModal");
    const instanciaModal = bootstrap.Modal.getOrCreateInstance(direccionModal);
    const tituloModal = document.getElementById("direccionModalTitulo");

    let idDireccionEditando = null;

    function obtenerValor(id) {
        return document.getElementById(id).value.trim();
    }

    function cargarFormulario(direccion) {
        document.getElementById("departamento").value = direccion.departamento;
        document.getElementById("provincia").value = direccion.provincia;
        document.getElementById("distrito").value = direccion.distrito;
        document.getElementById("codigoPostal").value = direccion.codigoPostal || "";
        document.getElementById("direccion").value = direccion.direccion;
        document.getElementById("detalleDireccion").value = direccion.detalle || "";
        document.getElementById("referencia").value = direccion.referencia || "";
        document.getElementById("direccionPrincipal").checked = Boolean(direccion.principal);
    }

    function limpiarModal() {
        idDireccionEditando = null;
        tituloModal.textContent = "Agregar Direccion";
        formDireccion.reset();
    }

    function renderizarDirecciones() {
        usuario = StorageNE.obtenerUsuarioActual();
        StorageNE.pintarDatosMenuUsuario(usuario);
        StorageNE.activarCerrarSesion();

        const direcciones = usuario.direcciones || [];
        listaDirecciones.innerHTML = "";

        if (direcciones.length === 0) {
            listaDirecciones.innerHTML = '<p class="text-muted mb-4">Todavia no tienes direcciones guardadas.</p>';
            return;
        }

        direcciones.forEach((item) => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "direccion-card p-4 mb-4";
            tarjeta.innerHTML = `
                <div>
                    <p class="mb-2">${item.distrito}, ${item.provincia}${item.codigoPostal ? " " + item.codigoPostal : ""}</p>
                    <p class="mb-2">${item.direccion}${item.detalle ? ", " + item.detalle : ""}</p>
                    <p class="mb-3">${item.referencia || "Sin referencia"}</p>
                    <div class="d-flex flex-wrap gap-3">
                        <button type="button" class="btn btn-natural btn-editar-direccion" data-id="${item.id}">EDITAR</button>
                        <button type="button" class="btn btn-natural btn-eliminar-direccion" data-id="${item.id}">ELIMINAR</button>
                    </div>
                </div>
                ${item.principal ? '<span class="principal-badge">Principal</span>' : ""}
            `;
            listaDirecciones.appendChild(tarjeta);
        });
    }

    formDireccion.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const nuevaDireccion = {
            id: idDireccionEditando || `direccion-${Date.now()}`,
            departamento: obtenerValor("departamento"),
            provincia: obtenerValor("provincia"),
            distrito: obtenerValor("distrito"),
            codigoPostal: obtenerValor("codigoPostal"),
            direccion: obtenerValor("direccion"),
            detalle: obtenerValor("detalleDireccion"),
            referencia: obtenerValor("referencia"),
            principal: document.getElementById("direccionPrincipal").checked
        };

        let direcciones = usuario.direcciones || [];

        if (nuevaDireccion.principal || direcciones.length === 0) {
            direcciones = direcciones.map((item) => ({
                ...item,
                principal: false
            }));
            nuevaDireccion.principal = true;
        }

        if (idDireccionEditando) {
            direcciones = direcciones.map((item) => item.id === idDireccionEditando ? nuevaDireccion : item);
        } else {
            direcciones.push(nuevaDireccion);
        }

        usuario = StorageNE.actualizarUsuarioActual({
            direcciones: direcciones
        });

        limpiarModal();
        instanciaModal.hide();
        renderizarDirecciones();
    });

    listaDirecciones.addEventListener("click", (evento) => {
        const botonEditar = evento.target.closest(".btn-editar-direccion");
        const botonEliminar = evento.target.closest(".btn-eliminar-direccion");

        if (botonEditar) {
            const direccion = (usuario.direcciones || []).find((item) => item.id === botonEditar.dataset.id);
            if (!direccion) {
                return;
            }

            idDireccionEditando = direccion.id;
            tituloModal.textContent = "Editar Direccion";
            cargarFormulario(direccion);
            instanciaModal.show();
        }

        if (botonEliminar) {
            const confirmar = confirm("¿Esta seguro que desea eliminar esta dirección?");
            if (!confirmar) {
                return;
            }

            let direcciones = (usuario.direcciones || []).filter((item) => item.id !== botonEliminar.dataset.id);
            if (direcciones.length > 0 && !direcciones.some((item) => item.principal)) {
                direcciones[0].principal = true;
            }

            usuario = StorageNE.actualizarUsuarioActual({
                direcciones: direcciones
            });
            renderizarDirecciones();
        }
    });

    direccionModal.addEventListener("hidden.bs.modal", limpiarModal);
    renderizarDirecciones();
});
