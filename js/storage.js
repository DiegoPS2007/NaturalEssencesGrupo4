const CLAVE_USUARIOS = "naturalEssencesUsuarios";
const CLAVE_SESION = "naturalEssencesSesion";
const CLAVE_RECORDAR = "naturalEssencesRecordar";
const CLAVE_ULTIMA_COMPRA = "naturalEssencesUltimaCompra";

function leerJSON(clave, valorInicial) {
    const datos = localStorage.getItem(clave);
    if (!datos) {
        return valorInicial;
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        return valorInicial;
    }
}

function guardarJSON(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerUsuarios() {
    return leerJSON(CLAVE_USUARIOS, []);
}

function guardarUsuarios(usuarios) {
    guardarJSON(CLAVE_USUARIOS, usuarios);
}

function completarDatosUsuario(usuario) {
    return {
        id: usuario.id || generarId("usuario"),
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        correo: normalizarCorreo(usuario.correo),
        contrasena: usuario.contrasena || "",
        telefono: usuario.telefono || "",
        fechaRegistro: usuario.fechaRegistro || new Date().toISOString(),
        direcciones: Array.isArray(usuario.direcciones) ? usuario.direcciones : [],
        carrito: Array.isArray(usuario.carrito) ? usuario.carrito : [],
        favoritos: Array.isArray(usuario.favoritos) ? usuario.favoritos : [],
        compras: Array.isArray(usuario.compras) ? usuario.compras : []
    };
}

function agregarPedidoPruebaYemer(usuarios) {
    const usuarioYemer = usuarios.find((usuario) => {
        const nombreCompleto = `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim().toLowerCase();
        return nombreCompleto === "yemer huayapa";
    });

    if (!usuarioYemer) {
        return usuarios;
    }

    const yaExiste = (usuarioYemer.compras || []).some((compra) => compra.id === "pedido-prueba-yemer-entregado");
    if (yaExiste) {
        return usuarios;
    }

    const direccionPrueba = (usuarioYemer.direcciones || []).find((direccion) => direccion.principal)
        || (usuarioYemer.direcciones || [])[0]
        || {
            departamento: "Lambayeque",
            provincia: "Chiclayo",
            distrito: "Chiclayo",
            codigoPostal: "14001",
            direccion: "Av. Principal 123",
            detalle: "Casa",
            referencia: "Frente al parque",
            principal: true
        };

    usuarioYemer.compras = [
        {
            id: "pedido-prueba-yemer-entregado",
            numero: "#NE-24025",
            fecha: "2026-06-20T10:00:00.000Z",
            productos: [
                {
                    id: 1,
                    nombre: "Serum Facial Hidratante",
                    precio: 45,
                    cantidad: 1,
                    imagen: "img/general/productos/serum.jpg"
                },
                {
                    id: 2,
                    nombre: "Jabon Exfoliante de Avena",
                    precio: 18.5,
                    cantidad: 2,
                    imagen: "img/general/productos/jabon.jpg"
                }
            ],
            subtotal: 82,
            descuento: 0,
            total: 82,
            direccion: direccionPrueba,
            metodoPago: "Yape / Plin",
            estado: "Entregado",
            resenas: []
        },
        ...usuarioYemer.compras
    ];

    return usuarios;
}

function inicializarStorage() {
    const usuariosCompletos = obtenerUsuarios().map(completarDatosUsuario);
    guardarUsuarios(agregarPedidoPruebaYemer(usuariosCompletos));
}

function normalizarCorreo(correo) {
    return String(correo || "").trim().toLowerCase();
}

function generarId(prefijo) {
    return `${prefijo}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function crearUsuario(datos) {
    const usuarios = obtenerUsuarios();
    const correo = normalizarCorreo(datos.correo);

    if (buscarUsuarioPorCorreo(correo)) {
        return null;
    }

    const usuario = {
        id: generarId("usuario"),
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        correo: correo,
        contrasena: datos.contrasena,
        telefono: datos.telefono ? datos.telefono.trim() : "",
        fechaRegistro: new Date().toISOString(),
        direcciones: [],
        carrito: [],
        favoritos: [],
        compras: []
    };

    usuarios.push(usuario);
    guardarUsuarios(usuarios);
    return usuario;
}

function buscarUsuarioPorCorreo(correo) {
    const correoNormalizado = normalizarCorreo(correo);
    return obtenerUsuarios().find((usuario) => usuario.correo === correoNormalizado) || null;
}

function buscarUsuarioPorId(idUsuario) {
    return obtenerUsuarios().find((usuario) => usuario.id === idUsuario) || null;
}

function actualizarUsuario(idUsuario, cambios) {
    const usuarios = obtenerUsuarios();
    const indice = usuarios.findIndex((usuario) => usuario.id === idUsuario);

    if (indice === -1) {
        return null;
    }

    usuarios[indice] = {
        ...usuarios[indice],
        ...cambios
    };

    guardarUsuarios(usuarios);
    return usuarios[indice];
}

function actualizarUsuarioActual(cambios) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
        return null;
    }

    return actualizarUsuario(usuario.id, cambios);
}

function migrarCarritoTemporalAlUsuario(idUsuario) {
    const carritoTemporal = leerJSON("carritoTienda", []);
    if (!Array.isArray(carritoTemporal) || carritoTemporal.length === 0) {
        return;
    }

    const usuario = buscarUsuarioPorId(idUsuario);
    if (!usuario) {
        return;
    }

    const carritoActual = Array.isArray(usuario.carrito) ? usuario.carrito : [];
    const carritoMezclado = [...carritoActual];

    carritoTemporal.forEach((productoTemporal) => {
        const productoExistente = carritoMezclado.find((producto) => producto.id === productoTemporal.id);
        if (productoExistente) {
            productoExistente.cantidad += productoTemporal.cantidad;
        } else {
            carritoMezclado.push(productoTemporal);
        }
    });

    actualizarUsuario(idUsuario, {
        carrito: carritoMezclado
    });
    localStorage.removeItem("carritoTienda");
}

function iniciarSesion(idUsuario, recordar) {
    guardarJSON(CLAVE_SESION, {
        idUsuario: idUsuario,
        fecha: new Date().toISOString()
    });

    if (recordar) {
        localStorage.setItem(CLAVE_RECORDAR, idUsuario);
    } else {
        localStorage.removeItem(CLAVE_RECORDAR);
    }

    migrarCarritoTemporalAlUsuario(idUsuario);
}

function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}

function obtenerSesion() {
    return leerJSON(CLAVE_SESION, null);
}

function obtenerUsuarioActual() {
    const sesion = obtenerSesion();
    if (!sesion || !sesion.idUsuario) {
        return null;
    }

    return buscarUsuarioPorId(sesion.idUsuario);
}

function protegerPagina() {
    if (!obtenerUsuarioActual()) {
        window.location.href = "iniciarSesion.html";
        return null;
    }

    return obtenerUsuarioActual();
}

function obtenerIniciales(usuario) {
    const inicialNombre = usuario.nombre ? usuario.nombre.trim().charAt(0) : "";
    const inicialApellido = usuario.apellido ? usuario.apellido.trim().charAt(0) : "";
    return `${inicialNombre}${inicialApellido}`.toUpperCase() || "NE";
}

function pintarDatosMenuUsuario(usuario) {
    if (!usuario) {
        return;
    }

    document.querySelectorAll(".avatar-iniciales").forEach((elemento) => {
        elemento.textContent = obtenerIniciales(usuario);
    });

    document.querySelectorAll(".nombre-usuario").forEach((elemento) => {
        elemento.textContent = `${usuario.nombre} ${usuario.apellido}`.trim();
    });

    document.querySelectorAll(".correo-usuario").forEach((elemento) => {
        elemento.textContent = usuario.correo;
    });

    document.querySelectorAll(".miembro").forEach((elemento) => {
        const anio = usuario.fechaRegistro ? new Date(usuario.fechaRegistro).getFullYear() : new Date().getFullYear();
        elemento.textContent = `Miembro desde ${anio}`;
    });
}

function activarCerrarSesion() {
    document.querySelectorAll(".opcion-menu").forEach((enlace) => {
        if (enlace.textContent.trim().toLowerCase().includes("cerrar")) {
            enlace.addEventListener("click", (evento) => {
                evento.preventDefault();
                cerrarSesion();
                window.location.href = "iniciarSesion.html";
            });
        }
    });
}

function reemplazarCarritoUsuario(carrito) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
        localStorage.setItem("carritoTienda", JSON.stringify(carrito));
        return;
    }

    actualizarUsuario(usuario.id, {
        carrito: carrito
    });
}

