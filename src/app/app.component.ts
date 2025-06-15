import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameContainerComponent } from './game-container/game-container.component';
import { MatToolbar } from '@angular/material/toolbar';
import { HistoryDisplayComponent } from './history-display/history-display.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GameContainerComponent,MatToolbar,HistoryDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tic-tac-toe';

  getDisplayText(score: string): string {
    return score === 'tie' ? "It's a tie!" : `${score} Won!`;
  }
}
