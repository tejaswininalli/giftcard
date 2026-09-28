import React, { useState } from 'react';
import { 
  Gift, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Calendar,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cartCount, 
    wishlistCount, 
    setIsCartDrawerOpen, 
    setIsWishlistModalOpen, 
    setIsAccountModalOpen, 
    setIsSearchModalOpen,
    setIsAIFinderOpen,
    setSelectedOccasion,
    setSelectedRecipient,
    setSelectedCategory,
    reminders
  } = useGiftora();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [occasionsDropdown, setOccasionsDropdown] = useState(false);

  // Check if any reminder is within 7 days
  const upcomingReminder = reminders.find(r => {
    const diff = Math.ceil((new Date(r.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 14;
  });

  const handleNavClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSelectedOccasion(null);
    setSelectedRecipient(null);
    setSelectedCategory(null);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-900 via-purple-900 to-rose-950 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 relative overflow-hidden">
        <span className="flex items-center gap-1.5 animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Festive Celebration Offer: Use code <strong className="bg-white/20 px-1.5 py-0.5 rounded text-amber-200 font-bold tracking-wider">GIFTORA10</strong> for 10% off + Free Luxury Gift Wrapping!</span>
        </span>
        {upcomingReminder && (
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="hidden lg:inline-flex items-center gap-1 ml-4 bg-amber-400 text-stone-900 font-semibold px-2.5 py-0.5 rounded-full text-[11px] hover:bg-amber-300 transition-colors shadow-sm"
          >
            <Calendar className="w-3 h-3" />
            <span>Reminder: {upcomingReminder.personName}'s {upcomingReminder.occasion} is coming up!</span>
          </button>
        )}
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/25 transform hover:scale-105 transition-transform">
                <Gift className="w-6 h-6 animate-bounce" style={{ animationDuration: '2.5s' }} />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-serif-display text-2xl font-bold tracking-tight bg-gradient-to-r from-rose-700 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                    Giftora
                  </span>
                  <span className="text-xl">🎁</span>
                </div>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-rose-500/80 -mt-1">
                  Art of Thoughtful Gifting
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-stone-700">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'home'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('gift-cards')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  activeTab === 'gift-cards'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                <span>Gift Cards</span>
                <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded-full">Instant</span>
              </button>

              <button
                onClick={() => handleNavClick('gifts')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'gifts'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                All Gifts
              </button>

              <button
                onClick={() => handleNavClick('bundles')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  activeTab === 'bundles'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                <span>Gift Bundles</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">Save 12%</span>
              </button>

              <button
                onClick={() => handleNavClick('occasions')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'occasions'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                Occasions
              </button>

              <button
                onClick={() => {
                  setSelectedRecipient('him');
                  setActiveTab('for-him');
                }}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'for-him'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                For Him
              </button>

              <button
                onClick={() => {
                  setSelectedRecipient('her');
                  setActiveTab('for-her');
                }}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'for-her'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                For Her
              </button>

              <button
                onClick={() => handleNavClick('personalized')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  activeTab === 'personalized'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                <span>Personalized</span>
                <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.2 rounded-full">Custom</span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'about'
                    ? 'text-rose-600 bg-rose-50 font-semibold'
                    : 'hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                About
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* n8n AI Chatbot Trigger */}
              <button
                onClick={() => window.openN8nChat?.()}
                className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-stone-900 to-purple-950 text-white text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-2 rounded-full border border-purple-500/30 shadow-sm hover:border-purple-400 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                title="Chat with n8n AI Gifting Concierge"
              >
                <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                <span>AI Chat</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              {/* AI Gift Finder Button */}
              <button
                onClick={() => setIsAIFinderOpen(true)}
                className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-full shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
                <span>AI Gift Finder</span>
              </button>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2.5 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Search Gifts & Cards"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistModalOpen(true)}
                className="p-2.5 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors relative"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-2.5 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors relative"
                title="Shopping Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account Button */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="p-2.5 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="User Account & Reminders"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-rose-600 hover:bg-rose-50"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-rose-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            <button
              onClick={() => {
                setIsAIFinderOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>🎁 Help Me Find a Gift (AI)</span>
            </button>

            {/* n8n Chatbot Trigger in Mobile Menu */}
            <button
              onClick={() => {
                window.openN8nChat?.();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-sm shadow-sm border border-purple-500/30"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-rose-400" />
                <span>Chat with n8n AI Concierge</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">Live</span>
            </button>

            <div className="grid grid-cols-2 gap-1 pt-2 font-medium text-sm text-stone-700">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                🏠 Home
              </button>
              <button
                onClick={() => handleNavClick('gift-cards')}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                💳 Gift Cards
              </button>
              <button
                onClick={() => handleNavClick('gifts')}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                🎁 All Gifts
              </button>
              <button
                onClick={() => handleNavClick('bundles')}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                📦 Gift Bundles
              </button>
              <button
                onClick={() => handleNavClick('occasions')}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                🎉 Occasions
              </button>
              <button
                onClick={() => {
                  setSelectedRecipient('him');
                  setActiveTab('for-him');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                👔 For Him
              </button>
              <button
                onClick={() => {
                  setSelectedRecipient('her');
                  setActiveTab('for-her');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                💐 For Her
              </button>
              <button
                onClick={() => handleNavClick('personalized')}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                ✨ Personalized
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 hover:text-rose-600"
              >
                ℹ️ About Us
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
