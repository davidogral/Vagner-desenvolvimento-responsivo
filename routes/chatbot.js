// routes/chatbot.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

router.post('/send-message', chatbotController.sendMessage);
router.get('/history/:conversationId', chatbotController.getConversationHistory);

module.exports = router;
