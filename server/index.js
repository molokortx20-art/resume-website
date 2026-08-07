// express rest api
import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// get resume data
app.get('/api/resume', (req, res) => {
  try {
    const data = db.getResumeData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// post contact message
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Заполните все поля!' });
  }

  try {
    const saved = db.addMessage({ name, email, message });
    res.json({ success: true, message: 'Сообщение успешно отправлено в БД!', messageData: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// listen
app.listen(PORT, () => {
  console.log(`🚀 REST API Server running on http://localhost:${PORT}`);
});
