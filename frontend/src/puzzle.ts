import { Observable, share } from "rxjs";
import { generatePuzzle } from "./generatePuzzle";
import { Block } from "./Block";
import { Bit } from "unlock/bit";

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

export const puzzle$: Observable<Puzzle> = new Observable(function() {
}).pipe(share<Puzzle | unknown>()) as Observable<Puzzle>;

export function getBit(id: number): Bit {
	const bit: Bit | undefined = puzzle.bits.find(b => b.id === id);

	if (bit === undefined) {
		throw Error("Bit not found !");
	}

	return bit;
}
