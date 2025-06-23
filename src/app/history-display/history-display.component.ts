import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { Observable, scan } from 'rxjs';
import { getDisplayText } from '../game-container.utils';
import {
  GAME_RESULT
} from '../game-container/game-container.types';
import { GameService } from '../game.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-history-display',
  imports: [MatList, MatListItem],
  templateUrl: './history-display.component.html',
  styleUrl: './history-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryDisplayComponent {
  private readonly gameService = inject(GameService);

  history: Signal<String[]> = toSignal(this.gameService.gameResult$.pipe(
    scan((history, currentResult) => {
      return currentResult !== GAME_RESULT.INGAME
        ? [...history, getDisplayText(currentResult)]
        : history;
    }, [] as string[]))
  ,{initialValue:[]});
}
