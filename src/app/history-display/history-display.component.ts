import { Component, inject } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { GameResult } from '../game-container/gameTypes';
import { GameService } from '../game.service';
import { filter, map, scan } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-history-display',
  imports: [MatList, MatListItem, AsyncPipe, NgFor],
  templateUrl: './history-display.component.html',
  styleUrl: './history-display.component.scss',
})
export class HistoryDisplayComponent {
  private gameService = inject(GameService);

  getDisplayText = this.gameService.getDisplayText;
  gameResult$ = this.gameService.gameResult$;

  history$ = this.gameResult$.pipe(
    scan((history, currentResult) => {
      return [...history, currentResult];
    }, [] as GameResult[]),
    map((history) => history.filter((gameResult) => gameResult !== 'new game'))
  );
}
