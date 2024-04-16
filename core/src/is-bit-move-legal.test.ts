import { test, expect } from "vitest";
import { isBitMoveLegal, Puzzle, Bit, PuzzleFactory } from "core";

test("Shall be illegal to move outside the puzzle", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.build();

	const bit: Bit = {
		id: 0,
		block: {
			x: 20,
			y: 0,
			w: 1,
			h: 2
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeFalsy();
});

test("Shall be illegal to collide another bit", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 2, y: 0, w: 1, h: 2 })
		.build();

	const bit: Bit = {
		id: 99,
		block: {
			x: 2,
			y: 0,
			w: 1,
			h: 2
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeFalsy();
});

test("Shall be illegal to collide latch", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.build();

	const bit: Bit = {
		id: 0,
		block: {
			x: 0,
			y: 2,
			w: 1,
			h: 2
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeFalsy();
});

test("Shall be legal for block to collides its old position", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 0, w: 2, h: 1 })
		.addBit({ x: 2, y: 5, w: 1, h: 2 })
		.build();

	const bit: Bit = {
		id: 0,
		block: {
			x: 2,
			y: 0,
			w: 2,
			h: 1
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeTruthy();
});

test("Shall be illegal for block to move into it's old position", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 0, w: 2, h: 1 })
		.addBit({ x: 2, y: 5, w: 1, h: 2 })
		.build();

	const bit: Bit = {
		id: 0,
		block: {
			x: 1,
			y: 0,
			w: 2,
			h: 1
		}
	};

	const legal = isBitMoveLegal(puzzle, bit);
	expect(legal).toBeFalsy();
});
