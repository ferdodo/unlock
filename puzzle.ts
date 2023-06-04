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
	w: number;
	h: number;
}

export const moveBitEvents$: Subject<MoveBitEvent> = new Subject();
export const moveLatchEvents$: Subject<MoveLatchEvent> = new Subject();

let puzzle2: Puzzle = {
	w: 7,
	h: 7,
	latch: {
		block: {
			x: 0,
			y: 3,
			w: 2,
			h: 1
		}
	},
	bits: [
		/*{
			id: generateId(),
			block: {
				x: 5,
				y: 4,
				h: 2,
				w: 1
			}
		}, {
			id: generateId(),
			block: {
				x: 3,
				y: 4,
				h: 2,
				w: 1
			}
		}*/
	]
};

let puzzle = generatePuzzle();

export function getPuzzle(): Puzzle {
	return puzzle;
}

export const puzzle$: Observable<Puzzle> = new Observable(function(subscriber) {

	moveBitEvents$.subscribe(function(moveBitEvent) {
		if (puzzle.latch.block.x === puzzle.w - puzzle.latch.block.w) {
			return;
		}
	
		const bit = getBit(moveBitEvent.id);
	
		if (
			!boxIncludes(
				0,
				0,
				puzzle.w,
				puzzle.h,
				moveBitEvent.x,
				moveBitEvent.y,
				bit.block.w,
				bit.block.h
			)
		) {
			return;
		}

		if (
			puzzle.bits.some(function(b) {
				return b.id !== moveBitEvent.id
					&& boxCollides(
						b.block.x,
						b.block.y,
						b.block.w,
						b.block.h,
						moveBitEvent.x,
						moveBitEvent.y,
						bit.block.w,
						bit.block.h
					);
			})
		) {
			return;
		}

		if (
			boxCollides(
				puzzle.latch.block.x,
				puzzle.latch.block.y,
				puzzle.latch.block.w,
				puzzle.latch.block.h,
				moveBitEvent.x,
				moveBitEvent.y,
				bit.block.w,
				bit.block.h
			)
		) {
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
		if (puzzle.latch.block.x === puzzle.w - puzzle.latch.block.w) {
			return;
		}
	
		if (
			puzzle.bits.some(function(b) {
				return boxCollides(
					b.block.x,
					b.block.y,
					b.block.w,
					b.block.h,
					moveLatchEvent.x,
					puzzle.latch.block.y,
					puzzle.latch.block.w,
					puzzle.latch.block.h
				);
			})
		) {
			return;
		}

		if (
			!boxIncludes(
				0,
				0,
				puzzle.w,
				puzzle.h,
				moveLatchEvent.x,
				puzzle.latch.block.y,
				puzzle.latch.block.w,
				puzzle.latch.block.h
			)
		) {
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
