import { Puzzle } from "core";
import { Observable } from "rxjs";

export interface UnlockContext {
	currentPuzzle: Puzzle;
	moveCount: number;
	mouseClicks$: Observable<void>;
	mouseUps$: Observable<void>;
	mousePosition$: Observable<void>;
	backClicks$: Observable<void>;
}
