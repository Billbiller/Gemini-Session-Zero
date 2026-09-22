import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-white border-t border-[#E3D9F3] text-[#7B6A93] text-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E3D9F3]/60">
          
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FF5D73]/10 border border-[#FF5D73]/30 flex items-center justify-center text-[#FF5D73]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L21 7.5V16.5L12 22L3 16.5V7.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 2V22M3 7.5L12 12L21 7.5M3 16.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-fraunces font-bold text-base text-[#241934]">
              Session Zero
            </span>
            <span className="font-mono text-[10px] text-[#FF5D73] uppercase tracking-wider">
              · In-Person TTRPG Marketplace
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#4A3068]">
            <a href="#games" className="hover:text-[#FF5D73] transition-colors">Physical Tables</a>
            <a href="#matcher" className="hover:text-[#FF5D73] transition-colors">Party Matcher</a>
            <a href="#subs" className="hover:text-[#FF5D73] transition-colors">Rec League Subs</a>
            <a href="#ratings" className="hover:text-[#FF5D73] transition-colors">Two-Way Ratings</a>
            <a href="#pricing" className="hover:text-[#FF5D73] transition-colors">Pricing</a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#7B6A93]">
          <div>
            © {new Date().getFullYear()} Session Zero · Dedicated strictly to in-person tabletop gaming.
          </div>
          <div className="text-center sm:text-right">
            Independent community platform · Not affiliated with Wizards of the Coast, Paizo, Chaosium, or Paradox Interactive.
          </div>
        </div>
      </div>
    </footer>
  );
};
