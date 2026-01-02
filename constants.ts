import { Team, UserRole } from "./types";

export const MOCK_USERS = [
  { username: 'admin', password: '123', role: UserRole.ADMIN, name: 'Director de Transmisión' },
  { username: 'ref', password: '123', role: UserRole.REFEREE, name: 'Árbitro Principal' },
  { username: 'coach_a', password: '123', role: UserRole.COACH, teamId: 'team_1', name: 'Entrenador A' },
  { username: 'coach_b', password: '123', role: UserRole.COACH, teamId: 'team_2', name: 'Entrenador B' },
  { username: 'viewer', password: '123', role: UserRole.VIEWER, name: 'Fanático' },
];

export const PLACEHOLDER_LOGOS = [
  "https://picsum.photos/id/1015/200/200", // River/Blueish
  "https://picsum.photos/id/1025/200/200", // Pug/Greenish?
  "https://picsum.photos/id/1011/200/200", // Water/Blue
  "https://picsum.photos/id/1069/200/200", // Jellyfish/Purple
];

export const POSITIONS = ['Armador', 'Punta', 'Central', 'Opuesto', 'Líbero'];
