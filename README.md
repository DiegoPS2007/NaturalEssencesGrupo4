# Módulos del Proyecto

## Proyecto principal

| Int. | Módulo / CRUD | Funcionalidades que debe sustentar | Aspectos técnicos a demostrar | Responsable |
|---|---|---|---|---|
| 1 | Autenticación y usuarios[cite: 1] | Login, registro, roles, protección de rutas, activar/desactivar usuario.[cite: 1] | Flask-JWT. bcrypt. Decorador por rol. Tabla users. Todas las rutas del sistema requieren token válido.[cite: 1] | Pizarro Santisteban |
| 2 | Registro de tickets + fotos[cite: 1] | Formulario de nuevo ticket, adjunto de hasta 3 fotos, validación de tipo MIME, visualización en detalle.[cite: 1] | flask.request.files. Validación MIME. Almacenamiento en /uploads. Miniatura + zoom.[cite: 1] | Huayapa Mamani |
| 3 | Asignación + historial de estados[cite: 1] | Asignar técnico, cambiar estado, comentario obligatorio por cambio, línea de tiempo en detalle del ticket.[cite: 1] | Tabla ticket_historial. UPDATE validado. Timeline en frontend con timestamps.[cite: 1] | Vasquez Coronel |
| 4 | SLA + semáforo visual[cite: 1] | Cálculo de tiempo transcurrido, semáforo verde/amarillo/rojo, alerta en listado de tickets vencidos o por vencer.[cite: 1] | Diferencia de timestamps Python. Lógica por prioridad (4h/24h/72h). Clases CSS dinámicas.[cite: 1] | Santisteban Bustamante |
| 5 | Notificaciones internas[cite: 1] | Campana con contador, generación de notificación en eventos clave, marcar como leída.[cite: 1] | Tabla notificaciones. AJAX/fetch para contador. UPDATE masivo o individual.[cite: 1] | Centurion Gomez |

## Trabajo de investigación

| N.º | Módulo | Funcionalidad de investigación | Tecnología base sugerida | Responsable |
|---|---|---|---|---|
| 1 | Autenticación y usuarios[cite: 2] | Inicio de sesión con reconocimiento facial[cite: 2] | face-api.js (TensorFlow.js) + cámara del navegador[cite: 2] | Pizarro Santisteban |
| 2 | Registro de tickets[cite: 2] | Creación de tickets por voz con transcripción automática[cite: 2] | Web Speech API[cite: 2] | Huayapa Mamani |
| 3 | Inventario de equipos[cite: 2] | Etiquetas QR por equipo y reporte de incidencia escaneando el QR[cite: 2] | qrcode.js + html5-qrcode[cite: 2] | Pizarro Santisteban |
| 4 | Asignación y atención técnica[cite: 2] | Aviso al técnico por WhatsApp o SMS al asignarle un ticket[cite: 2] | Twilio (sandbox de WhatsApp / SMS)[cite: 2] | Vasquez Coronel |
| 5 | Seguimiento y comunicación[cite: 2] | Chat en tiempo real entre usuario y técnico dentro del ticket[cite: 2] | WebSockets (Socket.IO)[cite: 2] | Vasquez Coronel |
| 6 | Base de conocimiento[cite: 2] | Asistente con IA que sugiere soluciones antes de crear el ticket[cite: 2] | API de un modelo de lenguaje (LLM)[cite: 2] | Huayapa Mamani |
| 7 | SLA y escalamiento[cite: 2] | Escalamiento automático por vencimiento de SLA con notificaciones push[cite: 2] | Tareas programadas (cron) + Web Push API[cite: 2] | Santisteban Bustamante |
| 8 | Reportes y dashboard[cite: 2] | Reporte PDF con código QR de verificación y envío programado por correo[cite: 2] | Generación de PDF + cron + SMTP[cite: 2] | Centurion Gomez |

```
