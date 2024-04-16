import { test, expect } from "vitest";
import { createPuzzleObservable, Puzzle, PuzzleFactory, ContextFactory, blockPixelSize } from "core";

test("backClicks should revert puzzle to it's initial state", function() {
	const puzzleFactory = new PuzzleFactory();
	let puzzle = puzzleFactory.build();
	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitMousePosition({ x: 1, y: 2, w: 0, h: 0 })
		.emitMouseClick({ x: 1, y: 2, w: 0, h: 0 })
		.emitMousePosition({ x: 2, y: 2, w: 0, h: 0 })
		.emitMouseUp();

	expect(puzzle.latch.block.x).toEqual(1);
	contextFactory.emitBackClicks();
	expect(puzzle.latch.block.x).toEqual(0);
	expect(puzzle.moveCount).toEqual(0);
	subscription.unsubscribe();
});

test("Rewinding puzzle without history should have no effect", function() {
	const puzzleFactory = new PuzzleFactory();
	let puzzle = puzzleFactory.build();
	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);
	contextFactory.emitBackClicks();
	expect(puzzle).toBeTruthy();
	subscription.unsubscribe();
});

test("should not emit puzzle while moving mouse around without clicking", function() {
	const puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	let emitedPuzzle: Puzzle | null = null;
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => emitedPuzzle = value);

	contextFactory.emitMousePosition({ x: 0, y: 0, w: 0, h: 0 })
		.emitMousePosition({ x: 0, y: 1, w: 0, h: 0 })
		.emitMousePosition({ x: 0, y: 2, w: 0, h: 0 })
		.emitMousePosition({ x: 0, y: 3, w: 0, h: 0 })
		.emitMousePosition({ x: 1, y: 3, w: 0, h: 0 })
		.emitMousePosition({ x: 1, y: 2, w: 0, h: 0 })
		.emitMousePosition({ x: 1, y: 1, w: 0, h: 0 })
		.emitMouseUp();

	expect(emitedPuzzle).toBeFalsy();
	subscription.unsubscribe();
});

test("should move a bit on x axis when clicking, moving, and release it on a legal move", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.addBit({ x: 5, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitMousePosition({ x: 1, y: 1, w: 0, h: 0 })
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitMousePosition({ x: 2, y: 1, w: 0, h: 0 })
		.emitMouseUp();

	const movedBit = puzzle.bits.find(bit => bit.id === 0);
	const unmovedBit = puzzle.bits.find(bit => bit.id === 1);

	if (movedBit === undefined) {
		throw new Error("movedBit is undefined !");
	}

	if (unmovedBit === undefined) {
		throw new Error("Unmoved bit is undefined !");
	}

	expect(movedBit.block.x).toEqual(2);
	expect(unmovedBit.block.x).toEqual(5);
	expect(puzzle.moveCount).toEqual(1);
	subscription.unsubscribe();
});

test("should move a bit on y axis when clicking, moving, and release it on a legal move", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.setLatch({ x: 3, y: 2, w: 2, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);
	contextFactory.emitMousePosition({ x: 1, y: 1, w: 0, h: 0 });
	contextFactory.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 });
	expect(puzzle.latchIsMoved).toBeFalsy();
	contextFactory.emitMousePosition({ x: 1, y: 2, w: 0, h: 0 });
	contextFactory.emitMouseUp();
	expect(puzzle.bits[0].block.y).toEqual(2);
	subscription.unsubscribe();
});

test("should not move a bit on illegal move", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.addBit({ x: 2, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitMousePosition({ x: 1, y: 1, w: 0, h: 0 })
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitMousePosition({ x: 2, y: 1, w: 0, h: 0 })
		.emitMouseUp();

	const bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(1);
	expect(puzzle.candidate).toBeFalsy();
	subscription.unsubscribe();
});

test("should not move latch on illegal move", function() {
	const puzzleFactory = new PuzzleFactory();
	let puzzle = puzzleFactory.build();
	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitMousePosition({ x: 1, y: 2, w: 0, h: 0 })
		.emitMouseClick({ x: 1, y: 2, w: 0, h: 0 })
		.emitMousePosition({ x: 0, y: 2, w: 0, h: 0 })
		.emitMouseUp();

	expect(puzzle.latch.block.x).toEqual(0);
	expect(puzzle.latchIsMoved).toBeFalsy();
	subscription.unsubscribe();
});

test("should move bit in right direction on playground touch", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(blockPixelSize * 2.5),
			y: 0
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(2);

	subscription.unsubscribe();
});

test("should move bit in left direction on playground touch", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(-blockPixelSize * 2.5),
			y: 0
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(0);

	subscription.unsubscribe();
});

test("should move bit in down direction on playground touch", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 0, y: 0, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 0,
		cordStartY: 0,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 0, y: 0, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 0,
			cordStartY: 0,
			startX: 0,
			startY: 0,
			x: 0,
			y: Math.floor(blockPixelSize * 2.5)
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.y).toEqual(1);

	subscription.unsubscribe();
});

test("should move bit in up direction on playground touch", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: 0,
			y: Math.floor(-blockPixelSize * 2.5)
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.y).toEqual(0);

	subscription.unsubscribe();
});

test("small playground touches in right direction shall not trigger moves", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(blockPixelSize * 0.5),
			y: 0
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(1);
	subscription.unsubscribe();
});

test("small playground touches in left direction shall not trigger moves", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(-blockPixelSize * 0.5),
			y: 0
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(1);
	subscription.unsubscribe();
});

test("small playground touches in up direction shall not trigger moves", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: 0,
			y: Math.floor(-blockPixelSize * 0.5)
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.y).toEqual(1);
	subscription.unsubscribe();
});

test("small playground touches in down direction shall not trigger moves", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 0, y: 0, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 0,
		cordStartY: 0,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 0, y: 0, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 0,
			cordStartY: 0,
			startX: 0,
			startY: 0,
			x: 0,
			y: Math.floor(blockPixelSize * 0.5)
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.y).toEqual(0);
	subscription.unsubscribe();
});

test("should prevent to do a quick reverting move", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(blockPixelSize * 2.5),
			y: 0
		})
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(-blockPixelSize * 2.5),
			y: 0
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(2);

	subscription.unsubscribe();
});

test("should prevent to do quickly the same move", function() {
	let puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const contextFactory = new ContextFactory(puzzle);
	const context = contextFactory.build();
	const puzzleObservable = createPuzzleObservable(context);
	const subscription = puzzleObservable.subscribe(value => puzzle = value);

	contextFactory.emitPlaygroundTouch({
		cordStartX: 1,
		cordStartY: 1,
		startX: 0,
		startY: 0,
		x: 0,
		y: 0
	})
		.emitMouseClick({ x: 1, y: 1, w: 0, h: 0 })
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(blockPixelSize * 2.5),
			y: 0
		})
		.emitPlaygroundTouch({
			cordStartX: 1,
			cordStartY: 1,
			startX: 0,
			startY: 0,
			x: Math.floor(blockPixelSize * 4.5),
			y: 0
		})
		.emitMouseUp();

	let bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(2);

	subscription.unsubscribe();
});
