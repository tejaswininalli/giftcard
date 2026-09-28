import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  ShoppingBag, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Star, 
  Heart,
  Loader2
} from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';
import { getAIGiftRecommendations, GiftFinderCriteria } from '../services/geminiService';
import { AIRecommendation } from '../types';

export const AIGiftFinderModal: React.FC = () => {
  const { 
    isAIFinderOpen, 
    setIsAIFinderOpen, 
    aiFinderInitialPrompt, 
    addToCart, 
    setQuickViewProduct,
    showToast 
  } = useGiftora();

  const [mode, setMode] = useState<'guided' | 'prompt'>('guided');
  const [currentStep, setCurrentStep] = useState(1);
  const [freeformPrompt, setFreeformPrompt] = useState(aiFinderInitialPrompt || '');

  // 5 Guided Questions Answers
  const [recipient, setRecipient] = useState('Friend');
  const [occasion, setOccasion] = useState('Birthday');
  const [budget, setBudget] = useState('1000-2500');
  const [interests, setInterests] = useState('Skincare & Self-Care');
  const [timeline, setTimeline] = useState('Within 3-5 days');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Consulting AI Gifting Curator...');
  const [recommendations, setRecommendations] = useState<AIRecommendation[] | null>(null);

  // If opened with prefilled prompt
  useEffect(() => {
    if (aiFinderInitialPrompt) {
      setFreeformPrompt(aiFinderInitialPrompt);
      setMode('prompt');
      handleRunPrompt(aiFinderInitialPrompt);
    }
  }, [aiFinderInitialPrompt]);

  if (!isAIFinderOpen) return null;

  const recipientOptions = [
    'Friend',
    'Mother',
    'Father',
    'Partner (Wife/Husband)',
    'Brother',
    'Sister',
    'Child',
    'Colleague',
    'Other',
  ];

  const occasionOptions = [
    'Birthday 🎂',
    "Valentine's Day 💕",
    'Anniversary 💍',
    'Graduation 🎓',
    "Mother's Day 💐",
    "Father's Day 👔",
    'Christmas 🎄',
    'Diwali 🪔',
    'Housewarming 🏠',
    'Wedding 💒',
    'Baby Shower 👶',
    'Thank-you 🎉',
  ];

  const budgetOptions = [
    { id: 'under-1000', label: 'Under ₹1,000' },
    { id: '1000-2500', label: '₹1,000 - ₹2,500' },
    { id: '2500-5000', label: '₹2,500 - ₹5,000' },
    { id: 'above-5000', label: '₹5,000+ (Luxury)' },
  ];

  const interestOptions = [
    'Skincare & Self-Care 🧖‍♀️',
    'Watches & Accessories ⌚',
    'Fine Fragrances & Perfumes 🌸',
    'Tech, Gadgets & Audio 🎧',
    'Gourmet Hampers & Chocolates 🍫',
    'Coffee & Beverage Connoisseur ☕',
    'Personalized Keepsakes & Frames 🖼️',
    'Eco Plants & Home Decor 🪴',
    'STEM Toys & Learning 🚀',
  ];

  const timelineOptions = [
    '⚡ Today / Instant Digital E-Card',
    '📦 Tomorrow (Same-Day Express)',
    '🚚 Within 3-5 days',
    '📅 Next week (Not urgent)',
  ];

  const handleRunGuided = async () => {
    setIsLoading(true);
    setLoadingText('Analyzing recipient personality & budget...');
    setTimeout(() => setLoadingText('Generating personalized reasons with Gemini AI...'), 800);

    const criteria: GiftFinderCriteria = {
      recipient,
      occasion,
      budget,
      interests,
      timeline,
    };

    const results = await getAIGiftRecommendations(criteria);
    setRecommendations(results);
    setIsLoading(false);
  };

  const handleRunPrompt = async (promptToUse?: string) => {
    const text = promptToUse || freeformPrompt;
    if (!text.trim()) return;

    setIsLoading(true);
    setLoadingText('Interpreting natural language gifting brief...');
    setTimeout(() => setLoadingText('Searching catalogue for perfect matches...'), 700);

    const criteria: GiftFinderCriteria = {
      recipient: 'Special someone',
      occasion: 'Celebration',
      budget: 'Flexible',
      interests: text,
      timeline: 'Standard',
      freeformPrompt: text,
    };

    const results = await getAIGiftRecommendations(criteria);
    setRecommendations(results);
    setIsLoading(false);
  };

  const handleRestart = () => {
    setRecommendations(null);
    setCurrentStep(1);
    setFreeformPrompt('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-rose-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                  AI Gift Finder
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Let our intelligent gifting assistant find the ideal match in seconds
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAIFinderOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Toggle Mode (Guided vs Natural Prompt) */}
        {!recommendations && !isLoading && (
          <div className="flex items-center justify-center gap-2 mb-6 p-1 bg-stone-100 rounded-2xl max-w-sm mx-auto">
            <button
              onClick={() => setMode('guided')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                mode === 'guided'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              5-Step Guided Matcher
            </button>
            <button
              onClick={() => setMode('prompt')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                mode === 'prompt'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Natural Prompt
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner animate-pulse">
              <Sparkles className="w-8 h-8 text-rose-500 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <h4 className="font-serif-display text-xl font-bold text-stone-900">
              {loadingText}
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Scanning thousands of sentiments, budgets, and reviews to deliver joyful recommendations...
            </p>
          </div>
        )}

        {/* Mode A: Guided 5-Step Wizard */}
        {!isLoading && !recommendations && mode === 'guided' && (
          <div className="space-y-6">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Question {currentStep} of 5
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(step => (
                  <div
                    key={step}
                    className={`h-2 rounded-full transition-all ${
                      step === currentStep
                        ? 'w-8 bg-rose-600'
                        : step < currentStep
                        ? 'w-4 bg-purple-400'
                        : 'w-4 bg-stone-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question 1: Who are you buying for? */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-serif-display text-xl font-bold text-stone-900">
                  1. Who are you buying this gift for?
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {recipientOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setRecipient(opt)}
                      className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        recipient === opt
                          ? 'border-rose-600 bg-rose-50/80 text-rose-900 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 2: What is the occasion? */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-serif-display text-xl font-bold text-stone-900">
                  2. What is the occasion?
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {occasionOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setOccasion(opt)}
                      className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        occasion === opt
                          ? 'border-rose-600 bg-rose-50/80 text-rose-900 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 3: What is your budget? */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-serif-display text-xl font-bold text-stone-900">
                  3. What is your budget?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {budgetOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setBudget(opt.id)}
                      className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                        budget === opt.id
                          ? 'border-rose-600 bg-rose-50/80 text-rose-900 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 4: What are their interests? */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-serif-display text-xl font-bold text-stone-900">
                  4. What are their interests or passions?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {interestOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setInterests(opt)}
                      className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        interests === opt
                          ? 'border-rose-600 bg-rose-50/80 text-rose-900 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 5: How soon do you need the gift? */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-serif-display text-xl font-bold text-stone-900">
                  5. How soon do you need this delivered?
                </h4>
                <div className="space-y-2.5">
                  {timelineOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setTimeline(opt)}
                      className={`w-full p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        timeline === opt
                          ? 'border-rose-600 bg-rose-50/80 text-rose-900 ring-2 ring-rose-500/20 shadow-xs'
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-stone-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(c => c - 1)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(c => c + 1)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRunGuided}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Find Perfect Gifts</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mode B: Natural Language Prompt */}
        {!isLoading && !recommendations && mode === 'prompt' && (
          <div className="space-y-5 animate-in fade-in">
            <div>
              <h4 className="font-serif-display text-xl font-bold text-stone-900 mb-2">
                Describe who you are gifting in your own words
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Give us as much detail as you like (e.g. relationship, budget in ₹, occasion, hobbies, personality).
              </p>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={freeformPrompt}
                onChange={e => setFreeformPrompt(e.target.value)}
                placeholder="e.g. I need a birthday gift for my sister under ₹1500 who loves skincare and pampering."
                className="w-full p-4 rounded-2xl border border-rose-200 text-sm text-stone-800 placeholder-stone-400 focus:outline-rose-500 shadow-inner bg-rose-50/20"
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="font-bold text-stone-500">Quick ideas:</span>
              <button
                type="button"
                onClick={() => setFreeformPrompt('I need a birthday gift for my sister under ₹1500 who loves skincare.')}
                className="bg-stone-100 hover:bg-rose-50 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 text-[11px]"
              >
                Birthday for sister &lt; ₹1500 (Skincare)
              </button>
              <button
                type="button"
                onClick={() => setFreeformPrompt('Anniversary romantic keepsake gift for husband under ₹3500.')}
                className="bg-stone-100 hover:bg-rose-50 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 text-[11px]"
              >
                Anniversary for husband &lt; ₹3500
              </button>
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => handleRunPrompt()}
                disabled={!freeformPrompt.trim()}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Ask AI Curator</span>
              </button>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {!isLoading && recommendations && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Personalized Match Results</span>
              </div>
              <h4 className="font-serif-display text-2xl font-bold text-stone-900">
                Here are some gifts we think they’ll love ❤️
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Hand-curated based on your preferences
              </p>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-3xl bg-rose-50/40 border border-rose-200/70 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-3 mb-3">
                      <img
                        src={rec.product.images[0]}
                        alt={rec.product.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-rose-100"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                            {rec.product.category}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            {rec.matchScore}% Match
                          </span>
                        </div>
                        <h5 className="font-serif-display font-bold text-sm text-stone-900 mt-1 leading-snug line-clamp-1">
                          {rec.product.name}
                        </h5>
                        <div className="text-sm font-extrabold text-stone-950 mt-1">
                          ₹{rec.product.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* AI Reason */}
                    <div className="p-2.5 rounded-xl bg-white/90 border border-rose-100 text-xs text-stone-600 leading-relaxed mb-3">
                      <span className="font-semibold text-purple-700">Why they'll love it: </span>
                      {rec.reason}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-rose-100">
                    <button
                      onClick={() => {
                        addToCart({
                          productId: rec.product.id,
                          product: rec.product,
                          quantity: 1,
                        });
                      }}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs hover:scale-102 transition-transform cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => {
                        setQuickViewProduct(rec.product);
                      }}
                      className="px-3 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-white text-xs font-semibold"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Restart / Tweak button */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleRestart}
                className="text-xs font-bold text-rose-600 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Try Another Query</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAIFinderOpen(false)}
                className="px-5 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
