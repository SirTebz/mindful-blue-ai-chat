
import React from 'react';
import ChatInterface from '../components/ChatInterface';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-blue-100 dark:border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Mindful AI Chat</h1>
              <p className="text-blue-600 dark:text-blue-300 text-sm">Your mental health support companion</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-sm text-blue-600 dark:text-blue-300">
                <div className="w-3 h-3 bg-green-400 rounded-full inline-block mr-2"></div>
                AI Assistant Online
              </div>
            </div>
          </div>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 bg-white dark:bg-slate-800">
          <ChatInterface />
        </main>

        {/* Footer */}
        <footer className="bg-blue-50 dark:bg-slate-700 p-4 text-center">
          <div className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
            <p>This is a supportive tool and not a replacement for professional mental health care.</p>
            <p>For emergencies, please contact your local emergency services or crisis hotline.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
