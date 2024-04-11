import { test, expect } from "vitest";
import { createPuzzleObservable, UnlockContext, Puzzle, PuzzleFactory } from "core";
import { Subject } from "rxjs";
import { Block } from "blockwise";

test("backClicks should revert puzzle to it's initial state", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.build();

	const mouseClicks$: Subject<Block> = new Subject();
	const mouseUps$: Subject<void> = new Subject();
	const mousePosition$: Subject<Block> = new Subject();
	const backClicks$: Subject<void> = new Subject();

	const context: UnlockContext = {
		initialPuzzle: puzzle,
		mouseClicks$: mouseClicks$.asObservable(),
		mouseUps$: mouseUps$.asObservable(),
		mousePosition$: mousePosition$.asObservable(),
		backClicks$: backClicks$.asObservable()
	};

	createPuzzleObservable(context)
		.subscribe(value => puzzle = value);

	mousePosition$.next({ x: 1, y: 2, w: 0, h: 0 });
	mouseClicks$.next({ x: 1, y: 2, w: 0, h: 0 });
	mousePosition$.next({ x: 2, y: 2, w: 0, h: 0 });
	mouseUps$.next();
	expect(puzzle.latch.block.x).toEqual(1);
	backClicks$.next();
	expect(puzzle.latch.block.x).toEqual(0);
	expect(puzzle.moveCount).toEqual(0);
});

test("Rewinding puzzle without history should have no effect", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.build();

	const mouseClicks$: Subject<Block> = new Subject();
	const mouseUps$: Subject<void> = new Subject();
	const mousePosition$: Subject<Block> = new Subject();
	const backClicks$: Subject<void> = new Subject();

	const context: UnlockContext = {
		initialPuzzle: puzzle,
		mouseClicks$: mouseClicks$.asObservable(),
		mouseUps$: mouseUps$.asObservable(),
		mousePosition$: mousePosition$.asObservable(),
		backClicks$: backClicks$.asObservable()
	};

	createPuzzleObservable(context)
		.subscribe(value => puzzle = value);

	backClicks$.next();
	expect(puzzle).toBeTruthy();
});

test("should not emit puzzle while moving mouse around without clicking", function() {
	const puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.build();

	const mouseClicks$: Subject<Block> = new Subject();
	const mouseUps$: Subject<void> = new Subject();
	const mousePosition$: Subject<Block> = new Subject();
	const backClicks$: Subject<void> = new Subject();

	const context: UnlockContext = {
		initialPuzzle: puzzle,
		mouseClicks$: mouseClicks$.asObservable(),
		mouseUps$: mouseUps$.asObservable(),
		mousePosition$: mousePosition$.asObservable(),
		backClicks$: backClicks$.asObservable()
	};

	let emitedPuzzle: Puzzle | null = null;

	createPuzzleObservable(context)
		.subscribe(value => emitedPuzzle = value);

	mousePosition$.next({ x: 0, y: 0, w: 0, h: 0 });
	mousePosition$.next({ x: 0, y: 1, w: 0, h: 0 });
	mousePosition$.next({ x: 0, y: 2, w: 0, h: 0 });
	mousePosition$.next({ x: 0, y: 3, w: 0, h: 0 });
	mousePosition$.next({ x: 1, y: 3, w: 0, h: 0 });
	mousePosition$.next({ x: 1, y: 2, w: 0, h: 0 });
	mousePosition$.next({ x: 1, y: 1, w: 0, h: 0 });
	mouseUps$.next();
	expect(emitedPuzzle).toBeFalsy();
});

test("should move a bit on x axis when clicking, moving, and release it on a legal move", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.addBit({ x: 5, y: 1, w: 1, h: 1 })
		.build();

	const mouseClicks$: Subject<Block> = new Subject();
	const mouseUps$: Subject<void> = new Subject();
	const mousePosition$: Subject<Block> = new Subject();
	const backClicks$: Subject<void> = new Subject();

	const context: UnlockContext = {
		initialPuzzle: puzzle,
		mouseClicks$: mouseClicks$.asObservable(),
		mouseUps$: mouseUps$.asObservable(),
		mousePosition$: mousePosition$.asObservable(),
		backClicks$: backClicks$.asObservable()
	};

	createPuzzleObservable(context)
		.subscribe(value => puzzle = value);

	mousePosition$.next({ x: 1, y: 1, w: 0, h: 0 });
	mouseClicks$.next({ x: 1, y: 1, w: 0, h: 0 });
	mousePosition$.next({ x: 2, y: 1, w: 0, h: 0 });
	mouseUps$.next();

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
});

