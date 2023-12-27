import { isBlockColliding, isBlockIncluding } from "blockwise";
import { Puzzle } from "unlock/interfaces/puzzle";
import { Bit } from "unlock/interfaces/bit";

export function isBitMoveLegal(puzzle: Puzzle, candidate: Bit) {
	if (!isBlockIncluding(puzzle.block, candidate.block)) {
		return false;
	}

	for (const bit of puzzle.bits) {
		if (bit.id !== candidate.id && isBlockColliding(bit.block, candidate.block)) {
			return false;
		}
	}

	if (isBlockColliding(puzzle.latch.block, candidate.block)) {
		return false;	
	}

	return true;
}
