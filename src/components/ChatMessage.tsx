
import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  emotion?: string;
}

const ChatMessage = ({ message, isBot, timestamp, emotion }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isBot 
          ? 'bg-blue-50 text-blue-900' 
          : 'bg-blue-500 text-white'
      }`}>
        <p className="text-sm">{message}</p>
        {emotion && (
          <div className="mt-1 text-xs opacity-70">
            Detected emotion: {emotion}
          </div>
        )}
        <div className={`text-xs mt-1 ${isBot ? 'text-blue-400' : 'text-blue-200'}`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
