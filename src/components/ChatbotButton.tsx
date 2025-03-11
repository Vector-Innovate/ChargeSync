import React, { useState } from 'react';
import { MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { geminiService, ChatMessage } from '../services/gemini';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'bot', content: 'Hi! I\'m your AI assistant. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setIsLoading(true);
    try {
      const response = await geminiService.sendMessage(input);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'I apologize, but I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-screen bg-white shadow-xl transition-all duration-300 flex ${isOpen ? (isMinimized ? 'w-16' : 'w-80 md:w-96') : 'w-0'}`}>
      {isOpen && (
        <div className="flex flex-col w-full relative">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            {!isMinimized && <h3 className="font-medium">AI Assistant</h3>}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:text-blue-200"
              >
                {isMinimized ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatbotButton;