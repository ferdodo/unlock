import { Block, isBlockColliding, isBlockIncluding } from "blockwise";
import { Puzzle } from "unlock/interfaces/puzzle";

export function isBitMoveLegal(puzzle: Puzzle, bitId: number, movedBlock: Block) {
	if (!isBlockIncluding(puzzle.block, movedBlock)) {
		return false;
	}

	for (const bit of puzzle.bits) {
		if (bit.id !== bitId && isBlockColliding(bit.block, movedBlock)) {
			return false;
		}
	}

	if (isBlockColliding(puzzle.latch.block, movedBlock)) {
		return false;	
	}

	return true;
}
