import { Puzzle } from "./puzzle";

export function thereIsABigHorizontalBarInTheBottomRight(puzzle: Puzzle): boolean {
	const blocks = puzzle.bits.map(b => b.block);

	for (const block of blocks) {
		if (block.w > 2) {
			if (block.y === 5) {
				if (block.x > (puzzle.block.w -4)) {
					return true;
				}
			}
		}
	}

	return false;
}
