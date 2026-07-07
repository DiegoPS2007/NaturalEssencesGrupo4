// programasConfirmacion.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Generar número de pedido aleatorio (Ej: #NE-84729)
    const min = 10000;
    const max = 99999;
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('conf-pedido').textContent = `#NE-${numeroAleatorio}`;

    // 2. Recuperar el monto final y la dirección desde el LocalStorage
    // (En caso de que entren directo sin comprar, pone valores por defecto para que no se rompa el diseño)
    const totalRecuperado = localStorage.getItem('totalConfirmacion') || '0.00';
    const direccionRecuperada = localStorage.getItem('direccionConfirmacion') || 'Dirección no registrada';

    // 3. Pintar los datos en el HTML
    document.getElementById('conf-total').textContent = totalRecuperado;
    document.getElementById('conf-direccion').textContent = direccionRecuperada;

    // 4. (Opcional pero recomendado) Limpiar los datos después de mostrarlos 
    // para que si recargan la página, no quede el monto guardado eternamente.
    // localStorage.removeItem('totalConfirmacion');
    // localStorage.removeItem('direccionConfirmacion');
});