function obtenerCarritoUsuario() {
    const usuario = obtenerUsuarioActual();
    if (usuario) {
        return Array.isArray(usuario.carrito) ? usuario.carrito : [];
    }

    return leerJSON("carritoTienda", []);
}

function vaciarCarritoUsuario() {
    reemplazarCarritoUsuario([]);
    localStorage.removeItem("carritoTienda");
    localStorage.removeItem("descuentoTienda");
}

function crearCompraUsuario(datosCompra) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
        return null;
    }

    const compra = {
        id: generarId("pedido"),
        numero: `#NE-${Math.floor(10000 + Math.random() * 90000)}`,
        fecha: new Date().toISOString(),
        productos: datosCompra.productos,
        total: datosCompra.total,
        subtotal: datosCompra.subtotal,
        descuento: datosCompra.descuento,
        direccion: datosCompra.direccion,
        metodoPago: datosCompra.metodoPago,
        estado: "En proceso",
        resenas: []
    };

    const compras = Array.isArray(usuario.compras) ? usuario.compras : [];
    actualizarUsuario(usuario.id, {
        compras: [compra, ...compras],
        carrito: []
    });

    guardarJSON(CLAVE_ULTIMA_COMPRA, {
        idUsuario: usuario.id,
        idCompra: compra.id
    });

    return compra;
}

