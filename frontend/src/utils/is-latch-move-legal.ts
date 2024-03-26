import { Block, isBlockIncluding, isBlockColliding } from "blockwise";
import { Puzzle } from "core";

export function isLatchMoveLegal(puzzle: Puzzle, movedBlock: Block): boolean {
	if (puzzle.bits.some(b => isBlockColliding(b.block, movedBlock))) {
		return false;
	}

	const guideBlock = { x: 0, y: 2, h: 1, w: puzzle.block.w };

	if (!isBlockIncluding(guideBlock, movedBlock)) {
		return false;
	}

	if (!isBlockIncluding(puzzle.block, movedBlock)) {
		return false;
	}

	return true;
}
