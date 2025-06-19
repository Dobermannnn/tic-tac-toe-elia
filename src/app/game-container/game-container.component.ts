import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { AsyncPipe, NgFor } from '@angular/common';
import  {GAME_RESULT} from "./game-container.types"
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
  INGAME = GAME_RESULT.INGAME;
  getDisplayText = getDisplayText;
  gameResult$ = this.gameService.gameResult$;
  board$ = this.gameService.board$;
  currentPlayer$ = this.gameService.currentPlayer$;

  onCellClick(index: number): void {
    this.gameService.cellClick$.next(index);
  }

  onResetClick(): void {
    this.gameService.resetClick$.next();
  }
}
