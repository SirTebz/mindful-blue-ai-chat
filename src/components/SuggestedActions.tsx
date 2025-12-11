import React from 'react';
import { Brain, Heart, Timer, BarChart3 } from 'lucide-react';

interface SuggestedActionsProps {
  onActionClick: (action: string) => void;
}

const SuggestedActions = ({ onActionClick }: SuggestedActionsProps) => {
  const actions = [
    {
      icon: Brain,
      text: 'Start breathing exercise',
      description: '4-7-8 breathing technique'
    },
    {
      icon: Heart,
      text: 'Start mindfulness exercise',
      description: 'Guided exercises for calm'
    },
    {
      icon: Timer,
      text: 'Start meditation timer',
      description: 'Timed meditation sessions'
    },
    {
      icon: BarChart3,
      text: 'Track my mood',
      description: 'Log how you\'re feeling'
    }
  ];

  return (
    <div className="p-2 sm:p-4 border-t border-blue-100 dark:border-slate-600 bg-blue-25 dark:bg-slate-700">
      <h3 className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 mb-2 sm:mb-3">Quick actions:</h3>
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionClick(action.text)}
            className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 text-left bg-white dark:bg-slate-600 border border-blue-200 dark:border-slate-500 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-500 hover:border-blue-300 dark:hover:border-slate-400 transition-colors"
          >
            <action.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-300 flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-medium text-blue-900 dark:text-blue-100 text-xs sm:text-sm truncate">{action.text}</div>
              <div className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-300 hidden sm:block">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedActions;
