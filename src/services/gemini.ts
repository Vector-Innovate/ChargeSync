import { GoogleGenerativeAI, GenerativeModel, ChatSession } from "@google/generative-ai";

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export class GeminiService {
  private model: GenerativeModel;
  private chat: ChatSession | null = null;
  private history: ChatMessage[] = [];
  private isInitialized = false;
  private readonly systemContext = `You are a helpful AI assistant for Project Bolt, a modern e-commerce platform. Here's what you need to know:

Project Overview:
Project Bolt is a modern e-commerce platform offering a seamless shopping experience enhanced by AI-powered assistance.

Core Services:
1. AI Assistant Features:
   - 24/7 customer support
   - Personalized product recommendations
   - Order status tracking
   - Shopping assistance

2. E-commerce Features:
   - Product catalog and search
   - Shopping cart management
   - Secure checkout process
   - Order tracking system
   - Customer reviews and ratings

3. Partner Program:
   - Partner onboarding
   - Commission management
   - Performance analytics
   - Resource center

4. Security Features:
   - Secure user authentication
   - Multi-factor authentication
   - Encrypted data transmission
   - Session management

5. Community Features:
   - User forums
   - Product reviews
   - Community discussions
   - Social sharing
   - User-generated content

6. Support Services:
   - AI chatbot assistance
   - Email support system
   - Help center documentation
   - FAQ section
   - Phone support

Technical Stack:
- Frontend: React with TypeScript, Vite, Tailwind CSS
- Backend: Firebase Authentication, Cloud Firestore, Google Gemini AI

You can help users with:
- Finding and purchasing products
- Understanding our delivery services
- Managing their orders and account
- Getting information about our partner program
- Answering questions about our community features
- Technical support and troubleshooting

Please provide accurate, helpful responses based on this context.`;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured');
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    this.initChat();
  }

  private async initChat(retryCount = 0) {
    const maxRetries = 3;
    try {
      this.chat = this.model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
          topP: 0.8,
          topK: 40
        }
      });
      
      // Send system context as first message
      const result = await this.chat.sendMessage(this.systemContext);
      const response = await result.response;
      if (!response) {
        throw new Error('Failed to initialize chat with system context');
      }
      this.isInitialized = true;
    } catch (error) {
      console.error(`Error initializing chat (attempt ${retryCount + 1}):`, error);
      this.chat = null;
      this.isInitialized = false;

      if (retryCount < maxRetries) {
        console.log(`Retrying chat initialization (attempt ${retryCount + 2})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return this.initChat(retryCount + 1);
      }
      
      throw new Error(`Failed to initialize chat session after ${maxRetries + 1} attempts`);
    }
  }

  async sendMessage(message: string): Promise<string> {
    if (!message.trim()) {
      throw new Error('Message cannot be empty');
    }

    try {
      if (!this.isInitialized) {
        await this.initChat();
      }

      // Add user message to history
      this.history.push({ role: 'user', content: message });

      // Send message and get response
      if (!this.chat) {
        throw new Error('Chat session is not initialized');
      }

      const result = await this.chat.sendMessage(message);
      if (!result) {
        throw new Error('No response received from Gemini API');
      }

      const response = await result.response;
      if (!response) {
        throw new Error('Invalid response structure from Gemini API');
      }

      const text = response.text();
      
      if (!text || typeof text !== 'string') {
        throw new Error('Received empty or invalid response text from AI');
      }
      
      // Add bot response to history
      this.history.push({ role: 'bot', content: text });
      
      return text;
    } catch (error) {
      console.error('Error in Gemini API call:', error);
      
      // Reset chat session on critical errors
      if (error instanceof Error && 
          (error.message.includes('Failed to initialize') || 
           error.message.includes('Invalid response') ||
           error.message.includes('No response received'))) {
        this.isInitialized = false;
        try {
          await this.initChat();
        } catch (initError) {
          console.error('Failed to reinitialize chat:', initError);
          return 'I apologize, but I am having trouble connecting to the AI service. Please try again in a moment.';
        }
      }

      if (error instanceof Error) {
        if (error.message.includes('blocked') || error.message.includes('safety')) {
          return 'I apologize, but I cannot provide a response to that query due to content safety restrictions.';
        }
        return `I apologize, but I encountered an issue: ${error.message}. Please try rephrasing your question.`;
      }
      return 'I apologize, but I encountered an unexpected error. Please try again in a moment.';
    }
  }

  resetChat() {
    this.history = [];
    this.initChat();
  }

  getHistory(): ChatMessage[] {
    return [...this.history];
  }
}

export const geminiService = new GeminiService();