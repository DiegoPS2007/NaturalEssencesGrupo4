let listaProductosCarrito = [];
let porcentajeDescuentoAplicado = 0; 

const elementoContenedorCarrito = document.getElementById('contenedor-lista-carrito');
const botonLimpiarCarrito = document.getElementById('btn-limpiar-carrito');
const elementoCantidadArticulos = document.getElementById('cantidad-articulos');
const elementoResumenCantidad = document.getElementById('resumen-cantidad');
const elementoResumenSubtotal = document.getElementById('resumen-subtotal');
const elementoResumenTotal = document.getElementById('resumen-total');
const botonesAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');

const campoEntradaCupon = document.getElementById('entrada-codigo-cupon');
const botonAplicarCupon = document.getElementById('btn-aplicar-cupon');
const elementoMensajeCupon = document.getElementById('mensaje-cupon');

function guardarCarritoActual() {
    if (window.StorageNE) {
        StorageNE.reemplazarCarritoUsuario(listaProductosCarrito);
    } else {
        localStorage.setItem('carritoTienda', JSON.stringify(listaProductosCarrito));
    }
}

function renderizarVistaCarrito() {
    elementoContenedorCarrito.innerHTML = ''; 

    if (listaProductosCarrito.length === 0) {
        elementoContenedorCarrito.innerHTML = '<p class="text-center text-muted my-5">Tu carrito está vacío. ¡Añade algunos productos!</p>';
    } else {
        listaProductosCarrito.forEach(productoActual => {
            const elementoFilaProducto = document.createElement('div');
            elementoFilaProducto.classList.add('item-carrito', 'row', 'align-items-center');
            
            elementoFilaProducto.innerHTML = `
                <div class="col-4 col-md-3">
                    <div class="d-flex justify-content-center align-items-center bg-white rounded contenedor-imagen-carrito">
                        <img src="${productoActual.imagen}" alt="${productoActual.nombre}" class="imagen-producto-ajustada">
                    </div>
                </div>
                <div class="col-8 col-md-9">
                    <div class="row align-items-center">
                        <div class="col-sm-7 mb-2 mb-sm-0">
                            <h6 class="fw-bold mb-1">${productoActual.nombre}</h6>
                            <span class="fw-bold">S/ ${productoActual.precio.toFixed(2)}</span>
                        </div>
                        <div class="col-sm-5 d-flex justify-content-between align-items-center gap-3">
                            <div class="controles-cantidad-producto">
                                <button onclick="modificarCantidadProducto(${productoActual.id}, -1)">-</button>
                                <span>${productoActual.cantidad}</span>
                                <button onclick="modificarCantidadProducto(${productoActual.id}, 1)">+</button>
                            </div>
                            <button onclick="eliminarProductoDelCarrito(${productoActual.id})" class="btn-icono text-danger fw-bold fs-5">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
            elementoContenedorCarrito.appendChild(elementoFilaProducto);
        });
    }
    calcularTotalesCarrito();
}

function calcularTotalesCarrito() {
    let sumatoriaCantidadTotal = 0;
    let sumatoriaSubtotal = 0;

    listaProductosCarrito.forEach(productoItem => {
        sumatoriaCantidadTotal += productoItem.cantidad;
        sumatoriaSubtotal += (productoItem.precio * productoItem.cantidad);
    });

    let costoTotalCalculado = sumatoriaSubtotal - (sumatoriaSubtotal * porcentajeDescuentoAplicado);

    elementoCantidadArticulos.textContent = sumatoriaCantidadTotal;
    elementoResumenCantidad.textContent = sumatoriaCantidadTotal;
    elementoResumenSubtotal.textContent = sumatoriaSubtotal.toFixed(2);
    elementoResumenTotal.textContent = costoTotalCalculado.toFixed(2);

    if (listaProductosCarrito.length === 0) {
        porcentajeDescuentoAplicado = 0;
        campoEntradaCupon.value = '';
        elementoMensajeCupon.textContent = '';
    }
}

window.modificarCantidadProducto = function(idProducto, valorCambio) {
    const identificadorNumerico = parseInt(idProducto); 
    const productoEncontrado = listaProductosCarrito.find(item => item.id === identificadorNumerico);
    if (productoEncontrado) {
        productoEncontrado.cantidad += valorCambio;
        if (productoEncontrado.cantidad <= 0) {
            eliminarProductoDelCarrito(identificadorNumerico);
        } else {
            guardarCarritoActual();
            renderizarVistaCarrito();
        }
    }
}

window.eliminarProductoDelCarrito = function(idProducto) {
    const identificadorNumerico = parseInt(idProducto);
    listaProductosCarrito = listaProductosCarrito.filter(item => item.id !== identificadorNumerico);
    guardarCarritoActual();
    renderizarVistaCarrito();
}

botonLimpiarCarrito.addEventListener('click', () => {
    listaProductosCarrito = [];
    guardarCarritoActual();
    renderizarVistaCarrito();
});

botonAplicarCupon.addEventListener('click', () => {
    const codigoIngresado = campoEntradaCupon.value.trim().toUpperCase();
    
    if (listaProductosCarrito.length === 0) {
        elementoMensajeCupon.textContent = 'Añade productos antes de aplicar un cupón.';
        elementoMensajeCupon.className = 'text-danger small d-block mt-2 fw-bold';
        return;
    }

    if (codigoIngresado === 'NATURAL20') {
        porcentajeDescuentoAplicado = 0.20;
        elementoMensajeCupon.textContent = '¡Cupón de 20% aplicado con éxito!';
        elementoMensajeCupon.className = 'text-success small d-block mt-2 fw-bold';
    } else {
        porcentajeDescuentoAplicado = 0;
        elementoMensajeCupon.textContent = 'Código inválido o expirado.';
        elementoMensajeCupon.className = 'text-danger small d-block mt-2 fw-bold';
    }
    
    calcularTotalesCarrito();
});

botonesAgregarCarrito.forEach(botonActual => {
    botonActual.addEventListener('click', (eventoBoton) => {
        const identificadorProducto = parseInt(eventoBoton.target.getAttribute('data-id'));
        const nombreDelProducto = eventoBoton.target.getAttribute('data-nombre');
        const precioDelProducto = parseFloat(eventoBoton.target.getAttribute('data-precio'));
        const rutaImagenProducto = eventoBoton.target.getAttribute('data-img');

        const productoYaExiste = listaProductosCarrito.find(item => item.id === identificadorProducto);
        
        if (productoYaExiste) {
            productoYaExiste.cantidad += 1;
        } else {
            listaProductosCarrito.push({
                id: identificadorProducto,
                nombre: nombreDelProducto,
                precio: precioDelProducto,
                cantidad: 1,
                imagen: rutaImagenProducto
            });
        }
        guardarCarritoActual();
        renderizarVistaCarrito();
    });
});

const botonProcederPago = document.getElementById('btn-proceder-pago');
if (botonProcederPago) {
    botonProcederPago.addEventListener('click', () => {
        if (listaProductosCarrito.length === 0) {
            alert("Tu carrito está vacío. Añade productos antes de pagar.");
            return;
        }
        if (window.StorageNE && !StorageNE.obtenerUsuarioActual()) {
            guardarCarritoActual();
            alert("Primero inicia sesion para continuar con el pago.");
            window.location.href = 'iniciarSesion.html';
            return;
        }

        guardarCarritoActual();
        localStorage.setItem('descuentoTienda', porcentajeDescuentoAplicado);
        window.location.href = 'irApagar.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.StorageNE) {
        listaProductosCarrito = StorageNE.obtenerCarritoUsuario();
    } else {
        const carritoGuardado = localStorage.getItem('carritoTienda');
        listaProductosCarrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }

    renderizarVistaCarrito(); 

    const listaIconosCorazon = document.querySelectorAll('.icono-favorito');
  
    const rutaImagenCorazonBordes = "img/general/iconos/fav-border32.png"; 
    const rutaImagenCorazonLleno = "img/general/iconos/fav32.png"; 
    
    listaIconosCorazon.forEach(iconoCorazonActual => {
        
        iconoCorazonActual.addEventListener('mouseenter', function() {
            if (!this.classList.contains('activo')) {
                this.src = rutaImagenCorazonLleno;
            }
        });

        iconoCorazonActual.addEventListener('mouseleave', function() {
            if (!this.classList.contains('activo')) {
                this.src = rutaImagenCorazonBordes;
            }
        });

        iconoCorazonActual.addEventListener('click', function() {
            this.classList.toggle('activo');
            
            if (this.classList.contains('activo')) {
                this.src = rutaImagenCorazonLleno;
            } else {
                this.src = rutaImagenCorazonBordes; 
            }
        });
    });
});
