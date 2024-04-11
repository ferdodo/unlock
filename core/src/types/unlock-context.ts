import { Puzzle } from "core";
import { Block } from "blockwise";
import { Observable } from "rxjs";

export interface UnlockContextClass {
	new(
		puzzle: Puzzle,
		mouseClicks$: Observable<void>,
		mouseUps$: Observable<void>,
		mousePosition$: Observable<void>,
		backClicks$: Observable<void>
	): UnlockContext;
}

export interface UnlockContext {
	initialPuzzle: Puzzle;
	mouseClicks$: Observable<Block>;
	mouseUps$: Observable<void>;
	mousePosition$: Observable<Block>;
	backClicks$: Observable<void>;
}
