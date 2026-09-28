import React from 'react';
import { Heart, ShoppingBag, Zap, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useGiftora } from '../context/GiftoraContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct, 
    setIsCartDrawerOpen, 
    setIsCheckoutOpen 
  } = useGiftora();

  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      product,
      quantity: 1,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      product,
      quantity: 1,
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-3xl border border-rose-100/80 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Showcase */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-rose-50/30">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-600"
          loading="lazy"
        />

        {/* Gradient Overlay on hover */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{product.badge}</span>
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-amber-400 text-stone-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
              {product.discount}% OFF
            </span>
          )}
          {product.isPersonalizable && (
            <span className="bg-white/95 backdrop-blur-md text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
              Personalizable
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/90 text-stone-600 hover:text-rose-500 hover:bg-white shadow-sm'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Delivery speed badge */}
        <div className="absolute bottom-2.5 left-3">
          <span className="bg-stone-900/70 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-amber-300" />
            <span>
              {product.deliveryTime === 'same-day' ? 'Same-Day Delivery' : product.deliveryTime === 'instant' ? 'Instant Delivery' : 'Delivers in 2-3 Days'}
            </span>
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold text-stone-800">{product.rating}</span>
            </div>
            <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
            <span className="text-[10px] text-stone-300">•</span>
            <span className="text-[11px] font-medium text-rose-600 capitalize">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif-display font-bold text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-rose-700 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-4 mt-2 border-t border-stone-100 space-y-3">
          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif-display text-xl sm:text-2xl font-bold text-stone-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-bold text-emerald-600">
                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickAdd}
              className="py-2.5 px-3 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
