"use client";

import { useState } from "react";
import { X, Send, MessageCircle, HelpCircle, Mail, Phone } from "lucide-react";

type SupportMessage = {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
};

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 1,
      text: "Olá! 👋 Como posso ajudá-lo hoje?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);

  const faqs = [
    {
      question: "Como alterar meu plano alimentar?",
      answer: "Você pode refazer o quiz na página inicial ou acessar Configurações > Dados Pessoais para atualizar suas preferências.",
    },
    {
      question: "Os treinos mudam automaticamente?",
      answer: "Sim! A cada 30 dias, seus treinos são atualizados automaticamente para um novo ciclo de dificuldade progressiva.",
    },
    {
      question: "Como cancelar minha assinatura?",
      answer: "Acesse Configurações > Assinatura e clique em 'Cancelar Assinatura'. Você pode cancelar a qualquer momento sem taxas.",
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim! Utilizamos criptografia de ponta a ponta e seguimos todas as normas da LGPD. Seus dados nunca são compartilhados.",
    },
    {
      question: "Posso usar o app offline?",
      answer: "Atualmente o app requer conexão com internet. Estamos trabalhando em uma versão offline para breve!",
    },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: SupportMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simular resposta automática
    setTimeout(() => {
      const autoReply: SupportMessage = {
        id: messages.length + 2,
        text: "Obrigado pela sua mensagem! Nossa equipe responderá em breve. Tempo médio de resposta: 5 minutos.",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  const handleFAQClick = (answer: string) => {
    const faqMessage: SupportMessage = {
      id: messages.length + 1,
      text: answer,
      sender: "support",
      timestamp: new Date(),
    };
    setMessages([...messages, faqMessage]);
    setShowFAQ(false);
  };

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 animate-bounce"
          aria-label="Abrir suporte"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Widget de Suporte */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Suporte FitTracker</h3>
                <p className="text-xs opacity-90">Online - Respondemos em 5 min</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setShowFAQ(false)}
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                !showFAQ
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setShowFAQ(true)}
              className={`flex-1 py-3 px-4 font-medium transition-colors ${
                showFAQ
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              FAQ
            </button>
          </div>

          {/* Conteúdo */}
          {!showFAQ ? (
            <>
              {/* Mensagens */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-white text-gray-800 shadow-md"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-white/70"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de Mensagem */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:scale-110 transition-transform"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* FAQ */}
              <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96 bg-gray-50">
                <div className="flex items-center gap-2 text-purple-600 mb-4">
                  <HelpCircle className="w-5 h-5" />
                  <h4 className="font-bold">Perguntas Frequentes</h4>
                </div>
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(faq.answer)}
                    className="w-full text-left bg-white p-4 rounded-xl hover:shadow-lg transition-all border border-gray-200"
                  >
                    <p className="font-medium text-gray-900 mb-2">{faq.question}</p>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </button>
                ))}
              </div>

              {/* Contatos Alternativos */}
              <div className="p-4 border-t border-gray-200 bg-white space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Outros canais de suporte:
                </p>
                <a
                  href="mailto:suporte@fittracker.com"
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                >
                  <Mail className="w-4 h-4" />
                  suporte@fittracker.com
                </a>
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                >
                  <Phone className="w-4 h-4" />
                  +55 (11) 99999-9999
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
