import React from 'react';
import { ArrowRight, Sparkles, Heart, Shield, Smile, Sparkle } from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';
import { RecipientType, GiftCategory } from '../types';

export const RecipientCategoriesSection: React.FC = () => {
  const { setSelectedRecipient, setSelectedCategory, setActiveTab } = useGiftora();

  const handleSelect = (rec: RecipientType, cat?: GiftCategory) => {
    setSelectedRecipient(rec);
    if (cat) setSelectedCategory(cat);
    setActiveTab('gifts');
    // Scroll smoothly to catalog
    setTimeout(() => {
      const el = document.getElementById('products-catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sections = [
    {
      id: 'her' as RecipientType,
      title: 'For Her',
      subtitle: 'Grace, elegance & heartwarming luxury',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      badge: 'Curated Elegance',
      color: 'from-pink-500/20 to-rose-500/20 text-rose-800',
      subcategories: [
        { name: 'Jewelry', cat: 'jewelry' as GiftCategory },
        { name: 'Perfumes', cat: 'perfumes' as GiftCategory },
        { name: 'Handbags', cat: 'handbags' as GiftCategory },
        { name: 'Skincare', cat: 'skincare' as GiftCategory },
        { name: 'Personalized gifts', cat: 'personalized' as GiftCategory },
      ],
    },
    {
      id: 'him' as RecipientType,
      title: 'For Him',
      subtitle: 'Refined essentials, tech & timeless classics',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      badge: 'Gentleman’s Edit',
      color: 'from-slate-500/20 to-blue-500/20 text-slate-800',
      subcategories: [
        { name: 'Watches', cat: 'watches' as GiftCategory },
        { name: 'Wallets', cat: 'wallets' as GiftCategory },
        { name: 'Grooming kits', cat: 'grooming' as GiftCategory },
        { name: 'Gadgets', cat: 'gadgets' as GiftCategory },
        { name: 'Personalized gifts', cat: 'personalized' as GiftCategory },
      ],
    },
    {
      id: 'kids' as RecipientType,
      title: 'For Kids & Babies',
      subtitle: 'Imaginative toys, books & curious wonders',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
      badge: 'Spark Wonder',
      color: 'from-amber-400/20 to-sky-400/20 text-amber-900',
      subcategories: [
        { name: 'Toys', cat: 'toys-games' as GiftCategory },
        { name: 'Games', cat: 'toys-games' as GiftCategory },
        { name: 'Books', cat: 'books' as GiftCategory },
        { name: 'Educational gifts', cat: 'toys-games' as GiftCategory },
      ],
    },
    {
      id: 'couples' as RecipientType,
      title: 'For Couples',
      subtitle: 'Cherished memories & romantic moments for two',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      badge: 'Made for Two',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-900',
      subcategories: [
        { name: 'Couple gifts', cat: 'couple-gifts' as GiftCategory },
        { name: 'Photo frames', cat: 'photo-frames' as GiftCategory },
        { name: 'Customized gifts', cat: 'personalized' as GiftCategory },
        { name: 'Experience gifts', cat: 'gift-cards' as GiftCategory },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover by Recipient</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Curated Collections for Every Loved One
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Explore dedicated gifting boutiques tailored specifically to their taste, lifestyle, and desires.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map(section => (
            <div
              key={section.id}
              className="bg-white rounded-3xl border border-rose-100 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold text-stone-800 px-2.5 py-0.5 rounded-full shadow-xs">
                    {section.badge}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif-display text-xl font-bold">{section.title}</h3>
                    <p className="text-[11px] text-stone-200 line-clamp-1">{section.subtitle}</p>
                  </div>
                </div>

                {/* Subcategories list */}
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    Popular Categories:
                  </span>
                  {section.subcategories.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(section.id, sub.cat)}
                      className="w-full text-left text-xs font-semibold py-1.5 px-2.5 rounded-xl hover:bg-rose-50 text-stone-700 hover:text-rose-700 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span>• {sub.name}</span>
                      <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* View all button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleSelect(section.id)}
                  className="w-full py-2.5 rounded-xl bg-stone-50 hover:bg-gradient-to-r hover:from-rose-600 hover:to-purple-600 text-stone-800 hover:text-white font-bold text-xs border border-stone-200 hover:border-transparent transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Explore {section.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
