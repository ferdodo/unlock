import { Observable } from "rxjs";
import { moveBitEvents$, MoveBitEvent } from "./moveBitEvent";
import { getPuzzle, puzzle$, Bit, puzzleUnresolved, getBit } from "./puzzle";
import { isBitMoveLegal } from "./isBitMoveLegal";
import { Block } from "./Block";

export const bitMoved$ = new Observable<Bit>(function(subscriber) {
	let puzzle = getPuzzle();
	puzzle$.subscribe(value => puzzle = value);

	moveBitEvents$.subscribe(function(moveBitEvent: MoveBitEvent) {
		if (puzzleUnresolved(puzzle)) {
			const bit = getBit(moveBitEvent.id);
			const movedBlock: Block = { ...bit.block, x: moveBitEvent.x, y: moveBitEvent.y };
			const movedBit: Bit = { ...bit, block: movedBlock };

			if (isBitMoveLegal(puzzle, moveBitEvent.id, movedBlock)) {
				subscriber.next(movedBit)
			}
		}
	});
});
