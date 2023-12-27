import { Observable, Subject } from "rxjs";
import { Puzzle } from "unlock/interfaces/puzzle";
import { generatePuzzle } from "unlock/utils/generate-puzzle";
import { mouseClicks$ } from "unlock/observables/mouse-clicks";
import { findBitByPosition } from "unlock/utils/find-bit-by-position";
import { Block, isBlockPositionEqual } from "blockwise";
import { Bit } from "unlock/interfaces/bit";
import { isBitMoveLegal } from "unlock/utils/is-bit-move-legal";
import { mouseUps$ } from "unlock/observables/mouse-ups";
import { mouseMove$ } from "unlock/observables/mouse-move";
import { isBlockIncluding } from "blockwise";
import { isLatchMoveLegal } from "unlock/utils/is-latch-move-legal";
import { incrementMoveCount } from "unlock/observables/move-count";

let currentPuzzle = generatePuzzle();

const _currentPuzzle$: Subject<Puzzle> = new Subject();

export const currentPuzzle$: Observable<Puzzle> = _currentPuzzle$.asObservable();

export function getCurrentPuzzle(): Puzzle {
	return currentPuzzle;
}

mouseClicks$.subscribe(function(position: Block) {
	const bit = findBitByPosition(position);

	if (bit && !currentPuzzle.candidate) {
		currentPuzzle = {
			...currentPuzzle,
			candidate: { ...bit }
		};

		_currentPuzzle$.next(currentPuzzle);
	}
});

mouseClicks$.subscribe(function(position: Block) {
	const clickingLatch = isBlockIncluding(currentPuzzle.latch.block, position);

	if (clickingLatch) {
		currentPuzzle = {
			...currentPuzzle,
			latchIsMoved: true
		};

		_currentPuzzle$.next(currentPuzzle);
	}
});

mouseUps$.subscribe(function() {
	if (currentPuzzle.candidate === undefined) {
		return;
	}

	const candidate: Bit = currentPuzzle.candidate;
	const bitMoveLegal = isBitMoveLegal(currentPuzzle, candidate);

	if (bitMoveLegal) {
		currentPuzzle = {
			...currentPuzzle,
			bits: currentPuzzle.bits.map(function(b) {
				return {
					...b.id === candidate.id
						? candidate
						: b
				};
			}),
			candidate: undefined
		};

		_currentPuzzle$.next(currentPuzzle);
	}
});

mouseUps$.subscribe(function() {
	if (currentPuzzle.latchIsMoved) {
		currentPuzzle = {
			...currentPuzzle,
			latchIsMoved: false
		};

		_currentPuzzle$.next(currentPuzzle);
	}
});

mouseMove$.subscribe(function(position: Block) {
	if (currentPuzzle.candidate === undefined) {
		return;
	}

	const candidate: Bit = currentPuzzle.candidate;

	const newCandidate: Bit = {
		...candidate,
		block: {
			...candidate.block,
			x: candidate.block.x + position.x,
			y: candidate.block.y + position.y
		}
	};

	const bitMoveLegal = isBitMoveLegal(currentPuzzle, newCandidate);
	const initialBit = currentPuzzle.bits.find(b => b.id === candidate.id);

	if (initialBit === undefined) {
		return;
	}
	
	const samePosition = isBlockPositionEqual(candidate.block, newCandidate.block);

	if (bitMoveLegal && !samePosition) {
	
		currentPuzzle = {
			...currentPuzzle,
			candidate: newCandidate
		};

		_currentPuzzle$.next(currentPuzzle);
		incrementMoveCount();
	}
})


mouseMove$.subscribe(function(position: Block) {
	if (!currentPuzzle.latchIsMoved) {
		return;
	}

	const newLatchBlock: Block = {
		...currentPuzzle.latch.block,
		x: currentPuzzle.latch.block.x + position.x,
		y: currentPuzzle.latch.block.y + position.y
	};

	const latchMoveLegal = isLatchMoveLegal(currentPuzzle, newLatchBlock);

	if (latchMoveLegal) {
		currentPuzzle = {
			...currentPuzzle,
			latch: {
				...currentPuzzle.latch,
				block: newLatchBlock
			}
		};

		_currentPuzzle$.next(currentPuzzle);
		incrementMoveCount();
	}
})
