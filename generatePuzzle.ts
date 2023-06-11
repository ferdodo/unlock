import { randomNumber } from "./randomNumber";
import { Block } from "./Block";
import { MoveBitEvent } from "./moveBitEvent";
import { MoveLatchEvent } from "./moveLatchEvent";
import { isBitMoveLegal } from "./isBitMoveLegal";
import { isLatchMoveLegal } from "./isLatchMoveLegal";
import { Puzzle, Bit } from "./puzzle";
import { thereIsABigVerticalBlockInTheUpperRight } from "./thereIsABigVerticalBlockInTheUpperRight";
import { thereIsLessThanSixEmptySlots } from "./thereIsLessThanSixEmptySlots";
import { generateBits } from "./generateBits";

export function generatePuzzle(): Puzzle {
	const puzzle: Puzzle = {
	    block: { x: 0, y: 0, w: 6, h: 6 },
		latch: {
			block: { x: 0, y: 2, w: 2, h: 1 }
		},
		bits: []
	};

	puzzle.bits = generateBits(puzzle);

	for	(let moves = 0; puzzle.latch.block.x !== 0 || !thereIsABigVerticalBlockInTheUpperRight(puzzle) || !thereIsLessThanSixEmptySlots(puzzle); moves++) {
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
			};

			const movedBlock: Block = {
				...bit.block,
				x: bit.block.x + (moveDirection ? moveSignX : 0),
				y: bit.block.y + (moveDirection ? 0 : moveSign)				
			};

			if (isBitMoveLegal(puzzle, bit.id, movedBlock)) {
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
			}
		} else {
			const direction = randomNumber(0, 100) < 50;

			const moveLatchEvent: MoveLatchEvent = {
				x: puzzle.latch.block.x + (direction ? 1 : -1)
			};

			const movedBlock: Block = {
				...puzzle.latch.block,
				x: moveLatchEvent.x
			};

			if (isLatchMoveLegal(puzzle, movedBlock)) {
				puzzle.latch.block.x = moveLatchEvent.x;
			}
		}
	}

	return puzzle;	
}
