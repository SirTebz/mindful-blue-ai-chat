
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ResetChatDialog = ({ isOpen, onClose, onConfirm }: ResetChatDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          <h2 className="text-lg font-semibold text-gray-900">Reset Chat</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Are you sure you want to reset the chat? This will clear all your conversation history and start fresh. This action cannot be undone.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Reset Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetChatDialog;
