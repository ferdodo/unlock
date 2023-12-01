import { Puzzle } from "./puzzle";
import { Block } from "./Block";
import { boxCollides } from "./boxCollides";

export function guideBlockIsCollided(puzzle: Puzzle): boolean {
	const blocks = puzzle.bits.map(b => b.block);
	const block1: Block = { w: 1, h: 1, x: 2, y: 2 };
	const block2: Block = { w: 1, h: 1, x: 3, y: 2 };
	const block3: Block = { w: 1, h: 1, x: 4, y: 2 };
	const block4: Block = { w: 1, h: 1, x: 5, y: 2 };

	if (blocks.every(b => !boxCollides(b, block1))) {
		return false;
	}

	if (blocks.every(b => !boxCollides(b, block2))) {
		return false;
	}

	if (blocks.every(b => !boxCollides(b, block3))) {
		return false;
	}

	if (blocks.every(b => !boxCollides(b, block4))) {
		return false;
	}

	for (let y = 0; y < puzzle.block.h; y++) {
		const endLineBlock : Block = { w: 1, h: 1, x: puzzle.block.w-1, y };

		if (blocks.every(b => !boxCollides(b, endLineBlock))) {
			return false;
		}
	}

	for (let y = 0; y < puzzle.block.h; y++) {
		const endLineBlock : Block = { w: 1, h: 1, x: puzzle.block.w-2, y };

		if (blocks.every(b => !boxCollides(b, endLineBlock))) {
			return false;
		}
	}

	for (let y = 0; y < puzzle.block.h; y++) {
		const endLineBlock : Block = { w: 1, h: 1, x: puzzle.block.w-3, y };

		if (blocks.every(b => !boxCollides(b, endLineBlock))) {
			return false;
		}
	}

	for (let y = 0; y < puzzle.block.h; y++) {
		const endLineBlock : Block = { w: 1, h: 1, x: puzzle.block.w-4, y };

		if (blocks.every(b => !boxCollides(b, endLineBlock))) {
			return false;
		}
	}


	return true;
}
