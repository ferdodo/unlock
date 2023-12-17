import { currentPuzzle$ } from "unlock/observables/current-puzzle";
import { Observable, map } from "rxjs";

export const win$: Observable<boolean> = currentPuzzle$.pipe(
	map(function(puzzle) {
		return puzzle.latch.block.x === puzzle.block.w - puzzle.latch.block.w;
	})
);
