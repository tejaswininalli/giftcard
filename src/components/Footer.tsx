import React, { useState } from 'react';
import { 
  Gift, 
  Send, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  Heart,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Sparkles
} from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';

export const Footer: React.FC = () => {
  const { setActiveTab, showToast } = useGiftora();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('🎉 Thank you for subscribing! Your ₹200 gift coupon has been emailed to you.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* Top Value Propositions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Bespoke Gift Wrapping</h4>
              <p className="text-xs text-stone-400 mt-0.5">Luxury ribbons & handwritten cards</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express & Same-Day</h4>
              <p className="text-xs text-stone-400 mt-0.5">Reliable delivery across 19,000+ pincodes</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine Brands</h4>
              <p className="text-xs text-stone-400 mt-0.5">Verified official vouchers & artisan crafts</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Gifting Concierge</h4>
              <p className="text-xs text-stone-400 mt-0.5">24/7 personalized recommendation support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white">
                <Gift className="w-5 h-5" />
              </div>
              <span className="font-serif-display text-2xl font-bold text-white">
                Giftora 🎁
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Making every occasion special with the perfect gift. Thoughtful gift hampers, instant digital vouchers, and personalized memories delivered with love.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2">
                Join the Giftora Club for ₹200 off your first order:
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-3">
            <h5 className="font-serif-display font-bold text-white text-sm">
              Discover
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('gift-cards')} className="hover:text-rose-400 transition-colors">
                  Digital Gift Cards
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gifts')} className="hover:text-rose-400 transition-colors">
                  Physical Gift Hampers
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('personalized')} className="hover:text-rose-400 transition-colors">
                  Personalized Keepsakes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('for-her')} className="hover:text-rose-400 transition-colors">
                  Gifts For Her
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('for-him')} className="hover:text-rose-400 transition-colors">
                  Gifts For Him
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('occasions')} className="hover:text-rose-400 transition-colors">
                  Shop by Occasion
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <h5 className="font-serif-display font-bold text-white text-sm">
              Giftora Care
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-rose-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); showToast('Contact support: care@giftora.in • +91 80 4920 8000'); }} className="hover:text-rose-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => { e.preventDefault(); showToast('FAQs: Instant delivery for e-cards, 2-3 business days for physical hampers.'); }} className="hover:text-rose-400 transition-colors">
                  FAQs & Help
                </a>
              </li>
              <li>
                <a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Free express shipping on all orders above ₹999 across India.'); }} className="hover:text-rose-400 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#returns" onClick={(e) => { e.preventDefault(); showToast('7-day replacement guarantee on all damaged or defective items.'); }} className="hover:text-rose-400 transition-colors">
                  Returns & Replacements
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Social */}
          <div className="space-y-4">
            <h5 className="font-serif-display font-bold text-white text-sm">
              Legal & Community
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy: Your gifting data and recipient contacts are fully encrypted.'); }} className="hover:text-rose-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service: Standard Indian consumer electronic gift terms apply.'); }} className="hover:text-rose-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-stone-400 block mb-2 uppercase tracking-wider">
                Follow Our Stories
              </span>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-rose-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div>
          © {new Date().getFullYear()} Giftora Technologies Pvt. Ltd. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" />
          <span>for memorable celebrations across India</span>
        </div>
      </div>
    </footer>
  );
};
