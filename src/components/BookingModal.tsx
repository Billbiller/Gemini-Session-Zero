import React, { useState } from 'react';
import { InPersonGame } from '../types.ts';
import { X, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Sparkles, AlertCircle, Ticket } from 'lucide-react';

interface BookingModalProps {
  game: InPersonGame;
  onClose: () => void;
  onConfirmBooking: (bookingDetails: {
    playerName: string;
    characterConcept: string;
    experience: string;
    dietaryNotes: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  game,
  onClose,
  onConfirmBooking
}) => {
  const [playerName, setPlayerName] = useState('Mara Quill');
  const [characterConcept, setCharacterConcept] = useState('Arcane Trickster Rogue / Scout');
  const [experience, setExperience] = useState('Intermediate (Played 2+ campaigns)');
  const [dietaryNotes, setDietaryNotes] = useState('No peanuts');
  const [agreedSafety, setAgreedSafety] = useState(true);
  const [agreedPhysicalVenue, setAgreedPhysicalVenue] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedSafety || !agreedPhysicalVenue) return;
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmBooking({
        playerName,
        characterConcept,
        experience,
        dietaryNotes
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241934]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl border border-[#E3D9F3] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#FAF7FF] to-white border-b border-[#E3D9F3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF5D73]/15 text-[#FF5D73] flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-fraunces text-xl font-bold text-[#241934]">
                Reserve Your Table Seat
              </h3>
              <div className="font-mono text-xs text-[#7B6A93]">
                Physical Table · {game.city}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E3D9F3] hover:border-[#241934] flex items-center justify-center text-[#241934] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-fraunces text-2xl font-bold text-[#241934]">
              Seat Confirmed!
            </h3>
            <p className="text-sm text-[#4A3068] leading-relaxed max-w-sm mx-auto">
              You're officially booked for <strong className="font-semibold text-[#241934]">{game.title}</strong> at {game.venueName}. Opening your table dashboard and chat room now...
            </p>
            <div className="font-mono text-xs text-[#2EC4B6] font-semibold">
              Added to "My Active Table"
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm text-[#241934]">
            
            {/* Quick Game Summary Card */}
            <div className="p-3.5 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3] space-y-2">
              <div className="font-fraunces font-bold text-base text-[#241934]">{game.title}</div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7B6A93] font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#FF5D73]" />
                  {game.venueName} ({game.neighborhood})
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#E8A23D]" />
                  {game.nextSessionDate}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#E3D9F3]/60 text-xs">
                <span className="font-mono text-[#4A3068]">Table Seat Price:</span>
                <span className="font-fraunces font-bold text-sm text-[#241934]">
                  {game.pricePerSession === 0 ? 'FREE' : `$${game.pricePerSession} / session`}
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#7B6A93] mb-1">
                  Your Table Name / Nickname
                </label>
                <input
                  type="text"
                  required
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm text-[#241934] focus:outline-none focus:border-[#FF5D73]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#7B6A93] mb-1">
                  Character Concept or Class Preference
                </label>
                <input
                  type="text"
                  required
                  value={characterConcept}
                  onChange={(e) => setCharacterConcept(e.target.value)}
                  placeholder="e.g. Rogue, Cleric, or 'Newbie - help me pick!'"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm text-[#241934] focus:outline-none focus:border-[#FF5D73]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#7B6A93] mb-1">
                    Tabletop Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs text-[#241934] focus:outline-none focus:border-[#FF5D73]"
                  >
                    <option>First time playing tabletop RPGs</option>
                    <option>Played a few one-shots</option>
                    <option>Intermediate (Played 2+ campaigns)</option>
                    <option>Veteran / Rules Savvy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-[#7B6A93] mb-1">
                    Snack / Allergy Notes
                  </label>
                  <input
                    type="text"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    placeholder="e.g. Nut allergy, Vegetarian, None"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs text-[#241934] focus:outline-none focus:border-[#FF5D73]"
                  />
                </div>
              </div>

            </div>

            {/* In-Person Verification Checkboxes */}
            <div className="pt-3 border-t border-[#E3D9F3] space-y-2.5">
              
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedPhysicalVenue}
                  onChange={(e) => setAgreedPhysicalVenue(e.target.checked)}
                  className="mt-0.5 rounded text-[#FF5D73] focus:ring-[#FF5D73]"
                />
                <span className="text-xs text-[#4A3068] leading-snug">
                  I understand this is a <strong className="font-semibold text-[#241934]">physical in-person game</strong> in {game.city}. I will arrive on time and understand the host's exact address/room details are provided in my confirmation.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedSafety}
                  onChange={(e) => setAgreedSafety(e.target.checked)}
                  className="mt-0.5 rounded text-[#FF5D73] focus:ring-[#FF5D73]"
                />
                <span className="text-xs text-[#4A3068] leading-snug">
                  I agree to adhere to the table's safety tools (Lines & Veils, Table X-Card) and treat all players and the GM with respect.
                </span>
              </label>

            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-[#E3D9F3] text-xs font-semibold text-[#4A3068] hover:border-[#241934] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!agreedSafety || !agreedPhysicalVenue}
                className="px-6 py-2.5 rounded-full bg-[#FF5D73] text-white text-xs font-semibold hover:bg-[#E14760] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
              >
                Confirm Seat Reservation
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
