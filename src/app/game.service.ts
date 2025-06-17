import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameResult } from './game-container/gameTypes';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameResult$: BehaviorSubject<GameResult> = new BehaviorSubject('new game' as GameResult);

  getDisplayText = (score: GameResult): string =>
  score === 'tie' ? "It's a tie!" : `${score} Won!`;
}
