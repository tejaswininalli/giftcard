import React from 'react';
import { Filter, X, RotateCcw, Check, Sparkles, Star } from 'lucide-react';
import { OccasionType, RecipientType } from '../types';
import { OCCASIONS_DATA } from '../data/mockData';

export interface FilterState {
  priceRange: string; // 'all' | 'under-1000' | '1000-2500' | '2500-5000' | 'above-5000'
  category: string; // 'all' or category id
  occasion: string; // 'all' or OccasionType
  recipient: string; // 'all' or RecipientType
  minRating: number;
  personalizableOnly: boolean;
  deliveryTime: string; // 'all' | 'same-day' | 'instant' | '2-3-days'
}

interface ProductFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  setFilters,
  resetFilters,
  isOpenMobile,
  onCloseMobile,
}) => {
  const categoriesList = [
    { id: 'all', label: 'All Categories' },
    { id: 'jewelry', label: 'Jewelry & Accessories' },
    { id: 'perfumes', label: 'Luxury Perfumes' },
    { id: 'skincare', label: 'Skincare & Pampering' },
    { id: 'handbags', label: 'Designer Bags' },
    { id: 'watches', label: 'Watches & Timepieces' },
    { id: 'wallets', label: 'Leather Wallets' },
    { id: 'grooming', label: 'Men’s Grooming' },
    { id: 'gadgets', label: 'Tech & Gadgets' },
    { id: 'toys-games', label: 'Toys & STEM Kits' },
    { id: 'couple-gifts', label: 'Couple Keepsakes' },
    { id: 'photo-frames', label: 'Photo & Memory Frames' },
    { id: 'hampers', label: 'Luxury Hampers' },
    { id: 'personalized', label: 'Personalized Gifts' },
  ];

  const recipientsList: { id: RecipientType | 'all'; label: string }[] = [
    { id: 'all', label: 'Everyone' },
    { id: 'her', label: 'For Her (Wife/Sister/Mom)' },
    { id: 'him', label: 'For Him (Husband/Brother/Dad)' },
    { id: 'kids', label: 'For Kids & Babies' },
    { id: 'couples', label: 'For Couples' },
    { id: 'parents', label: 'For Parents' },
    { id: 'friends', label: 'For Best Friends' },
    { id: 'colleagues', label: 'For Colleagues & Boss' },
  ];

  const priceOptions = [
    { id: 'all', label: 'All Budgets' },
    { id: 'under-1000', label: 'Under ₹1,000' },
    { id: '1000-2500', label: '₹1,000 - ₹2,500' },
    { id: '2500-5000', label: '₹2,500 - ₹5,000' },
    { id: 'above-5000', label: 'Above ₹5,000' },
  ];

  const deliveryOptions = [
    { id: 'all', label: 'Any Delivery Speed' },
    { id: 'same-day', label: '⚡ Same-Day Delivery' },
    { id: 'instant', label: '💌 Instant Digital E-Card' },
    { id: '2-3-days', label: '📦 Express (2-3 Days)' },
  ];

  const content = (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-rose-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-rose-600" />
          <h3 className="font-serif-display font-bold text-stone-900 text-lg">Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Recipient Filter */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
          Gifting For:
        </label>
        <div className="space-y-1">
          {recipientsList.map(rec => (
            <button
              key={rec.id}
              onClick={() => setFilters(prev => ({ ...prev, recipient: rec.id }))}
              className={`w-full text-left text-xs font-medium px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                filters.recipient === rec.id
                  ? 'bg-rose-100/90 text-rose-900 font-bold'
                  : 'text-stone-600 hover:bg-rose-50/60'
              }`}
            >
              <span>{rec.label}</span>
              {filters.recipient === rec.id && <Check className="w-3.5 h-3.5 text-rose-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-rose-100/60">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
          Budget (INR):
        </label>
        <div className="space-y-1">
          {priceOptions.map(p => (
            <button
              key={p.id}
              onClick={() => setFilters(prev => ({ ...prev, priceRange: p.id }))}
              className={`w-full text-left text-xs font-medium px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                filters.priceRange === p.id
                  ? 'bg-rose-100/90 text-rose-900 font-bold'
                  : 'text-stone-600 hover:bg-rose-50/60'
              }`}
            >
              <span>{p.label}</span>
              {filters.priceRange === p.id && <Check className="w-3.5 h-3.5 text-rose-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion Filter */}
      <div className="pt-4 border-t border-rose-100/60">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
          Occasion:
        </label>
        <select
          value={filters.occasion}
          onChange={e => setFilters(prev => ({ ...prev, occasion: e.target.value }))}
          className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-rose-500"
        >
          <option value="all">All Occasions</option>
          {OCCASIONS_DATA.map(occ => (
            <option key={occ.id} value={occ.id}>
              {occ.emoji} {occ.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="pt-4 border-t border-rose-100/60">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
          Category:
        </label>
        <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilters(prev => ({ ...prev, category: cat.id }))}
              className={`w-full text-left text-xs font-medium px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-rose-100/90 text-rose-900 font-bold'
                  : 'text-stone-600 hover:bg-rose-50/60'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.id && <Check className="w-3.5 h-3.5 text-rose-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-rose-100/60">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
          Customer Rating:
        </label>
        <div className="flex gap-2">
          {[
            { val: 0, label: 'All' },
            { val: 4.5, label: '4.5+ ★' },
            { val: 4.8, label: '4.8+ ★' },
          ].map(r => (
            <button
              key={r.val}
              onClick={() => setFilters(prev => ({ ...prev, minRating: r.val }))}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                filters.minRating === r.val
                  ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-rose-50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Speed Filter */}
      <div className="pt-4 border-t border-rose-100/60">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2.5">
          Delivery Urgency:
        </label>
        <div className="space-y-1">
          {deliveryOptions.map(d => (
            <button
              key={d.id}
              onClick={() => setFilters(prev => ({ ...prev, deliveryTime: d.id }))}
              className={`w-full text-left text-xs font-medium px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                filters.deliveryTime === d.id
                  ? 'bg-rose-100/90 text-rose-900 font-bold'
                  : 'text-stone-600 hover:bg-rose-50/60'
              }`}
            >
              <span>{d.label}</span>
              {filters.deliveryTime === d.id && <Check className="w-3.5 h-3.5 text-rose-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Personalizable Checkbox Toggle */}
      <div className="pt-4 border-t border-rose-100/60">
        <label className="flex items-center gap-2.5 cursor-pointer bg-purple-50/80 p-3 rounded-2xl border border-purple-200/70">
          <input
            type="checkbox"
            checked={filters.personalizableOnly}
            onChange={e => setFilters(prev => ({ ...prev, personalizableOnly: e.target.checked }))}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
          />
          <div>
            <span className="text-xs font-bold text-purple-900 block">Personalizable Gifts Only</span>
            <span className="text-[11px] text-purple-700">Custom names, photos, & engravings</span>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <div className="hidden lg:block w-72 bg-white rounded-3xl p-6 border border-rose-100 shadow-sm sticky top-24 self-start">
        {content}
      </div>

      {/* Mobile Modal Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-80 max-w-[85vw] bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between ml-auto">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-serif-display font-bold text-lg text-stone-900">Filter Products</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-full text-stone-500 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-sm shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
