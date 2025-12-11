
import React from 'react';
import ChatInterface from '../components/ChatInterface';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-4xl h-[100dvh] flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-blue-100 dark:border-slate-700 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-blue-900 dark:text-blue-100 truncate">Mindful AI Chat</h1>
              <p className="text-blue-600 dark:text-blue-300 text-xs sm:text-sm hidden sm:block">Your mental health support companion</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <ThemeToggle />
              <div className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full mr-1 sm:mr-2"></div>
                <span className="hidden sm:inline">AI Assistant Online</span>
                <span className="sm:hidden">Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 bg-white dark:bg-slate-800 overflow-hidden">
          <ChatInterface />
        </main>

        {/* Footer */}
        <footer className="bg-blue-50 dark:bg-slate-700 p-2 sm:p-4 text-center">
          <div className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-300 space-y-0.5 sm:space-y-1">
            <p>This is a supportive tool and not a replacement for professional mental health care.</p>
            <p className="hidden sm:block">For emergencies, please contact your local emergency services or crisis hotline.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
