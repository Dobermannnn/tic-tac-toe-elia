import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { GameService } from '../game.service';
import { EMPTY_BOARD } from '../game-container.utils';

@Component({
  selector: 'app-game-container',
  imports: [MatGridList, MatGridTile, MatButtonModule],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameContainerComponent {
  private readonly gameService = inject(GameService);

  protected readonly gameResult = this.gameService.gameResult;
  protected readonly board = this.gameService.board;
  protected readonly isGameOver = this.gameService.isGameOver;
  protected readonly currentPlayer = this.gameService.currentPlayer;
  protected readonly history = this.gameService.history;

  protected readonly togglePlayer = this.gameService.togglePlayer;
  protected readonly applyMoveToBoard = this.gameService.applyMoveToBoard;

  onCellClick(index: number, cell: string): void {
    if (cell !== '') return;
    
    this.applyMoveToBoard(index);
    this.togglePlayer();
  }

  onResetClick(): void {
    this.board.set(EMPTY_BOARD);
  }
}
