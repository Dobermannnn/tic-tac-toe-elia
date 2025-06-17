import { Component, Input } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { getDisplayText } from '../util';

@Component({
  selector: 'app-history-display',
  imports: [MatList,MatListItem],
  templateUrl: './history-display.component.html',
  styleUrl: './history-display.component.scss'
})
export class HistoryDisplayComponent {
  history: string[] = ['tie', 'X'];

  getDisplayText = getDisplayText;
}
