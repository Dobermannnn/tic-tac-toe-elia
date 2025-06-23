import {
  computed,
  Injectable,
  linkedSignal,
  Signal,
  signal,
} from '@angular/core';
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

  gameResult: Signal<GameResult> = computed(() =>
    getCurrentResult(this.board())
  );

  isGameOver: Signal<boolean> = computed(
    () => this.gameResult() !== GAME_RESULT.INGAME
  );

  history = linkedSignal<GameResult, string[]>({
    source: (): GameResult => this.gameResult(),
    computation: (
      source: GameResult,
      prev?: { source: GameResult; value: string[] }
    ) => {
      const currHistory = prev?.value ?? [];

      if (source !== GAME_RESULT.INGAME)
        return [...currHistory, getDisplayText(source)];

      return currHistory;
    },
  });

  togglePlayer() {
    this.currentPlayer.update((prevPlayer) =>
      prevPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X
    );
  }

  applyMoveToBoard(index: number) {
    this.board.update((prevBoard) => {
      const board = [...prevBoard];
      board[index] = this.currentPlayer();

      return board;
    });
  }
}
