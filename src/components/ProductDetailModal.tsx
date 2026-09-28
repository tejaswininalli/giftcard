import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Gift, 
  Check, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';
import { useGiftora } from '../context/GiftoraContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCartDrawerOpen, 
    setIsCheckoutOpen,
    showToast 
  } = useGiftora();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [personalizationText, setPersonalizationText] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  // Recommendations: 3 products in same category or occasion
  const relatedProducts = PRODUCTS_DATA.filter(
    p => p.id !== product.id && (p.category === product.category || p.occasions.some(o => product.occasions.includes(o)))
  ).slice(0, 3);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus(`Delivers in 2-3 business days to ${pincode} • Free delivery available`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleAddToCart = () => {
    if (product.isPersonalizable && !personalizationText.trim() && product.personalizationPrompt) {
      showToast('Tip: You can personalize this item with custom name or initials!');
    }

    addToCart({
      productId: product.id,
      product,
      quantity,
      personalizationText: personalizationText.trim() || undefined,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      product,
      quantity,
      personalizationText: personalizationText.trim() || undefined,
    });
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Gallery Showcase */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-rose-50/40 border border-rose-100 shadow-inner">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {product.badge && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {product.badge}
                </div>
              )}

              {/* Wishlist Button inside image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/90 text-stone-600 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-rose-600 ring-2 ring-rose-500/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Authentic & Hand-inspected quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Luxury branded gift packaging & complimentary greeting card</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Easy 7-day hassle-free replacement on damages</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-xs font-bold text-stone-800">{product.rating}</span>
                  <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-2 leading-tight">
                {product.name}
              </h2>

              {/* Pricing */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif-display text-3xl font-extrabold text-stone-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Personalization Options if Available */}
              {product.isPersonalizable && (
                <div className="mt-4 p-4 rounded-2xl bg-purple-50/80 border border-purple-200/70">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Personalize this Gift:</span>
                  </div>
                  <p className="text-[11px] text-purple-700 mb-2">
                    {product.personalizationPrompt || 'Add a custom name, monogram, or special date for engraving.'}
                  </p>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="e.g. Ananya & Rohit (24.10.2026)"
                    value={personalizationText}
                    onChange={e => setPersonalizationText(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-purple-200 text-stone-900 focus:outline-purple-500"
                  />
                  {personalizationText && (
                    <div className="mt-1.5 text-[10px] text-purple-800 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3 text-purple-600" />
                      <span>Preview: "{personalizationText}" will be engraved!</span>
                    </div>
                  )}
                </div>
              )}

              {/* Pincode Delivery Check */}
              <div className="mt-4">
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Check Delivery Time to Your Pincode:
                </label>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode (e.g. 560001)"
                      value={pincode}
                      onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-rose-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="text-[11px] font-medium text-emerald-700 mt-1 flex items-center gap-1">
                    <Truck className="w-3 h-3 text-emerald-600" />
                    <span>{pincodeStatus}</span>
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-stone-900 bg-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 pt-8 border-t border-rose-100">
            <h3 className="font-serif-display text-lg font-bold text-stone-900 mb-4">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setQuickViewProduct(rel);
                    setActiveImageIndex(0);
                    setPersonalizationText('');
                  }}
                  className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 hover:border-rose-300 hover:bg-rose-50/40 transition-all cursor-pointer flex gap-3 items-center"
                >
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                      {rel.name}
                    </h4>
                    <div className="text-xs font-extrabold text-rose-600 mt-0.5">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
