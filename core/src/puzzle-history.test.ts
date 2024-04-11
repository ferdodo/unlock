import { test, expect } from "vitest";
import { PuzzleHistory, PuzzleFactory } from "core";

test("should rewind state to previous", function() {
	const puzzle = new PuzzleFactory().build();
	const puzzleHistory = new PuzzleHistory(puzzle);

	const puzzle1 = new PuzzleFactory()
		.setLatch({ x: 1, y: 2, w: 2, h: 1 })
		.setMoveCount(1)
		.build();

	puzzleHistory.append(puzzle1);

	const puzzle2 = new PuzzleFactory()
		.setLatch({ x: 2, y: 2, w: 2, h: 1 })
		.setMoveCount(2)
		.build();

	puzzleHistory.append(puzzle2);
	let rewindedPuzzle;
	expect(puzzleHistory.size).toEqual(3);
	rewindedPuzzle = puzzleHistory.rewind();
	expect(puzzleHistory.size).toEqual(2);
	expect(rewindedPuzzle?.latch.block.x).toEqual(1);
	rewindedPuzzle = puzzleHistory.rewind();
	expect(puzzleHistory.size).toEqual(1);
	expect(rewindedPuzzle?.latch.block.x).toEqual(0);
});

test("rewinding on initial state should do nothing", function() {
	const puzzle = new PuzzleFactory().build();
	const puzzleHistory = new PuzzleHistory(puzzle);
	expect(puzzleHistory.size).toEqual(1);
	const rewindedPuzzle = puzzleHistory.rewind();
	expect(puzzleHistory.size).toEqual(1);
	expect(rewindedPuzzle).toEqual(undefined);
});

test("should not append puzzle that are in transitionnal state", function() {
	const puzzle = new PuzzleFactory().build();
	const puzzleHistory = new PuzzleHistory(puzzle);

	const puzzle2 = new PuzzleFactory()
		.setMoveCount(1)
		.build();

	puzzleHistory.append({ ...puzzle2, latchIsMoved: true });
	expect(puzzleHistory.size).toEqual(1);
});

test("should not append puzzle with the same moveCount", function() {
	const puzzle = new PuzzleFactory().build();
	const puzzleHistory = new PuzzleHistory(puzzle);
	puzzleHistory.append(puzzle);
	expect(puzzleHistory.size).toEqual(1);
	puzzleHistory.append(puzzle);
	expect(puzzleHistory.size).toEqual(1);
});
