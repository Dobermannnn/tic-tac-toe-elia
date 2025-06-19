import { Injectable } from '@angular/core';
import {
  map,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs';
import { EMPTY_BOARD, getCurrentResult } from './game-container.utils';
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
  cellClick$ = new Subject<number>();

  resetClick$ = new Subject<void>();

  currentPlayer$: Observable<Player> = this.cellClick$.pipe(
    scan(
      (player) => (player === PLAYERS.X ? PLAYERS.O : PLAYERS.X),
      PLAYERS.O as Player
    ),
    startWith(PLAYERS.O)
  );

  board$: Observable<('' | Player)[]> = this.resetClick$.pipe(
    startWith(null),
    switchMap(() =>
      this.cellClick$.pipe(
        withLatestFrom(this.currentPlayer$),
        scan((board, [index, player]) => {
          if (board[index] !== '') return board;

          const newBoard = [...board];
          newBoard[index] = player;

          return newBoard;
        }, EMPTY_BOARD),
        startWith(EMPTY_BOARD)
      )
    )
  );

  gameResult$: Observable<GameResult> = this.board$.pipe(map(getCurrentResult));

  isGameOver$: Observable<boolean> = this.gameResult$.pipe(
    map((gameResult) => gameResult !== GAME_RESULT.INGAME)
  );
}
