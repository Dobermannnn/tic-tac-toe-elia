export const PLAYERS = { X: 'X', O: 'O' } as const;

export type Player = (typeof PLAYERS)[keyof typeof PLAYERS];

export const GAME_RESULT = {
  TIE: 'tie',
  INGAME: 'ingame',
  ...PLAYERS,
} as const;

export type GameResult = (typeof GAME_RESULT)[keyof typeof GAME_RESULT];
