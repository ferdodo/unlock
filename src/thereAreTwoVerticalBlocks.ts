import { Puzzle } from "./puzzle";

export function thereAreTwoVerticalBlocks(puzzle: Puzzle): boolean {
	const blocks = puzzle.bits.map(b => b.block);
	let verticalBlockCount = 0;

	for (const block of blocks) {
		if (block.h > 2) {
			verticalBlockCount++;

			if (verticalBlockCount > 1) {
				return true;
			}
		}
	}

	return false;
}
