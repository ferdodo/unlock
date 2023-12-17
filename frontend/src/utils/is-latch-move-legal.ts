import { Block, isBlockIncluding, isBlockColliding } from "blockwise";
import { Puzzle } from "unlock/interfaces/puzzle";

export function isLatchMoveLegal(puzzle: Puzzle, movedBlock: Block): boolean {
	if (puzzle.bits.some(b => isBlockColliding(b.block, movedBlock))) {
		return false;
	}

	if (!isBlockIncluding(puzzle.block, movedBlock)) {
		return false;
	}

	return true;
}
