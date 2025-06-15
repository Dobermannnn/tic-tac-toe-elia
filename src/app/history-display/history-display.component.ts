import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-history-display',
  imports: [MatList,MatListItem,NgFor],
  templateUrl: './history-display.component.html',
  styleUrl: './history-display.component.scss'
})
export class HistoryDisplayComponent {
  history: string[] = ['tie', 'X'];

  @Input() getDisplayText!: (score: string) => string;
}
