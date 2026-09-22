import React, { useState } from 'react';
import { LogEntry } from '../types.ts';
import { Star, Flame, Sparkles, Plus, MapPin, Calendar, Check, MessageSquare } from 'lucide-react';

interface LogbookSectionProps {
  logs: LogEntry[];
  onToggleKudos: (id: string) => void;
  onAddLog: (log: LogEntry) => void;
}

export const LogbookSection: React.FC<LogbookSectionProps> = ({
  logs,
  onToggleKudos,
  onAddLog
}) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [campaign, setCampaign] = useState('The Sunken Archive');
  const [sessionNum, setSessionNum] = useState(13);
  const [city, setCity] = useState('Austin, TX');
  const [venue, setVenue] = useState('Emerald Tavern (Guild Room)');
  const [note, setNote] = useState('');
  const [tagInput, setTagInput] = useState('Boss Fight, Natural 20');

  const handleCreateLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      author: 'Mara',
      authorInitial: 'M',
      authorBg: 'linear-gradient(135deg,#FF5D73,#E14760)',
      campaign,
      sessionNumber: sessionNum,
      date: 'Today',
      city,
      venue,
      note: note.trim(),
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean),
      kudos: 1,
      hasKudos: true
    };

    onAddLog(newLog);
    setShowLogModal(false);
    setNote('');
  };

  return (
    <section className="py-14 border-b border-[#E3D9F3] bg-[#FAF7FF]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
              Your In-Person Table, Tracked
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934] mb-2">
              A Diary for Your Campaign, Not Just a Stat Sheet
            </h2>
            <p className="text-sm text-[#7B6A93] max-w-xl">
              Log a note after every physical session. Over months it becomes a chronicle you'll actually want to reread — and a feed your party can react to.
            </p>
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#241934] text-white text-xs font-semibold hover:bg-[#FF5D73] transition-colors self-start md:self-end shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log a Physical Session</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Personal Stats Tiles */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="grid grid-cols-2 gap-3.5">
              
              <div className="p-5 rounded-2xl bg-white border border-[#E3D9F3] shadow-xs">
                <div className="font-fraunces text-3xl font-bold text-[#241934] leading-none">
                  {47 + (logs.length - 3)}
                </div>
                <div className="font-mono text-[11px] text-[#7B6A93] uppercase font-semibold mt-2">
                  Physical Sessions
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E3D9F3] shadow-xs">
                <div className="font-fraunces text-3xl font-bold text-[#241934] leading-none">
                  {126 + (logs.length - 3) * 4}
                </div>
                <div className="font-mono text-[11px] text-[#7B6A93] uppercase font-semibold mt-2">
                  Hours at Table
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E3D9F3] shadow-xs">
                <div className="font-fraunces text-3xl font-bold text-[#241934] leading-none">
                  4
                </div>
                <div className="font-mono text-[11px] text-[#7B6A93] uppercase font-semibold mt-2">
                  Systems Played
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E3D9F3] shadow-xs">
                <div className="font-fraunces text-3xl font-bold text-[#241934] leading-none">
                  18mo
                </div>
                <div className="font-mono text-[11px] text-[#7B6A93] uppercase font-semibold mt-2">
                  Longest Campaign
                </div>
              </div>

            </div>

            {/* Most Played Chip Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E3D9F3] shadow-xs">
              <div className="font-mono text-[11px] text-[#7B6A93] uppercase font-semibold mb-2.5">
                Most Played Tabletop Preferences
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#FAF7FF] text-[#4A3068] border border-[#E3D9F3]">
                  Rogue (Arcane Trickster)
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#FAF7FF] text-[#4A3068] border border-[#E3D9F3]">
                  D&D 5e & Blades
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#FAF7FF] text-[#4A3068] border border-[#E3D9F3]">
                  FLGS & Cafe Tables
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#FAF7FF] text-[#4A3068] border border-[#E3D9F3]">
                  Austin, TX
                </span>
              </div>
            </div>

            <p className="text-xs text-[#7B6A93] leading-relaxed">
              Your year at the physical table, built from every session you log — worth sharing at the end of a campaign, the way a marathon medal is worth showing off.
            </p>

          </div>

          {/* Right Column: Logbook Feed */}
          <div className="lg:col-span-7 space-y-4">
            
            {logs.map(entry => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl border border-[#E3D9F3] p-5 shadow-xs hover:border-[#241934] transition-colors flex gap-4"
              >
                {/* Author Avatar Dot */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-fraunces font-bold text-base shrink-0 shadow-xs"
                  style={{ background: entry.authorBg }}
                >
                  {entry.authorInitial}
                </div>

                {/* Entry Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap mb-1">
                    <h3 className="font-fraunces font-bold text-base text-[#241934]">
                      {entry.author} · {entry.campaign} · Session {entry.sessionNumber}
                    </h3>
                    <span className="font-mono text-xs text-[#7B6A93]">
                      {entry.date}
                    </span>
                  </div>

                  {entry.venue && (
                    <div className="text-[11px] font-mono text-[#FF5D73] mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{entry.venue} ({entry.city})</span>
                    </div>
                  )}

                  <p className="text-sm text-[#4A3068] leading-relaxed mb-3">
                    {entry.note}
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E3D9F3]/60">
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7FF] border border-[#E3D9F3] text-[#7B6A93]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Kudos Button */}
                    <button
                      type="button"
                      onClick={() => onToggleKudos(entry.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${entry.hasKudos ? 'bg-[#FF5D73] text-white shadow-xs' : 'bg-[#F1EBFA] text-[#4A3068] hover:bg-[#E3D9F3]'}`}
                      aria-label="Give kudos"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={entry.hasKudos ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L14.5 8.5L21 9.5L16.5 14L18 21L12 17.5L6 21L7.5 14L3 9.5L9.5 8.5L12 2Z"/>
                      </svg>
                      <span>{entry.kudos}</span>
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Modal: Log a Session */}
        {showLogModal && (
          <div className="fixed inset-0 z-50 bg-[#241934]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#E3D9F3] shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200">
              <h3 className="font-fraunces text-xl font-bold text-[#241934] mb-1">
                Log Your Latest Table Session
              </h3>
              <p className="text-xs text-[#7B6A93] mb-4">
                Record what happened around the physical table — funny quotes, near-TPKs, or loot split.
              </p>

              <form onSubmit={handleCreateLog} className="space-y-3.5 text-xs text-[#241934]">
                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Campaign Name</label>
                  <input
                    type="text"
                    required
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Session #</label>
                    <input
                      type="number"
                      required
                      value={sessionNum}
                      onChange={(e) => setSessionNum(parseInt(e.target.value, 10) || 1)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                    />
                  </div>
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
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Physical Venue</label>
                  <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Emerald Tavern Guild Room"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Session Diary Entry</label>
                  <textarea
                    rows={3}
                    required
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What happened at the table? e.g. Party fought the manticore on the bridge, rogue rolled a nat 20 on acrobatic leap..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase font-semibold text-[#7B6A93] mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E3D9F3] text-sm"
                  />
                </div>

                <div className="pt-3 border-t border-[#E3D9F3] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="px-4 py-2 rounded-full border border-[#E3D9F3] text-xs font-semibold text-[#7B6A93]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#FF5D73] text-white text-xs font-semibold hover:bg-[#E14760]"
                  >
                    Publish to Logbook
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
