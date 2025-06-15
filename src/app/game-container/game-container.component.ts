import { NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Signal,
  signal,
  ViewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Subject } from 'rxjs';
import { GameResult, PlayerType } from './gameTypes';

@Component({
  selector: 'app-game-container',
  imports: [NgFor, MatGridList, MatGridTile, MatButtonModule],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
})
export class GameContainerComponent implements OnInit {
  board: Signal<(PlayerType | '') []> = signal(Array(9).fill(''));

  isGameOver: boolean = false;
  gameScore: GameResult = 'tie';
  currentPlayer: PlayerType = 'X';

  @Input() getDisplayText!: (score: string) => string;

  private cellClick$ = new Subject<number>();

  ngOnInit() {
    this.cellClick$.subscribe((index) => {
      if (this.board()[index] == '') {
        this.board()[index] = this.currentPlayer;
        this.checkIfGameOver();
        this.changePlayerTurn();
      }
    });
  }

  onCellClick(index: number): void {
    this.cellClick$.next(index);
  }

  changePlayerTurn() {
    this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
  }

  checkIfGameOver() {
    if (!this.board().includes('')) {
      this.gameScore = 'tie';
      this.isGameOver = true;
    }
  }

  startOver() {
    this.board().fill('');
    this.gameScore = 'new game';
    this.isGameOver = false;
  }
}
