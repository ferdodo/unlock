import { Block } from "./Block";
import { Puzzle } from "./puzzle";
import { boxIncludes } from "./boxIncludes";
import { boxCollides } from "./boxCollides";

export function isBitMoveLegal(puzzle: Puzzle, bitId: number, movedBlock: Block) {
	if (!boxIncludes(puzzle.block, movedBlock)) {
		return false;
	}

	for (const bit of puzzle.bits) {
		if (bit.id !== bitId && boxCollides(bit.block, movedBlock)) {
			return false;
		}
	}

	if (boxCollides(puzzle.latch.block, movedBlock)) {
		return false;	
	}

	return true;
}
