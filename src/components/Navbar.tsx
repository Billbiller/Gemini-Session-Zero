import React from 'react';
import { Shield, Sparkles, Plus, Calendar, Compass, UserCheck, BookOpen, Users, Star } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHostModal: () => void;
  myBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHostModal,
  myBookingsCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7FF]/90 backdrop-blur-md border-b border-[#E3D9F3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text wordmark with dice emblem */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); setActiveTab('discover'); }}
          className="flex items-center gap-2.5 text-[#241934] group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FF5D73]/10 border border-[#FF5D73]/30 flex items-center justify-center text-[#FF5D73] group-hover:scale-105 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:rotate-12 duration-300">
              <path d="M12 2L21 7.5V16.5L12 22L3 16.5V7.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M12 2V22M3 7.5L12 12L21 7.5M3 16.5L12 12" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-fraunces font-bold text-xl tracking-tight leading-none text-[#241934]">
              Session Zero
            </span>
            <span className="font-mono text-[10px] tracking-wider text-[#FF5D73] uppercase font-semibold">
              In-Person Tabletop
            </span>
          </div>
        </a>

        {/* Zone 2: 5 clean nav links (single line, subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-7 text-[14.5px] font-medium text-[#4A3068]">
          <button 
            onClick={() => setActiveTab('games')}
            className={`pb-1 transition-colors relative flex items-center gap-1.5 ${activeTab === 'games' ? 'text-[#FF5D73] font-semibold' : 'hover:text-[#FF5D73]'}`}
          >
            <Compass className="w-4 h-4 opacity-80" />
            <span>Browse Tables</span>
            {activeTab === 'games' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5D73] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('matcher')}
            className={`pb-1 transition-colors relative flex items-center gap-1.5 ${activeTab === 'matcher' ? 'text-[#FF5D73] font-semibold' : 'hover:text-[#FF5D73]'}`}
          >
            <Sparkles className="w-4 h-4 opacity-80 text-[#E8A23D]" />
            <span>Party Matcher</span>
            {activeTab === 'matcher' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5D73] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('subs')}
            className={`pb-1 transition-colors relative flex items-center gap-1.5 ${activeTab === 'subs' ? 'text-[#FF5D73] font-semibold' : 'hover:text-[#FF5D73]'}`}
          >
            <Users className="w-4 h-4 opacity-80 text-[#2EC4B6]" />
            <span>Sub Pool</span>
            {activeTab === 'subs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5D73] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('logbook')}
            className={`pb-1 transition-colors relative flex items-center gap-1.5 ${activeTab === 'logbook' ? 'text-[#FF5D73] font-semibold' : 'hover:text-[#FF5D73]'}`}
          >
            <BookOpen className="w-4 h-4 opacity-80" />
            <span>Logbook & Stats</span>
            {activeTab === 'logbook' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5D73] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('reputation')}
            className={`pb-1 transition-colors relative flex items-center gap-1.5 ${activeTab === 'reputation' ? 'text-[#FF5D73] font-semibold' : 'hover:text-[#FF5D73]'}`}
          >
            <Star className="w-4 h-4 opacity-80 text-[#E8A23D]" />
            <span>Reputation</span>
            {activeTab === 'reputation' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5D73] rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('table-hub')}
            className={`pb-1 transition-colors relative flex items-center gap-1.5 ${activeTab === 'table-hub' ? 'text-[#FF5D73] font-semibold' : 'hover:text-[#FF5D73]'}`}
          >
            <Calendar className="w-4 h-4 opacity-80 text-[#FF5D73]" />
            <span>My Active Table</span>
            {myBookingsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#2EC4B6]" />
            )}
            {activeTab === 'table-hub' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5D73] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('table-hub')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold font-mono rounded-full border border-[#E3D9F3] text-[#4A3068] hover:border-[#241934] transition-colors whitespace-nowrap"
            title="View confirmed seats & table room"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#2EC4B6]" />
            <span>{myBookingsCount} Table Joined</span>
          </button>

          <button
            onClick={onOpenHostModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full bg-[#FF5D73] text-white hover:bg-[#E14760] transition-transform active:scale-95 shadow-sm shadow-[#FF5D73]/40 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Host a Table</span>
          </button>
        </div>

      </div>

      {/* Mobile nav pills bar */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-[#F1EBFA]/80 border-t border-[#E3D9F3] text-xs">
        <button 
          onClick={() => setActiveTab('games')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${activeTab === 'games' ? 'bg-[#241934] text-white' : 'text-[#4A3068] hover:bg-white'}`}
        >
          Browse Tables
        </button>
        <button 
          onClick={() => setActiveTab('matcher')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${activeTab === 'matcher' ? 'bg-[#241934] text-white' : 'text-[#4A3068] hover:bg-white'}`}
        >
          Party Matcher
        </button>
        <button 
          onClick={() => setActiveTab('subs')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${activeTab === 'subs' ? 'bg-[#241934] text-white' : 'text-[#4A3068] hover:bg-white'}`}
        >
          Sub Pool
        </button>
        <button 
          onClick={() => setActiveTab('logbook')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${activeTab === 'logbook' ? 'bg-[#241934] text-white' : 'text-[#4A3068] hover:bg-white'}`}
        >
          Logbook & Stats
        </button>
        <button 
          onClick={() => setActiveTab('reputation')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${activeTab === 'reputation' ? 'bg-[#241934] text-white' : 'text-[#4A3068] hover:bg-white'}`}
        >
          Reputation
        </button>
        <button 
          onClick={() => setActiveTab('table-hub')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${activeTab === 'table-hub' ? 'bg-[#241934] text-white' : 'text-[#4A3068] hover:bg-white'}`}
        >
          Active Table
        </button>
      </div>
    </header>
  );
};
