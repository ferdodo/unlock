import { Observable, share } from "rxjs";
import { generatePuzzle } from "./generatePuzzle";
import { Block } from "./Block";
import { bitMoved$ } from "./bitMoved";
import { latchMoved$ } from "./latchMoved";
import { incrementMoveCount } from "./moveCount";
import { Bit } from "./bit";

export interface Latch {
	block: Block
}

export interface Puzzle {
	latch: Latch;
	bits: Bit[];
	block: Block;
}

let puzzle = generatePuzzle();

export function getPuzzle(): Puzzle {
	return puzzle;
}

export function puzzleUnresolved(puzzle: Puzzle): boolean {
	return puzzle.latch.block.x !== puzzle.block.w - puzzle.latch.block.w;
}

export const puzzle$: Observable<Puzzle> = new Observable(function(subscriber) {
	bitMoved$.subscribe(function(movedBit: Bit) {
		const bits = puzzle.bits.map(bit => (bit.id === movedBit.id) ? movedBit : bit);
		incrementMoveCount();
		puzzle = { ...puzzle, bits };
		subscriber.next(puzzle);
	});

	latchMoved$.subscribe(function(movedLatch: Latch) {
		puzzle = { ...puzzle, latch: movedLatch };
		incrementMoveCount();
		subscriber.next(puzzle);
	});

	subscriber.next(puzzle);
}).pipe(share<Puzzle | unknown>()) as Observable<Puzzle>;

export function getBit(id: number): Bit {
	const bit: Bit | undefined = puzzle.bits.find(b => b.id === id);

	if (bit === undefined) {
		throw Error("Bit not found !");
	}

	return bit;
}
