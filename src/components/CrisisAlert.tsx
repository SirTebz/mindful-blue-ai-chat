
import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

interface CrisisAlertProps {
  isVisible: boolean;
  onClose: () => void;
}

const CrisisAlert = ({ isVisible, onClose }: CrisisAlertProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Crisis Support Available</h2>
        <p className="text-gray-700 mb-6">
          It sounds like you might be going through a difficult time. You don't have to face this alone.
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-red-900">Crisis Hotline</div>
              <div className="text-red-700 text-sm">1-800-XXX-XXXX</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-blue-900">Crisis Text Line</div>
              <div className="text-blue-700 text-sm">Text HOME to 741741</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisAlert;
