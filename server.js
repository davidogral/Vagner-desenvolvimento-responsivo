require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const chatbotRoutes = require('./routes/chatbot');

const app = express();
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Usar as rotas do chatbot
app.use('/api/chatbot', chatbotRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
