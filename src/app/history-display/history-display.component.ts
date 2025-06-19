import { Component, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { GAME_RESULT, GameResult,  } from '../game-container/game-container.types';
import { GameService } from '../game.service';
import { scan } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { getDisplayText } from '../game-container.utils';

@Component({
  selector: 'app-history-display',
  imports: [MatList, MatListItem, AsyncPipe],
  templateUrl: './history-display.component.html',
  styleUrl: './history-display.component.scss',
})
export class HistoryDisplayComponent {
  private gameService = inject(GameService);
  getDisplayText = getDisplayText;
  gameResult$ = this.gameService.gameResult$;

  history$ = this.gameResult$.pipe(
    scan((history, currentResult) => {
      return currentResult !== GAME_RESULT.INGAME ? [...history, currentResult] : history;
    }, [] as GameResult[])
  );
}
