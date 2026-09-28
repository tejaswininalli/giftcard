import React, { useState } from 'react';
import { Gift, Heart, Sparkles, ShieldCheck, Truck, Users, Star, Send } from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';

export const AboutSection: React.FC = () => {
  const { showToast, setIsAIFinderOpen, setActiveTab } = useGiftora();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you for contacting us! Our gifting concierge will reach out within 2 hours.');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const reviews = [
    {
      name: 'Pooja Iyer',
      city: 'Mumbai',
      quote: 'Giftora saved my anniversary! Ordered a custom engraved Spotify song frame at 10 PM and got same-day express delivery. The packaging was royal!',
      stars: 5,
      gift: 'Walnut Couple’s Frame',
    },
    {
      name: 'Aditya Sen',
      city: 'Bengaluru',
      quote: 'The AI Gift Finder is shockingly good. I entered my sister’s budget and interests, and it recommended the 24K Saffron skincare box. She was thrilled!',
      stars: 5,
      gift: 'Revival Skincare Kit',
    },
    {
      name: 'Rohan Mehra',
      city: 'Delhi',
      quote: 'Best digital gift cards selection in India. Instant SMS delivery to my colleagues with personalized celebration messages. 10/10 service.',
      stars: 5,
      gift: 'Starbucks & Zomato Vouchers',
    },
  ];

  return (
    <div className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Purpose</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            Making Every Occasion Special with the Perfect Gift
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Giftora was founded on a simple belief: giving a gift is an art of emotional connection. Whether you're miles apart or sitting across the dinner table, we help you express love, gratitude, and joy effortlessly.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display font-bold text-lg text-stone-900">Curated with Passion</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every hamper, luxury perfume, and artisan chocolate is hand-tested and reviewed before it earns a spot in our boutique.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-purple-50/50 border border-purple-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display font-bold text-lg text-stone-900">AI Gift Finder</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Trained on gifting psychology to decode subtle hints, interests, and budgets to recommend heartfelt surprises in seconds.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-900 flex items-center justify-center shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display font-bold text-lg text-stone-900">Instant & Express</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Digital e-gift cards sent instantly via SMS & Email. Same-day handcrafted physical delivery for spontaneous celebrations.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-pink-50/50 border border-pink-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display font-bold text-lg text-stone-900">Smart Reminders</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Never miss your spouse’s milestone anniversary or mom’s birthday again with our automated countdown notifications.
            </p>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="pt-8">
          <div className="text-center mb-10">
            <h3 className="font-serif-display text-3xl font-bold text-stone-900">
              Loved by Over 100,000+ Gifters
            </h3>
            <p className="text-xs text-stone-500 mt-1">Here is what our community is saying</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-stone-50/80 border border-stone-200/80 space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 italic leading-relaxed">"{r.quote}"</p>
                <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block">{r.name}</span>
                    <span className="text-stone-400">{r.city}</span>
                  </div>
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {r.gift}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Form */}
        <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-purple-900 to-stone-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Get In Touch
              </span>
              <h3 className="font-serif-display text-3xl font-bold leading-tight">
                Corporate Gifting or Custom Hamper Requests?
              </h3>
              <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                Looking for bulk customized employee gift boxes, wedding return gifts, or special branding? Our dedicated corporate concierge is happy to assist.
              </p>
              <div className="text-xs text-purple-300 pt-2 space-y-1">
                <p>📍 Giftora Concierge HQ, Indiranagar, Bengaluru, 560038</p>
                <p>✉️ concierge@giftora.in • 📞 +91 80 4920 8000</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white text-stone-900 p-6 sm:p-8 rounded-2xl shadow-lg">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@company.com"
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Message / Requirements</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what you're looking for, recipient count, and target date..."
                    value={contactMessage}
                    onChange={e => setContactMessage(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiries to Concierge</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
