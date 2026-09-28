import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  Package, 
  Truck, 
  Gift, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Printer
} from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    isOrderSuccessOpen, 
    setIsOrderSuccessOpen, 
    lastOrder, 
    setActiveTab 
  } = useGiftora();

  const [showTracker, setShowTracker] = useState(false);

  if (!isOrderSuccessOpen || !lastOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative my-auto">
        {/* Celebration Icon Header */}
        <div className="text-center space-y-3 pb-6 border-b border-rose-100">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-bounce" style={{ animationDuration: '2s' }}>
            <CheckCircle className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
              Order Confirmed & Payment Verified
            </span>
            <h3 className="font-serif-display text-3xl font-bold text-stone-900 mt-1">
              🎉 Your Gift Is On Its Way!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Thank you for trusting Giftora! We are lovingly preparing your surprise.
            </p>
          </div>
        </div>

        {/* Order Meta Bar */}
        <div className="my-6 p-4 rounded-2xl bg-rose-50/50 border border-rose-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Order ID</span>
            <span className="font-mono font-bold text-xs text-rose-700">{lastOrder.id}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Date</span>
            <span className="font-bold text-xs text-stone-800">{lastOrder.date}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Total Amount</span>
            <span className="font-bold text-xs text-stone-900">₹{lastOrder.total.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Estimated Arrival</span>
            <span className="font-bold text-xs text-emerald-700">{lastOrder.estimatedDelivery}</span>
          </div>
        </div>

        {/* Real-time Order Tracking Simulation */}
        {showTracker ? (
          <div className="mb-6 p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-4 animate-in fade-in">
            <h4 className="font-serif-display font-bold text-purple-900 text-sm flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-purple-600" />
              <span>Live Gift Delivery Timeline:</span>
            </h4>
            <div className="relative pl-6 space-y-4 border-l-2 border-purple-300 ml-2">
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <p className="text-xs font-bold text-stone-900">Order Placed & Confirmed</p>
                <p className="text-[11px] text-stone-500">Digital verification complete</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-100 animate-pulse" />
                <p className="text-xs font-bold text-purple-900">Boutique Curating & Gift-Wrapping</p>
                <p className="text-[11px] text-purple-700">Artisan hand-assembling your items with silk ribbon</p>
              </div>
              <div className="relative opacity-60">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-300" />
                <p className="text-xs font-bold text-stone-700">Dispatched via Express Courier</p>
                <p className="text-[11px] text-stone-400">Tracking code will be shared on SMS</p>
              </div>
              <div className="relative opacity-60">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-300" />
                <p className="text-xs font-bold text-stone-700">Joyful Delivery to Recipient</p>
                <p className="text-[11px] text-stone-400">Delivery verification OTP</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Itemized summary */}
        <div className="space-y-3 mb-6">
          <h4 className="font-serif-display font-bold text-stone-900 text-xs uppercase tracking-wider">
            Items in this Gift:
          </h4>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
            {lastOrder.items.map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div>
                    <span className="font-bold text-stone-900 block">{item.product.name}</span>
                    {item.recipientName && <span className="text-[10px] text-purple-700">For {item.recipientName}</span>}
                  </div>
                </div>
                <span className="font-bold text-stone-800">Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recipient / Shipping Information */}
        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-600 mb-6">
          <span className="font-bold text-stone-800 block mb-1">Recipient & Delivery Details:</span>
          <p>{lastOrder.customerInfo.fullName} • {lastOrder.customerInfo.email} • {lastOrder.customerInfo.phone}</p>
          {lastOrder.shippingAddress && (
            <p className="text-stone-500 mt-0.5">
              {lastOrder.shippingAddress.addressLine}, {lastOrder.shippingAddress.city}, {lastOrder.shippingAddress.state} - {lastOrder.shippingAddress.pincode}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={() => setShowTracker(!showTracker)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5 text-purple-600" />
            <span>{showTracker ? 'Hide Live Status' : 'Track Order'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOrderSuccessOpen(false);
              setActiveTab('home');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
