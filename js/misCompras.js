document.addEventListener("DOMContentLoaded", () => {
    let usuario = StorageNE.protegerPagina();
    if (!usuario) {
        return;
    }

    const panelCompras = document.querySelector(".panel-perfil");
    const contenedorProductosResena = document.querySelector(".productos-resena");
    const estrellas = document.querySelectorAll(".estrella");
    const calificacionSeleccionada = document.getElementById("calificacionSeleccionada");
    const productosSeleccionados = document.getElementById("productosSeleccionados");
    const comentario = document.getElementById("comentario");
    const modalResena = document.getElementById("resenaPedidoModal");
    const instanciaModal = bootstrap.Modal.getOrCreateInstance(modalResena);
    const btnPublicar = document.querySelector("#resenaPedidoModal .modal-footer .btn-natural");

    let idCompraActual = null;

    function formatoFecha(fechaISO) {
        return new Date(fechaISO).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function obtenerDireccionTexto(direccion) {
        if (!direccion) {
            return "Direccion no registrada";
        }

        return `${direccion.distrito || ""}, ${direccion.provincia || ""} ${direccion.codigoPostal || ""}<br>${direccion.direccion || direccion}`;
    }

    function crearProductoHTML(producto) {
        return `
            <div class="col-md-4">
                <div class="producto-mini d-flex gap-2">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div>
                        <h6>${producto.nombre}</h6>
                        <p>x${producto.cantidad}</p>
                        <strong>S/ ${(producto.precio * producto.cantidad).toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        `;
    }

    function crearCompraHTML(compra) {
        const estadoClase = compra.estado === "Terminado" || compra.estado === "Entregado"
            ? "estado-entregado"
            : "badge bg-warning text-dark";

        const resenasTexto = (compra.resenas || []).length > 0
            ? `<p class="text-muted small mb-0">${compra.resenas.length} resena(s) guardada(s)</p>`
            : "";

        return `
            <article class="pedido-card p-3 p-lg-4 mb-4">
                <div class="pedido-encabezado d-flex flex-column flex-lg-row justify-content-between gap-2 mb-3">
                    <div class="d-flex align-items-center gap-3">
                        <span>${compra.numero}</span>
                        <span class="${estadoClase}">${compra.estado}</span>
                    </div>
                    <div class="d-flex flex-wrap gap-4">
                        <span>${formatoFecha(compra.fecha)}</span>
                        <strong>S/ ${Number(compra.total).toFixed(2)}</strong>
                    </div>
                </div>

                <div class="productos-compra row g-3 pb-3 mb-3">
                    ${compra.productos.map(crearProductoHTML).join("")}
                </div>

                <div class="row g-4 info-pedido">
                    <div class="col-md-6">
                        <h6>Direccion de entrega</h6>
                        <p>${obtenerDireccionTexto(compra.direccion)}</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Metodo de pago</h6>
                        <p>${compra.metodoPago || "No registrado"}</p>
                        <p>Pago aprobado</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Resumen</h6>
                        <div class="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>S/ ${Number(compra.subtotal || compra.total).toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between border-bottom border-dark">
                            <span>Descuento</span>
                            <span>S/ ${Number(compra.descuento || 0).toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>S/ ${Number(compra.total).toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6>Seguimiento</h6>
                        <ul class="seguimiento">
                            <li>Pedido confirmado</li>
                            <li>${compra.estado}</li>
                        </ul>
                    </div>
                </div>

                <div class="pedido-acciones d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 pt-3">
                    <div>
                        <button class="btn btn-link resena-link p-0 btn-resena" type="button" data-id="${compra.id}">
                            Dejar Resena del Pedido
                        </button>
                        ${resenasTexto}
                    </div>
                    <button type="button" class="btn btn-natural btn-recomprar" data-id="${compra.id}">RECOMPRAR</button>
                </div>
            </article>
        `;
    }

    function renderizarCompras() {
        usuario = StorageNE.obtenerUsuarioActual();
        StorageNE.pintarDatosMenuUsuario(usuario);
        StorageNE.activarCerrarSesion();

        const compras = usuario.compras || [];
        const enProceso = compras.filter((compra) => compra.estado !== "Terminado" && compra.estado !== "Entregado");
        const terminadas = compras.filter((compra) => compra.estado === "Terminado" || compra.estado === "Entregado");

        panelCompras.innerHTML = `
            <h4 class="titulo-panel">Mis Compras</h4>
            <h5 class="fw-bold mt-3">Compras en proceso</h5>
            ${enProceso.length ? enProceso.map(crearCompraHTML).join("") : '<p class="text-muted">No tienes compras en proceso.</p>'}
            <h5 class="fw-bold mt-4">Compras terminadas</h5>
            ${terminadas.length ? terminadas.map(crearCompraHTML).join("") : '<p class="text-muted">No tienes compras terminadas.</p>'}
        `;
    }

    panelCompras.addEventListener("click", (evento) => {
        const botonResena = evento.target.closest(".btn-resena");
        const botonRecomprar = evento.target.closest(".btn-recomprar");

        if (botonResena) {
            idCompraActual = botonResena.dataset.id;
            const compra = (usuario.compras || []).find((item) => item.id === idCompraActual);
            contenedorProductosResena.innerHTML = compra.productos.map((producto, indice) => `
                <button type="button" class="btn btn-natural ${indice === 0 ? "active" : ""}"
                    data-producto="${producto.nombre}" aria-pressed="${indice === 0}">
                    ${producto.nombre}
                </button>
            `).join("");
            productosSeleccionados.value = compra.productos[0] ? compra.productos[0].nombre : "";
            comentario.value = "";
            instanciaModal.show();
        }

        if (botonRecomprar) {
            const compra = (usuario.compras || []).find((item) => item.id === botonRecomprar.dataset.id);
            StorageNE.reemplazarCarritoUsuario(compra.productos);
            window.location.href = "carritoDeCompras.html";
        }
    });

    contenedorProductosResena.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button");
        if (!boton) {
            return;
        }

        boton.classList.toggle("active");
        boton.setAttribute("aria-pressed", boton.classList.contains("active"));

        const seleccionados = [...contenedorProductosResena.querySelectorAll("button.active")]
            .map((item) => item.dataset.producto);
        productosSeleccionados.value = seleccionados.join(", ");
    });

    estrellas.forEach((estrella) => {
        estrella.addEventListener("click", () => {
            const valor = Number(estrella.dataset.valor);
            calificacionSeleccionada.value = valor;

            estrellas.forEach((item) => {
                const activa = Number(item.dataset.valor) <= valor;
                item.classList.toggle("active", activa);
                item.setAttribute("aria-checked", item.dataset.valor === String(valor));
            });
        });
    });

    btnPublicar.addEventListener("click", () => {
        if (!idCompraActual || !productosSeleccionados.value) {
            alert("Selecciona al menos un producto.");
            return;
        }

        StorageNE.guardarResenaCompra(idCompraActual, {
            id: `resena-${Date.now()}`,
            productos: productosSeleccionados.value.split(",").map((item) => item.trim()).filter(Boolean),
            calificacion: Number(calificacionSeleccionada.value),
            comentario: comentario.value.trim(),
            fecha: new Date().toISOString()
        });

        instanciaModal.hide();
        renderizarCompras();
        alert("Resena guardada correctamente.");
    });

    renderizarCompras();
});
