import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Check, 
  QrCode, 
  Smartphone, 
  Building, 
  Banknote,
  Lock,
  ArrowRight,
  Gift
} from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';
import { CustomerInfo, ShippingAddress } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    cartSubtotal, 
    cartDiscount, 
    deliveryFee, 
    giftWrap, 
    createOrder,
    showToast 
  } = useGiftora();

  const hasPhysicalItems = cart.some(item => !item.isCustomCard && item.product.category !== 'gift-cards');
  const hasDigitalCards = cart.some(item => item.isCustomCard || item.product.category === 'gift-cards');

  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: 'Ananya Verma',
    email: 'ananya.verma@example.com',
    phone: '9876543210',
  });

  const [shipping, setShipping] = useState<ShippingAddress>({
    addressLine: 'Flat 402, Lotus Greens, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.fullName || !customer.email || !customer.phone) {
      showToast('Please fill in your contact information');
      return;
    }

    if (hasPhysicalItems && (!shipping.addressLine || !shipping.city || !shipping.pincode)) {
      showToast('Please provide your complete delivery address');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      createOrder({
        customerInfo: customer,
        shippingAddress: hasPhysicalItems ? shipping : undefined,
        paymentMethod,
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-rose-100 mb-6">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Complete Your Gifting Order
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="bg-stone-50/70 p-5 rounded-2xl border border-stone-200/80 space-y-4">
              <h4 className="font-serif-display font-bold text-stone-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Sender / Contact Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={e => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={e => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Details (For physical gifts) */}
            {hasPhysicalItems && (
              <div className="bg-stone-50/70 p-5 rounded-2xl border border-stone-200/80 space-y-4">
                <h4 className="font-serif-display font-bold text-stone-900 text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <span>Physical Gift Delivery Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-stone-700 block mb-1">Street Address / House No.</label>
                    <input
                      type="text"
                      required
                      value={shipping.addressLine}
                      onChange={e => setShipping({ ...shipping, addressLine: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shipping.city}
                      onChange={e => setShipping({ ...shipping, city: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={shipping.state}
                      onChange={e => setShipping({ ...shipping, state: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={shipping.pincode}
                      onChange={e => setShipping({ ...shipping, pincode: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white focus:outline-rose-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Options */}
            <div className="bg-stone-50/70 p-5 rounded-2xl border border-stone-200/80 space-y-4">
              <h4 className="font-serif-display font-bold text-stone-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                  {hasPhysicalItems ? '3' : '2'}
                </span>
                <span>Select Payment Method (Simulation)</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-purple-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Building className="w-4 h-4 text-purple-600" />
                  <span>NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20'
                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-purple-600" />
                  <span>COD</span>
                </button>
              </div>

              {/* Simulated UPI details */}
              {paymentMethod === 'upi' && (
                <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-900">Scan & Pay via any UPI App:</span>
                    <span className="text-[10px] bg-purple-200 text-purple-800 font-bold px-2 py-0.5 rounded">Fastest</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-white rounded-lg p-1 border border-purple-200 flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-purple-900" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full px-3 py-1.5 rounded-lg border border-purple-200 text-xs bg-white"
                      />
                      <p className="text-[10px] text-purple-700">Supported: GPay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Simulated Card details */}
              {paymentMethod === 'card' && (
                <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-xs space-y-2">
                  <div>
                    <label className="font-semibold text-purple-900 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-purple-200 text-xs bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-purple-900 block mb-1">Valid Thru</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-purple-200 text-xs bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-purple-900 block mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-purple-200 text-xs bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-rose-50/40 p-5 rounded-2xl border border-rose-100 space-y-4">
              <h4 className="font-serif-display font-bold text-stone-900 text-base">
                Order Review ({cart.length} items)
              </h4>

              <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1 divide-y divide-rose-100/60">
                {cart.map(item => {
                  const price = item.selectedDenomination || item.product.price;
                  return (
                    <div key={item.id} className="pt-2 first:pt-0 flex gap-2.5 items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-bold text-stone-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-[10px] text-stone-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">
                        ₹{(price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-rose-200/60 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between">
                    <span>Luxury Gift Wrap</span>
                    <span>₹99</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-rose-200 font-extrabold text-sm text-stone-900">
                  <span>Total Payable</span>
                  <span className="font-serif-display text-lg text-rose-700">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Order...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-amber-200" />
                    <span>Place Order (₹{cartTotal.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-stone-500 text-center">
                Simulated environment. No real funds will be deducted.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
