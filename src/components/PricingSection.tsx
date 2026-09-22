import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onJoinFree: () => void;
  onStartZeroPlus: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onJoinFree,
  onStartZeroPlus
}) => {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setEmailSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-[#FAF7FF] border-b border-[#E3D9F3]" id="pricing">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Head */}
        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
            Pricing
          </div>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934] mb-2">
            Free to Find a Table. Zero+ to Run One Well.
          </h2>
          <p className="text-sm text-[#7B6A93]">
            Matchmaking, browsing physical game shops, and table chat are completely free. Zero+ is for the campaign tools that make organizing long-term in-person campaigns effortless.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          
          {/* Free Tier */}
          <div className="bg-white rounded-3xl border border-[#E3D9F3] p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-[#FF5D73] font-semibold mb-2">
                Free
              </div>
              <div className="font-fraunces text-4xl font-bold text-[#241934] mb-4">
                $0
              </div>
              <p className="text-xs text-[#7B6A93] mb-6">
                Everything you need to discover local in-person tables and start rolling physical dice with a new group.
              </p>

              <ul className="space-y-3 text-xs text-[#241934] mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                  <span>Full in-person discovery & party matcher</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                  <span>Physical table chat once matched</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                  <span>Up to 2 character profiles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                  <span>Join up to 2 active physical tables</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2EC4B6] shrink-0" />
                  <span>Participate in community sub pool</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onJoinFree}
              className="w-full py-3 rounded-full border border-[#E3D9F3] hover:border-[#241934] text-xs font-semibold text-[#241934] transition-colors cursor-pointer"
            >
              Join Free Today
            </button>
          </div>

          {/* Zero+ Tier */}
          <div className="bg-[#241934] text-white rounded-3xl border border-[#241934] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF5D73]/30 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#FFB0BB] font-semibold">
                  Zero+
                </div>
                <span className="font-mono text-[10px] bg-[#FF5D73] text-white px-2.5 py-0.5 rounded-full font-semibold">
                  FOR DEDICATED GMs & PLAYERS
                </span>
              </div>

              <div className="font-fraunces text-4xl font-bold text-white mb-4">
                $7 <span className="text-xs font-grotesk font-normal text-[#C6BBDA]">/ month</span>
              </div>
              <p className="text-xs text-[#C6BBDA] mb-6">
                Premium table organizer tools, venue scheduling, and priority discovery for serious tabletop hosts.
              </p>

              <ul className="space-y-3 text-xs text-[#FAF7FF] mb-8">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF5D73] shrink-0" />
                  <span>Everything included in Free</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF5D73] shrink-0" />
                  <span>Unlimited character profiles & active tables</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF5D73] shrink-0" />
                  <span>Automated in-person session reminders & SMS arrival alerts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF5D73] shrink-0" />
                  <span>DM dashboard & physical prop / handout resource vault</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#FF5D73] shrink-0" />
                  <span>Priority featured placement in city physical directories</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onStartZeroPlus}
              className="w-full py-3 rounded-full bg-white text-[#241934] hover:bg-[#FF5D73] hover:text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Start Zero+ Membership
            </button>
          </div>

        </div>

        {/* CTA Band */}
        <div className="mt-14 bg-[#241934] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-fraunces text-2xl sm:text-3xl font-bold text-white mb-1.5">
              Your physical table is waiting.
            </h3>
            <p className="text-xs sm:text-sm text-[#C6BBDA]">
              Join the local tabletop early access list — we're onboarding friendly local game shops city by city.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#FF5D73] w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#FF5D73] hover:bg-[#E14760] text-xs font-semibold text-white transition-colors shrink-0 w-full sm:w-auto cursor-pointer"
            >
              Get Early Access
            </button>
          </form>
        </div>

        {emailSubmitted && (
          <div className="mt-3 text-center font-mono text-xs text-[#2EC4B6]">
            You're on the early access roster — we'll notify you as new physical tables launch in your area!
          </div>
        )}

      </div>
    </section>
  );
};
