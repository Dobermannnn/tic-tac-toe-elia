import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  merge,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import {
  GameResult,
  PLAYERS,
  Player,
} from './game-container/game-container.types';
import { EMPTY_BOARD, getCurrentResult } from './game-container.utils';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cellClick$ = new Subject<number>();

  resetClick$ = new Subject<void>();

  currentPlayer$: Observable<Player> = this.cellClick$.pipe(
    scan(
      (player) => (player === PLAYERS.X ? PLAYERS.O : PLAYERS.X),
      PLAYERS.X as Player
    ),
    startWith(PLAYERS.X)
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
}
