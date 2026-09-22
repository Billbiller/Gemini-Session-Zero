import React, { useState } from 'react';
import { LegacyEntry } from '../types.ts';
import { Plus, Skull, Shield, Award } from 'lucide-react';

interface LegaciesSectionProps {
  legacies: LegacyEntry[];
  onAddLegacy: (entry: LegacyEntry) => void;
}

export const LegaciesSection: React.FC<LegaciesSectionProps> = ({
  legacies,
  onAddLegacy
}) => {
  const [selectedLethality, setSelectedLethality] = useState('Moderate');
  const [showAddModal, setShowAddModal] = useState(false);
  const [charName, setCharName] = useState('');
  const [charStatus, setCharStatus] = useState<'fallen' | 'retired' | 'active'>('fallen');
  const [campaign, setCampaign] = useState('The Sunken Archive');
  const [sessionInfo, setSessionInfo] = useState('Session 14 · Austin Table');
  const [quote, setQuote] = useState('');
  const [system, setSystem] = useState('D&D 5e');

  const lethalityDescriptions: Record<string, string> = {
    'Low-lethality': 'Heroic storytelling. Death only occurs with player consent during climactic narrative milestones.',
    'Moderate': 'Standard balance. Combat has real stakes, resurrection requires rare quest items or divine favors.',
    'High-lethality': 'Dangerous encounters. Tactical positioning and preparation matter. Character death is always on the table.',
    'Deadly / OSR': 'Gritty old-school survival. Traps are fatal, monsters fight unfair. Keep backup character index cards ready!'
  };

  const handleCreateLegacy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName.trim()) return;

    const newEntry: LegacyEntry = {
      id: `leg-${Date.now()}`,
      characterName: charName.trim(),
      status: charStatus,
      campaign,
      sessionInfo,
      quote: quote.trim() || (charStatus === 'fallen' ? 'Fell honorably guarding the flank.' : 'Retired to open an apothecary in town.'),
      system,
      glyph: charStatus === 'fallen' ? '⚰️' : charStatus === 'retired' ? '🏰' : '🔥',
      glyphBg: charStatus === 'fallen' ? '#F5E9EE' : charStatus === 'retired' ? '#FBF0DD' : '#E9F7F5'
    };

    onAddLegacy(newEntry);
    setShowAddModal(false);
    setCharName('');
    setQuote('');
  };

  return (
    <section className="py-14 border-b border-[#E3D9F3] bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Head */}
        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
            Character Legacies & Chronicle
          </div>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934] mb-2">
            A Character's Last Line Matters as Much as Their First
          </h2>
          <p className="text-sm text-[#7B6A93] leading-relaxed">
            When a character falls or a long physical campaign wraps, that's not a deleted sheet — it's the memorable conclusion of an in-person chapter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Character Graveyard & Hall of Fame Cards */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="flex items-center justify-between pb-2">
              <span className="font-mono text-xs font-semibold text-[#7B6A93] uppercase">
                Campaign Legacy Roster ({legacies.length})
              </span>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs font-mono text-[#FF5D73] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Character Legacy</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {legacies.map(item => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#FAF7FF] border border-[#E3D9F3] flex gap-4 items-start shadow-xs hover:border-[#241934] transition-colors"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-xs"
                    style={{ backgroundColor: item.glyphBg }}
                  >
                    {item.glyph}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap mb-1">
                      <h3 className="font-fraunces font-bold text-base text-[#241934]">
                        {item.characterName}
                      </h3>
                      <span className={`font-mono text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full ${item.status === 'fallen' ? 'bg-[#F5E9EE] text-[#9C4A63]' : item.status === 'retired' ? 'bg-[#FBF0DD] text-[#9A6414]' : 'bg-[#E9F7F5] text-[#1B8579]'}`}>
                        {item.status === 'fallen' ? 'Fallen' : item.status === 'retired' ? 'Retired' : 'Still Adventuring'}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] text-[#7B6A93] mb-2">
                      {item.campaign.toUpperCase()} · {item.sessionInfo.toUpperCase()}
                    </div>

                    <p className="text-xs text-[#4A3068] italic leading-relaxed">
                      {item.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Campaign Chronicle Widget */}
          <div className="lg:col-span-6">
            <div className="bg-[#241934] text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#FF5D73]/20 to-transparent rounded-bl-full pointer-events-none" />

              <div className="font-mono text-xs uppercase tracking-wider text-[#C6BBDA] mb-1">
                Campaign Chronicle
              </div>
              <h3 className="font-fraunces text-2xl font-bold text-white mb-6">
                The Sunken Archive (In-Person Austin Table)
              </h3>

              {/* Statistics Grid */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div>
                  <div className="font-fraunces text-3xl font-bold text-white">14</div>
                  <div className="font-mono text-[10px] text-[#B5A8CC] uppercase mt-1 leading-tight">
                    Passed Through
                  </div>
                </div>
                <div>
                  <div className="font-fraunces text-3xl font-bold text-[#E88AA0]">4</div>
                  <div className="font-mono text-[10px] text-[#B5A8CC] uppercase mt-1 leading-tight">
                    Fallen
                  </div>
                </div>
                <div>
                  <div className="font-fraunces text-3xl font-bold text-[#E8A23D]">3</div>
                  <div className="font-mono text-[10px] text-[#B5A8CC] uppercase mt-1 leading-tight">
                    Retired
                  </div>
                </div>
                <div>
                  <div className="font-fraunces text-3xl font-bold text-[#2EC4B6]">7</div>
                  <div className="font-mono text-[10px] text-[#B5A8CC] uppercase mt-1 leading-tight">
                    Adventuring
                  </div>
                </div>
              </div>

              {/* Multi-segment distribution line */}
              <div className="h-2.5 w-full rounded-full overflow-hidden flex border border-white/10 mb-6">
                <div style={{ width: '28.5%' }} className="bg-[#E88AA0]" title="Fallen (28.5%)" />
                <div style={{ width: '21.5%' }} className="bg-[#E8A23D]" title="Retired (21.5%)" />
                <div style={{ width: '50.0%' }} className="bg-[#2EC4B6]" title="Still Active (50%)" />
              </div>

              <div className="pt-5 border-t border-white/15">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#B5A8CC] mb-2.5">
                  Campaign Danger Level — Set by GM Theo
                </div>

                {/* Interactive Lethality Selector */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {['Low-lethality', 'Moderate', 'High-lethality', 'Deadly / OSR'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedLethality(level)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${selectedLethality === level ? 'bg-[#FF5D73] text-white font-semibold' : 'bg-white/10 text-[#E5DEF0] hover:bg-white/20'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#B5A8CC] leading-relaxed mb-4">
                  {lethalityDescriptions[selectedLethality]}
                </p>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#C6BBDA] font-mono leading-relaxed">
                  Notice: High-lethality tables aren't "worse" tables; they're a deliberate tone choice. Session Zero ensures all players know the stakes before rolling their first physical d20.
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Modal: Add Character Legacy */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-[#241934]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#E3D9F3] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <h3 className="font-fraunces text-xl font-bold text-[#241934] mb-1">
                Add to Character Graveyard & Hall of Fame
              </h3>
              <p className="text-xs text-[#7B6A93] mb-4">
                Immortalize a fallen hero or an adventuring legend from your in-person campaign.
              </p>

              <form onSubmit={handleCreateLegacy} className="space-y-3.5 text-xs text-[#241934]">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Character Name</label>
                  <input
                    type="text"
                    required
                    value={charName}
                    onChange={(e) => setCharName(e.target.value)}
                    placeholder="e.g. Sir Roderick the Shield"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Status</label>
                    <select
                      value={charStatus}
                      onChange={(e) => setCharStatus(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                    >
                      <option value="fallen">Fallen ⚰️</option>
                      <option value="retired">Retired 🏰</option>
                      <option value="active">Still Adventuring 🔥</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">System</label>
                    <input
                      type="text"
                      value={system}
                      onChange={(e) => setSystem(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Campaign & Table</label>
                  <input
                    type="text"
                    required
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Epitaph or Last Words</label>
                  <textarea
                    rows={2}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="e.g. 'Took the dragon breath so the cleric could revive the party...'"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-[#E3D9F3] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-full border border-[#E3D9F3] text-xs font-semibold text-[#7B6A93]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#FF5D73] text-white text-xs font-semibold hover:bg-[#E14760]"
                  >
                    Record Legacy
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
