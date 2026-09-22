import React from 'react';
import { InPersonGame } from '../types.ts';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Star, 
  Users, 
  Car, 
  Navigation, 
  Accessibility, 
  Coffee, 
  Sparkles, 
  AlertCircle, 
  Store, 
  Home, 
  CheckCircle2 
} from 'lucide-react';

interface GameDetailModalProps {
  game: InPersonGame | null;
  onClose: () => void;
  onBookSeat: (game: InPersonGame) => void;
  isBooked: boolean;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onBookSeat,
  isBooked
}) => {
  if (!game) return null;

  const remainingSeats = game.totalSeats - game.bookedSeats;
  const isFull = remainingSeats <= 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#241934]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl border border-[#E3D9F3] shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Strip */}
        <div className="p-6 bg-gradient-to-r from-[#FAF7FF] to-white border-b border-[#E3D9F3] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-1">
              <span className="font-semibold text-[#FF5D73] uppercase tracking-wider">{game.system}</span>
              <span className="text-[#7B6A93]">·</span>
              <span className="text-[#4A3068]">{game.format}</span>
              <span className="text-[#7B6A93]">·</span>
              <span className="text-[#2EC4B6] font-semibold">{game.frequency}</span>
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#241934] leading-tight">
              {game.title}
            </h2>
            <div className="text-xs text-[#7B6A93] font-mono mt-1">
              Campaign: {game.campaignName}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E3D9F3] hover:border-[#241934] flex items-center justify-center text-[#241934] shrink-0 transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#241934]">
          
          {/* Top Quick Bar: Schedule, Seats, Price */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]">
            
            <div>
              <div className="text-[11px] font-mono text-[#7B6A93] uppercase font-semibold">Schedule</div>
              <div className="font-semibold text-xs text-[#241934] mt-0.5">{game.dayOfWeek}</div>
              <div className="text-[11px] font-mono text-[#7B6A93]">{game.timeSlot}</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#7B6A93] uppercase font-semibold">Next Session</div>
              <div className="font-semibold text-xs text-[#241934] mt-0.5">{game.nextSessionDate}</div>
              <div className="text-[11px] font-mono text-[#2EC4B6] font-semibold">{game.durationHours} Hours Duration</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#7B6A93] uppercase font-semibold">Seats Open</div>
              <div className={`font-semibold text-xs mt-0.5 ${isFull ? 'text-[#E14760]' : 'text-[#2EC4B6]'}`}>
                {isFull ? 'Table Full' : `${remainingSeats} Seat${remainingSeats > 1 ? 's' : ''} Open`}
              </div>
              <div className="text-[11px] font-mono text-[#7B6A93]">{game.bookedSeats} of {game.totalSeats} Filled</div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#7B6A93] uppercase font-semibold">Per Session</div>
              <div className="font-fraunces text-xl font-bold text-[#241934]">
                {game.pricePerSession === 0 ? <span className="text-[#2EC4B6]">FREE</span> : `$${game.pricePerSession}`}
              </div>
              <div className="text-[11px] font-mono text-[#7B6A93]">per player / game</div>
            </div>

          </div>

          {/* Synopsis & Vibe */}
          <div>
            <h3 className="font-fraunces text-lg font-bold text-[#241934] mb-2">
              Adventure Synopsis & Table Vibe
            </h3>
            <p className="text-[#4A3068] leading-relaxed mb-3">
              {game.synopsis}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F1EBFA] border border-[#E3D9F3] text-xs font-mono text-[#4A3068]">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A23D]" />
              <span>Table Vibe: {game.vibe}</span>
            </div>
          </div>

          {/* In-Person Physical Venue Dossier */}
          <div className="p-5 rounded-2xl bg-white border border-[#E3D9F3] space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3D9F3]/60">
              <div className="flex items-center gap-2">
                {game.venueType.includes('Store') ? (
                  <Store className="w-5 h-5 text-[#E8A23D]" />
                ) : game.venueType.includes('Cafe') ? (
                  <Coffee className="w-5 h-5 text-[#2EC4B6]" />
                ) : (
                  <Home className="w-5 h-5 text-[#FF5D73]" />
                )}
                <div>
                  <h4 className="font-fraunces font-bold text-base text-[#241934]">
                    Physical Venue: {game.venueName}
                  </h4>
                  <div className="text-xs font-mono text-[#7B6A93]">
                    {game.city} · Neighborhood: {game.neighborhood}
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#FAF7FF] text-[#4A3068] border border-[#E3D9F3]">
                {game.venueType}
              </span>
            </div>

            {/* Address Disclosure Notice */}
            <div className="p-3.5 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-start gap-3 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#2EC4B6] shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-[#241934] font-mono uppercase text-[11px] block">
                  Safe In-Person Host Address Policy
                </strong>
                <span className="text-[#7B6A93] leading-relaxed">
                  {game.addressRevealPolicy}
                </span>
              </div>
            </div>

            {/* Parking, Transit, Accessibility, Pet Notices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF7FF]">
                <Car className="w-4 h-4 text-[#7B6A93] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241934]">Parking</div>
                  <div className="text-[#7B6A93]">{game.parkingInfo}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF7FF]">
                <Navigation className="w-4 h-4 text-[#7B6A93] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241934]">Transit</div>
                  <div className="text-[#7B6A93]">{game.transitInfo}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF7FF]">
                <Accessibility className="w-4 h-4 text-[#7B6A93] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241934]">Accessibility</div>
                  <div className="text-[#7B6A93]">{game.accessibility}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF7FF]">
                <AlertCircle className="w-4 h-4 text-[#7B6A93] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#241934]">Pet & Allergy Notice</div>
                  <div className="text-[#7B6A93]">{game.petNotice}</div>
                </div>
              </div>

            </div>

            {/* Table Amenities */}
            <div>
              <div className="text-xs font-mono font-semibold uppercase text-[#7B6A93] mb-2">
                Table Equipment & Amenities Provided:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {game.tableAmenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#4A3068]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Safety Tools & Table Danger Level */}
          <div className="p-4 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-semibold uppercase text-[#7B6A93]">Safety Tools Enforced</div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {game.safetyTools.map((tool, idx) => (
                  <span key={idx} className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white text-[#4A3068] border border-[#E3D9F3]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <div className="text-xs font-mono font-semibold uppercase text-[#7B6A93]">Lethality Level</div>
              <div className="font-fraunces font-bold text-base text-[#241934] mt-0.5">
                {game.lethality}
              </div>
              <div className="text-[11px] font-mono text-[#7B6A93]">{game.experienceLevel} · {game.ageRating}</div>
            </div>
          </div>

          {/* Game Master Profile */}
          <div className="p-5 rounded-2xl bg-white border border-[#E3D9F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-fraunces font-bold text-lg shadow-sm shrink-0"
                style={{ backgroundColor: game.gm.avatarBg }}
              >
                {game.gm.avatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-fraunces font-bold text-base text-[#241934]">
                    GM {game.gm.name}
                  </h4>
                  {game.gm.verifiedInPersonHost && (
                    <span title="Verified In-Person Host">
                      <ShieldCheck className="w-4 h-4 text-[#2EC4B6]" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#7B6A93] mt-0.5">
                  <div className="flex items-center gap-0.5 text-[#E8A23D]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-[#241934]">{game.gm.rating.toFixed(2)}</span>
                  </div>
                  <span>·</span>
                  <span>{game.gm.reviewsCount} reviews</span>
                  <span>·</span>
                  <span>{game.gm.sessionsRun} physical sessions run</span>
                </div>
                <p className="text-xs text-[#4A3068] mt-2 leading-relaxed">
                  {game.gm.bio}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {game.gm.topTags.map((tag, idx) => (
                    <span key={idx} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#F1EBFA] text-[#4A3068]">
                      "{tag}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Confirmed Table Roster */}
          <div>
            <h4 className="font-fraunces text-base font-bold text-[#241934] mb-3 flex items-center justify-between">
              <span>Confirmed Table Roster ({game.bookedSeats}/{game.totalSeats})</span>
              <span className="text-xs font-mono text-[#7B6A93] font-normal">
                {isFull ? 'Roster Complete' : `${remainingSeats} Open Seat Available`}
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {game.roster.map((player, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-xs text-[#241934]">{player.characterName}</div>
                    <div className="text-[11px] font-mono text-[#7B6A93]">{player.characterClass}</div>
                  </div>
                  <div className="text-[11px] font-mono text-[#4A3068] bg-white px-2 py-0.5 rounded-md border border-[#E3D9F3]">
                    {player.playerName}
                  </div>
                </div>
              ))}
              {!isFull && Array.from({ length: remainingSeats }).map((_, idx) => (
                <div key={`open-${idx}`} className="p-3 rounded-xl border border-dashed border-[#E3D9F3] flex items-center justify-between text-[#7B6A93] bg-white">
                  <div className="text-xs font-mono">Open Seat #{game.bookedSeats + idx + 1}</div>
                  <span className="text-[11px] font-mono text-[#FF5D73] font-semibold">Available</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-white border-t border-[#E3D9F3] flex items-center justify-between gap-4">
          <div>
            <div className="font-fraunces text-2xl font-bold text-[#241934]">
              {game.pricePerSession === 0 ? <span className="text-[#2EC4B6]">FREE</span> : `$${game.pricePerSession}`}
              {game.pricePerSession > 0 && <span className="text-xs font-grotesk font-normal text-[#7B6A93]"> / session</span>}
            </div>
            <div className="text-xs text-[#7B6A93] font-mono">
              Includes table seat, loaner minis, and Session Zero prep
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-[#E3D9F3] text-sm font-semibold text-[#4A3068] hover:border-[#241934] transition-colors cursor-pointer"
            >
              Back
            </button>

            {isBooked ? (
              <button
                disabled
                className="px-6 py-2.5 rounded-full bg-[#2EC4B6] text-white text-sm font-semibold flex items-center gap-1.5 shadow-sm opacity-90 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Seat Reserved ✓</span>
              </button>
            ) : isFull ? (
              <button
                disabled
                className="px-6 py-2.5 rounded-full bg-[#E3D9F3] text-[#7B6A93] text-sm font-semibold cursor-not-allowed"
              >
                Table Full (Join Waitlist)
              </button>
            ) : (
              <button
                onClick={() => onBookSeat(game)}
                className="px-6 py-2.5 rounded-full bg-[#FF5D73] text-white text-sm font-semibold hover:bg-[#E14760] transition-all hover:-translate-y-0.5 shadow-md shadow-[#FF5D73]/30 cursor-pointer"
              >
                Book This Table Seat
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
