let carrito = [];
let porcentajeDescuento = 0; 

const contenedorCarrito = document.getElementById('carrito-contenedor');
const btnLimpiar = document.getElementById('btn-limpiar');
const cantArticulosDOM = document.getElementById('cantidad-articulos');
const resumenCantidadDOM = document.getElementById('resumen-cantidad');
const resumenSubtotalDOM = document.getElementById('resumen-subtotal');
const resumenTotalDOM = document.getElementById('resumen-total');
const botonesAñadir = document.querySelectorAll('.btn-add-cart');

const inputCupon = document.getElementById('input-cupon');
const btnCupon = document.getElementById('btn-cupon');
const mensajeCupon = document.getElementById('mensaje-cupon');

function renderizarCarrito() {
    contenedorCarrito.innerHTML = ''; 

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p class="text-center text-muted my-5">Tu carrito está vacío. ¡Añade algunos productos!</p>';
    } else {
        carrito.forEach(producto => {
            const divItem = document.createElement('div');
            divItem.classList.add('item-carrito', 'row', 'align-items-center');
            
            divItem.innerHTML = `
                <div class="col-4 col-md-3">
                    <div class="d-flex justify-content-center align-items-center bg-white rounded img-carrito-contenedor">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-ajustada">
                    </div>
                </div>
                <div class="col-8 col-md-9">
                    <div class="row align-items-center">
                        <div class="col-sm-7 mb-2 mb-sm-0">
                            <h6 class="fw-bold mb-1">${producto.nombre}</h6>
                            <span class="fw-bold">S/ ${producto.precio.toFixed(2)}</span>
                        </div>
                        <div class="col-sm-5 d-flex justify-content-between align-items-center gap-3">
                            <div class="control-cantidad">
                                <button onclick="modificarCantidad(${producto.id}, -1)">-</button>
                                <span>${producto.cantidad}</span>
                                <button onclick="modificarCantidad(${producto.id}, 1)">+</button>
                            </div>
                            <button onclick="eliminarProducto(${producto.id})" class="btn-icono text-danger fw-bold fs-5">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            `;
            contenedorCarrito.appendChild(divItem);
        });
    }
    actualizarTotales();
}

function actualizarTotales() {
    let totalCantidad = 0;
    let subtotal = 0;

    carrito.forEach(prod => {
        totalCantidad += prod.cantidad;
        subtotal += (prod.precio * prod.cantidad);
    });

    let total = subtotal - (subtotal * porcentajeDescuento);

    cantArticulosDOM.textContent = totalCantidad;
    resumenCantidadDOM.textContent = totalCantidad;
    resumenSubtotalDOM.textContent = subtotal.toFixed(2);
    resumenTotalDOM.textContent = total.toFixed(2);

    if (carrito.length === 0) {
        porcentajeDescuento = 0;
        inputCupon.value = '';
        mensajeCupon.textContent = '';
    }
}

window.modificarCantidad = function(id, cambio) {
    const idNumero = parseInt(id); 
    const producto = carrito.find(p => p.id === idNumero);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarProducto(idNumero);
        } else {
            renderizarCarrito();
        }
    }
}

window.eliminarProducto = function(id) {
    const idNumero = parseInt(id);
    carrito = carrito.filter(p => p.id !== idNumero);
    renderizarCarrito();
}

btnLimpiar.addEventListener('click', () => {
    carrito = [];
    renderizarCarrito();
});

btnCupon.addEventListener('click', () => {
    const codigo = inputCupon.value.trim().toUpperCase();
    
    if (carrito.length === 0) {
        mensajeCupon.textContent = 'Añade productos antes de aplicar un cupón.';
        mensajeCupon.className = 'text-danger small d-block mt-2 fw-bold';
        return;
    }

    if (codigo === 'NATURAL20') {
        porcentajeDescuento = 0.20;
        mensajeCupon.textContent = '¡Cupón de 20% aplicado con éxito!';
        mensajeCupon.className = 'text-success small d-block mt-2 fw-bold';
    } else {
        porcentajeDescuento = 0;
        mensajeCupon.textContent = 'Código inválido o expirado.';
        mensajeCupon.className = 'text-danger small d-block mt-2 fw-bold';
    }
    
    actualizarTotales();
});

botonesAñadir.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const nombre = e.target.getAttribute('data-nombre');
        const precio = parseFloat(e.target.getAttribute('data-precio'));
        const imagen = e.target.getAttribute('data-img');

        const productoExistente = carrito.find(p => p.id === id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id: id,
                nombre: nombre,
                precio: precio,
                cantidad: 1,
                imagen: imagen
            });
        }
        renderizarCarrito();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
}); 

// Redirigir al Checkout guardando los datos
const btnIrAPagar = document.getElementById('btn-ir-pagar');
if(btnIrAPagar) {
    btnIrAPagar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Añade productos antes de pagar.");
            return;
        }
        // Guardamos los datos en el navegador (Local Storage)
        localStorage.setItem('carritoTienda', JSON.stringify(carrito));
        localStorage.setItem('descuentoTienda', porcentajeDescuento);
        // Redirigimos a la nueva página
        window.location.href = 'irApagar.html';
    });
}