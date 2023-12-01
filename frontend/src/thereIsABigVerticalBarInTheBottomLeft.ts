import { Puzzle } from "./puzzle";

export function thereIsABigVerticalBarInTheBottomLeft(puzzle: Puzzle): boolean {
	const blocks = puzzle.bits.map(b => b.block);

	for (const block of blocks) {
		if (block.h > 2) {
			if (block.y === 3) {
				if (block.x === 0) {
					return true;
				}
			}
		}
	}

	return false;
}
