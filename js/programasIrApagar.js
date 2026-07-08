const datosDescuentoGuardados = localStorage.getItem('descuentoTienda');
const usuarioActualPago = StorageNE.protegerPagina();

let listaProductosCheckout = usuarioActualPago ? StorageNE.obtenerCarritoUsuario() : [];
let porcentajeDescuentoAplicado = datosDescuentoGuardados ? parseFloat(datosDescuentoGuardados) : 0;
let direccionSeleccionadaPago = null;
let subtotalCompraActual = 0;
let descuentoCompraActual = 0;
let totalCompraActual = 0;

let estadoDatosEnvioCompletos = false;
let estadoDatosPagoCompletos = false;

const elementoContenedorProductos = document.getElementById('contenedor-lista-productos-checkout');
const elementoCantidadResumen = document.getElementById('texto-cantidad-resumen');
const elementoSubtotalResumen = document.getElementById('texto-subtotal-resumen');
const elementoDescuentoResumen = document.getElementById('texto-descuento-resumen');
const elementoFilaDescuento = document.getElementById('contenedor-fila-descuento');
const elementoTotalResumen = document.getElementById('texto-total-resumen');

function cargarDatosUsuarioCheckout() {
    if (!usuarioActualPago) {
        return;
    }

    document.getElementById('campo-entrada-nombres').value = usuarioActualPago.nombre || "";
    document.getElementById('campo-entrada-apellidos').value = usuarioActualPago.apellido || "";
    document.getElementById('campo-entrada-correo').value = usuarioActualPago.correo || "";

    const selectorDireccion = document.getElementById('selector-direccion-envio');
    const direcciones = Array.isArray(usuarioActualPago.direcciones) ? usuarioActualPago.direcciones : [];

    selectorDireccion.innerHTML = "";

    if (direcciones.length === 0) {
        selectorDireccion.innerHTML = '<option value="" selected>No tienes direcciones guardadas</option>';
        return;
    }

    selectorDireccion.innerHTML = '<option value="" disabled selected hidden>Selecciona una direccion...</option>';
    direcciones.forEach((direccion) => {
        const opcion = document.createElement('option');
        opcion.value = direccion.id;
        opcion.textContent = `${direccion.direccion}${direccion.detalle ? ", " + direccion.detalle : ""} - ${direccion.distrito || ""}`;
        selectorDireccion.appendChild(opcion);
    });

    const direccionPrincipal = direcciones.find((direccion) => direccion.principal) || direcciones[0];
    selectorDireccion.value = direccionPrincipal.id;
    direccionSeleccionadaPago = direccionPrincipal;
}

function renderizarResumenCompra() {
    if (listaProductosCheckout.length === 0) {
        window.location.href = 'carritoDeCompras.html';
        return;
    }

    elementoContenedorProductos.innerHTML = '';
    let sumatoriaCantidadTotal = 0;
    let sumatoriaSubtotal = 0;

    listaProductosCheckout.forEach(productoActual => {
        sumatoriaCantidadTotal += productoActual.cantidad;
        sumatoriaSubtotal += (productoActual.precio * productoActual.cantidad);

        const elementoFilaProducto = document.createElement('div');
        elementoFilaProducto.classList.add('d-flex', 'align-items-center', 'mb-3', 'border-bottom', 'pb-3');
        
        elementoFilaProducto.innerHTML = `
            <img src="${productoActual.imagen}" alt="${productoActual.nombre}" class="imagen-producto-resumen me-3">
            <div>
                <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">${productoActual.nombre}</h6>
                <small class="text-muted d-block mb-1">Cantidad: ${productoActual.cantidad}</small>
                <span class="fw-bold" style="font-size: 0.9rem;">S/ ${(productoActual.precio * productoActual.cantidad).toFixed(2)}</span>
            </div>
        `;
        elementoContenedorProductos.appendChild(elementoFilaProducto);
    });

    let montoDescuentoTotal = sumatoriaSubtotal * porcentajeDescuentoAplicado;
    let costoTotalCalculado = sumatoriaSubtotal - montoDescuentoTotal;

    subtotalCompraActual = sumatoriaSubtotal;
    descuentoCompraActual = montoDescuentoTotal;
    totalCompraActual = costoTotalCalculado;

    elementoCantidadResumen.textContent = sumatoriaCantidadTotal;
    elementoSubtotalResumen.textContent = sumatoriaSubtotal.toFixed(2);
    
    if (porcentajeDescuentoAplicado > 0) {
        elementoFilaDescuento.style.setProperty('display', 'flex', 'important');
        elementoDescuentoResumen.textContent = montoDescuentoTotal.toFixed(2);
    }

    elementoTotalResumen.textContent = costoTotalCalculado.toFixed(2);
}

const listaRadiosMetodoPago = document.querySelectorAll('input[name="metodo-pago"]');
const elementoOpcionTarjeta = document.getElementById('contenedor-opcion-tarjeta');
const elementoOpcionYape = document.getElementById('contenedor-opcion-yape');
const elementoFormularioTarjeta = document.getElementById('formulario-datos-tarjeta');

