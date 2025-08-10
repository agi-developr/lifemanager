import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { chatAPI } from '../services/api';

function ChatWindow({ module }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize chat session when module changes
    initializeSession();
  }, [module]);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      const response = await chatAPI.createSession(module);
      
      setSessionId(response.data.sessionId);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error initializing session:', error);
      // Fallback to mock welcome message
      const welcomeMessages = {
        passions: "Hi! I'm excited to help you discover your passions! 🔥 What activities make you lose track of time?",
        strengths: "Hello! Let's identify your unique strengths and talents! 💪 What do people often compliment you on?",
        upskill: "Welcome! I'm here to help you develop new skills! 📚 What would you like to learn?",
        money: "Hi! Let's work on your financial goals! 💰 What's your biggest financial challenge right now?",
        career: "Hello! I'm here to help you plan your career! 🚀 What's your dream job?",
        events: "Hi! Let's find some great events for you! 📅 What type of events interest you most?",
        goals: "Welcome! Let's set and track your goals! 🎯 What's one thing you want to achieve this year?",
        community: "Hello! Let's help you connect with like-minded people! 👥 What communities interest you?",
        business: "Welcome to Business Builder! 🏗️ What's the problem you're solving and for whom?",
        networking: "Welcome to Networking Coach! 🧩 Who do you want to connect with and why?",
      };

      const welcomeMessage = welcomeMessages[module] || "Hi! I'm your AI life coach. How can I help you today?";
      
      setMessages([
        {
          id: Date.now(),
          sender: 'ai',
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage(sessionId, input.trim(), module);
      
      // Update session ID if it was created
      if (response.data.sessionId) {
        setSessionId(response.data.sessionId);
      }

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: response.data.messages[response.data.messages.length - 1].content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response
      const fallbackResponses = {
        passions: [
          "That's fascinating! What specifically about that excites you? 🤔",
          "I can see your passion shining through! What would you do if money wasn't an issue? 💭",
          "That's a great insight! How do you feel when you're doing that activity? ✨",
        ],
        business: [
          'Great! Who is your target customer and what top problem are you solving?',
          'Nice idea. What is the simplest MVP you could ship in a week?',
          'How would you validate demand with 5 conversations this week?',
        ],
        networking: [
          "What is your networking goal this month (mentor, peers, clients, cofounder)?",
          "Let's craft a 1–2 sentence intro. How would you describe yourself and what you seek?",
          "Name 2 communities where your people hang out.",
        ],
        strengths: [
          "That's a wonderful strength! How do you think you could leverage that more? 💪",
          "I can see that coming through in your response! What situations bring out this strength? 🌟",
          "That's definitely a valuable skill! How do you think others benefit from this strength? 🤝",
        ],
        upskill: [
          "Great choice! What's your current experience level with that skill? 📊",
          "That's a valuable skill to develop! What's motivating you to learn this? 🎯",
          "Excellent! What resources do you think would work best for your learning style? 📚",
        ],
        money: [
          "That's a common challenge! What's your biggest financial goal right now? 🎯",
          "I understand that concern! What's your current approach to managing money? 💡",
          "That's important to address! What would financial freedom look like to you? 🚀",
        ],
        career: [
          'That sounds exciting! What aspects of that job appeal to you most? 🎯',
          "Great vision! What skills do you think you'd need to get there? 📚",
          "That's ambitious! What's the first step you could take toward that goal? 🚀",
        ],
        events: [
          "That's a great interest! What type of events would help you grow in that area? 🌱",
          'Excellent! What\'s your preferred way to network and connect? 🤝',
          'That sounds fun! What would make an event truly valuable for you? ⭐',
        ],
        goals: [
          "That's a meaningful goal! What's your timeline for achieving it? 📅",
          'Great ambition! What obstacles do you think you might face? 🚧',
          "That's inspiring! What's the first small step you could take today? 🎯",
        ],
        community: [
          "That's wonderful! What values are most important to you in a community? 🤝",
          "Great choice! What would you hope to contribute to that community? 💫",
          "That sounds perfect! What would make you feel truly connected? ❤️",
        ],
      };

      const responses = fallbackResponses[module] || [
        "That's interesting! Tell me more about that.",
        "I'd love to hear more about your thoughts on this.",
        "That's a great point! What else comes to mind?",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isUser={message.sender === 'user'}
          />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;


