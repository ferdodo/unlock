import { Block } from "./Block";
import { Puzzle } from "./puzzle";
import { boxIncludes } from "./boxIncludes";
import { boxCollides } from "./boxCollides";

export function isLatchMoveLegal(puzzle: Puzzle, movedBlock: Block): boolean {
	if (puzzle.bits.some(b => boxCollides(b.block, movedBlock))) {
		return false;
	}

	if (!boxIncludes(puzzle.block, movedBlock)) {
		return false;
	}

	return true;
}
