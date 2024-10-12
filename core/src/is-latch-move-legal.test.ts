import { test, expect } from "vitest";
import { isLatchMoveLegal, Puzzle, PuzzleFactory } from ".";
import { Block } from "blockwise";

test("Shall be legal to move latch to it's old position", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 2, y: 5, w: 1, h: 2 })
		.build();

	const block: Block = { x: 0, y: 2, h: 1, w: 2 };
	const legal = isLatchMoveLegal(puzzle, block);
	expect(legal).toBeTruthy();
});

test("Shall be illegal to move latch onto a bit", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 2, y: 5, w: 1, h: 2 })
		.addBit({ x: 0, y: 2, w: 1, h: 2 })
		.build();

	const block: Block = { x: 0, y: 2, h: 1, w: 2 };
	const legal = isLatchMoveLegal(puzzle, block);
	expect(legal).toBeFalsy();
});

test("Latch should only go in a straight line", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 2, y: 5, w: 1, h: 2 })
		.build();

	const block: Block = { x: 0, y: 3, h: 1, w: 2 };
	const legal = isLatchMoveLegal(puzzle, block);
	expect(legal).toBeFalsy();
});
