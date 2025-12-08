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
    <div className="p-4 border-t border-blue-100 dark:border-slate-600 bg-blue-25 dark:bg-slate-700">
      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">Quick actions:</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionClick(action.text)}
            className="flex items-center gap-2 p-3 text-left bg-white dark:bg-slate-600 border border-blue-200 dark:border-slate-500 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-500 hover:border-blue-300 dark:hover:border-slate-400 transition-colors text-sm"
          >
            <action.icon className="w-4 h-4 text-blue-600 dark:text-blue-300 flex-shrink-0" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-100">{action.text}</div>
              <div className="text-xs text-blue-600 dark:text-blue-300">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedActions;
