import React from 'react';
import { AlertCircle, Phone } from 'lucide-react';

interface MessageLimitBannerProps {
  messagesRemaining: number;
  maxMessages: number;
  isLimitReached: boolean;
}

const MessageLimitBanner: React.FC<MessageLimitBannerProps> = ({
  messagesRemaining,
  maxMessages,
  isLimitReached,
}) => {
  const percentage = (messagesRemaining / maxMessages) * 100;
  
  if (isLimitReached) {
    return (
      <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mx-4 my-2">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-amber-800 dark:text-amber-200">
              Message limit reached
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              You've used all your messages for this session. If you'd like to continue speaking with someone, please consider reaching out to a professional.
            </p>
            <a
              href="tel:0800456789"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              Call Crisis Hotline: 0800 456 789
            </a>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              You can also download your conversation to continue with a professional.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 bg-blue-50/50 dark:bg-slate-700/50 border-b border-blue-100 dark:border-slate-600">
      <div className="flex items-center justify-between text-xs">
        <span className="text-blue-600 dark:text-blue-300">
          {messagesRemaining} messages remaining
        </span>
        <div className="w-24 h-1.5 bg-blue-100 dark:bg-slate-600 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              percentage > 50
                ? 'bg-green-500'
                : percentage > 20
                ? 'bg-amber-500'
                : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageLimitBanner;
