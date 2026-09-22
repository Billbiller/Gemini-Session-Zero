import React, { useState } from 'react';
import { InPersonGame, ChatMessage } from '../types.ts';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Car, 
  Coffee, 
  Users, 
  FileText, 
  Sparkles,
  Dice5,
  AlertCircle
} from 'lucide-react';

interface SessionZeroTableHubProps {
  game: InPersonGame;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onExploreMore: () => void;
}

export const SessionZeroTableHub: React.FC<SessionZeroTableHubProps> = ({
  game,
  messages,
  onSendMessage,
  onExploreMore
}) => {
  const [inputText, setInputText] = useState('');
  const [checkedSafety, setCheckedSafety] = useState<Record<string, boolean>>({
    'x-card': true,
    'lines-veils': true,
    'open-door': true,
    'punctuality': true
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const toggleSafety = (key: string) => {
    setCheckedSafety(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="py-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#241934] via-[#4A3068] to-[#241934] text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#2EC4B6] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
            <span>Active Confirmed Table Room · In-Person Session Zero</span>
          </div>
          <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-white mb-1">
            {game.title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#C6BBDA] font-mono">
            <span className="flex items-center gap-1 text-[#FF5D73]">
              <MapPin className="w-3.5 h-3.5" />
              {game.venueName} ({game.city})
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#E8A23D]" />
              {game.nextSessionDate}
            </span>
            <span>·</span>
            <span className="text-white font-semibold">{game.timeSlot}</span>
          </div>
        </div>

        <button
          onClick={onExploreMore}
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono font-semibold transition-colors self-start md:self-center shrink-0 cursor-pointer"
        >
          Browse Other Tables →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Physical Venue Briefing & Safety Tools */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Confirmed In-Person Arrival Pass */}
          <div className="bg-white rounded-3xl border border-[#2EC4B6] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3D9F3]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2EC4B6]/15 text-[#2EC4B6] flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <div className="font-fraunces font-bold text-base text-[#241934]">
                    Physical Arrival Pass
                  </div>
                  <div className="text-[11px] font-mono text-[#7B6A93]">
                    Verified Seat Reserved
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#E9F7F5] text-[#1B8579] font-semibold">
                CONFIRMED
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-[#241934]">
              <div className="p-3 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3]">
                <strong className="font-mono uppercase text-[10px] text-[#7B6A93] block mb-0.5">
                  Exact Table Location
                </strong>
                <span className="font-semibold text-sm text-[#241934] block">
                  {game.venueName}
                </span>
                <span className="text-[#4A3068]">
                  9012 Research Blvd, Austin, TX 78758 · Tell host desk: "Theo's Barovian Guild Room"
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3]">
                  <div className="font-mono text-[10px] text-[#7B6A93] uppercase font-semibold">Parking</div>
                  <div className="text-[#4A3068] mt-0.5">{game.parkingInfo}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3]">
                  <div className="font-mono text-[10px] text-[#7B6A93] uppercase font-semibold">Host Supplies</div>
                  <div className="text-[#4A3068] mt-0.5">Minis, terrain, loaner dice</div>
                </div>
              </div>
            </div>

            {/* What to Bring Checklist */}
            <div>
              <div className="font-mono text-[11px] uppercase font-semibold text-[#7B6A93] mb-2">
                What to Bring to the Physical Table:
              </div>
              <ul className="space-y-1.5 text-xs text-[#4A3068]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0" />
                  <span>Pencil, eraser, and character notebook</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0" />
                  <span>Character backstory concept (or level 1 draft)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0" />
                  <span>Optional snack or beverage for the table pool</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Session Zero Safety Agreement */}
          <div className="bg-white rounded-3xl border border-[#E3D9F3] p-6 shadow-sm">
            <h4 className="font-fraunces font-bold text-base text-[#241934] mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF5D73]" />
              <span>Session Zero Safety Tools</span>
            </h4>
            <p className="text-xs text-[#7B6A93] mb-4">
              All players agree to these standardized safety tools before dice are rolled:
            </p>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF7FF] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedSafety['lines-veils']}
                  onChange={() => toggleSafety('lines-veils')}
                  className="mt-0.5 text-[#FF5D73] rounded focus:ring-[#FF5D73]"
                />
                <div>
                  <span className="font-semibold text-[#241934]">Lines & Veils Document</span>
                  <p className="text-[#7B6A93] text-[11px]">Hard limits (lines) and fade-to-black content (veils) submitted confidentially to GM.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF7FF] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedSafety['x-card']}
                  onChange={() => toggleSafety('x-card')}
                  className="mt-0.5 text-[#FF5D73] rounded focus:ring-[#FF5D73]"
                />
                <div>
                  <span className="font-semibold text-[#241934]">Physical Table X-Card</span>
                  <p className="text-[#7B6A93] text-[11px]">Tap the physical card on the table at any point to redact or pivot uncomfortable content with zero questions asked.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#FAF7FF] cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedSafety['open-door']}
                  onChange={() => toggleSafety('open-door')}
                  className="mt-0.5 text-[#FF5D73] rounded focus:ring-[#FF5D73]"
                />
                <div>
                  <span className="font-semibold text-[#241934]">Open Door Policy</span>
                  <p className="text-[#7B6A93] text-[11px]">Step away for water, air, or personal breaks whenever needed without judgment.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Table Roster */}
          <div className="bg-white rounded-3xl border border-[#E3D9F3] p-6 shadow-sm">
            <h4 className="font-fraunces font-bold text-base text-[#241934] mb-3 flex items-center justify-between">
              <span>Table Roster ({game.roster.length} Players + GM)</span>
              <span className="font-mono text-xs text-[#2EC4B6] font-normal">Active</span>
            </h4>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E8A23D] text-white flex items-center justify-center font-bold text-[10px]">
                    T
                  </div>
                  <span className="font-semibold text-[#241934]">{game.gm.name} (Game Master)</span>
                </div>
                <span className="font-mono text-[10px] text-[#E8A23D] font-semibold">GM Host</span>
              </div>

              {game.roster.map((player, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#E3D9F3] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FF5D73]/20 text-[#FF5D73] flex items-center justify-center font-bold text-[10px]">
                      {player.playerName[0]}
                    </div>
                    <div>
                      <span className="font-semibold text-[#241934]">{player.characterName}</span>
                      <span className="text-[#7B6A93] text-[11px] block">{player.characterClass}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#7B6A93]">{player.playerName}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Table Chat */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-[#E3D9F3] shadow-xl shadow-[#241934]/5 flex flex-col h-[640px] overflow-hidden">
            
            {/* Chat Top Bar */}
            <div className="p-4 bg-[#FAF7FF] border-b border-[#E3D9F3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#2EC4B6]" />
                <div>
                  <h4 className="font-fraunces font-bold text-sm text-[#241934]">
                    Table Chat: {game.campaignName}
                  </h4>
                  <div className="text-[11px] font-mono text-[#7B6A93]">
                    Physical session prep & coordination
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#7B6A93] px-2.5 py-0.5 rounded-full bg-white border border-[#E3D9F3]">
                {messages.length} Messages
              </span>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
              {messages.map(msg => {
                const isGM = msg.senderRole === 'DM';
                return (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-fraunces font-bold text-xs shrink-0 shadow-xs"
                      style={{ backgroundColor: msg.avatarBg }}
                    >
                      {msg.initial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-semibold text-[#241934]">
                          {msg.sender}
                        </span>
                        {isGM && (
                          <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-sm bg-[#E8A23D]/20 text-[#E8A23D] font-bold uppercase">
                            GM
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-[#7B6A93]">
                          {msg.timestamp}
                        </span>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3]/80 text-[#4A3068] text-xs leading-relaxed max-w-xl">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-[#E3D9F3] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message your physical table party (snack plans, ride share, character questions)..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF7FF] border border-[#E3D9F3] text-xs text-[#241934] focus:outline-none focus:border-[#FF5D73]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-full bg-[#FF5D73] hover:bg-[#E14760] disabled:opacity-40 disabled:hover:bg-[#FF5D73] text-white flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
