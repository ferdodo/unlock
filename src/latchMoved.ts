import { Observable } from "rxjs";
import { MoveLatchEvent, moveLatchEvents$ } from "./moveLatchEvent";
import { Latch, getPuzzle, puzzle$, puzzleUnresolved } from "./puzzle";
import { isLatchMoveLegal } from "./isLatchMoveLegal";
import { Block } from "./Block";

export const latchMoved$ = new Observable<Latch>(function(subscriber) {
	let puzzle = getPuzzle();
	puzzle$.subscribe(value => puzzle = value);

	moveLatchEvents$.subscribe(function(moveLatchEvent: MoveLatchEvent) {
		if (puzzleUnresolved(puzzle)) {
			const movedBlock: Block = {
				...puzzle.latch.block,
				x: moveLatchEvent.x
			}

			const movedLatch = {
				...puzzle.latch,
				block: movedBlock
			};
			
			if (isLatchMoveLegal(puzzle, movedBlock)) {
				subscriber.next(movedLatch);
			}
		}
	});
});
