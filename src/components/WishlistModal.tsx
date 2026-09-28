import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';
import { PRODUCTS_DATA } from '../data/mockData';

export const WishlistModal: React.FC = () => {
  const { 
    isWishlistModalOpen, 
    setIsWishlistModalOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    setQuickViewProduct 
  } = useGiftora();

  if (!isWishlistModalOpen) return null;

  const wishlistedProducts = PRODUCTS_DATA.filter(p => wishlist.includes(p.id));

  const handleMoveToCart = (prod: any) => {
    addToCart({
      productId: prod.id,
      product: prod,
      quantity: 1,
    });
    toggleWishlist(prod.id); // removes from wishlist
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-4 border-b border-rose-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-600" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-stone-900 text-xl">
                Your Saved Wishlist
              </h3>
              <span className="text-xs text-stone-500">
                {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved for later
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsWishlistModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center text-3xl mx-auto">
              ❤️
            </div>
            <h4 className="font-serif-display font-bold text-lg text-stone-900">
              Your wishlist is empty
            </h4>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Tap the heart icon on any gift to save it here for upcoming birthdays and anniversaries!
            </p>
          </div>
        ) : (
          <div className="space-y-3 divide-y divide-rose-100/60 max-h-[60vh] overflow-y-auto pr-1">
            {wishlistedProducts.map(prod => (
              <div key={prod.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div
                  onClick={() => {
                    setIsWishlistModalOpen(false);
                    setQuickViewProduct(prod);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-100"
                  />
                  <div>
                    <h4 className="font-serif-display text-sm font-bold text-stone-900 line-clamp-1 hover:text-rose-600">
                      {prod.name}
                    </h4>
                    <p className="text-xs font-bold text-stone-900 mt-0.5">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </p>
                    <span className="text-[10px] text-stone-400 capitalize">{prod.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveToCart(prod)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs hover:scale-105 transition-transform"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(prod.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
