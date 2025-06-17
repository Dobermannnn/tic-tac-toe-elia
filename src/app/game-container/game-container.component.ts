import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { GameResult, PlayerType } from './gameTypes';
import { getDisplayText } from '../util';
import { map, Observable, scan, startWith, Subject, tap } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
@Component({
  selector: 'app-game-container',
  imports: [MatGridList, MatGridTile, MatButtonModule, AsyncPipe, NgFor],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
})
export class GameContainerComponent {
  getDisplayText = getDisplayText;

  isGameOver: boolean = true;
  gameScore: GameResult = 'new game';
  currentPlayer: PlayerType = 'X';

  private cellClick$ = new Subject<number>();

  board$: Observable<('' | PlayerType)[]> = this.cellClick$.pipe(
    startWith(-1),
    scan((board, index) => {
      if (index === -1) {
        return this.getEmptyBoard();
      } else if (board[index] !== '') {
        return board;
      }

      const newBoard = [...board];
      newBoard[index] = this.currentPlayer;

      this.changePlayerTurn();

     
      return newBoard;
    }, this.getEmptyBoard())
  );

  onCellClick(index: number):void {
    this.cellClick$.next(index);
  }

  changePlayerTurn():void {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  }

  checkIfGameOver() {
  
  }

  getEmptyBoard(): (PlayerType | '')[] {
    return Array(9).fill('') as (PlayerType | '')[];
  }
}
