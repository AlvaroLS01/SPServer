# Notification Server

Este servidor Node.js expone dos endpoints REST para el envio de correos de notificacion.

## Instalacion

```bash
npm install
```

Configura las variables de entorno `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER` y `SMTP_PASS` con las credenciales de tu servidor SMTP.

## Uso

```bash
npm start
```

### POST /api/union-accepted
Envia un correo al alumno y al profesor indicando que la union ha sido aceptada. Debe recibirse un JSON con `studentEmail`, `teacherEmail`, `teacherName` y `studentName`.

### POST /api/forgot-password
Genera un token y lo envia por correo para la recuperacion de contraseña. El cuerpo debe contener `email`.
