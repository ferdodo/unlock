import { Block } from "blockwise";
import { Bit } from "unlock/bit";
import { Latch } from "unlock/latch";

export interface Puzzle {
	latch: Latch;
	bits: Bit[];
	block: Block;
}

export function puzzleUnresolved(puzzle: Puzzle): boolean {
	return puzzle.latch.block.x !== puzzle.block.w - puzzle.latch.block.w;
}
