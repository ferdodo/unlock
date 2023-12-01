import { Puzzle } from "./puzzle";

export function thereIsAnHorizontalBlockUp(puzzle: Puzzle): boolean {
	const blocks = puzzle.bits.map(b => b.block);

	for (const block of blocks) {
		if (block.w > 1) {
			if (block.y < 2) {
				return true;
			}
		}
	}

	return false;
}
