import { ChangeDetectionStrategy, Component,  inject,  Signal } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { GameService } from '../game.service';

@Component({
  selector: 'app-history-display',
  imports: [MatList, MatListItem],
  templateUrl: './history-display.component.html',
  styleUrl: './history-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryDisplayComponent {
  private readonly gameService = inject(GameService);

  history:Signal<String[]> = this.gameService.history;
}
