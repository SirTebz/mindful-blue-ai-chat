import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Loader2, Download } from 'lucide-react';
import ChatMessage from './ChatMessage';
import SuggestedActions from './SuggestedActions';
import CrisisAlert from './CrisisAlert';
import BreathingExercise from './BreathingExercise';
import ResetChatDialog from './ResetChatDialog';
import MindfulnessExercises from './MindfulnessExercises';
import MoodTracker from './MoodTracker';
import MeditationTimer from './MeditationTimer';
import MessageLimitBanner from './MessageLimitBanner';
import ConversationExport from './ConversationExport';
import { useAIChat } from '@/hooks/useAIChat';
import { toast } from 'sonner';

const MAX_MESSAGES = 35;

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  emotion?: string;
}

const CRISIS_KEYWORDS = ['suicide', 'kill myself', 'end my life', 'want to die', 'self-harm', 'hurt myself'];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi, I'm Mindful AI, your mental wellness companion. I'm here to listen and support you. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showMindfulnessExercises, setShowMindfulnessExercises] = useState(false);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showMeditationTimer, setShowMeditationTimer] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [currentMood, setCurrentMood] = useState<number | null>(null);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { sendMessage, isLoading } = useAIChat();

  const messagesRemaining = Math.max(0, MAX_MESSAGES - userMessageCount);
  const isLimitReached = userMessageCount >= MAX_MESSAGES;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hi, I'm Mindful AI, your mental wellness companion. I'm here to listen and support you. How are you feeling today?",
        isBot: true,
        timestamp: new Date(),
      }
    ]);
    setInputText('');
    setShowCrisisAlert(false);
    setShowBreathingExercise(false);
    setShowResetDialog(false);
    setCurrentMood(null);
    setUserMessageCount(0);
  };

  const checkForCrisis = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || isLimitReached) return;

    const userText = inputText.trim();
    setUserMessageCount(prev => prev + 1);
    
    // Check for crisis keywords
    if (checkForCrisis(userText)) {
      setShowCrisisAlert(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Prepare conversation history for AI
    const conversationHistory = messages.map(msg => ({
      role: msg.isBot ? 'assistant' as const : 'user' as const,
      content: msg.text,
    }));
    conversationHistory.push({ role: 'user', content: userText });

    // Create placeholder for bot response
    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: botMessageId,
      text: '',
      isBot: true,
      timestamp: new Date(),
    }]);

    let accumulatedText = '';

    await sendMessage(
      conversationHistory,
      currentMood,
      (delta) => {
        accumulatedText += delta;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      },
      () => {
        // Done - message is complete
      },
      (error) => {
        toast.error(error);
        // Remove the empty bot message on error
        setMessages(prev => prev.filter(msg => msg.id !== botMessageId));
      }
    );
  };

  const handleMoodSubmit = (mood: number, note: string) => {
    setCurrentMood(mood);
    setShowMoodTracker(false);
    
    const moodMessage: Message = {
      id: Date.now().toString(),
      text: `I logged my mood as ${mood}/10${note ? `: "${note}"` : ''}`,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, moodMessage]);

    // Generate AI response about the mood
    const conversationHistory = messages.map(msg => ({
      role: msg.isBot ? 'assistant' as const : 'user' as const,
      content: msg.text,
    }));
    conversationHistory.push({ 
      role: 'user', 
      content: `I just logged my mood as ${mood}/10.${note ? ` Note: ${note}` : ''} Please acknowledge this and offer appropriate support based on my mood level.`
    });

    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: botMessageId,
      text: '',
      isBot: true,
      timestamp: new Date(),
    }]);

    let accumulatedText = '';

    sendMessage(
      conversationHistory,
      mood,
      (delta) => {
        accumulatedText += delta;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      },
      () => {},
      (error) => {
        toast.error(error);
        setMessages(prev => prev.filter(msg => msg.id !== botMessageId));
      }
    );
  };

  const handleMeditationComplete = (duration: number) => {
    setShowMeditationTimer(false);
    const minutes = Math.round(duration / 60);
    
    const meditationMessage: Message = {
      id: Date.now().toString(),
      text: `I completed a ${minutes} minute meditation session!`,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, meditationMessage]);

    // AI response
    const conversationHistory = messages.map(msg => ({
      role: msg.isBot ? 'assistant' as const : 'user' as const,
      content: msg.text,
    }));
    conversationHistory.push({ 
      role: 'user', 
      content: `I just completed a ${minutes} minute meditation session. Please congratulate me and ask how I feel.`
    });

    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: botMessageId,
      text: '',
      isBot: true,
      timestamp: new Date(),
    }]);

    let accumulatedText = '';

    sendMessage(
      conversationHistory,
      currentMood,
      (delta) => {
        accumulatedText += delta;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      },
      () => {},
      (error) => {
        toast.error(error);
        setMessages(prev => prev.filter(msg => msg.id !== botMessageId));
      }
    );
  };

  const handleExerciseComplete = (exerciseId: string, feedback: string) => {
    const exerciseMessage: Message = {
      id: Date.now().toString(),
      text: `I completed the ${exerciseId.replace('-', ' ')} exercise. ${feedback}`,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, exerciseMessage]);

    const conversationHistory = messages.map(msg => ({
      role: msg.isBot ? 'assistant' as const : 'user' as const,
      content: msg.text,
    }));
    conversationHistory.push({ 
      role: 'user', 
      content: `I just completed the ${exerciseId.replace('-', ' ')} exercise. ${feedback} Please acknowledge this achievement.`
    });

    const botMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: botMessageId,
      text: '',
      isBot: true,
      timestamp: new Date(),
    }]);

    let accumulatedText = '';

    sendMessage(
      conversationHistory,
      currentMood,
      (delta) => {
        accumulatedText += delta;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      },
      () => {},
      (error) => {
        toast.error(error);
        setMessages(prev => prev.filter(msg => msg.id !== botMessageId));
      }
    );

    setShowMindfulnessExercises(false);
  };

  const handleActionClick = (action: string) => {
    if (action === 'Start breathing exercise') {
      setShowBreathingExercise(true);
      return;
    }
    if (action === 'Start mindfulness exercise') {
      setShowMindfulnessExercises(true);
      return;
    }
    if (action === 'Track my mood') {
      setShowMoodTracker(true);
      return;
    }
    if (action === 'Start meditation timer') {
      setShowMeditationTimer(true);
      return;
    }

    // For other actions, send as a message
    setInputText(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-100 dark:border-slate-600 bg-blue-50 dark:bg-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-blue-600 dark:text-blue-300 font-medium">Mindful AI</span>
          {currentMood && (
            <span className="text-xs bg-blue-100 dark:bg-slate-600 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
              Mood: {currentMood}/10
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExportDialog(true)}
            className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 hover:bg-blue-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
            title="Export Conversation"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setShowResetDialog(true)}
            className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 hover:bg-blue-100 dark:hover:bg-slate-600 rounded-lg transition-colors"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Message Limit Banner */}
      <MessageLimitBanner
        messagesRemaining={messagesRemaining}
        maxMessages={MAX_MESSAGES}
        isLimitReached={isLimitReached}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-800">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
            emotion={message.emotion}
          />
        ))}
        {isLoading && messages[messages.length - 1]?.text === '' && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <SuggestedActions onActionClick={handleActionClick} />

      {/* Input */}
      <div className="p-4 border-t border-blue-100 dark:border-slate-600 bg-white dark:bg-slate-800">
        {isLimitReached ? (
          <div className="text-center py-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              You've reached your message limit. Please export your conversation and reach out to a professional if needed.
            </p>
            <button
              onClick={() => setShowExportDialog(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Export Conversation
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        )}
        <div className="text-xs text-blue-400 dark:text-blue-300 mt-2 text-center">
          If you're in crisis, please call 0800 456 789
        </div>
      </div>

      {/* Modals */}
      <MoodTracker
        isVisible={showMoodTracker}
        onClose={() => setShowMoodTracker(false)}
        onMoodSubmit={handleMoodSubmit}
        currentMood={currentMood}
      />

      <MeditationTimer
        isVisible={showMeditationTimer}
        onClose={() => setShowMeditationTimer(false)}
        onComplete={handleMeditationComplete}
      />

      <MindfulnessExercises 
        isVisible={showMindfulnessExercises}
        onClose={() => setShowMindfulnessExercises(false)}
        onExerciseComplete={handleExerciseComplete}
        userStressLevel={currentMood && currentMood <= 3 ? 'high' : currentMood && currentMood >= 7 ? 'low' : 'medium'}
      />

      <CrisisAlert 
        isVisible={showCrisisAlert} 
        onClose={() => setShowCrisisAlert(false)} 
      />

      <BreathingExercise 
        isActive={showBreathingExercise}
        onComplete={() => setShowBreathingExercise(false)}
      />

      <ResetChatDialog
        isOpen={showResetDialog}
        onClose={() => setShowResetDialog(false)}
        onConfirm={handleResetChat}
      />

      <ConversationExport
        messages={messages}
        isVisible={showExportDialog}
        onClose={() => setShowExportDialog(false)}
      />
    </div>
  );
};

export default ChatInterface;