listaRadiosMetodoPago.forEach(radioSeleccionado => {
    radioSeleccionado.addEventListener('change', (eventoCambio) => {
        elementoOpcionTarjeta.classList.remove('activo');
        elementoOpcionYape.classList.remove('activo');
        elementoFormularioTarjeta.classList.add('d-none');

        if(eventoCambio.target.value === 'tarjeta') {
            elementoOpcionTarjeta.classList.add('activo');
            elementoFormularioTarjeta.classList.remove('d-none'); 
            estadoDatosPagoCompletos = false; 
        } else if (eventoCambio.target.value === 'yape') {
            elementoOpcionYape.classList.add('activo');
            estadoDatosPagoCompletos = true; 
        }
    });
});

const botonAgregarNuevaDireccion = document.getElementById('boton-agregar-direccion');
botonAgregarNuevaDireccion.addEventListener('click', () => {
    window.location.href = 'misDirecciones.html';
});

const botonGuardarInformacionEnvio = document.getElementById('boton-guardar-datos-envio');
botonGuardarInformacionEnvio.addEventListener('click', () => {
    const valorNombres = document.getElementById('campo-entrada-nombres').value.trim();
    const valorApellidos = document.getElementById('campo-entrada-apellidos').value.trim();
    const valorDireccion = document.getElementById('selector-direccion-envio').value;
    const valorCorreoElectronico = document.getElementById('campo-entrada-correo').value.trim();

    if (!valorNombres || !valorApellidos || !valorDireccion || !valorCorreoElectronico) {
        alert("Por favor, completa todos los datos de envío.");
        estadoDatosEnvioCompletos = false;
    } else {
        direccionSeleccionadaPago = (usuarioActualPago.direcciones || []).find((direccion) => direccion.id === valorDireccion) || null;
        alert("¡Datos de envío guardados correctamente!");
        estadoDatosEnvioCompletos = true;
    }
});

const botonGuardarInformacionTarjeta = document.getElementById('boton-guardar-datos-tarjeta');
botonGuardarInformacionTarjeta.addEventListener('click', () => {
    const valorNumeroTarjeta = document.getElementById('campo-entrada-numero-tarjeta').value.trim();
    const valorFechaVencimiento = document.getElementById('campo-entrada-fecha-tarjeta').value.trim();
    const valorCodigoCvv = document.getElementById('campo-entrada-cvv-tarjeta').value.trim();

    if (!valorNumeroTarjeta || !valorFechaVencimiento || !valorCodigoCvv) {
        alert("Por favor, completa todos los datos de la tarjeta.");
        estadoDatosPagoCompletos = false;
    } else {
        alert("¡Datos de tarjeta guardados correctamente!");
        estadoDatosPagoCompletos = true;
    }
});

const botonProcesarPagoFinal = document.getElementById('boton-procesar-pago');
botonProcesarPagoFinal.addEventListener('click', () => {
    if (!estadoDatosEnvioCompletos) {
        alert("Debes guardar tus datos de envío antes de pagar.");
        return;
    }
    
    const opcionMetodoPagoSeleccionada = document.querySelector('input[name="metodo-pago"]:checked');
    if (!opcionMetodoPagoSeleccionada) {
        alert("Selecciona un método de pago.");
        return;
    }

    if (!estadoDatosPagoCompletos) {
        alert("Asegúrate de guardar los datos de tu tarjeta.");
        return;
    }

    if (!direccionSeleccionadaPago) {
        alert("Selecciona una direccion guardada para continuar.");
        return;
    }

    const metodoPagoTexto = opcionMetodoPagoSeleccionada.value === 'tarjeta'
        ? 'Tarjeta de Credito / Debito'
        : 'Yape / Plin';

    const compraCreada = StorageNE.crearCompraUsuario({
        productos: listaProductosCheckout,
        subtotal: subtotalCompraActual,
        descuento: descuentoCompraActual,
        total: totalCompraActual,
        direccion: direccionSeleccionadaPago,
        metodoPago: metodoPagoTexto
    });

    if (!compraCreada) {
        alert("No se pudo registrar la compra. Inicia sesion nuevamente.");
        window.location.href = 'iniciarSesion.html';
        return;
    }

    localStorage.removeItem('carritoTienda');
    localStorage.removeItem('descuentoTienda');
    window.location.href = 'confirmarPedido.html'; 
});

const botonCancelarProcesoCompra = document.getElementById('boton-cancelar-compra');
botonCancelarProcesoCompra.addEventListener('click', () => {
    const confirmacionUsuario = confirm("¿Estás seguro que deseas cancelar tu compra y vaciar tu carrito?");
    if (confirmacionUsuario) {
        StorageNE.vaciarCarritoUsuario();
        window.location.href = 'carritoDeCompras.html'; 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosUsuarioCheckout();
    renderizarResumenCompra();
});
