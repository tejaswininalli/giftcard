import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS_DATA } from '../data/mockData';
import { useGiftora } from '../context/GiftoraContext';
import { OccasionType } from '../types';

export const OccasionSection: React.FC = () => {
  const { setSelectedOccasion, setActiveTab, setSelectedRecipient, setSelectedCategory } = useGiftora();

  const handleOccasionClick = (occId: OccasionType) => {
    setSelectedOccasion(occId);
    setSelectedRecipient(null);
    setSelectedCategory(null);
    setActiveTab('gifts');
    // Scroll smoothly to products section if on same page or after tab change
    setTimeout(() => {
      const el = document.getElementById('products-catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Celebrate Every Milestone</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Shop by Occasion
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              From jubilant birthdays to heartfelt thank-yous, explore handpicked gift assortments tailored for life's golden celebrations.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedOccasion(null);
              setActiveTab('gifts');
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700 group cursor-pointer"
          >
            <span>View all occasions</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {OCCASIONS_DATA.map((occ) => (
            <div
              key={occ.id}
              onClick={() => handleOccasionClick(occ.id)}
              className="group relative rounded-2xl overflow-hidden bg-rose-50/40 border border-rose-100 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Background Image Container */}
              <div className="relative h-36 sm:h-44 w-full overflow-hidden">
                <img
                  src={occ.image}
                  alt={occ.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent" />

                {/* Emoji Pill */}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-lg shadow-sm">
                  {occ.emoji}
                </div>

                {/* Title inside card banner */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif-display text-base sm:text-lg font-bold leading-tight drop-shadow-xs">
                    {occ.name}
                  </h3>
                </div>
              </div>

              {/* Bottom Card Meta */}
              <div className="p-3.5 flex items-center justify-between bg-white text-stone-700">
                <span className="text-xs font-medium text-stone-500 line-clamp-1">
                  Curated gifts
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 group-hover:text-purple-600 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
