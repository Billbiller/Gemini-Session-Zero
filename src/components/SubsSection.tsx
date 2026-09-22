import React, { useState } from 'react';
import { SubRequest, GameSystem } from '../types.ts';
import { Users, CheckCircle2, AlertCircle, ShieldAlert, Plus, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

interface SubsSectionProps {
  subs: SubRequest[];
  onVolunteer: (id: string) => void;
  onAddSubRequest: (sub: SubRequest) => void;
}

export const SubsSection: React.FC<SubsSectionProps> = ({
  subs,
  onVolunteer,
  onAddSubRequest
}) => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [charName, setCharName] = useState('Mara Quill (Rogue)');
  const [campaign, setCampaign] = useState('The Sunken Archive');
  const [city, setCity] = useState('Austin, TX');
  const [venue, setVenue] = useState('Emerald Tavern Games');
  const [date, setDate] = useState('Next Saturday, 2:00 PM');
  const [guardrailNote, setGuardrailNote] = useState('No spending rare health potions; death is off the table.');

  const handleCreateSub = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: SubRequest = {
      id: `sub-${Date.now()}`,
      characterName: charName,
      campaignName: campaign,
      date,
      time: '4 Hours in-person',
      city,
      venue,
      system: 'D&D 5th Edition',
      ownerName: 'You (Mara)',
      ownerInitial: 'M',
      ownerBg: 'linear-gradient(135deg,#FF5D73,#E14760)',
      roleNeeded: `${charName} backup player for one physical session`,
      lethality: 'Moderate',
      reliabilityRequired: '4.8★+ in-person rating',
      steps: [
        { name: 'Owner sets character guardrails', status: 'DONE' },
        { name: 'DM approves substitute candidate', status: 'DONE' },
        { name: 'Table confirms substitute (Waiting for table)', status: 'PENDING' }
      ],
      guardrails: [
        { text: 'Can roleplay and use core class features at the table', allowed: true },
        { text: guardrailNote || 'Cannot spend rare permanent items', allowed: false },
        { text: 'Character death is strictly off the table for substitutes', allowed: false }
      ],
      isVolunteered: false
    };

    onAddSubRequest(newSub);
    setShowRequestModal(false);
  };

  const primaryFeaturedSub = subs[0];

  return (
    <section className="py-14 border-b border-[#E3D9F3] bg-[#FAF7FF]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
              Never Cancel an In-Person Session Again
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934] mb-2">
              Substitute Players, Like a Recreational League
            </h2>
            <p className="text-sm text-[#7B6A93] max-w-xl">
              Can't make it this week? Request a vetted sub instead of canceling the physical table. Your character gets loaned out for one session under strict guardrails you dictate.
            </p>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5D73] text-white text-xs font-semibold hover:bg-[#E14760] transition-colors self-start md:self-end shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Request a Sub for Your Seat</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Featured Sub Request Card & Guardrails (from HTML preview) */}
          {primaryFeaturedSub && (
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-[#E3D9F3] p-6 sm:p-7 shadow-xl shadow-[#241934]/5 space-y-5">
                
                {/* Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-[#E3D9F3]">
                  <div 
                    className="w-11 h-11 rounded-full text-white flex items-center justify-center font-fraunces font-bold text-base shadow-xs"
                    style={{ background: primaryFeaturedSub.ownerBg }}
                  >
                    {primaryFeaturedSub.ownerInitial}
                  </div>
                  <div>
                    <h3 className="font-fraunces font-bold text-base text-[#241934]">
                      {primaryFeaturedSub.characterName} is out
                    </h3>
                    <div className="font-mono text-xs text-[#7B6A93]">
                      {primaryFeaturedSub.campaignName.toUpperCase()} · {primaryFeaturedSub.date.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* 3-Step Approval Pipeline */}
                <div>
                  <div className="font-mono text-[11px] uppercase font-semibold text-[#7B6A93] mb-2">
                    3-Way Table Safeguard Protocol:
                  </div>
                  <div className="space-y-2.5">
                    {primaryFeaturedSub.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-[#E3D9F3]/60 last:border-b-0">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${step.status === 'DONE' ? 'bg-[#2EC4B6]' : 'bg-[#FAF7FF] text-[#7B6A93] border border-[#E3D9F3]'}`}>
                            {step.status === 'DONE' ? '✓' : idx + 1}
                          </div>
                          <span className="font-medium text-[#241934]">{step.name}</span>
                        </div>
                        <span className={`font-mono text-[10px] font-semibold ${step.status === 'DONE' ? 'text-[#2EC4B6]' : 'text-[#E8A23D]'}`}>
                          {step.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guardrails List */}
                <div>
                  <div className="font-mono text-[11px] uppercase font-semibold text-[#7B6A93] mb-2">
                    Guardrails for Whoever Subs In:
                  </div>
                  <div className="space-y-2 text-xs">
                    {primaryFeaturedSub.guardrails.map((g, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl flex items-start gap-2.5 ${g.allowed ? 'bg-[#FAF7FF] text-[#4A3068]' : 'bg-[#FFF5F6] text-[#E14760]'}`}
                      >
                        {g.allowed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#2EC4B6] shrink-0 mt-0.5" />
                        ) : (
                          <ShieldAlert className="w-4 h-4 text-[#E14760] shrink-0 mt-0.5" />
                        )}
                        <span className="leading-relaxed">{g.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7FF] border border-[#E3D9F3] text-xs font-mono text-[#7B6A93]">
                  Physical venue: {primaryFeaturedSub.venue} ({primaryFeaturedSub.city})
                </div>

              </div>
            </div>
          )}

          {/* Right Column: Open Sub Pool Entries */}
          <div className="lg:col-span-7 space-y-4">
            
            <p className="text-xs text-[#7B6A93] mb-3">
              Anyone with a Session Zero profile can volunteer for an open sub seat in their city. The DM and table review your profile before confirmation.
            </p>

            <div className="space-y-3.5">
              {subs.map(sub => (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl border border-[#E3D9F3] p-5 shadow-xs hover:border-[#241934] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div 
                      className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-fraunces font-bold text-base shrink-0 shadow-xs"
                      style={{ background: sub.ownerBg }}
                    >
                      {sub.ownerInitial}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h4 className="font-fraunces font-bold text-base text-[#241934]">
                          {sub.roleNeeded}
                        </h4>
                      </div>

                      <div className="text-xs font-mono text-[#FF5D73] mb-1">
                        {sub.campaignName} · {sub.date}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#7B6A93] font-mono mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#7B6A93]" />
                          {sub.venue} ({sub.city})
                        </span>
                        <span>·</span>
                        <span>{sub.reliabilityRequired}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7FF] border border-[#E3D9F3] text-[#4A3068]">
                          {sub.system}
                        </span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7FF] border border-[#E3D9F3] text-[#4A3068]">
                          {sub.lethality}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onVolunteer(sub.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all self-start sm:self-center shrink-0 cursor-pointer ${sub.isVolunteered ? 'bg-[#2EC4B6] text-white shadow-xs' : 'bg-[#241934] text-white hover:bg-[#FF5D73]'}`}
                  >
                    {sub.isVolunteered ? 'Requested ✓' : 'Volunteer for Seat'}
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Modal: Request a Sub */}
        {showRequestModal && (
          <div className="fixed inset-0 z-50 bg-[#241934]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#E3D9F3] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <h3 className="font-fraunces text-xl font-bold text-[#241934] mb-1">
                Post an In-Person Sub Request
              </h3>
              <p className="text-xs text-[#7B6A93] mb-4">
                Loan out your seat so your party can still play their physical session without you.
              </p>

              <form onSubmit={handleCreateSub} className="space-y-3.5 text-xs text-[#241934]">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Character & Class</label>
                  <input
                    type="text"
                    required
                    value={charName}
                    onChange={(e) => setCharName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Campaign & Venue</label>
                  <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Session Date/Time</label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Custom Character Guardrail</label>
                  <input
                    type="text"
                    value={guardrailNote}
                    onChange={(e) => setGuardrailNote(e.target.value)}
                    placeholder="e.g. Cannot spend gold or change character alliances"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div className="pt-3 border-t border-[#E3D9F3] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="px-4 py-2 rounded-full border border-[#E3D9F3] text-xs font-semibold text-[#7B6A93]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#FF5D73] text-white text-xs font-semibold hover:bg-[#E14760]"
                  >
                    Submit Sub Request
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
