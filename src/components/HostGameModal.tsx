import React, { useState } from 'react';
import { InPersonGame, GameSystem, VenueType, GameFormat, LethalityLevel } from '../types.ts';
import { X, Plus, Store, Coffee, Home, ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface HostGameModalProps {
  onClose: () => void;
  onAddGame: (game: InPersonGame) => void;
}

export const HostGameModal: React.FC<HostGameModalProps> = ({
  onClose,
  onAddGame
}) => {
  const [title, setTitle] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [system, setSystem] = useState<GameSystem>('D&D 5th Edition');
  const [format, setFormat] = useState<GameFormat>('Ongoing Campaign');
  const [venueType, setVenueType] = useState<VenueType>('FLGS (Game Store)');
  const [venueName, setVenueName] = useState('Dragon\'s Lair Comics & Fantasy');
  const [city, setCity] = useState('Austin, TX');
  const [neighborhood, setNeighborhood] = useState('North Loop / Anderson Ln');
  const [dayOfWeek, setDayOfWeek] = useState('Every Saturday');
  const [timeSlot, setTimeSlot] = useState('2:00 PM – 6:00 PM CST');
  const [durationHours, setDurationHours] = useState(4);
  const [frequency, setFrequency] = useState('Weekly');
  const [nextSessionDate, setNextSessionDate] = useState('Saturday, Oct 11');
  const [totalSeats, setTotalSeats] = useState(5);
  const [pricePerSession, setPricePerSession] = useState(15);
  const [lethality, setLethality] = useState<LethalityLevel>('Moderate');
  const [experienceLevel, setExperienceLevel] = useState<'Beginner Friendly' | 'All Experience Levels' | 'Rules-Crunch / Veteran'>('All Experience Levels');
  const [synopsis, setSynopsis] = useState('');
  const [vibe, setVibe] = useState('Atmospheric · Tactical Minis · Collaborative');
  const [parkingInfo, setParkingInfo] = useState('Free plaza customer parking');
  const [petNotice, setPetNotice] = useState('Pet-free retail store');
  const [amenitiesInput, setAmenitiesInput] = useState('Miniatures provided, Dice trays, Loaner dice sets, BYOB allowed');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !synopsis.trim()) return;

    const newGame: InPersonGame = {
      id: `game-${Date.now()}`,
      title: title.trim(),
      campaignName: campaignName.trim() || title.trim(),
      system,
      format,
      synopsis: synopsis.trim(),
      vibe: vibe.trim(),
      venueType,
      venueName: venueName.trim(),
      city: city.trim(),
      neighborhood: neighborhood.trim(),
      addressRevealPolicy: venueType.includes('Store') || venueType.includes('Cafe')
        ? 'Public venue. Table reserved under GM name upon arrival.'
        : 'Exact residential address and host contact details emailed 24h prior to confirmed players.',
      parkingInfo: parkingInfo.trim(),
      transitInfo: 'Transit routes nearby within 3 blocks.',
      accessibility: 'ADA accessible gaming tables and restrooms.',
      petNotice: petNotice.trim(),
      tableAmenities: amenitiesInput.split(',').map(a => a.trim()).filter(Boolean),
      dayOfWeek,
      timeSlot,
      durationHours,
      frequency,
      nextSessionDate,
      totalSeats,
      bookedSeats: 1, // The host + 1 seat
      pricePerSession,
      safetyTools: ['Table X-Card token', 'Lines & Veils doc', 'Open Door policy'],
      lethality,
      experienceLevel,
      ageRating: '18+',
      gm: {
        id: `gm-${Date.now()}`,
        name: 'You (Verified GM)',
        avatar: 'Y',
        avatarBg: '#FF5D73',
        glyph: '⚑',
        rating: 5.0,
        reviewsCount: 1,
        sessionsRun: 12,
        badges: ['Verified In-Person Host', 'New Physical Table'],
        topTags: ['Well prepared', 'Fair rulings', 'Atmospheric terrain'],
        bio: 'Game master dedicated to running immersive physical tabletop games with high-quality tactile components.',
        verifiedInPersonHost: true
      },
      roster: [
        { playerName: 'You (GM)', characterName: 'Dungeon Master', characterClass: 'Storyteller' }
      ]
    };

    setSubmitted(true);
    setTimeout(() => {
      onAddGame(newGame);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#241934]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl border border-[#E3D9F3] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#FAF7FF] to-white border-b border-[#E3D9F3] flex items-center justify-between">
          <div>
            <div className="font-mono text-xs font-semibold text-[#FF5D73] uppercase tracking-wider mb-1">
              StartPlaying GM Host Onboarding
            </div>
            <h2 className="font-fraunces text-2xl font-bold text-[#241934]">
              List an In-Person Table
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E3D9F3] hover:border-[#241934] flex items-center justify-center text-[#241934] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-fraunces text-2xl font-bold text-[#241934]">
              Physical Table Listed!
            </h3>
            <p className="text-sm text-[#7B6A93] max-w-sm mx-auto">
              Your in-person game has been published to the directory. Local tabletop players can now discover and book seats!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-[#241934]">
            
            {/* Basic Info */}
            <div className="space-y-3">
              <h3 className="font-fraunces text-base font-bold text-[#241934] border-b border-[#E3D9F3] pb-1.5">
                1. Campaign & System
              </h3>

              <div>
                <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">
                  Adventure / Game Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dragon Heist: The Vault of Waterdeep"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm text-[#241934] focus:outline-none focus:border-[#FF5D73]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Game System</label>
                  <select
                    value={system}
                    onChange={(e) => setSystem(e.target.value as GameSystem)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  >
                    <option>D&D 5th Edition</option>
                    <option>Pathfinder 2e</option>
                    <option>Call of Cthulhu</option>
                    <option>Vampire: The Masquerade</option>
                    <option>Blades in the Dark</option>
                    <option>Shadowdark OSR</option>
                    <option>Alien RPG</option>
                    <option>System-Agnostic / Homebrew</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Format</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as GameFormat)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  >
                    <option>Ongoing Campaign</option>
                    <option>One-shot Adventure</option>
                    <option>West Marches / Drop-in</option>
                    <option>Beginner Workshop</option>
                  </select>
                </div>
              </div>
            </div>

            {/* In-Person Physical Venue */}
            <div className="space-y-3 pt-2">
              <h3 className="font-fraunces text-base font-bold text-[#241934] border-b border-[#E3D9F3] pb-1.5">
                2. In-Person Physical Venue
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Venue Type</label>
                  <select
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value as VenueType)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  >
                    <option>FLGS (Game Store)</option>
                    <option>Board Game Cafe & Pub</option>
                    <option>Host Residence (Private Home)</option>
                    <option>Community Library / Center</option>
                    <option>Dedicated Tabletop Studio</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Venue Name</label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. Mox Boarding House (Table 4)"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">City & State</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Austin, TX"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Neighborhood</label>
                  <input
                    type="text"
                    required
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="e.g. North Loop / Anderson Ln"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Parking Notes</label>
                  <input
                    type="text"
                    value={parkingInfo}
                    onChange={(e) => setParkingInfo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Pet / Allergy Notice</label>
                  <input
                    type="text"
                    value={petNotice}
                    onChange={(e) => setPetNotice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">
                  Table Equipment & Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  value={amenitiesInput}
                  onChange={(e) => setAmenitiesInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                />
              </div>
            </div>

            {/* Schedule & Pricing */}
            <div className="space-y-3 pt-2">
              <h3 className="font-fraunces text-base font-bold text-[#241934] border-b border-[#E3D9F3] pb-1.5">
                3. Schedule & Seats
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Day of Week</label>
                  <input
                    type="text"
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Next Session Date</label>
                  <input
                    type="text"
                    value={nextSessionDate}
                    onChange={(e) => setNextSessionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Max Table Seats</label>
                  <input
                    type="number"
                    min={2}
                    max={8}
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(parseInt(e.target.value, 10) || 5)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">
                    Price per Seat ($0 for Free)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={pricePerSession}
                    onChange={(e) => setPricePerSession(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Synopsis & Rules */}
            <div className="space-y-3 pt-2">
              <h3 className="font-fraunces text-base font-bold text-[#241934] border-b border-[#E3D9F3] pb-1.5">
                4. Story Synopsis & Lethality
              </h3>

              <div>
                <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Adventure Synopsis</label>
                <textarea
                  rows={3}
                  required
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder="Describe your setting, the opening hook, and what players will experience at your physical table..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Lethality Level</label>
                  <select
                    value={lethality}
                    onChange={(e) => setLethality(e.target.value as LethalityLevel)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  >
                    <option>Low-lethality (Heroic)</option>
                    <option>Moderate</option>
                    <option>High-lethality</option>
                    <option>Deadly / OSR Gritty</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  >
                    <option>Beginner Friendly</option>
                    <option>All Experience Levels</option>
                    <option>Rules-Crunch / Veteran</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-[#E3D9F3] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-[#E3D9F3] text-xs font-semibold text-[#4A3068]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#FF5D73] text-white text-xs font-semibold hover:bg-[#E14760] transition-colors shadow-sm"
              >
                Publish In-Person Table
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
