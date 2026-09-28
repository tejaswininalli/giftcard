import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  Tag, 
  CheckCircle,
  CreditCard
} from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartDiscount, 
    deliveryFee, 
    cartTotal, 
    giftWrap, 
    setGiftWrap, 
    promoCode, 
    applyPromoCode,
    setIsCheckoutOpen 
  } = useGiftora();

  const [inputPromo, setInputPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = applyPromoCode(inputPromo);
    setPromoMessage({ success: res.success, text: res.message });
  };

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Cart Header */}
          <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-stone-900 text-lg">
                  Shopping Cart
                </h3>
                <span className="text-xs text-stone-500">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-500 flex items-center justify-center font-bold shadow-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
                  🛍️
                </div>
                <h4 className="font-serif-display text-xl font-bold text-stone-900">
                  Your cart is empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Looks like you haven't added any gift items or vouchers yet.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs shadow-md"
                >
                  Start Exploring Gifts
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.selectedDenomination || item.product.price;
                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5">
                    {/* Item Image */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-stone-100"
                    />

                    {/* Item Information */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-display text-sm font-bold text-stone-900 leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Extra customization info */}
                        {item.personalizationText && (
                          <div className="text-[11px] text-purple-700 font-medium mt-0.5">
                            Engraving: "{item.personalizationText}"
                          </div>
                        )}
                        {item.recipientName && (
                          <div className="text-[11px] text-rose-600 font-medium">
                            To: {item.recipientName} ({item.cardDesign || 'Digital Card'})
                          </div>
                        )}
                        {item.isCustomCard && item.giftMessage && (
                          <div className="text-[10px] text-stone-500 italic line-clamp-1">
                            "{item.giftMessage}"
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Adjuster (only for physical products) */}
                        {!item.isCustomCard ? (
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-bold text-stone-900 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-stone-500 font-medium">
                            Qty: 1
                          </span>
                        )}

                        {/* Line Price */}
                        <span className="font-serif-display font-extrabold text-stone-900 text-sm">
                          ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Cart Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-rose-100 bg-rose-50/20 space-y-4">
              {/* Luxury Gift Wrap Addon Checkbox */}
              <label className="flex items-center justify-between p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-rose-500" />
                      <span>Signature Luxury Gift Wrap</span>
                    </span>
                    <span className="text-[10px] text-purple-700">Handmade satin ribbon + bespoke wax seal card</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-purple-900">+₹99</span>
              </label>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. GIFTORA10)"
                    value={inputPromo}
                    onChange={(e) => setInputPromo(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded-xl focus:outline-rose-500 bg-white uppercase font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] font-semibold ${promoMessage.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({promoCode})</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between">
                    <span>Luxury Gift Wrap</span>
                    <span className="font-semibold text-stone-900">₹99</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="text-[10px] text-stone-500 italic">
                    Add ₹{(1000 - cartSubtotal).toLocaleString('en-IN')} more for Free Delivery!
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                  <span>Total Amount</span>
                  <span className="font-serif-display text-lg text-rose-700">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout & Continue Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-semibold text-center"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
