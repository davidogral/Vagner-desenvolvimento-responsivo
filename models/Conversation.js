const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  messages: [
    {
      userMessage: String,
      botResponse: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Conversation', conversationSchema);
