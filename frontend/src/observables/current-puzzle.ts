import { Observable } from "rxjs";
import { Puzzle, createPuzzleObservable } from "core";
import { context } from "unlock/context";

let puzzle: Puzzle = context.initialPuzzle;

export const currentPuzzle$: Observable<Puzzle> = createPuzzleObservable(context);

currentPuzzle$.subscribe(value => puzzle = value);

export function getCurrentPuzzle(): Puzzle {
	return puzzle;
}