function obtenerUltimaCompraUsuario() {
    const usuario = obtenerUsuarioActual();
    const ultima = leerJSON(CLAVE_ULTIMA_COMPRA, null);

    if (!usuario || !ultima || ultima.idUsuario !== usuario.id) {
        return null;
    }

    return (usuario.compras || []).find((compra) => compra.id === ultima.idCompra) || null;
}

function guardarResenaCompra(idCompra, resena) {
    const usuario = obtenerUsuarioActual();
    if (!usuario) {
        return null;
    }

    const compras = (usuario.compras || []).map((compra) => {
        if (compra.id !== idCompra) {
            return compra;
        }

        return {
            ...compra,
            resenas: [...(compra.resenas || []), resena]
        };
    });

    return actualizarUsuario(usuario.id, {
        compras: compras
    });
}

window.StorageNE = {
    obtenerUsuarios,
    crearUsuario,
    buscarUsuarioPorCorreo,
    buscarUsuarioPorId,
    actualizarUsuario,
    actualizarUsuarioActual,
    migrarCarritoTemporalAlUsuario,
    iniciarSesion,
    cerrarSesion,
    obtenerSesion,
    obtenerUsuarioActual,
    protegerPagina,
    obtenerIniciales,
    pintarDatosMenuUsuario,
    activarCerrarSesion,
    reemplazarCarritoUsuario,
    obtenerCarritoUsuario,
    vaciarCarritoUsuario,
    crearCompraUsuario,
    obtenerUltimaCompraUsuario,
    guardarResenaCompra,
    normalizarCorreo
};

inicializarStorage();
