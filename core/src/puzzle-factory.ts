import { Puzzle } from "core";
import { Block } from "blockwise";

export class PuzzleFactory {
	#puzzle: Puzzle;

	constructor() {
		this.#puzzle = {
			bits: [],
			latch: {
				block: {
					x: 0,
					y: 2,
					w: 2,
					h: 1
				}
			},
			block: {
				x: 0,
				y: 0,
				w: 6,
				h: 6
			},
			moveCount: 0
		};
	}

	addBit(block: Block): PuzzleFactory {
		this.#puzzle.bits.push({
			id: this.#puzzle.bits.length,
			block
		});

		return this;
	}

	setLatch(block: Block): PuzzleFactory {
		this.#puzzle.latch.block = block;
		return this;
	}

	setMoveCount(count: number) {
		this.#puzzle.moveCount = count;
		return this;
	}

	build(): Puzzle {
		return this.#puzzle;
	}
}
