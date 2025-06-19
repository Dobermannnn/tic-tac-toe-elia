import { BehaviorSubject, Observable } from 'rxjs';
import {
  GameResult,
  GAME_RESULT,
  Player,
} from './game-container/game-container.types';

export const EMPTY_BOARD = Array<Player | ''>(9).fill('');

export const getDisplayText = (score: GameResult): string => {
  console.log('heloooooooooo');
  return score === GAME_RESULT.TIE ? "It's a tie!" : `${score} Won!`;
};

export const getCurrentResult = (currentBoard: ('' | Player)[]): GameResult => {
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
    return GAME_RESULT.TIE;
  }
  return GAME_RESULT.INGAME;
};
