export const PLAYER_ONE = 'X';
export const PLAYER_TWO = 'O';

export type PlayerType = typeof PLAYER_ONE | typeof PLAYER_TWO;

export const TIE = 'tie';
export const INGAME = 'ingame';

export type GameResult = PlayerType | typeof TIE | typeof INGAME;
