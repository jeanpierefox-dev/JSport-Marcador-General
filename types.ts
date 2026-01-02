
export enum UserRole {
  ADMIN = 'ADMIN', // Broadcaster, Full Control
  REFEREE = 'REFEREE', // Scoring only
  COACH = 'COACH', // Timeouts, Subs
  VIEWER = 'VIEWER' // Passive View
}

export interface User {
  username: string;
  name: string;
  role: UserRole;
  teamId?: string; // For coaches
}

export enum ActionType {
  ATTACK = 'Ataque',
  BLOCK = 'Bloqueo',
  SERVE_ACE = 'Ace',
  SERVE_ERROR = 'Error Saque',
  ATTACK_ERROR = 'Error Ataque',
  OPPONENT_ERROR = 'Error Oponente'
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Líbero' | 'Armador' | 'Punta' | 'Central' | 'Opuesto';
  height: string; // e.g., "1.98m"
  weight: string; // e.g., "85kg"
  age: string;    // e.g., "24"
  // Country removed
  image?: string;
  stats: {
    points: number;
    aces: number;
    blocks: number;
    attacks: number;
  };
}

export interface Team {
  id: string;
  name: string;
  shortName: string; // 3 letters (e.g., BRA, USA)
  color: string;
  logo?: string;
  coach: string;
  players: Player[];
  rosterIds: string[]; // IDs of players on court (6)
}

export interface MatchEvent {
  id: string;
  type: ActionType;
  teamId: string;
  playerId?: string; // If applicable
  scoreSnapshot: { home: number; away: number };
  timestamp: number;
  description: string;
}

export interface SetScore {
  home: number;
  away: number;
}

export interface Match {
  id: string;
  championshipId: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string; // ISO String
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
  phase: 'GROUP' | 'SEMIFINAL' | 'FINAL'; // Added phase
  currentSet: number;
  sets: SetScore[]; // e.g., [{25, 20}, {21, 25}]
  events: MatchEvent[];
  servingTeamId: string;
  timeouts: { [teamId: string]: number }; // Count of timeouts used in current set
  substitutions: { [teamId: string]: number }; // Count of subs used
}

export interface Championship {
  id: string;
  name: string;
  logo?: string;
  teams: Team[];
  groups: { name: string; teamIds: string[] }[];
  matches: Match[];
}

// Overlay Control Types
export interface BroadcastState {
  showScorebug: boolean; // Bottom bar
  showMiniScorebug: boolean; // Top Left Corner (VNL Style)
  showServingInfo: boolean; // Show player card next to mini bug
  showSetStats: boolean; // Detailed Set stats box
  showRotation: boolean;
  showMatchIntro: boolean;
  showTimeout: boolean; // Central timeout table
  showMicOverlay: boolean; // "On Air" indicator
  activePlayerIdForStats: string | null;
  triggerTransition: boolean; // For VNL style wipe effect
}
