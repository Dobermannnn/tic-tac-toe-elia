import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { GameResult, PlayerType } from './gameTypes';
import { Observable, scan, startWith, Subject } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

import { GameService } from '../game.service';

@Component({
  selector: 'app-game-container',
  imports: [MatGridList, MatGridTile, MatButtonModule, AsyncPipe, NgFor],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
})
export class GameContainerComponent {
  private gameService = inject(GameService);

  getDisplayText = this.gameService.getDisplayText;
  gameResult$ = this.gameService.gameResult$;

  currentPlayer: PlayerType = 'X';

  private cellClick$ = new Subject<number>();
  NEW_GAME_CODE = -1;

  board$: Observable<('' | PlayerType)[]> = this.cellClick$.pipe(
    startWith(this.NEW_GAME_CODE),
    scan((board, index) => {
      if (index === this.NEW_GAME_CODE) {
        this.gameResult$.next('new game');
        return this.getEmptyBoard();
      } else if (
        board[index] !== '' ||
        this.gameResult$.getValue() != 'new game'
      ) {
        return board;
      }

      const newBoard = [...board];
      newBoard[index] = this.currentPlayer;

      if (this.checkIfGameOver(newBoard)) {
        return newBoard;
      }

      this.changePlayerTurn();

      return newBoard;
    }, this.getEmptyBoard())
  );

  onCellClick(index: number): void {
    this.cellClick$.next(index);
  }

  changePlayerTurn(): void {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  }

  checkIfGameOver(currentBoard: ('' | PlayerType)[]): boolean {
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
        this.gameResult$.next(currentBoard[a]);
        return true;
      }
    }
    if (!currentBoard.includes('')) {
      this.gameResult$.next('tie');
      return true;
    }
    return false;
  }

  getEmptyBoard(): (PlayerType | '')[] {
    return Array(9).fill('') as (PlayerType | '')[];
  }
}
