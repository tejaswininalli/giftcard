import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles, X } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { ProductFilter, FilterState } from './ProductFilter';
import { PRODUCTS_DATA, OCCASIONS_DATA } from '../data/mockData';
import { useGiftora } from '../context/GiftoraContext';
import { Product } from '../types';

interface ProductListProps {
  initialTitle?: string;
  initialSubtitle?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  initialTitle = 'Explore All Curated Gifts',
  initialSubtitle = 'Handpicked gifts for your loved ones, tailored by occasion, budget, and sentiment.',
}) => {
  const { 
    selectedOccasion, 
    setSelectedOccasion, 
    selectedRecipient, 
    setSelectedRecipient, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery 
  } = useGiftora();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'>('popular');

  const [filters, setFilters] = useState<FilterState>({
    priceRange: 'all',
    category: selectedCategory || 'all',
    occasion: selectedOccasion || 'all',
    recipient: selectedRecipient || 'all',
    minRating: 0,
    personalizableOnly: false,
    deliveryTime: 'all',
  });

  // Keep filters in sync if global context changes
  React.useEffect(() => {
    if (selectedOccasion) {
      setFilters(prev => ({ ...prev, occasion: selectedOccasion }));
    }
  }, [selectedOccasion]);

  React.useEffect(() => {
    if (selectedRecipient) {
      setFilters(prev => ({ ...prev, recipient: selectedRecipient }));
    }
  }, [selectedRecipient]);

  React.useEffect(() => {
    if (selectedCategory) {
      setFilters(prev => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  const resetFilters = () => {
    setFilters({
      priceRange: 'all',
      category: 'all',
      occasion: 'all',
      recipient: 'all',
      minRating: 0,
      personalizableOnly: false,
      deliveryTime: 'all',
    });
    setSelectedOccasion(null);
    setSelectedRecipient(null);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product: Product) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // Price filter
      if (filters.priceRange === 'under-1000' && product.price >= 1000) return false;
      if (filters.priceRange === '1000-2500' && (product.price < 1000 || product.price > 2500)) return false;
      if (filters.priceRange === '2500-5000' && (product.price < 2500 || product.price > 5000)) return false;
      if (filters.priceRange === 'above-5000' && product.price < 5000) return false;

      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Occasion filter
      if (filters.occasion !== 'all' && !product.occasions.includes(filters.occasion as any)) {
        return false;
      }

      // Recipient filter
      if (filters.recipient !== 'all' && !product.recipients.includes(filters.recipient as any)) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Personalizable filter
      if (filters.personalizableOnly && !product.isPersonalizable) {
        return false;
      }

      // Delivery time filter
      if (filters.deliveryTime !== 'all' && product.deliveryTime !== filters.deliveryTime) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'popular') {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Active occasion data if any
  const currentOccasionObj = OCCASIONS_DATA.find(o => o.id === filters.occasion);

  return (
    <div id="products-catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Dynamic Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currentOccasionObj ? `${currentOccasionObj.name} Curations` : 'Handpicked Collection'}
              </span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              {currentOccasionObj ? `${currentOccasionObj.emoji} ${currentOccasionObj.name} Gifts` : initialTitle}
            </h2>
            <p className="mt-1 text-sm text-stone-500 max-w-2xl">
              {currentOccasionObj ? currentOccasionObj.description : initialSubtitle}
            </p>
          </div>

          {/* Action Row: Mobile Filter Trigger & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 text-xs font-bold shadow-xs hover:bg-rose-50"
            >
              <SlidersHorizontal className="w-4 h-4 text-rose-600" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 bg-white border border-stone-200 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Featured & Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(filters.occasion !== 'all' || filters.recipient !== 'all' || filters.category !== 'all' || filters.priceRange !== 'all' || filters.personalizableOnly || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-rose-100/60">
            <span className="text-xs font-bold text-stone-500 mr-1">Active Filters:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                <span>Search: "{searchQuery}"</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {filters.occasion !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200">
                <span>Occasion: {filters.occasion}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => {
                  setFilters(p => ({ ...p, occasion: 'all' }));
                  setSelectedOccasion(null);
                }} />
              </span>
            )}

            {filters.recipient !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                <span>Recipient: {filters.recipient}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => {
                  setFilters(p => ({ ...p, recipient: 'all' }));
                  setSelectedRecipient(null);
                }} />
              </span>
            )}

            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <span>Category: {filters.category}</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => {
                  setFilters(p => ({ ...p, category: 'all' }));
                  setSelectedCategory(null);
                }} />
              </span>
            )}

            {filters.personalizableOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200">
                <span>Personalized Only</span>
                <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters(p => ({ ...p, personalizableOnly: false }))} />
              </span>
            )}

            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-600 hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="flex gap-8 items-start">
        <ProductFilter
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Products Grid */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-rose-100 p-8 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-3xl mx-auto mb-4">
                🎁
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                No matching gifts found
              </h3>
              <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
                We couldn't find any gifts matching your specific combination of filters. Try broadening your criteria or reset filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="text-xs font-semibold text-stone-500 mb-4">
                Showing <strong className="text-stone-900">{sortedProducts.length}</strong> thoughtful gift ideas
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
