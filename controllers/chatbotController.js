const Conversation = require('../models/Conversation');

// Envia mensagem para o chatbot
exports.sendMessage = async (req, res) => {
  const { conversationId, message } = req.body;

  try {
    // Processa a mensagem e gera a resposta (mock)
    const botResponse = `Resposta do bot para: "${message}"`;

    // Salva a conversa
    const conversation = await Conversation.findOneAndUpdate(
      { conversationId },
      {
        $push: {
          messages: { userMessage: message, botResponse, timestamp: new Date() }
        }
      },
      { upsert: true, new: true }
    );

    res.json({ conversationId, botResponse });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }
};

// Histórico de conversas
exports.getConversationHistory = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const conversation = await Conversation.findOne({ conversationId });
    if (!conversation) return res.status(404).json({ error: 'Conversa não encontrada' });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar histórico de conversas.' });
  }
};
