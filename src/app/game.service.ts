import { computed, Injectable, Signal, signal } from '@angular/core';
import {
  EMPTY_BOARD,
  getCurrentResult,
  getDisplayText,
} from './game-container.utils';
import {
  GAME_RESULT,
  GameResult,
  Player,
  PLAYERS,
} from './game-container/game-container.types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentPlayer = signal<Player>(PLAYERS.X);
  board = signal<('' | Player)[]>(EMPTY_BOARD);
  history = signal<String[]>([]);

  gameResult: Signal<GameResult> = computed(() =>
    getCurrentResult(this.board())
  );

  isGameOver: Signal<boolean> = computed(
    () => this.gameResult() !== GAME_RESULT.INGAME
  );

  togglePlayer() {
    this.currentPlayer.update((prevPlayer) =>
      prevPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X
    );
  }

  applyMoveToBoard(index: number) {
    const newBoard = [...this.board()];
    newBoard[index] = this.currentPlayer();
    this.board.set(newBoard);
  }

  addResultToHistory() {
    const result = this.gameResult();
    const display = getDisplayText(result);
    this.history.update((prev) => [...prev, display]);
  }
}
