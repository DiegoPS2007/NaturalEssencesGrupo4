document.addEventListener('DOMContentLoaded', () => {
    const compra = StorageNE.obtenerUltimaCompraUsuario();

    const elementoNumeroPedido = document.getElementById('texto-numero-pedido');
    if (elementoNumeroPedido) {
        elementoNumeroPedido.textContent = compra ? compra.numero : 'No registrado';
    }

    const elementoMontoTotal = document.getElementById('texto-monto-total');
    if (elementoMontoTotal) {
        elementoMontoTotal.textContent = compra ? Number(compra.total).toFixed(2) : '0.00';
    }

    const elementoDireccionEnvio = document.getElementById('texto-direccion-envio');
    if (elementoDireccionEnvio) {
        if (compra && compra.direccion) {
            const distrito = compra.direccion.distrito ? `, ${compra.direccion.distrito}` : '';
            elementoDireccionEnvio.textContent = `${compra.direccion.direccion || ''}${distrito}`;
        } else {
            elementoDireccionEnvio.textContent = 'Direccion no registrada';
        }
    }

    const botonVerPedidos = document.querySelector('.contenedor-botones-accion a[href="#"]');
    if (botonVerPedidos) {
        botonVerPedidos.setAttribute('href', 'misCompras.html');
    }
});
