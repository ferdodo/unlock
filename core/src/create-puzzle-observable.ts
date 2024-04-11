import { Observable, Subject } from "rxjs";
import { Block, isBlockIncluding, mapPositionsToUnitaryMovements } from "blockwise";
import { Puzzle, UnlockContext, Bit, isBitMoveLegal, isLatchMoveLegal, PuzzleHistory } from "core";

export function createPuzzleObservable(
	context: UnlockContext
): Observable<Puzzle> {
	const _puzzle$: Subject<Puzzle> = new Subject();
	let puzzle: Puzzle = context.initialPuzzle;
	const puzzleHistory: PuzzleHistory = new PuzzleHistory(puzzle);

	_puzzle$.subscribe(p => puzzleHistory.append(p));

	context.backClicks$.subscribe(function() {
		const last = puzzleHistory.rewind();

		if (last) {
			puzzle = last;
			_puzzle$.next(last);
		}
	});

	context.mouseClicks$.subscribe(function(position: Block) {
		const bit = puzzle.bits.find(function(b) {
			return isBlockIncluding(b.block, position);
		});

		if (bit && !puzzle.candidate) {
			puzzle = {
				...puzzle,
				candidate: { ...bit }
			};

			_puzzle$.next(puzzle);
		}
	});

	context.mouseClicks$.subscribe(function(position: Block) {
		const clickingLatch = isBlockIncluding(puzzle.latch.block, position);

		if (clickingLatch) {
			puzzle = {
				...puzzle,
				latchIsMoved: true
			};

			_puzzle$.next(puzzle);
		}
	});

	context.mouseUps$.subscribe(function() {
		if (puzzle.candidate === undefined) {
			return;
		}

		const candidate: Bit = puzzle.candidate;

		puzzle = {
			...puzzle,
			bits: puzzle.bits.map(function(b) {
				return {
					...b.id === candidate.id
						? candidate
						: b
				};
			}),
			candidate: undefined,
			moveCount: puzzle.moveCount + 1
		};

		_puzzle$.next(puzzle);
	});

	context.mouseUps$.subscribe(function() {
		if (puzzle.latchIsMoved) {
			puzzle = {
				...puzzle,
				latchIsMoved: false,
				moveCount: puzzle.moveCount + 1
			};

			_puzzle$.next(puzzle);
		}
	});

	context.mousePosition$.pipe(
		mapPositionsToUnitaryMovements()
	).subscribe(function(position: Block) {
		if (puzzle.candidate === undefined) {
			return;
		}

		const candidate: Bit = puzzle.candidate;

		const newCandidate: Bit = {
			...candidate,
			block: {
				...candidate.block,
				x: candidate.block.x + position.x,
				y: candidate.block.y + position.y
			}
		};

		const bitMoveLegal = isBitMoveLegal(puzzle, newCandidate);

		if (bitMoveLegal) {
			puzzle = {
				...puzzle,
				candidate: newCandidate
			};

			_puzzle$.next(puzzle);
		}
	});

	context.mousePosition$.pipe(
		mapPositionsToUnitaryMovements()
	).subscribe(function(position: Block) {
		if (!puzzle.latchIsMoved) {
			return;
		}

		const newLatchBlock: Block = {
			...puzzle.latch.block,
			x: puzzle.latch.block.x + position.x
		};

		const latchMoveLegal = isLatchMoveLegal(puzzle, newLatchBlock);

		if (latchMoveLegal) {
			puzzle = {
				...puzzle,
				latch: {
					...puzzle.latch,
					block: newLatchBlock
				}
			};

			_puzzle$.next(puzzle);
		}
	});

	return _puzzle$.asObservable();
}
