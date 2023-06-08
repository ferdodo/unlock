import { randomNumber } from "./randomNumber";
import { Puzzle, Block, MoveBitEvent, MoveLatchEvent, Bit } from "./puzzle";
import { boxCollides } from "./boxCollides";
import { boxIncludes } from "./boxIncludes";
import { generateId } from "./generateId";

function thereIsABigVerticalBlockInTheUpperRight(puzzle: Puzzle): boolean {
	const blocks = puzzle.bits.map(b => b.block);

	for (const block of blocks) {
		if (block.h > 2) {
			if (block.y === 0) {
				if (block.x > (puzzle.w -2)) {
					return true;
				}
			}
		}
	}

	return false;
}

function thereIsLessThanHeightEmptySlots(puzzle: Puzzle): boolean {
	const blocks: Block[] = puzzle.bits.map(b => b.block);
	const totalSlots: number = puzzle.h * puzzle.w;
	let occupiedSlots = 0;

	for	(const block of blocks) {
		occupiedSlots += block.h * block.w;
	}

	occupiedSlots += puzzle.latch.block.w * puzzle.latch.block.h;

	const emptySlots = totalSlots - occupiedSlots;
	return emptySlots < 6;
}

export function generatePuzzle(): Puzzle {
	const puzzle: Puzzle = {
		w: 6,
		h: 6,
		latch: {
			block: {
				x: 0,
				y: 2,
				w: 2,
				h: 1
			}
		},
		bits: []
	};

	const guideBlock: Block = {
		x: 0,
		y: 2,
		w: 7,
		h: 1
	};

	for (let incorrectBlocks = 0; incorrectBlocks < 1000;) {
		const block = generateBlock();

		if (
			puzzle.bits.some(function(b) {
				return boxCollides(
					b.block.x,
					b.block.y,
					b.block.w,
					b.block.h,
					block.x,
					block.y,
					block.w,
					block.h
				);
			})
		) {
			incorrectBlocks++;
			continue;
		}

		if (
			boxCollides(
				block.x,
				block.y,
				block.w,
				block.h,
				guideBlock.x,
				guideBlock.y,
				guideBlock.w,
				guideBlock.h
			)
		) {
			incorrectBlocks++;
			continue;
		}

		if (
			!boxIncludes(
				0,
				0,
				puzzle.w,
				puzzle.h,
				block.x,
				block.y,
				block.w,
				block.h
			)
		) {
			incorrectBlocks++;
			continue;
		}

		puzzle.bits.push({
			id: generateId(),
			block
		});
	}

	for	(let moves = 0; puzzle.latch.block.x !== 0 || !thereIsABigVerticalBlockInTheUpperRight(puzzle) || !thereIsLessThanHeightEmptySlots(puzzle); moves++) {
		if (moves > 5000) {
			return generatePuzzle();
		}
		
		const moveBit = randomNumber(0, 100) < 90;

		if (moveBit) {
			const bit: Bit = puzzle.bits[randomNumber(0, puzzle.bits.length)];
			const moveDirection = randomNumber(0, 100) > 50;
			const moveSign =  randomNumber(0, 100) > 50 ? 1 : -1;
			const moveSignX =  randomNumber(0, 100) > ((bit.block.w > 2 || moves > 2000) ? 20: 80) ? 1 : -1;

			const moveBitEvent: MoveBitEvent = {
				id: bit.id,
				x: bit.block.x + (moveDirection ? moveSignX : 0),
				y: bit.block.y + (moveDirection ? 0 : moveSign),
			}
	
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
				continue;
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
				continue;
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
				continue;	
			}


			puzzle.bits = puzzle.bits.map(function(b) {
				const newBit = {
					...bit,
					block: {
						x: moveBitEvent.x,
						y: moveBitEvent.y,
						w: bit.block.w,
						h: bit.block.h
					}
				};

				return b.id === bit.id ? newBit : b;
			});
		} else {
			const direction = randomNumber(0, 100) < 50;

			const moveLatchEvent: MoveLatchEvent = {
				x: puzzle.latch.block.x + (direction ? 1 : -1)
			};

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
				continue;
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
				continue;
			}

			puzzle.latch.block.x = moveLatchEvent.x;		
		}
	}

	return puzzle;	
}

function generateBlock(): Block {
	const direction = randomNumber(0, 100) > 50;

	return {
		x: randomNumber(0, 7),
		y: randomNumber(0, 7),
		w: direction ? randomNumber(2, 4): 1,
		h: direction ? 1 : randomNumber(2, 4)
	};
}
