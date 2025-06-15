import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-game-container',
  imports: [NgFor,MatGridList,MatGridTile,MatButtonModule,NgIf],
  templateUrl: './game-container.component.html',
  styleUrl: './game-container.component.scss'
})
export class GameContainerComponent {
  board: string[] = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'X'];
  
  isGameOver: boolean = true;
  gameScore: string = 'tie';
  
  @Input() getDisplayText!: (score: string) => string;
  
}
