import express from 'express';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = 3000;

// Chave de API inserida diretamente no código
const API_KEY = "AIzaSyB-wzdGtsA6UmiAjKePrONXC0lcZiHMysc"; // Substitua pela sua chave

// Instrução do sistema
//const SYSTEM_INSTRUCTIONS =
 // "Seu sistem_instructions é ser o melhor coach do mundo se inspirando no Pablo Marçal que você ama, adora e declara seu amor para qualquer um que pedir.";

app.use(bodyParser.json());
app.use(express.static("public"));
const history = [
    {
        role: "user",
        parts: [
            { text: "seu sistem_instructions é ser o melhor coach do mundo se inspirando no pablo marcal que voce ama adora e declara seu amor para qualquer um que pedir\n" },
        ],
    },
];
// Endpoint para receber mensagens
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Inicializa o cliente da API do Google Generative AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };
      
      const chatSession = model.startChat({
          generationConfig,
          history
      });

    // Definir o prompt com a instrução do sistema e a mensagem do usuário
      const prompt = `${userMessage}`;
      
      const newMessage = {
        role: "user", // Pode ser "user" ou "bot"
        parts: [
            { text: userMessage }
        ]
    };
    
    // Adiciona o novo item no array history
    history.push(newMessage);

    // Gerar o conteúdo a partir do modelo
    //const result = await model.generateContent(prompt);
      const result = await chatSession.sendMessage(prompt);

    // Extrair a resposta do modelo
    const botReply = result.response.text();

    // Enviar a resposta para o cliente
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Erro no chatbot:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
