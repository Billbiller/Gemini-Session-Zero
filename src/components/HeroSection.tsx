import React from 'react';
import { MapPin, ShieldCheck, Dice5, Users, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreGames: () => void;
  onLaunchMatcher: () => void;
  onOpenHostModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGames,
  onLaunchMatcher,
  onOpenHostModal
}) => {
  return (
    <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#E3D9F3] bg-gradient-to-b from-[#FAF7FF] via-[#FAF7FF] to-[#F1EBFA]/50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Eyebrow marker */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF5D73] animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760]">
                Strictly In-Person Tabletop Gaming · 40+ Metro Areas
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold text-[#241934] leading-[1.08] tracking-tight mb-6">
              Find your <em className="italic font-normal text-[#FF5D73]">in-person party</em>,<br />
              not just another group chat.
            </h1>

            {/* Lede paragraph */}
            <p className="text-lg sm:text-xl text-[#4A3068] leading-relaxed max-w-2xl mb-8">
              Session Zero is the dedicated tabletop marketplace and matching platform for physical tabletop gaming. Book open seats with vetted Game Masters at game shops, cafes, and private tables — real dice, painted minis, zero virtual tabletops.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onExploreGames}
                className="px-6 py-3.5 rounded-full bg-[#FF5D73] text-white font-semibold text-[15px] hover:bg-[#E14760] transition-all hover:-translate-y-0.5 shadow-md shadow-[#FF5D73]/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Physical Tables</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onLaunchMatcher}
                className="px-6 py-3.5 rounded-full bg-white border border-[#E3D9F3] text-[#241934] font-semibold text-[15px] hover:border-[#241934] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#E8A23D]" />
                <span>Launch Party Matcher</span>
              </button>

              <button
                onClick={onOpenHostModal}
                className="px-5 py-3.5 rounded-full bg-transparent text-[#4A3068] font-semibold text-[14px] hover:text-[#FF5D73] transition-colors"
              >
                + Host an In-Person Game
              </button>
            </div>

            {/* Trust highlights with typographic separators */}
            <div className="flex flex-wrap items-center gap-y-2 text-xs font-mono text-[#7B6A93]">
              <span>Free to browse</span>
              <span className="mx-2 text-[#E3D9F3]">·</span>
              <span>Verified physical host addresses</span>
              <span className="mx-2 text-[#E3D9F3]">·</span>
              <span>All TTRPG systems welcome</span>
              <span className="mx-2 text-[#E3D9F3]">·</span>
              <span>Two-way session ratings</span>
            </div>
          </div>

          {/* Right Column: In-Person Physical Gaming Showcase Bento */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E3D9F3] shadow-xl shadow-[#241934]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#FF5D73]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E3D9F3] mb-5">
                <div>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF5D73]">
                    What Makes In-Person Different
                  </div>
                  <h3 className="font-fraunces text-xl font-bold text-[#241934] mt-0.5">
                    Built for the Physical Table
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center justify-center text-[#E8A23D]">
                  <Dice5 className="w-5 h-5" />
                </div>
              </div>

              {/* Bento Grid Points */}
              <div className="space-y-4 text-sm">
                
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#2EC4B6]/15 text-[#2EC4B6] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#241934] text-[14px]">
                      Vetted FLGS & Safe Private Venues
                    </div>
                    <p className="text-xs text-[#7B6A93] mt-0.5 leading-relaxed">
                      Play at game stores, board game cafes, or vetted host residences with safe 24-hour address reveal protocols and allergy notices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#E8A23D]/15 text-[#E8A23D] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#241934] text-[14px]">
                      Safety Tools & Table Etiquette
                    </div>
                    <p className="text-xs text-[#7B6A93] mt-0.5 leading-relaxed">
                      Every in-person table adheres to standardized safety tools: Lines & Veils, Table X-Card, and transparent lethality disclosure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5D73]/15 text-[#FF5D73] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#241934] text-[14px]">
                      TTRPG Rec League Substitute Pool
                    </div>
                    <p className="text-xs text-[#7B6A93] mt-0.5 leading-relaxed">
                      Can't make next session? Loan out your character with strict guardrails or step in as a guest player so tables never cancel.
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom live stats ticker */}
              <div className="mt-5 pt-4 border-t border-[#E3D9F3] flex items-center justify-between text-xs text-[#4A3068]">
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#2EC4B6]" />
                  <span>142 Active In-Person Tables This Week</span>
                </div>
                <button 
                  onClick={onExploreGames}
                  className="font-semibold text-[#FF5D73] hover:underline font-mono text-xs cursor-pointer"
                >
                  View Tables →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
