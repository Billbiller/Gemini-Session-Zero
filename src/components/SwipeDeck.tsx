import React, { useState } from 'react';
import { DeckCard } from '../types.ts';
import { Heart, X, Sparkles, MapPin, MessageSquare, Check, RotateCcw } from 'lucide-react';

interface SwipeDeckProps {
  cards: DeckCard[];
  onOpenChatWithMatch: (name: string, kind: string) => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  cards,
  onOpenChatWithMatch
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingMatch, setAnimatingMatch] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState<'left' | 'right' | null>(null);
  const [matchedCard, setMatchedCard] = useState<DeckCard | null>(null);
  const [filterMode, setFilterMode] = useState<'All' | 'Player' | 'DM' | 'Campaign'>('All');

  // Filtered cards list
  const filteredCards = cards.filter(card => {
    if (filterMode === 'All') return true;
    return card.kind === filterMode;
  });

  const activeCards = filteredCards.length > 0 ? filteredCards : cards;
  const currentCard = activeCards[currentIndex % activeCards.length];

  const handleSwipe = (isConnect: boolean) => {
    if (animatingDirection) return;

    setAnimatingDirection(isConnect ? 'right' : 'left');

    if (isConnect) {
      setAnimatingMatch(true);
      setMatchedCard(currentCard);
    }

    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % activeCards.length);
      setAnimatingDirection(null);
    }, 300);

    if (isConnect) {
      setTimeout(() => {
        setAnimatingMatch(false);
      }, 1400);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setMatchedCard(null);
  };

  // Stack of 3 visible cards
  const visibleCards = [
    activeCards[currentIndex % activeCards.length],
    activeCards[(currentIndex + 1) % activeCards.length],
    activeCards[(currentIndex + 2) % activeCards.length]
  ];

  return (
    <section className="py-12 border-b border-[#E3D9F3] bg-[#FAF7FF]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
            Party Matcher · Physical Tables Only
          </div>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934] mb-2">
            Swipe Past What's Not a Fit, Connect on What Is
          </h2>
          <p className="text-sm text-[#7B6A93]">
            Whether you need a reliable Rogue who brings snacks, a veteran DM who runs West Marches, or an in-person campaign with an open seat.
          </p>

          {/* Filter Segmented Control */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#F1EBFA] rounded-full border border-[#E3D9F3] mt-5">
            {(['All', 'Player', 'DM', 'Campaign'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  setFilterMode(mode);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${filterMode === mode ? 'bg-white text-[#241934] shadow-xs font-semibold' : 'text-[#7B6A93] hover:text-[#241934]'}`}
              >
                {mode === 'All' ? 'All Roles' : `${mode}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Deck Stage Container */}
        <div className="flex flex-col items-center justify-center">
          
          <div className="relative w-[320px] sm:w-[350px] h-[480px] flex items-center justify-center">
            
            {/* Match Flash Notification */}
            {animatingMatch && (
              <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-200">
                <div className="px-5 py-2.5 rounded-full bg-[#2EC4B6] text-white font-fraunces font-bold text-sm shadow-xl shadow-[#2EC4B6]/40 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>It's a Match — Connected!</span>
                </div>
              </div>
            )}

            {/* Render stacked cards in reverse so top card is last */}
            {visibleCards.slice().reverse().map((card, revIdx) => {
              const depth = visibleCards.length - 1 - revIdx;
              const isTop = depth === 0;

              let transform = `translateY(${depth * 14}px) scale(${1 - depth * 0.05})`;
              let opacity = depth === 2 ? 0.6 : depth === 1 ? 0.85 : 1;

              if (isTop && animatingDirection) {
                transform = animatingDirection === 'right'
                  ? 'translate(140px, -20px) rotate(14deg)'
                  : 'translate(-140px, 10px) rotate(-14deg)';
                opacity = 0;
              }

              return (
                <div
                  key={`${card.id}-${depth}`}
                  style={{
                    transform,
                    opacity,
                    zIndex: 10 - depth,
                    transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease'
                  }}
                  className="absolute top-4 w-[320px] sm:w-[340px] bg-white rounded-3xl border border-[#E3D9F3] shadow-2xl shadow-[#241934]/15 overflow-hidden select-none"
                >
                  
                  {/* Card Media Header */}
                  <div 
                    className="h-44 relative flex items-center justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${card.color1}, ${card.color2})` }}
                  >
                    <span className="text-6xl opacity-90 select-none font-serif">{card.glyph}</span>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#241934] text-xs font-mono font-medium flex items-center gap-1 shadow-xs">
                      <span className="text-[#E8A23D]">★</span>
                      <span>{card.rating}</span>
                    </div>

                    {/* Role Pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider uppercase font-semibold">
                      {card.kind}
                    </div>

                    {/* City Location Ribbon */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-mono bg-black/25 px-2 py-0.5 rounded-md text-white/90">
                      <MapPin className="w-3 h-3 text-[#FF5D73]" />
                      <span>{card.city}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col justify-between h-[280px]">
                    <div>
                      <div className="font-mono text-[10px] font-semibold tracking-wider text-[#FF5D73] uppercase mb-0.5">
                        {card.system}
                      </div>
                      <h3 className="font-fraunces text-xl font-bold text-[#241934] leading-tight mb-1">
                        {card.name}
                      </h3>
                      <p className="text-xs text-[#7B6A93] leading-relaxed mb-3">
                        {card.sub}
                      </p>
                      <p className="text-xs text-[#4A3068] line-clamp-2 leading-relaxed bg-[#FAF7FF] p-2.5 rounded-xl border border-[#E3D9F3]/60 mb-3">
                        "{card.details}"
                      </p>
                    </div>

                    {/* Tags row */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {card.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#F1EBFA] text-[#4A3068]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="text-[10px] font-mono text-[#7B6A93]">
                        Prefers: {card.preferredVenues.join(' · ')}
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}

          </div>

          {/* Action Buttons: Pass & Connect */}
          <div className="flex items-center gap-6 mt-4">
            
            <button
              onClick={() => handleSwipe(false)}
              className="w-14 h-14 rounded-full bg-white border border-[#E3D9F3] hover:border-[#7B6A93] text-[#7B6A93] hover:text-[#241934] flex items-center justify-center shadow-lg shadow-[#241934]/5 hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
              aria-label="Pass on profile"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handleReset}
              className="w-10 h-10 rounded-full bg-[#FAF7FF] border border-[#E3D9F3] text-[#7B6A93] hover:text-[#241934] flex items-center justify-center transition-colors cursor-pointer"
              title="Restart Deck"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleSwipe(true)}
              className="w-14 h-14 rounded-full bg-white border border-[#FF5D73] text-[#FF5D73] hover:bg-[#FF5D73] hover:text-white flex items-center justify-center shadow-lg shadow-[#FF5D73]/20 hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
              aria-label="Connect with profile"
            >
              <Heart className="w-6 h-6 fill-current" />
            </button>

          </div>

          {/* Matched Banner Popup */}
          {matchedCard && !animatingMatch && (
            <div className="mt-6 p-4 rounded-2xl bg-white border border-[#2EC4B6] shadow-lg max-w-md w-full flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#241934]">
                    Connected with {matchedCard.name}
                  </div>
                  <div className="text-[11px] text-[#7B6A93] font-mono">
                    Ready to invite to your in-person table!
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenChatWithMatch(matchedCard.name, matchedCard.kind)}
                className="px-3 py-1.5 rounded-full bg-[#241934] text-white text-xs font-semibold hover:bg-[#FF5D73] transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Say Hi 👋</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
