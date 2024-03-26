import { currentPuzzle$ } from "unlock/observables/current-puzzle";
import { Puzzle } from "unlock/interfaces/puzzle";
import { Bit } from "core";
import { Latch } from "unlock/interfaces/latch";

import {
	Observable,
	interval,
	combineLatest,
	map
} from "rxjs";

const bitPositionXStore: Map<number, number> = new Map();
const bitPositionYStore: Map<number, number> = new Map();

function getSmoothedBit(bit: Bit): Bit {
	const xCached: number = bitPositionXStore.get(bit.id)
		|| bit.block.x;

	const yCached: number = bitPositionYStore.get(bit.id)
		|| bit.block.y;

	const x = (xCached + bit.block.x) / 2;
	const y = (yCached + bit.block.y) / 2;

	bitPositionXStore.set(bit.id, x);
	bitPositionYStore.set(bit.id, y);

	return {
		...bit,
		block: {
			...bit.block,
			x,
			y
		}
	};
}


let latchPositionXStore: number | undefined = undefined;
let latchPositionYStore: number | undefined = undefined;

function getSmoothedLatch(latch: Latch): Latch {
	const xCached: number = latchPositionXStore ?? latch.block.x;
	const yCached: number = latchPositionYStore ?? latch.block.y;
	const x = (xCached + latch.block.x) / 2;
	const y = (yCached + latch.block.y) / 2;
	latchPositionXStore = x;
	latchPositionYStore = y;

	return {
		...latch,
		block: {
			...latch.block,
			x,
			y
		}
	};
}

export const currentPuzzleSmooth$: Observable<Puzzle> = combineLatest(
	currentPuzzle$,
	interval(20)
)
	.pipe(
		map(function([puzzle]) {
			return {
				...puzzle,
				latch: getSmoothedLatch(puzzle.latch),
				candidate: puzzle.candidate
					? getSmoothedBit(puzzle.candidate)
					: undefined,
				bits: puzzle.bits
					.filter(function(bit) {
						return bit.id !== puzzle.candidate?.id
					})
					.map(getSmoothedBit)
			};
		})
	);
