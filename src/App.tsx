/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { GiftoraProvider, useGiftora } from './context/GiftoraContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GiftReminderBanner } from './components/GiftReminderBanner';
import { OccasionSection } from './components/OccasionSection';
import { RecipientCategoriesSection } from './components/RecipientCategoriesSection';
import { GiftCardSection } from './components/GiftCardSection';
import { GiftBundleSection } from './components/GiftBundleSection';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AIGiftFinderModal } from './components/AIGiftFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { AccountModal } from './components/AccountModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { N8nChatbot } from './components/N8nChatbot';
import { Sparkles, Gift } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, toastMessage, setIsAIFinderOpen, setIsSearchModalOpen } = useGiftora();

  // Keyboard shortcut: Pressing '/' or 'Cmd+K' / 'Ctrl+K' opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')) {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfaf7] text-stone-800 antialiased selection:bg-rose-200 selection:text-rose-900">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <GiftReminderBanner />
            <OccasionSection />
            <RecipientCategoriesSection />
            <GiftBundleSection />
            <GiftCardSection />
            <ProductList
              initialTitle="Trending & Bestselling Gifts"
              initialSubtitle="Discover our most loved handcrafted hampers, luxury fragrances, and personalized keepsakes."
            />
          </>
        )}

        {activeTab === 'gift-cards' && (
          <div className="pt-6">
            <GiftCardSection />
          </div>
        )}

        {activeTab === 'bundles' && (
          <div className="pt-6">
            <GiftBundleSection />
          </div>
        )}

        {activeTab === 'gifts' && (
          <div className="pt-4">
            <ProductList />
          </div>
        )}

        {activeTab === 'occasions' && (
          <div className="pt-4 space-y-4">
            <OccasionSection />
            <ProductList
              initialTitle="Shop Gifts by Occasion"
              initialSubtitle="Select any celebration above or filter below to find the perfect present."
            />
          </div>
        )}

        {activeTab === 'for-him' && (
          <div className="pt-4">
            <ProductList
              initialTitle="Thoughtful Gifts For Him"
              initialSubtitle="Chronographs, full-grain leather wallets, grooming sets, and personalized gentleman's accessories."
            />
          </div>
        )}

        {activeTab === 'for-her' && (
          <div className="pt-4">
            <ProductList
              initialTitle="Cherished Gifts For Her"
              initialSubtitle="Rose gold jewelry, French fragrances, luxury vegan bags, and 24K gold skincare rituals."
            />
          </div>
        )}

        {activeTab === 'personalized' && (
          <div className="pt-4">
            <ProductList
              initialTitle="Bespoke Personalized Gifts"
              initialSubtitle="Custom engraved names, initials, Spotify codes, and cherished photos that make memories eternal."
            />
          </div>
        )}

        {activeTab === 'about' && <AboutSection />}
      </main>

      {/* Floating AI Finder Pill for Quick Access */}
      <div className="fixed bottom-6 left-4 sm:left-auto sm:right-24 z-30">
        <button
          onClick={() => setIsAIFinderOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 sm:px-5 py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-pink-600/30 hover:shadow-2xl hover:shadow-pink-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-amber-200">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          </span>
          <span className="hidden xs:inline">Help Me Find a Gift 🎁</span>
          <span className="xs:hidden">Find Gift 🎁</span>
        </button>
      </div>

      {/* n8n Chatbot Widget */}
      <N8nChatbot />

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <AIGiftFinderModal />
      <CheckoutModal />
      <OrderConfirmationModal />
      <SearchModal />
      <WishlistModal />
      <AccountModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-300 border border-white/20">
          <Gift className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <GiftoraProvider>
      <AppContent />
    </GiftoraProvider>
  );
}
