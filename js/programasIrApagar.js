// programasCheckout.js

const carritoData = localStorage.getItem('carritoTienda');
const descuentoData = localStorage.getItem('descuentoTienda');

let carrito = carritoData ? JSON.parse(carritoData) : [];
let porcentajeDescuento = descuentoData ? parseFloat(descuentoData) : 0;

let datosEnvioGuardados = false;
let datosPagoGuardados = false;

const contenedorProductos = document.getElementById('checkout-productos');
const resumenCantidadDOM = document.getElementById('resumen-cantidad');
const resumenSubtotalDOM = document.getElementById('resumen-subtotal');
const resumenDescuentoDOM = document.getElementById('resumen-descuento');
const filaDescuento = document.getElementById('fila-descuento');
const resumenTotalDOM = document.getElementById('resumen-total');

function renderizarResumen() {
    if (carrito.length === 0) {
        window.location.href = 'carritoDeCompras.html';
        return;
    }

    contenedorProductos.innerHTML = '';
    let totalCantidad = 0;
    let subtotal = 0;

    carrito.forEach(producto => {
        totalCantidad += producto.cantidad;
        subtotal += (producto.precio * producto.cantidad);

        const divItem = document.createElement('div');
        divItem.classList.add('d-flex', 'align-items-center', 'mb-3', 'border-bottom', 'pb-3');
        
        divItem.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="item-resumen-img me-3">
            <div>
                <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">${producto.nombre}</h6>
                <small class="text-muted d-block mb-1">Cantidad: ${producto.cantidad}</small>
                <span class="fw-bold" style="font-size: 0.9rem;">S/ ${(producto.precio * producto.cantidad).toFixed(2)}</span>
            </div>
        `;
        contenedorProductos.appendChild(divItem);
    });

    let descuentoTotal = subtotal * porcentajeDescuento;
    let total = subtotal - descuentoTotal;

    resumenCantidadDOM.textContent = totalCantidad;
    resumenSubtotalDOM.textContent = subtotal.toFixed(2);
    
    if (porcentajeDescuento > 0) {
        filaDescuento.style.setProperty('display', 'flex', 'important');
        resumenDescuentoDOM.textContent = descuentoTotal.toFixed(2);
    }

    resumenTotalDOM.textContent = total.toFixed(2);
}

// Métodos de Pago
const radios = document.querySelectorAll('input[name="metodo-pago"]');
const boxTarjeta = document.getElementById('box-tarjeta');
const boxYape = document.getElementById('box-yape');
const formTarjeta = document.getElementById('formulario-tarjeta');

radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        boxTarjeta.classList.remove('activo');
        boxYape.classList.remove('activo');
        formTarjeta.classList.add('d-none');

        if(e.target.value === 'tarjeta') {
            boxTarjeta.classList.add('activo');
            formTarjeta.classList.remove('d-none'); 
            datosPagoGuardados = false; 
        } else if (e.target.value === 'yape') {
            boxYape.classList.add('activo');
            datosPagoGuardados = true; 
        }
    });
});

// Botón Agregar Dirección
const btnAgregarDireccion = document.getElementById('btn-agregar-direccion');
btnAgregarDireccion.addEventListener('click', () => {
    alert("Funcionalidad para agregar nueva dirección en desarrollo.");
});

// Validaciones
const btnGuardarEnvio = document.getElementById('btn-guardar-envio');
btnGuardarEnvio.addEventListener('click', () => {
    const nombres = document.getElementById('envio-nombres').value.trim();
    const apellidos = document.getElementById('envio-apellidos').value.trim();
    const direccion = document.getElementById('envio-direccion').value;
    const correo = document.getElementById('envio-correo').value.trim();

    if (!nombres || !apellidos || !direccion || !correo) {
        alert("Por favor, completa todos los datos de envío.");
        datosEnvioGuardados = false;
    } else {
        alert("¡Datos de envío guardados correctamente!");
        datosEnvioGuardados = true;
    }
});

const btnGuardarTarjeta = document.getElementById('btn-guardar-tarjeta');
btnGuardarTarjeta.addEventListener('click', () => {
    const num = document.getElementById('tarjeta-numero').value.trim();
    const fecha = document.getElementById('tarjeta-fecha').value.trim();
    const cvv = document.getElementById('tarjeta-cvv').value.trim();

    if (!num || !fecha || !cvv) {
        alert("Por favor, completa todos los datos de la tarjeta.");
        datosPagoGuardados = false;
    } else {
        alert("¡Datos de tarjeta guardados correctamente!");
        datosPagoGuardados = true;
    }
});

// Finalizar compra (Reemplaza este bloque en programasCheckout.js)
const btnPagarAhora = document.getElementById('btn-pagar-ahora');
btnPagarAhora.addEventListener('click', () => {
    if (!datosEnvioGuardados) {
        alert("Debes guardar tus datos de envío antes de pagar.");
        return;
    }
    
    const metodoSeleccionado = document.querySelector('input[name="metodo-pago"]:checked');
    if (!metodoSeleccionado) {
        alert("Selecciona un método de pago.");
        return;
    }

    if (!datosPagoGuardados) {
        alert("Asegúrate de guardar los datos de tu tarjeta.");
        return;
    }

    // Novedad: Guardar la dirección y el total antes de vaciar el carrito
    const selectDireccion = document.getElementById('envio-direccion');
    const direccionTexto = selectDireccion.options[selectDireccion.selectedIndex].text;
    const totalFinal = document.getElementById('resumen-total').textContent;

    localStorage.setItem('direccionConfirmacion', direccionTexto);
    localStorage.setItem('totalConfirmacion', totalFinal);

    // Vaciar el carrito y redirigir a la confirmación
    localStorage.removeItem('carritoTienda');
    localStorage.removeItem('descuentoTienda');
    window.location.href = 'confirmarPedido.html'; 
});

const btnCancelar = document.getElementById('btn-cancelar-compra');
btnCancelar.addEventListener('click', () => {
    const confirmar = confirm("¿Estás seguro que deseas cancelar tu compra y vaciar tu carrito?");
    if (confirmar) {
        localStorage.removeItem('carritoTienda');
        localStorage.removeItem('descuentoTienda');
        window.location.href = 'carritoDeCompras.html'; 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderizarResumen();
});