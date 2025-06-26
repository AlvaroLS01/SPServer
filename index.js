const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/union-accepted', async (req, res) => {
  const { studentEmail, teacherEmail, teacherName, studentName } = req.body;
  try {
    await transporter.sendMail({
      to: studentEmail,
      subject: 'Profesor asignado',
      text: `Se ha seleccionado al profesor ${teacherName} para tus clases.`,
    });
    await transporter.sendMail({
      to: teacherEmail,
      subject: 'Nuevo alumno asignado',
      text: `Has sido elegido para dar clases a ${studentName}.`,
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Mail send failed' });
  }
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString('hex');
  try {
    await transporter.sendMail({
      to: email,
      subject: 'Recuperar contraseña',
      text: `Tu token para recuperar la contraseña es: ${token}`,
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Mail send failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
