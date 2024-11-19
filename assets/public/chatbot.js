document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendButton");
  const userInput = document.getElementById("userInput");

  // Verifique se os elementos foram encontrados
  if (!sendButton || !userInput) {
    console.error('Elemento(s) não encontrado(s)! Verifique os IDs no HTML.');
    return;
  }

  sendButton.addEventListener("click", async () => {
    const message = userInput.value;  // Acessa o valor do input

    if (!message) {
      console.error("Por favor, insira uma mensagem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error(`Erro do servidor: ${response.status}`);
      }

      const data = await response.json();

      // Exibindo a resposta do chatbot
      const botReply = data.reply;
      document.getElementById("chatBox").innerHTML += `
        <div class="message user">Você: ${message}</div>
        <div class="message bot">Chatbot: ${botReply}</div>
      `;

      // Limpar o campo de entrada
      userInput.value = "";
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      document.getElementById("chatBox").innerHTML += `
        <div class="message error">Erro: Não foi possível se conectar ao servidor.</div>
      `;
    }
  });
});
