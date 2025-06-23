import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { GameService } from '../game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GAME_RESULT, GameResult, Player } from './game-container.types';

@Component({
  selector: 'app-game-container',
  imports: [MatGridList, MatGridTile, MatButtonModule],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameContainerComponent {
  private readonly gameService = inject(GameService);

  protected readonly gameResult = toSignal(this.gameService.gameResult$);
  protected readonly board = toSignal(this.gameService.board$);
  protected readonly currentPlayer = toSignal(this.gameService.currentPlayer$);
  protected readonly isGameOver = toSignal(this.gameService.isGameOver$);

  onCellClick(index: number, cell: string): void {
    if (cell !== '') return;
    this.gameService.cellClick$.next(index);
  }

  onResetClick(): void {
    this.gameService.resetClick$.next();
  }
}
