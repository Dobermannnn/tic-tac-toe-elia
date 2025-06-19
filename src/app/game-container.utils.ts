import { BehaviorSubject, Observable } from 'rxjs';
import {
  GameResult,
  INGAME,
  PlayerType,
  TIE,
} from './game-container/game-container.types';

export const EMPTY_BOARD = Array<PlayerType | ''>(9).fill('');

export const getDisplayText = (score: GameResult): string =>
  score === TIE ? "It's a tie!" : `${score} Won!`;

export const getCurrentResult = (
  currentBoard: ('' | PlayerType)[]
): GameResult => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of winningCombos) {
    if (
      currentBoard[a] !== '' &&
      currentBoard[a] === currentBoard[b] &&
      currentBoard[b] === currentBoard[c]
    ) {
      return currentBoard[a];
    }
  }
  if (!currentBoard.includes('')) {
    return TIE;
  }
  return INGAME;
};
