import React from 'react';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface MessageLimitWarningProps {
  remainingMessages: number;
  isLimitReached: boolean;
}

const MessageLimitWarning: React.FC<MessageLimitWarningProps> = ({
  remainingMessages,
  isLimitReached
}) => {
  if (isLimitReached) {
    return (
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-200 dark:border-amber-800">
        <Alert className="border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/30">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
          <AlertTitle className="text-amber-900 dark:text-amber-100 font-semibold">
            Message Limit Reached
          </AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-200 mt-2">
            <p className="mb-3">
              You've reached your message limit for this session. While this AI companion can provide support,
              speaking with a trained professional can offer more personalized and comprehensive help.
            </p>
            <div className="space-y-3 bg-white dark:bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Crisis Hotline</div>
                  <a
                    href="tel:0800456789"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    0800 456 789
                  </a>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Available 24/7 for immediate support
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Crisis Text Line</div>
                  <div className="text-gray-700 dark:text-gray-300">
                    Text <span className="font-semibold">HOME</span> to <span className="font-semibold">741741</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Text-based support available anytime
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm mt-3 text-amber-900 dark:text-amber-100">
              To continue using this chat, please refresh the page to start a new session.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (remainingMessages <= 10) {
    return (
      <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
          <AlertTriangle className="w-4 h-4" />
          <span>
            You have <strong>{remainingMessages}</strong> message{remainingMessages !== 1 ? 's' : ''} remaining.
            Consider calling <strong>0800 456 789</strong> for unlimited professional support.
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default MessageLimitWarning;
