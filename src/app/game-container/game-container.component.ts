import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { INGAME } from './game-container.types';
import { AsyncPipe, NgFor } from '@angular/common';

import { GameService } from '../game.service';
import { EMPTY_BOARD, getDisplayText } from '../game-container.utils';

@Component({
  selector: 'app-game-container',
  imports: [MatGridList, MatGridTile, MatButtonModule, AsyncPipe],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
})
export class GameContainerComponent {
  private gameService = inject(GameService);
  INGAME = INGAME;
  getDisplayText = getDisplayText;
  gameResult$ = this.gameService.gameResult$;
  board$ = this.gameService.board$;
  resetClick$ = this.gameService.resetClick$;
  cellClick$ = this.gameService.cellClick$;
  currentPlayer$ = this.gameService.currentPlayer$;

  onCellClick(index: number): void {
    this.cellClick$.next(index);
  }

  onResetClick(): void {
    this.resetClick$.next(true);
    this.resetClick$.next(false);
  }
}
