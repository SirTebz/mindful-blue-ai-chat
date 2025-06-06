
import React from 'react';
import { Brain, Heart, MessageCircle, Users } from 'lucide-react';

interface SuggestedActionsProps {
  onActionClick: (action: string) => void;
}

const SuggestedActions = ({ onActionClick }: SuggestedActionsProps) => {
  const actions = [
    {
      icon: Brain,
      text: 'Start breathing exercise',
      description: 'Quick 4-7-8 breathing technique'
    },
    {
      icon: Heart,
      text: 'Start mindfulness exercise',
      description: 'Guided exercises for calm and focus'
    },
    {
      icon: MessageCircle,
      text: 'Talk about anxiety strategies',
      description: 'Learn coping techniques'
    },
    {
      icon: Users,
      text: 'Check my mood today',
      description: 'Daily emotional wellness check'
    }
  ];

  return (
    <div className="p-4 border-t border-blue-100 bg-blue-25">
      <h3 className="text-sm font-medium text-blue-800 mb-3">Suggested actions:</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionClick(action.text)}
            className="flex items-center gap-2 p-3 text-left bg-white border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm"
          >
            <action.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div>
              <div className="font-medium text-blue-900">{action.text}</div>
              <div className="text-xs text-blue-600">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedActions;
