import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, HeartHandshake, Gift, CreditCard } from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';

export const Hero: React.FC = () => {
  const { setActiveTab, setIsAIFinderOpen, openAIFinderWithPrompt } = useGiftora();

  const promptSuggestions = [
    'Birthday gift for sister under ₹1500',
    'Anniversary keepsake for couple',
    'Grooming box for husband',
    'Last-minute Amazon gift card',
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-rose-50/70 via-purple-50/40 to-transparent">
      {/* Decorative Pastel Ambient Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-5 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200/60 text-rose-800 text-xs sm:text-sm font-medium shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>India's Most Loved Gifting Destination</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="font-semibold">Over 100,000+ Smiles Delivered</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              Find the Perfect Gift for{' '}
              <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Every Moment
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Thoughtful gifts and gift cards for birthdays, celebrations, milestones, and everything in between. Handcrafted hampers, instant e-cards, and custom keepsakes designed to delight.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab('gifts')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-semibold text-base shadow-lg shadow-rose-600/25 hover:shadow-xl hover:shadow-rose-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Gift className="w-5 h-5" />
                <span>Shop Gifts</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setActiveTab('gift-cards')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white border border-rose-200 text-stone-800 font-semibold text-base shadow-sm hover:bg-rose-50/70 hover:border-rose-300 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <CreditCard className="w-5 h-5 text-rose-500" />
                <span>Explore Gift Cards</span>
              </button>
            </div>

            {/* AI Prompt Quick Starters */}
            <div className="pt-4 border-t border-rose-100/80">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Try asking our AI Gift Finder:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {promptSuggestions.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => openAIFinderWithPrompt(prompt)}
                    className="text-xs bg-white/90 hover:bg-rose-50 text-stone-700 hover:text-rose-700 px-3 py-1.5 rounded-full border border-rose-200/70 transition-all shadow-2xs hover:border-rose-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>"{prompt}"</span>
                    <span className="text-rose-400 text-[10px]">✨</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-3 text-stone-700">
              <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-medium">
                <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Instant E-Delivery</span>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-medium">
                <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>100% Genuine Brands</span>
              </div>

              <div className="flex items-center gap-2 justify-center lg:justify-start text-xs font-medium">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span>Free Luxury Gift Wrap</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85"
                  alt="Beautifully wrapped gifts and celebration"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Floating Gift Box Badge in Visual */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest font-semibold text-rose-300">
                        Curated Hampers & E-Cards
                      </span>
                      <h3 className="font-serif-display text-xl font-bold">
                        Unwrap Pure Happiness
                      </h3>
                    </div>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-200 border border-white/30">
                      ★ 4.9 Rating
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Element 1: Digital Gift Card Mockup */}
              <div className="absolute -top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-rose-100 w-52 sm:w-56 animate-float-slow hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                    🎁
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 leading-tight">Digital E-Gift Card</h4>
                    <p className="text-[11px] text-stone-500">Delivered in 2 seconds</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">Value</span>
                  <span className="font-bold text-rose-600">₹500 - ₹10,000</span>
                </div>
              </div>

              {/* Floating Element 2: AI Finder Banner */}
              <div
                onClick={() => setIsAIFinderOpen(true)}
                className="absolute -bottom-6 -left-4 sm:-left-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-4 shadow-2xl border border-purple-400/30 max-w-[260px] cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-700/60 text-amber-300">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-purple-100">Need inspiration?</p>
                    <p className="text-[11px] text-purple-300">Ask our AI Gift Finder</p>
                  </div>
                </div>
                <div className="mt-2 text-[10px] bg-white/10 px-2 py-1 rounded text-purple-200 text-center font-medium">
                  Tap to find gifts in 30 seconds →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
