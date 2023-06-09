import { Observable, Subject, share } from "rxjs";
import { generateId } from "./generateId";
import { boxIncludes } from "./boxIncludes";
import { boxCollides } from "./boxCollides";
import { generatePuzzle } from "./generatePuzzle";

export enum Direction {
	Horizontal,
	Vertical
}

export interface Block {
	x: number;
	y: number;
	h: number;
	w: number;
}

interface Latch {
	block: Block
}

export interface Bit {
	id: number;
	block: Block
}

export interface MoveBitEvent {
	id: number;
	x: number;
	y: number;
}

export interface MoveLatchEvent {
	x: number;
}

export interface Puzzle {
	latch: Latch;
	bits: Bit[];
	block: Block;
}

export const moveBitEvents$: Subject<MoveBitEvent> = new Subject();
export const moveLatchEvents$: Subject<MoveLatchEvent> = new Subject();

let puzzle = generatePuzzle();

export function getPuzzle(): Puzzle {
	return puzzle;
}

export const puzzle$: Observable<Puzzle> = new Observable(function(subscriber) {

	moveBitEvents$.subscribe(function(moveBitEvent) {
		if (puzzle.latch.block.x === puzzle.block.w - puzzle.latch.block.w) {
			return;
		}
	
		const bit = getBit(moveBitEvent.id);

		const movedBlock: Block = {
			...bit.block,
			x: moveBitEvent.x,
			y: moveBitEvent.y
		};

		if (
			!boxIncludes(puzzle.block, movedBlock)
		) {
			return;
		}

		if (
			puzzle.bits.some(function(b) {
				return b.id !== moveBitEvent.id && boxCollides(b.block, movedBlock);
			})
		) {
			return;
		}

		if (boxCollides(puzzle.latch.block, movedBlock)) {
			return;	
		}

		puzzle = {
			...puzzle,
			bits: puzzle.bits.map(function(bit) {
				if (bit.id === moveBitEvent.id) {
					return {
						...bit,
						block: {
							x: moveBitEvent.x,
							y: moveBitEvent.y,
							w: bit.block.w,
							h: bit.block.h
						}
					}
				}

				return bit;
			})
		};
	
		subscriber.next(puzzle);
	});

	moveLatchEvents$.subscribe(function(moveLatchEvent) {
		if (puzzle.latch.block.x === puzzle.block.w - puzzle.latch.block.w) {
			return;
		}

		const movedBlock: Block = {
			...puzzle.latch.block,
			x: moveLatchEvent.x
		}

		if (puzzle.bits.some(b => boxCollides(b.block, movedBlock))) {
			return;
		}

		if (!boxIncludes(puzzle.block, movedBlock)) {
			return;
		}

		puzzle = {
			...puzzle,
			latch: {
				...puzzle.latch,
				block: {
					...puzzle.latch.block,
					x: moveLatchEvent.x
				}
			}
		};

		subscriber.next(puzzle);
	})

	subscriber.next(puzzle);
}).pipe(share<Puzzle | unknown>()) as Observable<Puzzle>;

export function getBit(id: number): Bit {
	const bit: Bit | undefined = puzzle.bits.find(b => b.id === id);

	if (bit === undefined) {
		throw Error("Bit not found !");
	}

	return bit;
}
