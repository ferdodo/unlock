import { Block } from "./Block";
import { Bit } from "unlock/bit";
import { Latch } from "unlock/latch";
import { getCurrentPuzzle } from "unlock/current-puzzle";

export interface Puzzle {
	latch: Latch;
	bits: Bit[];
	block: Block;
}

export function puzzleUnresolved(puzzle: Puzzle): boolean {
	return puzzle.latch.block.x !== puzzle.block.w - puzzle.latch.block.w;
}

export function getBit(id: number): Bit {
	const puzzle: Puzzle = getCurrentPuzzle();
	const bit: Bit | undefined = puzzle.bits.find(b => b.id === id);

	if (bit === undefined) {
		throw Error("Bit not found !");
	}

	return bit;
}
