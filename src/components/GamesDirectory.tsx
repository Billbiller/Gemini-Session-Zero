import React, { useState, useMemo } from 'react';
import { InPersonGame, GameSystem, VenueType } from '../types.ts';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Coffee, 
  Store, 
  Home, 
  Filter, 
  X,
  Compass
} from 'lucide-react';

interface GamesDirectoryProps {
  games: InPersonGame[];
  onSelectGame: (game: InPersonGame) => void;
  onOpenHostModal: () => void;
}

export const GamesDirectory: React.FC<GamesDirectoryProps> = ({
  games,
  onSelectGame,
  onOpenHostModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string>('All');
  const [selectedVenueType, setSelectedVenueType] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [selectedLethality, setSelectedLethality] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'venues'>('cards');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Available cities from games
  const cities = useMemo(() => {
    const list = Array.from(new Set(games.map(g => g.city)));
    return ['All', ...list];
  }, [games]);

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(q);
        const matchesSystem = game.system.toLowerCase().includes(q);
        const matchesVenue = game.venueName.toLowerCase().includes(q);
        const matchesCity = game.city.toLowerCase().includes(q);
        const matchesGM = game.gm.name.toLowerCase().includes(q);
        const matchesVibe = game.vibe.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSystem && !matchesVenue && !matchesCity && !matchesGM && !matchesVibe) {
          return false;
        }
      }

      // System
      if (selectedSystem !== 'All' && game.system !== selectedSystem) return false;

      // Venue Type
      if (selectedVenueType !== 'All' && game.venueType !== selectedVenueType) return false;

      // City
      if (selectedCity !== 'All' && game.city !== selectedCity) return false;

      // Format
      if (selectedFormat !== 'All' && game.format !== selectedFormat) return false;

      // Price
      if (selectedPrice === 'Free' && game.pricePerSession !== 0) return false;
      if (selectedPrice === 'Under $20' && (game.pricePerSession === 0 || game.pricePerSession >= 20)) return false;
      if (selectedPrice === '$20+' && game.pricePerSession < 20) return false;

      // Lethality
      if (selectedLethality !== 'All' && !game.lethality.toLowerCase().includes(selectedLethality.toLowerCase())) return false;

      return true;
    });
  }, [games, searchQuery, selectedSystem, selectedVenueType, selectedCity, selectedFormat, selectedPrice, selectedLethality]);

  const activeFilterCount = (selectedSystem !== 'All' ? 1 : 0) +
    (selectedVenueType !== 'All' ? 1 : 0) +
    (selectedCity !== 'All' ? 1 : 0) +
    (selectedFormat !== 'All' ? 1 : 0) +
    (selectedPrice !== 'All' ? 1 : 0) +
    (selectedLethality !== 'All' ? 1 : 0);

  const resetFilters = () => {
    setSelectedSystem('All');
    setSelectedVenueType('All');
    setSelectedCity('All');
    setSelectedFormat('All');
    setSelectedPrice('All');
    setSelectedLethality('All');
    setSearchQuery('');
  };

  return (
    <div className="py-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Directory Title & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E3D9F3]">
        <div>
          <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
            Physical Table Directory · StartPlaying Model
          </div>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934]">
            Browse In-Person Tables
          </h2>
          <p className="text-sm text-[#7B6A93] mt-1 max-w-xl">
            Reserved table seats with vetted Game Masters. All games meet in physical rooms with tactile terrain, loaner dice, and clear safety rules.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F1EBFA] rounded-xl border border-[#E3D9F3] self-start md:self-end">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer ${viewMode === 'cards' ? 'bg-white text-[#241934] shadow-xs' : 'text-[#7B6A93] hover:text-[#241934]'}`}
          >
            Table Cards ({filteredGames.length})
          </button>
          <button
            onClick={() => setViewMode('venues')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer ${viewMode === 'venues' ? 'bg-white text-[#241934] shadow-xs' : 'text-[#7B6A93] hover:text-[#241934]'}`}
          >
            Venue Guide & Map
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-6 space-y-4">
        
        {/* Search Input Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7B6A93] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by campaign title, D&D 5e, GM name, venue, or neighborhood..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E3D9F3] text-sm text-[#241934] placeholder-[#7B6A93] focus:outline-none focus:border-[#FF5D73] shadow-xs transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7B6A93] hover:text-[#241934]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-[#E3D9F3] text-sm font-semibold text-[#4A3068]"
          >
            <Filter className="w-4 h-4" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>
        </div>

        {/* Filter Pills (Desktop & Expanded Mobile) */}
        <div className={`space-y-3 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
          
          {/* Row 1: System & Venue Type */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#7B6A93] uppercase font-semibold mr-1 shrink-0">System:</span>
            {['All', 'D&D 5th Edition', 'Pathfinder 2e', 'Call of Cthulhu', 'Vampire: The Masquerade', 'Shadowdark OSR', 'System-Agnostic / Homebrew'].map(sys => (
              <button
                key={sys}
                onClick={() => setSelectedSystem(sys)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${selectedSystem === sys ? 'bg-[#241934] text-white' : 'bg-white text-[#4A3068] border border-[#E3D9F3] hover:border-[#241934]'}`}
              >
                {sys === 'System-Agnostic / Homebrew' ? 'Homebrew' : sys}
              </button>
            ))}
          </div>

          {/* Row 2: Venue Type, City, Price */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E3D9F3]/60">
            <span className="font-mono text-xs text-[#7B6A93] uppercase font-semibold mr-1 shrink-0">Venue:</span>
            {['All', 'FLGS (Game Store)', 'Board Game Cafe & Pub', 'Host Residence (Private Home)', 'Dedicated Tabletop Studio'].map(vt => (
              <button
                key={vt}
                onClick={() => setSelectedVenueType(vt)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${selectedVenueType === vt ? 'bg-[#FF5D73] text-white' : 'bg-white text-[#4A3068] border border-[#E3D9F3] hover:border-[#FF5D73]'}`}
              >
                {vt.replace(' (Private Home)', '').replace(' & Pub', '').replace(' (Game Store)', '')}
              </button>
            ))}

            <div className="h-4 w-px bg-[#E3D9F3] mx-1 hidden md:block" />

            <span className="font-mono text-xs text-[#7B6A93] uppercase font-semibold mr-1 shrink-0">City:</span>
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${selectedCity === c ? 'bg-[#2EC4B6] text-white' : 'bg-white text-[#4A3068] border border-[#E3D9F3] hover:border-[#2EC4B6]'}`}
              >
                {c}
              </button>
            ))}

            <div className="h-4 w-px bg-[#E3D9F3] mx-1 hidden md:block" />

            <span className="font-mono text-xs text-[#7B6A93] uppercase font-semibold mr-1 shrink-0">Price:</span>
            {['All', 'Free', 'Under $20', '$20+'].map(p => (
              <button
                key={p}
                onClick={() => setSelectedPrice(p)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${selectedPrice === p ? 'bg-[#E8A23D] text-white' : 'bg-white text-[#4A3068] border border-[#E3D9F3] hover:border-[#E8A23D]'}`}
              >
                {p}
              </button>
            ))}

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs font-mono text-[#E14760] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Reset filters
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Main Content Area */}
      {viewMode === 'cards' ? (
        <div className="mt-8">
          
          {filteredGames.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#E3D9F3]">
              <Compass className="w-12 h-12 text-[#7B6A93] mx-auto mb-3 opacity-60" />
              <h3 className="font-fraunces text-xl font-bold text-[#241934] mb-1">
                No matching physical tables found
              </h3>
              <p className="text-sm text-[#7B6A93] max-w-md mx-auto mb-5">
                We couldn't find in-person tables matching your current criteria. Try loosening your filters or host your own physical table.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-full border border-[#E3D9F3] text-sm font-semibold text-[#241934] hover:bg-[#FAF7FF] cursor-pointer"
                >
                  Clear Filters
                </button>
                <button
                  onClick={onOpenHostModal}
                  className="px-4 py-2 rounded-full bg-[#FF5D73] text-white text-sm font-semibold hover:bg-[#E14760] cursor-pointer"
                >
                  + Host This Game
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => {
                const remainingSeats = game.totalSeats - game.bookedSeats;
                const isFull = remainingSeats <= 0;

                return (
                  <div
                    key={game.id}
                    onClick={() => onSelectGame(game)}
                    className="group bg-white rounded-3xl border border-[#E3D9F3] hover:border-[#241934] transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl shadow-[#241934]/5 overflow-hidden flex flex-col cursor-pointer"
                  >
                    
                    {/* Card Top Strip: Physical Venue & Price */}
                    <div className="p-5 pb-4 bg-gradient-to-b from-[#FAF7FF] to-white border-b border-[#E3D9F3]/60 flex items-start justify-between gap-3">
                      <div>
                        {/* System Tag */}
                        <div className="font-mono text-xs font-semibold text-[#FF5D73] uppercase tracking-wider mb-1">
                          {game.system} · {game.format}
                        </div>
                        {/* Physical Venue name */}
                        <div className="flex items-center gap-1.5 text-xs text-[#241934] font-medium">
                          {game.venueType.includes('Store') ? (
                            <Store className="w-3.5 h-3.5 text-[#E8A23D] shrink-0" />
                          ) : game.venueType.includes('Cafe') ? (
                            <Coffee className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0" />
                          ) : (
                            <Home className="w-3.5 h-3.5 text-[#4A3068] shrink-0" />
                          )}
                          <span className="font-semibold truncate max-w-[200px]">{game.venueName}</span>
                        </div>
                        {/* City & Neighborhood */}
                        <div className="flex items-center gap-1 text-[11px] text-[#7B6A93] mt-0.5 font-mono">
                          <MapPin className="w-3 h-3 text-[#FF5D73]" />
                          <span>{game.city} ({game.neighborhood})</span>
                        </div>
                      </div>

                      {/* Price Badge */}
                      <div className="text-right shrink-0">
                        <div className="font-fraunces text-xl font-bold text-[#241934]">
                          {game.pricePerSession === 0 ? (
                            <span className="text-[#2EC4B6]">FREE</span>
                          ) : (
                            `$${game.pricePerSession}`
                          )}
                        </div>
                        {game.pricePerSession > 0 && (
                          <div className="text-[10px] font-mono text-[#7B6A93]">per seat / session</div>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-fraunces text-lg font-bold text-[#241934] group-hover:text-[#FF5D73] transition-colors leading-snug line-clamp-2 mb-2">
                          {game.title}
                        </h3>
                        <p className="text-xs text-[#7B6A93] line-clamp-2 leading-relaxed mb-4">
                          {game.synopsis}
                        </p>

                        {/* In-Person Table Amenities Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {game.tableAmenities.slice(0, 2).map((amenity, idx) => (
                            <span
                              key={idx}
                              className="font-mono text-[10px] bg-[#FAF7FF] text-[#4A3068] px-2.5 py-1 rounded-md border border-[#E3D9F3]"
                            >
                              ✓ {amenity}
                            </span>
                          ))}
                          {game.tableAmenities.length > 2 && (
                            <span className="font-mono text-[10px] text-[#7B6A93] self-center">
                              +{game.tableAmenities.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Schedule & Seats details */}
                      <div className="pt-3 border-t border-[#E3D9F3]/60 space-y-2">
                        
                        {/* Day & Time */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-[#4A3068] font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#7B6A93]" />
                            <span>{game.dayOfWeek}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#7B6A93] font-mono text-[11px]">
                            <Clock className="w-3 h-3" />
                            <span>{game.timeSlot.split('–')[0]}</span>
                          </div>
                        </div>

                        {/* Seat Availability Meter */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#7B6A93]" />
                            <span className={`font-mono font-semibold ${isFull ? 'text-[#E14760]' : remainingSeats === 1 ? 'text-[#E8A23D]' : 'text-[#2EC4B6]'}`}>
                              {isFull ? 'Table Full' : `${remainingSeats} Seat${remainingSeats > 1 ? 's' : ''} Open`}
                            </span>
                            <span className="text-[#7B6A93] text-[11px] font-mono">
                              ({game.bookedSeats}/{game.totalSeats})
                            </span>
                          </div>
                          
                          <span className="font-mono text-[11px] text-[#7B6A93]">
                            {game.lethality.split(' ')[0]} Danger
                          </span>
                        </div>

                      </div>

                    </div>

                    {/* Card Footer: GM Profile & CTA */}
                    <div className="px-5 py-3.5 bg-[#FAF7FF] border-t border-[#E3D9F3] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-fraunces font-bold text-xs shadow-xs"
                          style={{ backgroundColor: game.gm.avatarBg }}
                        >
                          {game.gm.avatar}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#241934] leading-none flex items-center gap-1">
                            <span>GM {game.gm.name.split(' ')[0]}</span>
                            {game.gm.verifiedInPersonHost && (
                              <span title="Verified In-Person Host">
                                <ShieldCheck className="w-3 h-3 text-[#2EC4B6]" />
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-mono text-[#7B6A93] mt-0.5">
                            <Star className="w-3 h-3 fill-[#E8A23D] text-[#E8A23D]" />
                            <span>{game.gm.rating.toFixed(2)}</span>
                            <span>({game.gm.reviewsCount})</span>
                          </div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF5D73] group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      ) : (
        /* Venue Guide & Physical Map Directory */
        <div className="mt-8 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-[#E3D9F3]">
            <div className="max-w-2xl mb-6">
              <h3 className="font-fraunces text-2xl font-bold text-[#241934] mb-1">
                In-Person Venue Standards & Host Verification
              </h3>
              <p className="text-sm text-[#7B6A93] leading-relaxed">
                Unlike online games, in-person tabletop gaming requires real physical spaces that are welcoming, well-lit, accessible, and safe. Every venue on Session Zero operates under strict community guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]">
                <div className="w-10 h-10 rounded-xl bg-[#E8A23D]/15 text-[#E8A23D] flex items-center justify-center mb-3">
                  <Store className="w-5 h-5" />
                </div>
                <h4 className="font-fraunces text-base font-bold text-[#241934] mb-1">
                  FLGS & Game Stores
                </h4>
                <p className="text-xs text-[#7B6A93] leading-relaxed mb-3">
                  Public, verified game shoppes with dedicated RPG spaces. Free parking, open community tables, and support for your local friendly brick-and-mortar game retailer.
                </p>
                <div className="font-mono text-[11px] text-[#2EC4B6] font-semibold">
                  100% Public Access · No Address Reveal Delay
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]">
                <div className="w-10 h-10 rounded-xl bg-[#2EC4B6]/15 text-[#2EC4B6] flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="font-fraunces text-base font-bold text-[#241934] mb-1">
                  Board Game Cafes & Pubs
                </h4>
                <p className="text-xs text-[#7B6A93] leading-relaxed mb-3">
                  Cozy venues with table food service, artisanal espresso, craft beer, and large felted gaming tables. Private mezzanine or guild rooms reserved for Session Zero tables.
                </p>
                <div className="font-mono text-[11px] text-[#2EC4B6] font-semibold">
                  Food & Drink Menus · Private Guild Rooms
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]">
                <div className="w-10 h-10 rounded-xl bg-[#FF5D73]/15 text-[#FF5D73] flex items-center justify-center mb-3">
                  <Home className="w-5 h-5" />
                </div>
                <h4 className="font-fraunces text-base font-bold text-[#241934] mb-1">
                  Vetted Private Hosts & Studios
                </h4>
                <p className="text-xs text-[#7B6A93] leading-relaxed mb-3">
                  Dedicated dining room tables, attic lofts, and recording studios. Strict safety protocol: cross-streets published publicly, exact address and entry code released 24h prior.
                </p>
                <div className="font-mono text-[11px] text-[#FF5D73] font-semibold">
                  24h Safe Address Reveal Protocol · Pet & Allergy Notes
                </div>
              </div>

            </div>
          </div>

          {/* Active Venues List */}
          <div className="bg-white rounded-3xl border border-[#E3D9F3] p-6">
            <h4 className="font-fraunces text-lg font-bold text-[#241934] mb-4">
              Featured In-Person Venues Currently Hosting Active Tables
            </h4>
            <div className="divide-y divide-[#E3D9F3]/60">
              {games.map(game => (
                <div key={game.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-fraunces font-bold text-base text-[#241934]">
                        {game.venueName}
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-[#FAF7FF] text-[#4A3068] border border-[#E3D9F3]">
                        {game.venueType}
                      </span>
                    </div>
                    <div className="text-xs text-[#7B6A93] font-mono mt-1">
                      {game.city} · {game.neighborhood} · {game.parkingInfo}
                    </div>
                    <div className="text-xs text-[#4A3068] mt-1">
                      Hosting: <strong className="font-semibold">{game.title}</strong> with GM {game.gm.name}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectGame(game)}
                    className="px-4 py-2 rounded-full border border-[#E3D9F3] text-xs font-semibold text-[#241934] hover:border-[#241934] self-start sm:self-center transition-colors cursor-pointer"
                  >
                    View Table Details →
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
