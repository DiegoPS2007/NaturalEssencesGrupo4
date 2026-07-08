document.addEventListener('DOMContentLoaded', () => {
    
    const numeroMinimoPedido = 10000;
    const numeroMaximoPedido = 99999;
    const numeroPedidoGenerado = Math.floor(Math.random() * (numeroMaximoPedido - numeroMinimoPedido + 1)) + numeroMinimoPedido;
    const elementoNumeroPedido = document.getElementById('texto-numero-pedido');
    if (elementoNumeroPedido) {
        elementoNumeroPedido.textContent = `#NE-${numeroPedidoGenerado}`;
    }
    const montoTotalGuardado = localStorage.getItem('totalConfirmacion') || '0.00';
    const direccionEnvioGuardada = localStorage.getItem('direccionConfirmacion') || 'Dirección no registrada';
    const elementoMontoTotal = document.getElementById('texto-monto-total');
    if (elementoMontoTotal) {
        elementoMontoTotal.textContent = montoTotalGuardado;
    }
    const elementoDireccionEnvio = document.getElementById('texto-direccion-envio');
    if (elementoDireccionEnvio) {
        elementoDireccionEnvio.textContent = direccionEnvioGuardada;
    }
});