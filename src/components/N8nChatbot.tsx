import React, { useEffect, useState } from 'react';
import { MessageSquare, Sparkles, X } from 'lucide-react';

const N8N_WEBHOOK_URL = 'https://tejasyam.app.n8n.cloud/webhook/f9247701-9c85-456d-9122-c39b22d2f5a5/chat';

declare global {
  interface Window {
    __n8nChatInitialized?: boolean;
    openN8nChat?: () => void;
  }
}

export const N8nChatbot: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Register global window helper to trigger the chat widget from anywhere
    window.openN8nChat = () => {
      setShowTooltip(false);
      const toggleBtn = document.querySelector('.chat-window-toggle') as HTMLElement | null;
      if (toggleBtn) {
        toggleBtn.click();
      } else {
        const fallbackTarget = document.querySelector('#n8n-chat') as HTMLElement | null;
        if (fallbackTarget) {
          const btn = fallbackTarget.querySelector('button') as HTMLElement | null;
          if (btn) btn.click();
        }
      }
    };

    // Ensure CSS is injected
    const styleId = 'n8n-chat-style';
    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
      document.head.appendChild(link);
    }

    // Initialize @n8n/chat widget once
    if (!window.__n8nChatInitialized) {
      window.__n8nChatInitialized = true;

      const script = document.createElement('script');
      script.type = 'module';
      script.id = 'n8n-chat-script';
      script.innerHTML = `
        import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        try {
          createChat({
            webhookUrl: '${N8N_WEBHOOK_URL}',
            showWelcomeScreen: false,
            initialMessages: [
              'Hello! 👋 Welcome to Giftora.',
              'I am your AI Gifting Concierge powered by n8n. Ask me about gift recommendations, orders, vouchers, or personalization!'
            ],
            i18n: {
              en: {
                title: 'Giftora Concierge 🎁',
                subtitle: 'AI Support & Gifting Advisor',
                footer: 'Powered by Giftora & n8n',
                getStarted: 'Start Gifting Chat',
                inputPlaceholder: 'Ask about gifts, orders, or ideas...',
              }
            }
          });
        } catch (err) {
          console.warn('n8n Chat initialization:', err);
        }
      `;
      document.body.appendChild(script);
    }

    // Auto-dismiss tooltip after 8 seconds if not clicked
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Gentle floating tooltip calling attention to the n8n assistant */}
      {showTooltip && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-30 max-w-xs animate-in fade-in slide-in-from-bottom duration-300">
          <div className="relative bg-stone-900/95 backdrop-blur-md text-white text-xs px-3.5 py-2.5 rounded-2xl shadow-xl border border-rose-500/30 flex items-center gap-2.5 group">
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </span>
            <div className="flex-1 cursor-pointer" onClick={() => window.openN8nChat?.()}>
              <p className="font-semibold text-rose-200 text-[11px] leading-tight">Need gifting help?</p>
              <p className="text-[11px] text-stone-300 leading-tight">Chat with our n8n AI Concierge!</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-stone-400 hover:text-white p-0.5"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {/* Pointer arrow down to the widget */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-stone-900 border-r border-b border-rose-500/30 rotate-45 transform pointer-events-none" />
          </div>
        </div>
      )}
    </>
  );
};
