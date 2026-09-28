import React from 'react';
import { Calendar, Sparkles, Plus, Bell, ArrowRight } from 'lucide-react';
import { useGiftora } from '../context/GiftoraContext';

export const GiftReminderBanner: React.FC = () => {
  const { reminders, openAIFinderWithPrompt, setIsAccountModalOpen } = useGiftora();

  const calculateDaysLeft = (targetDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);

    const diffMs = target.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  // Sort reminders by closest date
  const sorted = [...reminders].map(r => ({ ...r, days: calculateDaysLeft(r.date) }))
    .filter(r => r.days >= 0)
    .sort((a, b) => a.days - b.days);

  const nearest = sorted[0];

  return (
    <section className="py-8 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 border-y border-rose-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Highlight Notification Card */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-500/20">
              <Bell className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                  Upcoming Celebration
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  Gift Reminder Assistant
                </span>
              </div>
              <h3 className="font-serif-display font-bold text-lg sm:text-xl text-stone-900 mt-0.5">
                {nearest ? (
                  <>
                    <span>{nearest.personName}'s {nearest.occasion.charAt(0).toUpperCase() + nearest.occasion.slice(1)}</span>{' '}
                    <span className="text-rose-600 font-extrabold underline decoration-rose-300">
                      is in {nearest.days === 0 ? 'today' : `${nearest.days} days`} 🎂
                    </span>
                  </>
                ) : (
                  <span>Keep track of loved ones' birthdays & anniversaries</span>
                )}
              </h3>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            {nearest && (
              <button
                onClick={() =>
                  openAIFinderWithPrompt(
                    `I need a birthday gift for ${nearest.personName} (${nearest.relationship}). ${nearest.notes || ''}`
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Find a Gift for {nearest.personName.split(' ')[0]}</span>
              </button>
            )}

            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-stone-700 hover:text-rose-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>Manage Reminders ({reminders.length})</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
