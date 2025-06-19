import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  merge,
  Observable,
  scan,
  startWith,
  Subject,
  withLatestFrom,
} from 'rxjs';
import {
  GameResult,
  INGAME,
  PLAYER_ONE,
  PLAYER_TWO,
  PlayerType,
} from './game-container/game-container.types';
import { EMPTY_BOARD, getCurrentResult } from './game-container.utils';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cellClick$ = new Subject<number>();

  NEW_GAME_CODE = -1;

  resetClick$ = new Subject<void>();

  currentPlayer$: Observable<PlayerType> = this.cellClick$.pipe(
    scan(
      (player) => (player === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE),
      PLAYER_ONE as PlayerType
    )
  );

  board$: Observable<('' | PlayerType)[]> = this.cellClick$.pipe(
    startWith(-1),
    scan((board, index) => {


      const newBoard = [...board];
      newBoard[index] = player;

      return newBoard;
    }, EMPTY_BOARD)
  );

  gameResult$: Observable<GameResult> = this.board$.pipe(
    map((board) => getCurrentResult(board))
  );
}
