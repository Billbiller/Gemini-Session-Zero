export type GameSystem = 
  | 'D&D 5th Edition'
  | 'Pathfinder 2e'
  | 'Call of Cthulhu'
  | 'Vampire: The Masquerade'
  | 'Blades in the Dark'
  | 'Cyberpunk RED'
  | 'Shadowdark OSR'
  | 'Alien RPG'
  | 'System-Agnostic / Homebrew';

export type VenueType = 
  | 'FLGS (Game Store)'
  | 'Board Game Cafe & Pub'
  | 'Host Residence (Private Home)'
  | 'Community Library / Center'
  | 'Dedicated Tabletop Studio';

export type GameFormat = 
  | 'Ongoing Campaign'
  | 'One-shot Adventure'
  | 'West Marches / Drop-in'
  | 'Beginner Workshop';

export type LethalityLevel = 
  | 'Low-lethality (Heroic)'
  | 'Moderate'
  | 'High-lethality'
  | 'Deadly / OSR Gritty';

export interface GMProfile {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  glyph: string;
  rating: number;
  reviewsCount: number;
  sessionsRun: number;
  badges: string[];
  topTags: string[];
  bio: string;
  verifiedInPersonHost: boolean;
}

export interface InPersonGame {
  id: string;
  title: string;
  campaignName: string;
  system: GameSystem;
  format: GameFormat;
  synopsis: string;
  vibe: string;
  
  // In-Person Venue Specifics
  venueType: VenueType;
  venueName: string;
  city: string;
  neighborhood: string;
  addressRevealPolicy: string;
  parkingInfo: string;
  transitInfo: string;
  accessibility: string;
  petNotice: string;
  tableAmenities: string[];
  
  // Schedule & Seats
  dayOfWeek: string;
  timeSlot: string;
  durationHours: number;
  frequency: string;
  nextSessionDate: string;
  totalSeats: number;
  bookedSeats: number;
  pricePerSession: number; // 0 for free
  
  // Safety & Rules
  safetyTools: string[];
  lethality: LethalityLevel;
  experienceLevel: 'Beginner Friendly' | 'All Experience Levels' | 'Rules-Crunch / Veteran';
  ageRating: 'All Ages' | '18+' | '21+ (Pub Venue)';
  gm: GMProfile;
  
  // Table roster
  roster: {
    playerName: string;
    characterName: string;
    characterClass: string;
    isSub?: boolean;
  }[];
}

export interface DeckCard {
  id: string;
  kind: 'Player' | 'Campaign' | 'DM';
  name: string;
  sub: string;
  city: string;
  system: string;
  tags: string[];
  color1: string;
  color2: string;
  glyph: string;
  rating: string;
  details: string;
  preferredVenues: string[];
}

export interface LogEntry {
  id: string;
  author: string;
  authorInitial: string;
  authorBg: string;
  campaign: string;
  sessionNumber: number;
  date: string;
  city: string;
  venue: string;
  note: string;
  tags: string[];
  kudos: number;
  hasKudos?: boolean;
}

export interface LegacyEntry {
  id: string;
  characterName: string;
  status: 'fallen' | 'retired' | 'active';
  campaign: string;
  sessionInfo: string;
  quote: string;
  system: string;
  glyph: string;
  glyphBg: string;
}

export interface SubRequest {
  id: string;
  characterName: string;
  campaignName: string;
  date: string;
  time: string;
  city: string;
  venue: string;
  system: GameSystem;
  ownerName: string;
  ownerInitial: string;
  ownerBg: string;
  roleNeeded: string;
  lethality: string;
  reliabilityRequired: string;
  steps: {
    name: string;
    status: 'DONE' | 'PENDING';
  }[];
  guardrails: {
    text: string;
    allowed: boolean;
  }[];
  isVolunteered?: boolean;
}

export interface ReviewItem {
  id: string;
  reviewerName: string;
  targetName: string;
  targetRole: 'DM' | 'Player';
  campaign: string;
  rating: number;
  date: string;
  tags: string[];
  comment: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole: 'DM' | 'Player';
  avatarBg: string;
  initial: string;
  timestamp: string;
  text: string;
}
