import React, { ReactNode, useState } from 'react';
import { Navbar } from './Navbar';
import ChatbotWidget from '../ai/ChatbotWidget';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      {/* Floating Chatbot Button */}
      <button
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-navy-900 to-navy-700 text-white rounded-full shadow-2xl p-4 hover:from-navy-800 hover:to-navy-600 focus:outline-none focus:ring-4 focus:ring-navy-500/50 transition-all duration-300 hover:scale-110"
        onClick={() => setShowChatbot((v) => !v)}
        aria-label="Open Legal Co-Pilot Chatbot"
      >
        <span role="img" aria-label="chat" className="text-xl">💬</span>
      </button>
      {showChatbot && <ChatbotWidget onClose={() => setShowChatbot(false)} />}
    </div>
  );
};