test("should move a bit on y axis when clicking, moving, and release it on a legal move", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.setLatch({ x: 3, y: 2, w: 2, h: 1 })
		.build();

	const mouseClicks$: Subject<Block> = new Subject();
	const mouseUps$: Subject<void> = new Subject();
	const mousePosition$: Subject<Block> = new Subject();
	const backClicks$: Subject<void> = new Subject();

	const context: UnlockContext = {
		initialPuzzle: puzzle,
		mouseClicks$: mouseClicks$.asObservable(),
		mouseUps$: mouseUps$.asObservable(),
		mousePosition$: mousePosition$.asObservable(),
		backClicks$: backClicks$.asObservable()
	};

	createPuzzleObservable(context)
		.subscribe(value => puzzle = value);

	mousePosition$.next({ x: 1, y: 1, w: 0, h: 0 });
	mouseClicks$.next({ x: 1, y: 1, w: 0, h: 0 });
	expect(puzzle.latchIsMoved).toBeFalsy();
	mousePosition$.next({ x: 1, y: 2, w: 0, h: 0 });
	mouseUps$.next();

	expect(puzzle.bits[0].block.y).toEqual(2);
});

test("should not move a bit on illegal move", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.addBit({ x: 1, y: 1, w: 1, h: 1 })
		.addBit({ x: 2, y: 1, w: 1, h: 1 })
		.build();

	const mouseClicks$: Subject<Block> = new Subject();
	const mouseUps$: Subject<void> = new Subject();
	const mousePosition$: Subject<Block> = new Subject();
	const backClicks$: Subject<void> = new Subject();

	const context: UnlockContext = {
		initialPuzzle: puzzle,
		mouseClicks$: mouseClicks$.asObservable(),
		mouseUps$: mouseUps$.asObservable(),
		mousePosition$: mousePosition$.asObservable(),
		backClicks$: backClicks$.asObservable()
	};

	createPuzzleObservable(context)
		.subscribe(value => puzzle = value);

	mousePosition$.next({ x: 1, y: 1, w: 0, h: 0 });
	mouseClicks$.next({ x: 1, y: 1, w: 0, h: 0 });
	mousePosition$.next({ x: 2, y: 1, w: 0, h: 0 });
	mouseUps$.next();
	const bit = puzzle.bits.find(bit => bit.id === 0);

	if (bit === undefined) {
		throw new Error("Bit is undefined !");
	}

	expect(bit.block.x).toEqual(1);
	expect(puzzle.candidate).toBeFalsy();
});

test("should not move latch on illegal move", function() {
	let puzzle: Puzzle = new PuzzleFactory()
		.build();

	const mouseClicks$: Subject<Block> = new Subject();
	const mouseUps$: Subject<void> = new Subject();
	const mousePosition$: Subject<Block> = new Subject();
	const backClicks$: Subject<void> = new Subject();

	const context: UnlockContext = {
		initialPuzzle: puzzle,
		mouseClicks$: mouseClicks$.asObservable(),
		mouseUps$: mouseUps$.asObservable(),
		mousePosition$: mousePosition$.asObservable(),
		backClicks$: backClicks$.asObservable()
	};

	createPuzzleObservable(context)
		.subscribe(value => puzzle = value);

	mousePosition$.next({ x: 1, y: 2, w: 0, h: 0 });
	mouseClicks$.next({ x: 1, y: 2, w: 0, h: 0 });
	mousePosition$.next({ x: 0, y: 2, w: 0, h: 0 });
	mouseUps$.next();
	expect(puzzle.latch.block.x).toEqual(0);
	expect(puzzle.latchIsMoved).toBeFalsy();
});
