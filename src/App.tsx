import React, { useState } from 'react';
import { 
  INITIAL_GAMES, 
  DECK_CARDS, 
  INITIAL_LOGS, 
  INITIAL_LEGACIES, 
  INITIAL_SUBS, 
  INITIAL_REVIEWS, 
  INITIAL_TABLE_CHAT 
} from './data/initialData.ts';
import { InPersonGame, LogEntry, LegacyEntry, SubRequest, ReviewItem, ChatMessage } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { GamesDirectory } from './components/GamesDirectory.tsx';
import { SwipeDeck } from './components/SwipeDeck.tsx';
import { RatingsSection } from './components/RatingsSection.tsx';
import { LogbookSection } from './components/LogbookSection.tsx';
import { LegaciesSection } from './components/LegaciesSection.tsx';
import { SubsSection } from './components/SubsSection.tsx';
import { SessionZeroTableHub } from './components/SessionZeroTableHub.tsx';
import { GameDetailModal } from './components/GameDetailModal.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { HostGameModal } from './components/HostGameModal.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('discover');
  
  // Data State
  const [games, setGames] = useState<InPersonGame[]>(INITIAL_GAMES);
  const [deckCards] = useState(DECK_CARDS);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [legacies, setLegacies] = useState<LegacyEntry[]>(INITIAL_LEGACIES);
  const [subs, setSubs] = useState<SubRequest[]>(INITIAL_SUBS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_TABLE_CHAT);
  
  // Bookings (user starts with 1 booked table: game-1 Curse of Strahd at Emerald Tavern)
  const [myBookedGameIds, setMyBookedGameIds] = useState<string[]>(['game-1']);

  // Modals
  const [selectedGameForDetails, setSelectedGameForDetails] = useState<InPersonGame | null>(null);
  const [selectedGameForBooking, setSelectedGameForBooking] = useState<InPersonGame | null>(null);
  const [showHostModal, setShowHostModal] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleSelectGame = (game: InPersonGame) => {
    setSelectedGameForDetails(game);
  };

  const handleStartBooking = (game: InPersonGame) => {
    setSelectedGameForDetails(null);
    setSelectedGameForBooking(game);
  };

  const handleConfirmBooking = (bookingDetails: {
    playerName: string;
    characterConcept: string;
    experience: string;
    dietaryNotes: string;
  }) => {
    if (!selectedGameForBooking) return;
    
    // Add to bookings
    if (!myBookedGameIds.includes(selectedGameForBooking.id)) {
      setMyBookedGameIds([...myBookedGameIds, selectedGameForBooking.id]);
    }

    // Update game booked seats
    setGames(prev => prev.map(g => {
      if (g.id === selectedGameForBooking.id) {
        return {
          ...g,
          bookedSeats: Math.min(g.totalSeats, g.bookedSeats + 1),
          roster: [
            ...g.roster,
            {
              playerName: bookingDetails.playerName,
              characterName: bookingDetails.characterConcept,
              characterClass: bookingDetails.experience.split(' ')[0]
            }
          ]
        };
      }
      return g;
    }));

    // Add confirmation message to chat
    const newChat: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: bookingDetails.playerName,
      senderRole: 'Player',
      avatarBg: '#FF5D73',
      initial: bookingDetails.playerName[0] || 'P',
      timestamp: 'Just now',
      text: `Hi everyone! I just booked my seat for the table! Character concept: ${bookingDetails.characterConcept}. Excited to meet in person!`
    };
    setChatMessages(prev => [...prev, newChat]);

    setSelectedGameForBooking(null);
    showToast(`Seat confirmed for ${selectedGameForBooking.title}! Welcome to the physical table.`);
    setActiveTab('table-hub');
  };

  const handleVolunteerSub = (id: string) => {
    setSubs(prev => prev.map(s => {
      if (s.id === id) {
        const nextState = !s.isVolunteered;
        if (nextState) {
          showToast(`Volunteer request sent to table! The DM will review your profile.`);
        }
        return { ...s, isVolunteered: nextState };
      }
      return s;
    }));
  };

  const handleToggleKudos = (id: string) => {
    setLogs(prev => prev.map(l => {
      if (l.id === id) {
        const nextHas = !l.hasKudos;
        return {
          ...l,
          hasKudos: nextHas,
          kudos: nextHas ? l.kudos + 1 : l.kudos - 1
        };
      }
      return l;
    }));
  };

  const handleAddLog = (newLog: LogEntry) => {
    setLogs([newLog, ...logs]);
    showToast('Physical session entry logged to your campaign diary!');
  };

  const handleAddLegacy = (newEntry: LegacyEntry) => {
    setLegacies([newEntry, ...legacies]);
    showToast(`${newEntry.characterName} has been recorded in the campaign legacy chronicle.`);
  };

  const handleAddSubRequest = (newSub: SubRequest) => {
    setSubs([newSub, ...subs]);
    showToast('Sub request posted to your local city pool! Local players notified.');
  };

  const handleAddReview = (newRev: ReviewItem) => {
    setReviews([newRev, ...reviews]);
    showToast('Two-way table feedback submitted! Updated host reputation.');
  };

  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: 'Mara Quill',
      senderRole: 'Player',
      avatarBg: '#FF5D73',
      initial: 'M',
      timestamp: 'Just now',
      text
    };
    setChatMessages([...chatMessages, newMsg]);
  };

  const handleAddGame = (newGame: InPersonGame) => {
    setGames([newGame, ...games]);
    showToast(`In-person table "${newGame.title}" published!`);
  };

  // Find user's active game for the Table Hub
  const activeUserGame = games.find(g => myBookedGameIds.includes(g.id)) || games[0];

  return (
    <div className="min-h-screen bg-[#FAF7FF] text-[#241934] flex flex-col font-grotesk">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#241934] text-white px-5 py-3 rounded-2xl border border-[#2EC4B6] shadow-xl flex items-center gap-2.5 text-xs font-mono animate-in fade-in slide-in-from-top-4 duration-200">
          <Check className="w-4 h-4 text-[#2EC4B6]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHostModal={() => setShowHostModal(true)}
        myBookingsCount={myBookedGameIds.length}
      />

      {/* Main View Container */}
      <main className="flex-1">
        
        {activeTab === 'discover' && (
          <>
            <HeroSection
              onExploreGames={() => setActiveTab('games')}
              onLaunchMatcher={() => setActiveTab('matcher')}
              onOpenHostModal={() => setShowHostModal(true)}
            />

            {/* Featured StartPlaying In-Person Game Directory */}
            <GamesDirectory
              games={games}
              onSelectGame={handleSelectGame}
              onOpenHostModal={() => setShowHostModal(true)}
            />

            {/* Interactive Session Zero Swipe Deck */}
            <SwipeDeck
              cards={deckCards}
              onOpenChatWithMatch={(name) => {
                showToast(`Match connected with ${name}! Opening table chat...`);
                setActiveTab('table-hub');
              }}
            />

            {/* How It Works 3 Steps (from HTML preview) */}
            <section className="py-14 border-b border-[#E3D9F3] bg-white">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-12">
                  <div className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E14760] mb-1">
                    How In-Person Gaming Works
                  </div>
                  <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#241934] mb-2">
                    Three Steps to a Full Physical Table
                  </h2>
                  <p className="text-sm text-[#7B6A93]">
                    No fifteen-tab spreadsheet. No ghosted Discord servers. Just real players sitting around a wooden table.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="p-6 rounded-3xl bg-[#FAF7FF] border border-[#E3D9F3]">
                    <div className="font-mono text-xs font-semibold text-[#FF5D73] mb-3">01</div>
                    <h3 className="font-fraunces font-bold text-lg text-[#241934] mb-2">
                      Find or Match Local Table
                    </h3>
                    <p className="text-xs text-[#7B6A93] leading-relaxed">
                      Filter by system, distance, and venue type (game store, cafe, private home). Swipe past what's not a fit, connect on what is.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#FAF7FF] border border-[#E3D9F3]">
                    <div className="font-mono text-xs font-semibold text-[#FF5D73] mb-3">02</div>
                    <h3 className="font-fraunces font-bold text-lg text-[#241934] mb-2">
                      Vetted Arrival & Safety Tools
                    </h3>
                    <p className="text-xs text-[#7B6A93] leading-relaxed">
                      Physical host addresses are safely revealed 24h prior. Confirm table safety tools (X-Card, Lines & Veils) and table allergy notices.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#FAF7FF] border border-[#E3D9F3]">
                    <div className="font-mono text-xs font-semibold text-[#FF5D73] mb-3">03</div>
                    <h3 className="font-fraunces font-bold text-lg text-[#241934] mb-2">
                      Roll Real Dice & Log It
                    </h3>
                    <p className="text-xs text-[#7B6A93] leading-relaxed">
                      Enjoy tactile minis, physical maps, and snacks. Rate your table afterward to build mutual reputation, and log campaign stories.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* Rec League Substitute Player Pool */}
            <SubsSection
              subs={subs}
              onVolunteer={handleVolunteerSub}
              onAddSubRequest={handleAddSubRequest}
            />

            {/* Two-Way Rating & Trust */}
            <RatingsSection
              reviews={reviews}
              onAddReview={handleAddReview}
            />

            {/* Logbook & Personal Stats */}
            <LogbookSection
              logs={logs}
              onToggleKudos={handleToggleKudos}
              onAddLog={handleAddLog}
            />

            {/* Legacies & Campaign Chronicle */}
            <LegaciesSection
              legacies={legacies}
              onAddLegacy={handleAddLegacy}
            />

            {/* Pricing Section */}
            <PricingSection
              onJoinFree={() => showToast("Welcome to Session Zero! You can now browse & book in-person tables.")}
              onStartZeroPlus={() => showToast("Zero+ trial started! Unlimited table hosting & priority discovery unlocked.")}
            />
          </>
        )}

        {/* Dedicated Browse Tables View */}
        {activeTab === 'games' && (
          <GamesDirectory
            games={games}
            onSelectGame={handleSelectGame}
            onOpenHostModal={() => setShowHostModal(true)}
          />
        )}

        {/* Dedicated Party Matcher View */}
        {activeTab === 'matcher' && (
          <div className="py-6">
            <SwipeDeck
              cards={deckCards}
              onOpenChatWithMatch={(name) => {
                showToast(`Connected with ${name}! Opening your table hub...`);
                setActiveTab('table-hub');
              }}
            />
          </div>
        )}

        {/* Dedicated Sub Pool View */}
        {activeTab === 'subs' && (
          <SubsSection
            subs={subs}
            onVolunteer={handleVolunteerSub}
            onAddSubRequest={handleAddSubRequest}
          />
        )}

        {/* Dedicated Logbook & Stats View */}
        {activeTab === 'logbook' && (
          <>
            <LogbookSection
              logs={logs}
              onToggleKudos={handleToggleKudos}
              onAddLog={handleAddLog}
            />
            <LegaciesSection
              legacies={legacies}
              onAddLegacy={handleAddLegacy}
            />
          </>
        )}

        {/* Dedicated Reputation View */}
        {activeTab === 'reputation' && (
          <RatingsSection
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {/* Dedicated Active Table Hub View */}
        {activeTab === 'table-hub' && (
          <SessionZeroTableHub
            game={activeUserGame}
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onExploreMore={() => setActiveTab('games')}
          />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Game Details Modal */}
      <GameDetailModal
        game={selectedGameForDetails}
        onClose={() => setSelectedGameForDetails(null)}
        onBookSeat={handleStartBooking}
        isBooked={selectedGameForDetails ? myBookedGameIds.includes(selectedGameForDetails.id) : false}
      />

      {/* Booking Seat Modal */}
      {selectedGameForBooking && (
        <BookingModal
          game={selectedGameForBooking}
          onClose={() => setSelectedGameForBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Host a Table Modal */}
      {showHostModal && (
        <HostGameModal
          onClose={() => setShowHostModal(false)}
          onAddGame={handleAddGame}
        />
      )}

    </div>
  );
}
