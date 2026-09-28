import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  LogOut, 
  Calendar, 
  Plus, 
  Trash2, 
  Sparkles,
  Truck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';
import { OccasionType } from '../types';

export const AccountModal: React.FC = () => {
  const { 
    isAccountModalOpen, 
    setIsAccountModalOpen, 
    orders, 
    reminders, 
    addReminder, 
    removeReminder, 
    openAIFinderWithPrompt,
    wishlistCount,
    setIsWishlistModalOpen,
    showToast 
  } = useGiftora();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'reminders' | 'cards' | 'addresses'>('reminders');

  // New Reminder Form State
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
  const [newRelationship, setNewRelationship] = useState('Sister');
  const [newOccasion, setNewOccasion] = useState<OccasionType>('birthday');
  const [newDate, setNewDate] = useState('2026-10-15');
  const [newFrequency, setNewFrequency] = useState<'yearly' | 'once'>('yearly');
  const [newNotes, setNewNotes] = useState('');

  if (!isAccountModalOpen) return null;

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonName.trim()) {
      showToast('Please enter person name');
      return;
    }
    addReminder({
      personName: newPersonName,
      relationship: newRelationship,
      occasion: newOccasion,
      date: newDate,
      frequency: newFrequency,
      notes: newNotes,
    });
    setNewPersonName('');
    setNewNotes('');
    setShowAddReminder(false);
  };

  const calculateDaysLeft = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-rose-100 relative my-auto max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center pb-4 border-b border-rose-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              AV
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-xl text-stone-900">
                Ananya Verma
              </h3>
              <p className="text-xs text-stone-500">
                ananya.verma@example.com • Giftora Gold Member 🌟
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-100 mb-6 text-xs font-bold no-scrollbar">
          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reminders'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Gift Reminders ({reminders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'cards'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Gift Cards Wallet</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

        {/* Tab 1: Gift Reminders (Core Highlight Feature) */}
        {activeTab === 'reminders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif-display font-bold text-stone-900 text-lg">
                  Never Miss a Special Day 🎂
                </h4>
                <p className="text-xs text-stone-500">
                  Save birthdays, anniversaries, and milestones. We'll remind you in advance so you can find the perfect surprise effortlessly.
                </p>
              </div>
              <button
                onClick={() => setShowAddReminder(!showAddReminder)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Reminder</span>
              </button>
            </div>

            {/* Add Reminder Inline Form */}
            {showAddReminder && (
              <form onSubmit={handleCreateReminder} className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-4 animate-in fade-in">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-rose-800">
                    Create New Date Reminder
                  </h5>
                  <button
                    type="button"
                    onClick={() => setShowAddReminder(false)}
                    className="text-stone-400 hover:text-stone-600 text-xs"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Person's Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Sharma"
                      value={newPersonName}
                      onChange={e => setNewPersonName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Relationship</label>
                    <select
                      value={newRelationship}
                      onChange={e => setNewRelationship(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-stone-300"
                    >
                      <option value="Sister">Sister</option>
                      <option value="Brother">Brother</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Partner">Partner (Wife/Husband)</option>
                      <option value="Best Friend">Best Friend</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Child">Child</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Occasion</label>
                    <select
                      value={newOccasion}
                      onChange={e => setNewOccasion(e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-stone-300 capitalize"
                    >
                      <option value="birthday">Birthday 🎂</option>
                      <option value="anniversary">Anniversary 💍</option>
                      <option value="wedding">Wedding 💒</option>
                      <option value="mothers-day">Mother's Day 💐</option>
                      <option value="fathers-day">Father's Day 👔</option>
                      <option value="housewarming">Housewarming 🏠</option>
                      <option value="graduation">Graduation 🎓</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Frequency</label>
                    <select
                      value={newFrequency}
                      onChange={e => setNewFrequency(e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-stone-300"
                    >
                      <option value="yearly">Repeats Every Year</option>
                      <option value="once">One-time event</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Gift Ideas / Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Loves rose gold, perfumes"
                      value={newNotes}
                      onChange={e => setNewNotes(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
                >
                  Save Reminder
                </button>
              </form>
            )}

            {/* Reminders List */}
            <div className="space-y-3">
              {reminders.map(rem => {
                const days = calculateDaysLeft(rem.date);
                const isUrgent = days >= 0 && days <= 7;

                return (
                  <div
                    key={rem.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isUrgent
                        ? 'bg-amber-50/70 border-amber-200'
                        : 'bg-stone-50/70 border-stone-200/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif-display font-bold text-sm text-stone-900">
                          {rem.personName}'s {rem.occasion.charAt(0).toUpperCase() + rem.occasion.slice(1)}
                        </span>
                        <span className="text-[10px] bg-stone-200 text-stone-700 font-semibold px-2 py-0.5 rounded-full">
                          {rem.relationship}
                        </span>
                        {isUrgent && (
                          <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
                            In {days} {days === 1 ? 'day' : 'days'}! 🎂
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mt-1 text-xs text-stone-500">
                        <span>Date: <strong>{new Date(rem.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</strong></span>
                        <span>•</span>
                        <span>{rem.frequency === 'yearly' ? 'Annual reminder' : 'Once'}</span>
                        {rem.notes && (
                          <>
                            <span>•</span>
                            <span className="italic text-stone-600">Note: {rem.notes}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsAccountModalOpen(false);
                          openAIFinderWithPrompt(`Gift for my ${rem.relationship} ${rem.personName} for ${rem.occasion}. ${rem.notes || ''}`);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                        <span>Find a Gift</span>
                      </button>
                      <button
                        onClick={() => removeReminder(rem.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Delete reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h4 className="font-serif-display font-bold text-stone-900 text-lg">
              Order History ({orders.length})
            </h4>

            {orders.length === 0 ? (
              <div className="text-center py-16 text-stone-500 text-xs">
                No previous orders found. Place an order to see its live tracking here!
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-rose-700">{order.id}</span>
                      <span className="text-xs text-stone-500 ml-2">• Placed on {order.date}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      <span>{order.status}</span>
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto py-1">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-7 h-7 rounded object-cover" />
                        <span className="font-semibold text-stone-800 line-clamp-1">{item.product.name} (x{item.quantity})</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-stone-200/60">
                    <span className="text-stone-500">Paid via: <strong className="uppercase">{order.paymentMethod}</strong></span>
                    <span className="font-extrabold text-stone-900 text-sm">₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Gift Cards Wallet */}
        {activeTab === 'cards' && (
          <div className="space-y-4">
            <h4 className="font-serif-display font-bold text-stone-900 text-lg">
              Giftora Credits & Active Vouchers
            </h4>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex justify-between items-center shadow-lg">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300">Available Wallet Balance</span>
                <div className="font-serif-display text-3xl font-extrabold text-amber-300 mt-1">₹1,500.00</div>
                <p className="text-xs text-purple-200 mt-1">Usable instantly on any physical gift or branded voucher.</p>
              </div>
              <button
                onClick={() => showToast('Wallet credit can be applied at checkout automatically!')}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs"
              >
                Redeem Code
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <h4 className="font-serif-display font-bold text-stone-900 text-lg">
              Saved Shipping Addresses
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                <span className="font-bold text-stone-900 block text-sm">Primary Home</span>
                <p className="text-stone-600">Flat 402, Lotus Greens, 100ft Road</p>
                <p className="text-stone-600">Indiranagar, Bengaluru, Karnataka - 560038</p>
                <p className="text-stone-500 font-mono mt-1">+91 9876543210</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                <span className="font-bold text-stone-900 block text-sm">Parents' Residence</span>
                <p className="text-stone-600">B-12, Green Park Avenue</p>
                <p className="text-stone-600">New Delhi, Delhi - 110016</p>
                <p className="text-stone-500 font-mono mt-1">+91 9811223344</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Profile & Logout */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h4 className="font-serif-display font-bold text-stone-900 text-lg">
              Personal Profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block">Full Name</span>
                <span className="font-bold text-stone-800">Ananya Verma</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block">Email Address</span>
                <span className="font-bold text-stone-800">ananya.verma@example.com</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block">Phone</span>
                <span className="font-bold text-stone-800">+91 9876543210</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block">Membership Status</span>
                <span className="font-bold text-purple-700">Giftora VIP Gold</span>
              </div>
            </div>
            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  showToast('You have signed out of your demo session.');
                  setIsAccountModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
