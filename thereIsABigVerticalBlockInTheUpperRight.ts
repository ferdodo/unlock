import { Puzzle } from "./puzzle";

export function thereIsABigVerticalBlockInTheUpperRight(puzzle: Puzzle): boolean {
	const blocks = puzzle.bits.map(b => b.block);

	for (const block of blocks) {
		if (block.h > 2) {
			if (block.y === 0) {
				if (block.x > (puzzle.block.w -2)) {
					return true;
				}
			}
		}
	}

	return false;
}
