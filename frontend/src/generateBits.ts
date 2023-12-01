import { Puzzle, Bit } from "./puzzle";
import { Block } from "./Block";
import { generateId } from "./generateId";
import { boxCollides } from "./boxCollides";
import { boxIncludes } from "./boxIncludes";
import { randomNumber } from "./randomNumber";

export function generateBits(puzzle: Puzzle): Bit[] {
	const bits: Bit[] = [];
	const guideBlock: Block = { x: 0, y: 2, w: puzzle.block.w, h: 1 };

	for (let incorrectBlocks = 0; incorrectBlocks < 1000;) {
		const block = generateBlock();

		if (bits.some(b => boxCollides(b.block, block))) {
			incorrectBlocks++;
			continue;
		}

		if (boxCollides(block, guideBlock)) {
			incorrectBlocks++;
			continue;
		}

		if (!boxIncludes(puzzle.block, block)) {
			incorrectBlocks++;
			continue;
		}

		bits.push({
			id: generateId(),
			block
		});
	}

	return bits;
}


function generateBlock(): Block {
	const direction = randomNumber(0, 100) > 50;

	return {
		x: randomNumber(0, 7),
		y: randomNumber(0, 7),
		w: direction ? randomNumber(2, 4): 1,
		h: direction ? 1 : randomNumber(2, 4)
	};
}
