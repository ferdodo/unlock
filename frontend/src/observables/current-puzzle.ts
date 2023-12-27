import { Observable, Subject } from "rxjs";
import { Puzzle } from "unlock/interfaces/puzzle";
import { generatePuzzle } from "unlock/utils/generate-puzzle";
import { mouseClicks$ } from "unlock/observables/mouse-clicks";
import { findBitByPosition } from "unlock/utils/find-bit-by-position";
import { Block, isBlockPositionEqual } from "blockwise";
//import { mousePosition$ } from "unlock/observables/mouse-position";
import { Bit } from "unlock/interfaces/bit";
import { isBitMoveLegal } from "unlock/utils/is-bit-move-legal";
import { mouseUps$ } from "unlock/observables/mouse-ups";
import { mouseMove$ } from "unlock/observables/mouse-move";

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

/*mousePosition$.subscribe(function(position: Block) {
	return;
	if (currentPuzzle.candidate === undefined) {
		return;
	}

	const candidate: Bit = currentPuzzle.candidate;

	const newCandidate: Bit = {
		...candidate,
		block: {
			...candidate.block,
			x: position.x,
			y: position.y
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
	}
});*/


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
	}
})
