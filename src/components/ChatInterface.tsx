
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import SuggestedActions from './SuggestedActions';
import CrisisAlert from './CrisisAlert';
import BreathingExercise from './BreathingExercise';
import { detectEmotion } from './EmotionDetector';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  emotion?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm here to help you manage stress and anxiety. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateBotResponse = (userMessage: string, emotion: string): string => {
    if (emotion === 'crisis') {
      setShowCrisisAlert(true);
      return "I'm really concerned about you. Please know that you're not alone and there are people who want to help. I'm showing you some crisis resources now.";
    }

    if (emotion === 'anxious') {
      return "I can hear that you're feeling anxious. That's completely understandable. Would you like to try a breathing exercise or talk about some strategies that might help?";
    }

    if (emotion === 'sad') {
      return "I'm sorry you're feeling down. It's okay to have these feelings. Sometimes talking about what's bothering you can help. What's been weighing on your mind?";
    }

    if (emotion === 'angry') {
      return "It sounds like you're feeling frustrated. Those feelings are valid. Would you like to explore what's causing these feelings or try some calming techniques?";
    }

    if (emotion === 'happy') {
      return "I'm glad to hear you're feeling good! It's wonderful when we have these positive moments. What's been going well for you?";
    }

    // Default responses
    const responses = [
      "Thank you for sharing that with me. Can you tell me more about how you're feeling?",
      "I'm here to listen. What would be most helpful for you right now?",
      "It sounds like you're going through something difficult. Would you like to talk about it?",
      "I appreciate you opening up. How can I best support you today?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const emotion = detectEmotion(inputText);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
      emotion: emotion !== 'neutral' ? emotion : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText, emotion),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleActionClick = (action: string) => {
    if (action === 'Start breathing exercise') {
      setShowBreathingExercise(true);
      return;
    }

    const actionMessage: Message = {
      id: Date.now().toString(),
      text: action,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, actionMessage]);

    // Generate appropriate bot response based on action
    setTimeout(() => {
      let response = '';
      if (action.includes('breathing')) {
        response = "Great choice! Breathing exercises can be very helpful for managing anxiety and stress. Let me guide you through one.";
        setShowBreathingExercise(true);
      } else if (action.includes('anxiety')) {
        response = "Here are some effective strategies for managing anxiety: 1) Practice deep breathing, 2) Use grounding techniques, 3) Challenge negative thoughts, 4) Stay present in the moment, 5) Reach out for support when needed.";
      } else if (action.includes('grounding')) {
        response = "Let's try the 5-4-3-2-1 technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps bring you back to the present moment.";
      } else if (action.includes('mood')) {
        response = "Let's check in with your mood. On a scale of 1-10, how would you rate your current emotional state? What's contributing to how you're feeling right now?";
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
            emotion={message.emotion}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <SuggestedActions onActionClick={handleActionClick} />

      <div className="p-4 border-t border-blue-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-blue-400 mt-2 text-center">
          If you're in crisis, please call 1-800-XXX-XXXX
        </div>
      </div>

      <CrisisAlert 
        isVisible={showCrisisAlert} 
        onClose={() => setShowCrisisAlert(false)} 
      />

      <BreathingExercise 
        isActive={showBreathingExercise}
        onComplete={() => setShowBreathingExercise(false)}
      />
    </div>
  );
};

export default ChatInterface;
