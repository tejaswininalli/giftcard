import React, { useState } from 'react';
import { 
  CreditCard, 
  Sparkles, 
  Star, 
  ShoppingBag, 
  Send, 
  Check, 
  Eye, 
  Calendar, 
  Mail, 
  User, 
  Palette,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { GIFT_CARDS_DATA, CARD_TEMPLATES } from '../data/mockData';
import { GiftCardBrand, Product } from '../types';
import { useGiftora } from '../context/GiftoraContext';

export const GiftCardSection: React.FC = () => {
  const { addToCart, setIsCartDrawerOpen, setIsCheckoutOpen, showToast } = useGiftora();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<GiftCardBrand | null>(null);
  const [selectedDenomination, setSelectedDenomination] = useState<number>(1000);

  // Custom Gift Card Builder State
  const [customAmount, setCustomAmount] = useState<number>(1500);
  const [customRecipientName, setCustomRecipientName] = useState<string>('');
  const [customRecipientContact, setCustomRecipientContact] = useState<string>('');
  const [customMessage, setCustomMessage] = useState<string>('Wishing you wonderful joy, happy memories, and endless smiles!');
  const [customDeliveryDate, setCustomDeliveryDate] = useState<string>('instant');
  const [customSelectedTemplate, setCustomSelectedTemplate] = useState<string>(CARD_TEMPLATES[0].id);
  const [isBuilderModalOpen, setIsBuilderModalOpen] = useState(false);

  const categories = [
    'All',
    'Shopping',
    'Food & Restaurants',
    'Entertainment',
    'Travel',
    'Fashion',
    'Beauty',
    'Gaming',
    'Electronics',
  ];

  const filteredCards = selectedCategory === 'All'
    ? GIFT_CARDS_DATA
    : GIFT_CARDS_DATA.filter(c => c.category === selectedCategory);

  const handleBrandBuyNow = (brand: GiftCardBrand, denom: number) => {
    // Convert brand to cart item
    const syntheticProduct: Product = {
      id: `gc-${brand.id}-${denom}`,
      name: `${brand.name} ₹${denom.toLocaleString('en-IN')}`,
      shortDescription: brand.description,
      description: brand.description,
      price: denom,
      originalPrice: denom,
      discount: 0,
      rating: brand.rating,
      reviewCount: 450,
      category: 'gift-cards',
      occasions: ['birthday', 'anniversary', 'wedding'],
      recipients: ['her', 'him', 'friends'],
      isPersonalizable: false,
      deliveryTime: 'instant',
      images: [brand.image],
      tags: ['gift card', brand.category, brand.name],
      isGiftCard: true,
      brand: brand.name,
      inStock: true,
    };

    addToCart({
      productId: syntheticProduct.id,
      product: syntheticProduct,
      quantity: 1,
      selectedDenomination: denom,
      scheduledDeliveryDate: 'Instant digital delivery via Email/SMS',
    });

    setIsCartDrawerOpen(true);
  };

  const handleCustomCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRecipientName.trim()) {
      showToast('Please enter the recipient’s name');
      return;
    }

    const template = CARD_TEMPLATES.find(t => t.id === customSelectedTemplate) || CARD_TEMPLATES[0];

    const customCardProduct: Product = {
      id: `custom-gc-${Date.now()}`,
      name: `Giftora Personalized E-Gift Card (₹${customAmount.toLocaleString('en-IN')})`,
      shortDescription: `Custom designed for ${customRecipientName}`,
      description: `Personalized e-gift card redeemable on Giftora boutique for any curated luxury gift, hamper, or brand card. Personal message: "${customMessage}"`,
      price: customAmount,
      originalPrice: customAmount,
      discount: 0,
      rating: 5.0,
      reviewCount: 1,
      category: 'gift-cards',
      occasions: ['birthday', 'wedding', 'anniversary'],
      recipients: ['her', 'him', 'couples'],
      isPersonalizable: true,
      deliveryTime: 'instant',
      images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'],
      tags: ['custom card', 'gift card', 'personalized'],
      isGiftCard: true,
      inStock: true,
    };

    addToCart({
      productId: customCardProduct.id,
      product: customCardProduct,
      quantity: 1,
      selectedDenomination: customAmount,
      recipientName: customRecipientName,
      recipientEmail: customRecipientContact,
      giftMessage: customMessage,
      scheduledDeliveryDate: customDeliveryDate === 'instant' ? 'Instant' : customDeliveryDate,
      isCustomCard: true,
      cardDesign: template.name,
    });

    setIsBuilderModalOpen(false);
    setIsCartDrawerOpen(true);
    showToast(`Created custom gift card for ${customRecipientName}! 🎁`);
  };

  const currentTemplate = CARD_TEMPLATES.find(t => t.id === customSelectedTemplate) || CARD_TEMPLATES[0];

  return (
    <section id="gift-cards-section" className="py-16 sm:py-20 bg-stone-50/60 border-t border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-100/80 px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5 text-rose-600" />
            <span>Instant E-Gift Cards & Vouchers</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Give the Joy of Choice
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Delivered in 2 seconds via Email or WhatsApp. Ideal for last-minute celebrations or when you want them to pick their dream gift.
          </p>
        </div>

        {/* Feature Banner: Custom Gift Card Studio */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-rose-900 to-stone-900 text-white p-6 sm:p-10 mb-14 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                <Sparkles className="w-3 h-3" />
                <span>Custom Gift Card Studio</span>
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Design Your Own Personalized E-Gift Card
              </h3>
              <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed max-w-xl">
                Choose custom artwork themes, set any denomination, type a heartfelt love note, and schedule it to land in their inbox at the exact stroke of midnight!
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsBuilderModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Start Customizing Card</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-purple-200">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Instant or Scheduled Delivery</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Mini Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs rounded-2xl bg-gradient-to-tr from-amber-200 via-rose-200 to-amber-100 text-stone-900 p-5 shadow-2xl border-2 border-white/60 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-rose-800">Giftora Luxe</span>
                    <h4 className="font-serif-display text-lg font-bold text-stone-900">Celebration Voucher</h4>
                  </div>
                  <span className="text-xl">🎁</span>
                </div>
                <div className="my-6">
                  <div className="text-xs text-stone-600">Specially for:</div>
                  <div className="text-base font-bold text-stone-900">{customRecipientName || 'Your Special Someone'}</div>
                  <div className="text-[11px] text-stone-700 italic mt-1 line-clamp-2">
                    "{customMessage.slice(0, 70)}..."
                  </div>
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-stone-800/10">
                  <div>
                    <div className="text-[9px] uppercase font-bold text-stone-500">Value</div>
                    <div className="text-lg font-extrabold text-stone-900">₹{customAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-[10px] font-mono bg-stone-900/10 px-2 py-0.5 rounded">GFT-CARD</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md shadow-rose-600/20'
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map(brand => {
            const currentDenom = brand.denominations[0];
            return (
              <div
                key={brand.id}
                className="group bg-white rounded-2xl border border-rose-100 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Brand Visual Header */}
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[11px] font-bold text-stone-800 px-2.5 py-1 rounded-full shadow-xs">
                    {brand.category}
                  </span>

                  {/* Rating */}
                  <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-[11px] font-bold text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{brand.rating}</span>
                  </span>

                  {/* Brand Name on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-base text-white drop-shadow-xs">
                      {brand.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Available Denominations Preview */}
                  <div>
                    <span className="text-[11px] font-semibold text-stone-500 block mb-1.5 uppercase tracking-wider">
                      Popular Values:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {brand.denominations.map((denom) => (
                        <span
                          key={denom}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-100"
                        >
                          ₹{denom.toLocaleString('en-IN')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                    <button
                      onClick={() => handleBrandBuyNow(brand, currentDenom)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-semibold text-xs shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy E-Card</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBrand(brand);
                        setSelectedDenomination(brand.denominations[0]);
                      }}
                      className="p-2.5 rounded-xl border border-rose-200 text-stone-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Select custom denomination & details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Select Brand Denomination & Gift Options */}
        {selectedBrand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-rose-100 relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                    Digital Voucher
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                    {selectedBrand.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">
                    Select Denomination (INR):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedBrand.denominations.map(denom => (
                      <button
                        key={denom}
                        type="button"
                        onClick={() => setSelectedDenomination(denom)}
                        className={`py-2.5 px-3 rounded-xl font-bold text-sm transition-all border ${
                          selectedDenomination === denom
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-rose-50'
                        }`}
                      >
                        ₹{denom.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Instant Delivery Guarantee:</span> Vouchers are verified and sent via SMS and Email immediately upon simulated checkout.
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleBrandBuyNow(selectedBrand, selectedDenomination);
                      setSelectedBrand(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Add to Cart (₹{selectedDenomination.toLocaleString('en-IN')})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedBrand(null)}
                    className="px-5 py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Full Custom Gift Card Studio */}
        {isBuilderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 my-8">
              <div className="flex justify-between items-center pb-4 border-b border-rose-100 mb-6">
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    Interactive Designer
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                    Customize Giftora E-Gift Card
                  </h3>
                </div>
                <button
                  onClick={() => setIsBuilderModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCustomCardSubmit} className="space-y-6">
                {/* Live Card Preview */}
                <div>
                  <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2">
                    Live Preview:
                  </label>
                  <div className={`w-full rounded-2xl bg-gradient-to-r ${currentTemplate.gradient} ${currentTemplate.textColor} p-6 shadow-xl border-2 border-white/60 relative overflow-hidden transition-all duration-300`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">Giftora Luxury Voucher</span>
                        <h4 className="font-serif-display text-2xl font-bold tracking-tight">Gift of Pure Joy</h4>
                      </div>
                      <span className="text-2xl">🎁</span>
                    </div>

                    <div className="my-6">
                      <p className="text-xs opacity-75">Presented with love to:</p>
                      <h5 className="text-xl font-bold">{customRecipientName || '[Recipient Name]'}</h5>
                      <p className="text-xs mt-2 italic max-w-md line-clamp-2">
                        "{customMessage || 'Happy celebrations!'}"
                      </p>
                    </div>

                    <div className="flex justify-between items-end pt-3 border-t border-black/10">
                      <div>
                        <span className="text-[10px] uppercase font-bold opacity-75">Amount</span>
                        <div className="text-2xl font-black">₹{customAmount.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] opacity-75 block">Delivery</span>
                        <span className="text-xs font-semibold">
                          {customDeliveryDate === 'instant' ? '⚡ Instant Delivery' : `📅 ${customDeliveryDate}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Design Template Options */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">
                    1. Choose Card Design Theme:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CARD_TEMPLATES.map(tpl => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setCustomSelectedTemplate(tpl.id)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          customSelectedTemplate === tpl.id
                            ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{tpl.name}</span>
                        {customSelectedTemplate === tpl.id && <Check className="w-3.5 h-3.5 text-purple-600" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-2">
                    2. Select Amount:
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[500, 1000, 2500, 5000].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCustomAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          customAmount === amt
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-rose-50'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-500">Or custom amount:</span>
                    <input
                      type="number"
                      min={100}
                      max={50000}
                      step={100}
                      value={customAmount}
                      onChange={e => setCustomAmount(Number(e.target.value))}
                      className="w-32 px-3 py-1.5 text-sm border border-stone-300 rounded-lg font-bold text-stone-800 focus:outline-rose-500"
                    />
                  </div>
                </div>

                {/* Recipient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={customRecipientName}
                      onChange={e => setCustomRecipientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Recipient Email / Mobile
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="priya@example.com or 9876543210"
                      value={customRecipientContact}
                      onChange={e => setCustomRecipientContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-rose-500"
                    />
                  </div>
                </div>

                {/* Personal Message */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    maxLength={150}
                    value={customMessage}
                    onChange={e => setCustomMessage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:outline-rose-500"
                    placeholder="Type your heartfelt wish..."
                  />
                </div>

                {/* Delivery Date Selection */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Delivery Schedule:
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryTime"
                        checked={customDeliveryDate === 'instant'}
                        onChange={() => setCustomDeliveryDate('instant')}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span>⚡ Instant Delivery (Right now)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer">
                      <input
                        type="radio"
                        name="deliveryTime"
                        checked={customDeliveryDate !== 'instant'}
                        onChange={() => setCustomDeliveryDate(new Date(Date.now() + 86400000).toISOString().split('T')[0])}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span>📅 Schedule for Future Date</span>
                    </label>
                  </div>
                  {customDeliveryDate !== 'instant' && (
                    <input
                      type="date"
                      value={customDeliveryDate}
                      onChange={e => setCustomDeliveryDate(e.target.value)}
                      className="mt-2 px-3 py-1.5 text-xs rounded-lg border border-stone-300"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsBuilderModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-bold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Add Custom Card to Cart (₹{customAmount.toLocaleString('en-IN')})
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
