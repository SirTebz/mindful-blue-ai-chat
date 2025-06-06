
import React from 'react';

interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  action: string;
}

interface SuggestedActionsProps {
  onActionClick: (action: string) => void;
}

const SuggestedActions = ({ onActionClick }: SuggestedActionsProps) => {
  const actions: SuggestedAction[] = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Guided breathing to reduce anxiety',
      action: 'Start breathing exercise'
    },
    {
      id: 'anxiety',
      title: 'Tips for Managing Anxiety',
      description: 'Practical strategies for anxiety',
      action: 'Read anxiety tips'
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding',
      description: 'Grounding technique for overwhelm',
      action: 'Start grounding exercise'
    },
    {
      id: 'mood',
      title: 'Mood Check-in',
      description: 'Track your current mood',
      action: 'Check my mood'
    }
  ];

  return (
    <div className="p-4 bg-blue-50 rounded-lg mb-4">
      <h3 className="text-sm font-medium text-blue-900 mb-3">Suggested Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.action)}
            className="text-left p-3 bg-white rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <div className="font-medium text-blue-900 text-sm">{action.title}</div>
            <div className="text-blue-600 text-xs mt-1">{action.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedActions;
