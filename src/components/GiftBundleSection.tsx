import React, { useState } from 'react';
import { 
  Package, 
  Sparkles, 
  Plus, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  Trash2, 
  Heart,
  Zap,
  Gift
} from 'lucide-react';
import { PRODUCTS_DATA, BUNDLE_ADDONS } from '../data/mockData';
import { Product, BundleAddon } from '../types';
import { useGiftora } from '../context/GiftoraContext';

export const GiftBundleSection: React.FC = () => {
  const { addToCart, setQuickViewProduct, setIsCartDrawerOpen, showToast } = useGiftora();

  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [selectedBoxTheme, setSelectedBoxTheme] = useState<'blush' | 'midnight' | 'gold'>('blush');
  const [boxRecipientName, setBoxRecipientName] = useState('');
  const [boxGreetingNote, setBoxGreetingNote] = useState('With all our love and warmest wishes!');
  const [selectedItems, setSelectedItems] = useState<BundleAddon[]>([
    BUNDLE_ADDONS[0], // Chocolate
    BUNDLE_ADDONS[1], // Candle
    BUNDLE_ADDONS[5], // Silk mask
  ]);

  const precuratedBundles = PRODUCTS_DATA.filter(p => p.category === 'bundles');

  const toggleItem = (item: BundleAddon) => {
    const exists = selectedItems.some(i => i.id === item.id);
    if (exists) {
      if (selectedItems.length <= 1) {
        showToast('Please keep at least 1 item in your custom gift box.');
        return;
      }
      setSelectedItems(prev => prev.filter(i => i.id !== item.id));
    } else {
      if (selectedItems.length >= 6) {
        showToast('Maximum 6 luxury items fit in a single gift box.');
        return;
      }
      setSelectedItems(prev => [...prev, item]);
    }
  };

  const boxBaseFee = 299; // luxury box packaging + satin ribbon + seal
  const itemsSum = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const bundleRawTotal = itemsSum + boxBaseFee;
  const bundleDiscount = Math.round(bundleRawTotal * 0.12); // 12% bundle saver discount
  const bundleFinalPrice = bundleRawTotal - bundleDiscount;

  const handleAddCustomBundleToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boxRecipientName.trim()) {
      showToast('Please enter the recipient’s name for the custom gift box');
      return;
    }

    const customBundleProduct: Product = {
      id: `custom-bundle-${Date.now()}`,
      name: `Bespoke Handcrafted Gift Box (${boxRecipientName})`,
      shortDescription: `${selectedItems.length} curated treats in ${selectedBoxTheme} luxury box.`,
      description: `Custom curated gift hamper containing: ${selectedItems.map(i => i.name).join(', ')}. Personal message: "${boxGreetingNote}"`,
      price: bundleFinalPrice,
      originalPrice: bundleRawTotal,
      discount: 12,
      rating: 5.0,
      reviewCount: 1,
      category: 'bundles',
      occasions: ['birthday', 'anniversary', 'wedding'],
      recipients: ['her', 'him', 'friends'],
      isPersonalizable: true,
      deliveryTime: 'same-day',
      images: [
        selectedBoxTheme === 'blush'
          ? 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
          : selectedBoxTheme === 'midnight'
          ? 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&w=800&q=80',
      ],
      tags: ['custom bundle', 'hamper', 'personalized'],
      inStock: true,
      bundleItems: selectedItems.map(i => i.name),
    };

    addToCart({
      productId: customBundleProduct.id,
      product: customBundleProduct,
      quantity: 1,
      recipientName: boxRecipientName,
      giftMessage: boxGreetingNote,
      bundleContents: selectedItems.map(i => i.name),
    });

    setIsCustomBuilderOpen(false);
    setIsCartDrawerOpen(true);
    showToast(`Added custom gift box for ${boxRecipientName} to cart! 🎁`);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-purple-50/40 via-rose-50/30 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Package className="w-3.5 h-3.5" />
              <span>Artisan Gift Bundles</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Pre-Curated Bundles & Custom Gift Boxes
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl">
              Combine multi-item luxury with our signature handcrafted gift boxes, tailored with ribbons, handwritten wax-sealed notes, and 12% bundle savings.
            </p>
          </div>

          <button
            onClick={() => setIsCustomBuilderOpen(true)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Build Your Own Gift Box</span>
          </button>
        </div>

        {/* Featured Pre-curated Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {precuratedBundles.map(bundle => (
            <div
              key={bundle.id}
              onClick={() => setQuickViewProduct(bundle)}
              className="group bg-white rounded-3xl border border-rose-100/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src={bundle.images[0]}
                    alt={bundle.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  {bundle.badge && (
                    <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      {bundle.badge}
                    </span>
                  )}

                  <span className="absolute top-3 right-3 bg-amber-400 text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-2xs">
                    Save {bundle.discount}%
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif-display font-bold text-lg leading-tight line-clamp-1">
                      {bundle.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {bundle.shortDescription}
                  </p>

                  {/* Included Items Checklist */}
                  {bundle.bundleItems && (
                    <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">
                        Included in this Gift Box:
                      </span>
                      {bundle.bundleItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="p-5 pt-0 border-t border-stone-100/60 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Bundle Price</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif-display text-xl font-bold text-stone-900">
                      ₹{bundle.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{bundle.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      productId: bundle.id,
                      product: bundle,
                      quantity: 1,
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Bundle</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Interactive "Build Your Own Gift Box" */}
        {isCustomBuilderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative my-auto max-h-[92vh] overflow-y-auto">
              <div className="flex justify-between items-start pb-4 border-b border-rose-100 mb-6">
                <div>
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Interactive Bundle Studio</span>
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                    Build Your Custom Gift Box
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Select 1 to 6 handcrafted treats. We’ll package them in our signature presentation box with 12% bundle savings!
                  </p>
                </div>
                <button
                  onClick={() => setIsCustomBuilderOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCustomBundleToCart} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Item Picker */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Step 1: Box Style */}
                  <div>
                    <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2.5">
                      1. Choose Gift Box Aesthetic:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'blush', name: 'Blush Velvet', desc: 'Antique rose with satin ribbon' },
                        { id: 'midnight', name: 'Midnight Plum', desc: 'Deep royal violet with gold foil' },
                        { id: 'gold', name: 'Champagne Gold', desc: 'Embossed festive golden trunk' },
                      ].map(theme => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setSelectedBoxTheme(theme.id as any)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            selectedBoxTheme === theme.id
                              ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20'
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <span className="text-xs font-bold block">{theme.name}</span>
                          <span className="text-[10px] text-stone-500">{theme.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Pick Items */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                        2. Select Items ({selectedItems.length}/6 selected):
                      </label>
                      <span className="text-[11px] font-semibold text-purple-700">
                        {selectedItems.length < 1 ? 'Select at least 1 item' : 'Great selection!'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {BUNDLE_ADDONS.map(addon => {
                        const isSelected = selectedItems.some(i => i.id === addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleItem(addon)}
                            className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? 'border-purple-500 bg-purple-50/80 shadow-xs ring-1 ring-purple-500/30'
                                : 'border-stone-200 bg-white hover:border-rose-200 hover:bg-rose-50/30'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={addon.image}
                                alt={addon.name}
                                className="w-10 h-10 rounded-xl object-cover shrink-0"
                              />
                              <div>
                                <h5 className="text-[11px] font-bold text-stone-900 line-clamp-1">
                                  {addon.name}
                                </h5>
                                <span className="text-[11px] font-bold text-purple-800">
                                  ₹{addon.price}
                                </span>
                              </div>
                            </div>

                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                              isSelected ? 'bg-purple-600 text-white' : 'border border-stone-300 text-stone-400'
                            }`}>
                              {isSelected ? <Check className="w-3 h-3" /> : '+'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Recipient & Note */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Recipient Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Deshmukh"
                        value={boxRecipientName}
                        onChange={e => setBoxRecipientName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Wax-Sealed Card Message
                      </label>
                      <input
                        type="text"
                        placeholder="Your handwritten note..."
                        value={boxGreetingNote}
                        onChange={e => setBoxGreetingNote(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-rose-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Live Box Summary & Price */}
                <div className="lg:col-span-5 bg-stone-50/80 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                      Box Preview Summary
                    </span>
                    <h4 className="font-serif-display font-bold text-base text-stone-900">
                      {boxRecipientName ? `${boxRecipientName}'s Special Box` : 'Custom Curated Box'}
                    </h4>
                    <span className="text-xs text-purple-700 font-medium capitalize">
                      Theme: {selectedBoxTheme} Gift Trunk
                    </span>

                    {/* Selected items list */}
                    <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-stone-200/50">
                          <span className="text-stone-700 line-clamp-1">{item.name}</span>
                          <span className="font-bold text-stone-900 shrink-0 ml-2">₹{item.price}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between text-xs py-1 text-stone-500">
                        <span>Luxury Box & Hand-Tied Satin Ribbon</span>
                        <span className="font-bold text-stone-800">₹{boxBaseFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculations */}
                  <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-500">
                      <span>Standard Value</span>
                      <span>₹{bundleRawTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Bundle Saver (12% OFF)</span>
                      <span>-₹{bundleDiscount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                      <span>Total Bundle Price</span>
                      <span className="font-serif-display text-lg text-rose-700">
                        ₹{bundleFinalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Custom Box to Cart</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
