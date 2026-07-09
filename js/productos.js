document.addEventListener("DOMContentLoaded", () => {
    const baseDatosProductos = [
        {
            id: 1,
            nombre: "Sérum Facial Hidratante",
            marca: "Natural Essences",
            precio: 45.00,
            precioAnterior: 60.00,
            imagen: "img/general/productos/serum.jpg",
            categoria: "Cuidado Facial",
            tipoPiel: ["Piel Seca", "Piel Normal", "Piel Mixta"],
            ingredientes: ["Ácido Hialurónico"],
            beneficios: ["Hidratante", "Anti-edad"],
            valoracion: 4.7,
            etiqueta: "OFERTA"
        },
        {
            id: 2,
            nombre: "Jabón Exfoliante de Avena",
            marca: "Natural Essences",
            precio: 18.50,
            precioAnterior: 25.00,
            imagen: "img/general/productos/jabon.jpg",
            categoria: "Cuidado Corporal",
            tipoPiel: ["Piel Grasa", "Piel Mixta"],
            ingredientes: [],
            beneficios: ["Purificante"],
            valoracion: 4.9,
            etiqueta: "NUEVO"
        },
        {
            id: 3,
            nombre: "Espuma Facial Purificante",
            marca: "Natural Essences",
            precio: 99.99,
            precioAnterior: 120.00,
            imagen: "img/general/productos/espumaLimpiadora.jpg",
            categoria: "Cuidado Facial",
            tipoPiel: ["Piel Grasa", "Piel Mixta"],
            ingredientes: ["Vitamina C"],
            beneficios: ["Purificante", "Iluminador"],
            valoracion: 4.7,
            etiqueta: "OFERTA"
        },
        {
            id: 4,
            nombre: "Shampoo Reparador Orgánico",
            marca: "Natural Essences",
            precio: 18.50,
            precioAnterior: 19.90,
            imagen: "img/general/productos/champu.jpg",
            categoria: "Cuidado Capilar",
            tipoPiel: ["Piel Normal"],
            ingredientes: [],
            beneficios: ["Hidratante"],
            valoracion: 4.9,
            etiqueta: "NUEVO"
        },
        {
            id: 6,
            nombre: "Tónico Iluminador Caudalie",
            marca: "Caudalie",
            precio: 129.90,
            precioAnterior: 145.00,
            imagen: "img/general/productos/caudalie.webp",
            categoria: "Cuidado Facial",
            tipoPiel: ["Piel Normal", "Piel Seca"],
            ingredientes: ["Vitamina C"],
            beneficios: ["Iluminador", "Hidratante"],
            valoracion: 4.9,
            etiqueta: "OFERTA"
        },
        {
            id: 7,
            nombre: "CeraVe SA Crema Alisadora",
            marca: "CeraVe",
            precio: 84.90,
            precioAnterior: 95.00,
            imagen: "img/general/productos/cerave.webp",
            categoria: "Cuidado Corporal",
            tipoPiel: ["Piel Seca", "Piel Normal"],
            ingredientes: ["Ácido Hialurónico"],
            beneficios: ["Hidratante"],
            valoracion: 4.9,
            etiqueta: ""
        },
        {
            id: 8,
            nombre: "The Ordinary AHA 30% + BHA 2%",
            marca: "The Ordinary",
            precio: 69.90,
            precioAnterior: 82.90,
            imagen: "img/general/productos/theOrdinary.webp",
            categoria: "Cuidado Facial",
            tipoPiel: ["Piel Grasa", "Piel Mixta"],
            ingredientes: [],
            beneficios: ["Purificante", "Anti-edad"],
            valoracion: 4.8,
            etiqueta: ""
        },
        {
            id: 13,
            nombre: "Aceite de Argán Puro",
            marca: "Natural Essences",
            precio: 55.00,
            precioAnterior: null,
            imagen: "img/general/productos/serum.jpg",
            categoria: "Aceites",
            tipoPiel: ["Piel Seca", "Piel Normal"],
            ingredientes: [],
            beneficios: ["Hidratante", "Anti-edad"],
            valoracion: 4.6,
            etiqueta: "NUEVO"
        }
    ];

    const contenedorGrid = document.getElementById("contenedorProductosGrid");
    const textoResultados = document.getElementById("textoResultados");
    const btnAplicarFiltros = document.getElementById("btnAplicarFiltros");
    const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
    const selectOrdenar = document.getElementById("ordenarProductos");
    
    const rangoPrecio = document.getElementById("rangoPrecio");
    const etiquetaPrecioMax = document.getElementById("etiquetaPrecioMax");

    rangoPrecio.addEventListener("input", (e) => {
        etiquetaPrecioMax.textContent = `S/ ${e.target.value}`;
    });

    function renderizarProductos(productos) {
        contenedorGrid.innerHTML = "";
        textoResultados.textContent = `Mostrando ${productos.length} resultados`;

        if (productos.length === 0) {
            contenedorGrid.innerHTML = `<div class="col-12 text-center my-5"><p class="text-muted">No se encontraron productos que coincidan con los filtros seleccionados.</p></div>`;
            return;
        }

        productos.forEach(producto => {
            let claseEtiqueta = "bg-success";
            if (producto.etiqueta === "OFERTA") claseEtiqueta = "bg-warning text-dark";
            
            const htmlEtiqueta = producto.etiqueta 
                ? `<span class="badge ${claseEtiqueta}">${producto.etiqueta}</span>` 
                : `<span></span>`;

            const htmlPrecioAnterior = producto.precioAnterior 
                ? `<span class="text-decoration-line-through text-muted small d-block">S/ ${producto.precioAnterior.toFixed(2)}</span>` 
                : `<span class="d-block" style="height: 18px;"></span>`;

            const tarjetaHTML = `
                <div class="col-sm-6 col-md-4 col-xl-3">
                    <div class="card h-100 tarjeta-producto p-2 border-0 shadow-sm">
                        <div class="d-flex justify-content-between align-items-center px-2 pt-2 position-absolute w-100 top-0 start-0 z-1">
                            ${htmlEtiqueta}
                            <img src="img/general/iconos/fav-border32.png" alt="favorito" class="icono-favorito">
                        </div>
                        
                        <div class="mt-4 mb-2 d-flex justify-content-center contenedor-img-tarjeta">
                            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid imagen-producto-ajustada">
                        </div>
                        
                        <div class="card-body text-start p-2">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <small class="text-muted" style="font-size: 0.75rem;">${producto.categoria}</small>
                                <span class="text-warning fw-bold small">★ ${producto.valoracion}</span>
                            </div>
                            <h6 class="fw-bold mb-2" style="font-size: 0.95rem; min-height: 40px;">${producto.nombre}</h6>
                            
                            <div class="mb-3">
                                ${htmlPrecioAnterior}
                                <span class="fw-bold text-danger fs-5">S/ ${producto.precio.toFixed(2)}</span>
                            </div>
                            
                            <button class="btn btn-natural w-100 btn-agregar-carrito-cat fw-bold py-2" style="font-size: 0.85rem;"
                                data-id="${producto.id}" 
                                data-nombre="${producto.nombre}" 
                                data-precio="${producto.precio}" 
                                data-img="${producto.imagen}">
                                AÑADIR AL CARRITO
                            </button>
                        </div>
                    </div>
                </div>
            `;
            contenedorGrid.insertAdjacentHTML('beforeend', tarjetaHTML);
        });

        asignarEventosCarrito();
        asignarEventosFavoritos();
    }

    function aplicarFiltrosYOrdenar() {
        const categoriasSel = Array.from(document.querySelectorAll('input[data-grupo="categoria"]:checked')).map(cb => cb.value);
        const pielSel = Array.from(document.querySelectorAll('input[data-grupo="piel"]:checked')).map(cb => cb.value);
        const ingSel = Array.from(document.querySelectorAll('input[data-grupo="ingrediente"]:checked')).map(cb => cb.value);
        const benSel = Array.from(document.querySelectorAll('input[data-grupo="beneficio"]:checked')).map(cb => cb.value);
        const valSel = document.querySelector('input[data-grupo="valoracion"]:checked') ? 4 : 0; // Si está marcado, mínimo 4
        const precioMax = parseFloat(rangoPrecio.value);

        let filtrados = baseDatosProductos.filter(prod => {
            const cumpleCategoria = categoriasSel.length === 0 || categoriasSel.includes(prod.categoria);
            const cumplePiel = pielSel.length === 0 || prod.tipoPiel.some(tp => pielSel.includes(tp));
            const cumpleIng = ingSel.length === 0 || prod.ingredientes.some(ing => ingSel.includes(ing));
            const cumpleBen = benSel.length === 0 || prod.beneficios.some(ben => benSel.includes(ben));
            const cumpleVal = prod.valoracion >= valSel;
            const cumplePrecio = prod.precio <= precioMax;

            return cumpleCategoria && cumplePiel && cumpleIng && cumpleBen && cumpleVal && cumplePrecio;
        });

        // Ordenar array
        const metodoOrden = selectOrdenar.value;
        if (metodoOrden === "precioAsc") {
            filtrados.sort((a, b) => a.precio - b.precio);
        } else if (metodoOrden === "precioDesc") {
            filtrados.sort((a, b) => b.precio - a.precio);
        } else if (metodoOrden === "valoracion") {
            filtrados.sort((a, b) => b.valoracion - a.valoracion);
        }

        renderizarProductos(filtrados);
    }

    btnAplicarFiltros.addEventListener("click", aplicarFiltrosYOrdenar);
    selectOrdenar.addEventListener("change", aplicarFiltrosYOrdenar);

    btnLimpiarFiltros.addEventListener("click", () => {
        document.querySelectorAll('.filtro-checkbox').forEach(cb => cb.checked = false);
        rangoPrecio.value = 500;
        etiquetaPrecioMax.textContent = "S/ 500";
        selectOrdenar.value = "defecto";
        aplicarFiltrosYOrdenar();
    });

    function asignarEventosCarrito() {
        const botonesCarrito = document.querySelectorAll('.btn-agregar-carrito-cat');
        botonesCarrito.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const nombre = e.target.dataset.nombre;
                const precio = parseFloat(e.target.dataset.precio);
                const img = e.target.dataset.img;

                let carritoActual = [];
                if (window.StorageNE) {
                    carritoActual = StorageNE.obtenerCarritoUsuario();
                } else {
                    carritoActual = JSON.parse(localStorage.getItem('carritoTienda')) || [];
                }

                // Verificar si existe
                const prodExistente = carritoActual.find(item => item.id === id);
                if (prodExistente) {
                    prodExistente.cantidad += 1;
                } else {
                    carritoActual.push({ id: id, nombre: nombre, precio: precio, cantidad: 1, imagen: img });
                }

                if (window.StorageNE) {
                    StorageNE.reemplazarCarritoUsuario(carritoActual);
                } else {
                    localStorage.setItem('carritoTienda', JSON.stringify(carritoActual));
                }

                alert(`¡${nombre} añadido al carrito!`);
            });
        });
    }

    function asignarEventosFavoritos() {
        const iconosCorazon = document.querySelectorAll('.icono-favorito');
        const imgBorder = "img/general/iconos/fav-border32.png";
        const imgLleno = "img/general/iconos/fav32.png";

        iconosCorazon.forEach(icono => {
            icono.replaceWith(icono.cloneNode(true));
        });

        document.querySelectorAll('.icono-favorito').forEach(icono => {
            icono.addEventListener('mouseenter', function() {
                if (!this.classList.contains('activo')) this.src = imgLleno;
            });
            icono.addEventListener('mouseleave', function() {
                if (!this.classList.contains('activo')) this.src = imgBorder;
            });
            icono.addEventListener('click', function() {
                this.classList.toggle('activo');
                this.src = this.classList.contains('activo') ? imgLleno : imgBorder;
            });
        });
    }

    if (window.StorageNE) {
        const usuario = StorageNE.obtenerUsuarioActual();
        StorageNE.pintarDatosMenuUsuario(usuario);
        StorageNE.activarCerrarSesion();
    }

    aplicarFiltrosYOrdenar();
});