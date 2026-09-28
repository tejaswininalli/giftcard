import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, ArrowRight, Tag, Gift, CreditCard } from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';
import { PRODUCTS_DATA, GIFT_CARDS_DATA, OCCASIONS_DATA } from '../data/mockData';

export const SearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    setQuickViewProduct, 
    setSelectedOccasion, 
    setActiveTab, 
    setSearchQuery: setGlobalSearchQuery 
  } = useGiftora();

  const [inputVal, setInputVal] = useState('');

  const popularSearches = [
    'Birthday gift for mother under ₹1000',
    'Rose gold jewelry',
    'Amazon Gift Card',
    'Romantic keepsake frame',
    'Men grooming kit',
    'Artisanal coffee hamper',
  ];

  // Search logic
  const results = useMemo(() => {
    const q = inputVal.trim().toLowerCase();
    if (!q) {
      return { products: [], giftCards: [], occasions: [] };
    }

    // Check for budget extraction e.g. "under 1000" or "under ₹1500"
    const underMatch = q.match(/under\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
    const maxBudget = underMatch ? parseInt(underMatch[1], 10) : Infinity;

    // Filter products
    const matchedProducts = PRODUCTS_DATA.filter(p => {
      if (p.price > maxBudget) return false;

      const searchable = `${p.name} ${p.description} ${p.category} ${p.tags.join(' ')} ${p.occasions.join(' ')} ${p.recipients.join(' ')}`.toLowerCase();
      
      // Split query terms for multi-word fuzzy matching
      const terms = q.replace(/under\s*(?:₹|rs\.?|inr)?\s*\d+/gi, '').trim().split(/\s+/).filter(Boolean);
      if (terms.length === 0) return true; // only budget matched

      return terms.some(term => searchable.includes(term));
    }).slice(0, 6);

    // Filter gift cards
    const matchedGiftCards = GIFT_CARDS_DATA.filter(gc => {
      const text = `${gc.name} ${gc.category} ${gc.description}`.toLowerCase();
      return q.split(/\s+/).some(t => text.includes(t));
    }).slice(0, 3);

    // Filter occasions
    const matchedOccasions = OCCASIONS_DATA.filter(occ => {
      const text = `${occ.name} ${occ.description}`.toLowerCase();
      return q.split(/\s+/).some(t => text.includes(t));
    }).slice(0, 3);

    return {
      products: matchedProducts,
      giftCards: matchedGiftCards,
      occasions: matchedOccasions,
    };
  }, [inputVal]);

  if (!isSearchModalOpen) return null;

  const handleSelectProduct = (prod: any) => {
    setIsSearchModalOpen(false);
    setQuickViewProduct(prod);
  };

  const handleSelectOccasion = (occId: any) => {
    setSelectedOccasion(occId);
    setActiveTab('gifts');
    setIsSearchModalOpen(false);
  };

  const handleSearchAll = () => {
    setGlobalSearchQuery(inputVal);
    setActiveTab('gifts');
    setIsSearchModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-rose-100 relative">
        {/* Search Bar Input */}
        <div className="relative flex items-center border-b border-rose-100 pb-4">
          <Search className="w-5 h-5 text-rose-500 absolute left-2" />
          <input
            type="text"
            autoFocus
            placeholder="Search gifts, gift cards, occasions, or eg: 'birthday gift for mother under ₹1000'..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearchAll();
            }}
            className="w-full pl-10 pr-10 py-2 text-sm sm:text-base font-medium text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {inputVal ? (
            <button
              onClick={() => setInputVal('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!inputVal && (
          <div className="py-6 space-y-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
              Popular Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputVal(term)}
                  className="px-3.5 py-1.5 rounded-full bg-stone-50 hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-rose-400" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {inputVal && (
          <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Matching Products */}
            {results.products.length > 0 && (
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  Matching Curated Gifts ({results.products.length})
                </span>
                <div className="space-y-2">
                  {results.products.map(prod => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="p-2.5 rounded-2xl hover:bg-rose-50/60 border border-transparent hover:border-rose-100 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{prod.name}</h4>
                          <span className="text-[11px] text-stone-500">{prod.shortDescription}</span>
                        </div>
                      </div>
                      <span className="font-extrabold text-xs text-rose-700 shrink-0 ml-3">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Gift Cards */}
            {results.giftCards.length > 0 && (
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  Gift Cards & Vouchers
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {results.giftCards.map(gc => (
                    <div
                      key={gc.id}
                      onClick={() => {
                        setActiveTab('gift-cards');
                        setIsSearchModalOpen(false);
                      }}
                      className="p-2.5 rounded-xl border border-stone-200 hover:border-purple-300 hover:bg-purple-50/40 flex items-center gap-2.5 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-xs font-bold text-stone-900">{gc.name}</p>
                        <p className="text-[10px] text-stone-500">{gc.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Occasions */}
            {results.occasions.length > 0 && (
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  Matching Occasions
                </span>
                <div className="flex flex-wrap gap-2">
                  {results.occasions.map(occ => (
                    <button
                      key={occ.id}
                      onClick={() => handleSelectOccasion(occ.id)}
                      className="px-3 py-1.5 rounded-xl bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 flex items-center gap-1.5 hover:bg-pink-100"
                    >
                      <span>{occ.emoji}</span>
                      <span>{occ.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* If zero results */}
            {results.products.length === 0 && results.giftCards.length === 0 && results.occasions.length === 0 && (
              <div className="text-center py-10">
                <p className="text-sm font-bold text-stone-700">No results found for "{inputVal}"</p>
                <p className="text-xs text-stone-500 mt-1">Try searching for "gift cards", "jewelry", "perfume", or "birthday".</p>
              </div>
            )}

            {/* Search full catalog button */}
            <div className="pt-3 border-t border-stone-100">
              <button
                onClick={handleSearchAll}
                className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 flex items-center justify-center gap-1.5"
              >
                <span>View All Results for "{inputVal}"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
