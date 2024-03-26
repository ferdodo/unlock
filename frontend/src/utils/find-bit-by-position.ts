import { Block, isBlockIncluding } from "blockwise";
import { Bit } from "core";
import { getCurrentPuzzle } from "unlock/observables/current-puzzle";

export function findBitByPosition(position: Block): Bit | null {
	const puzzle = getCurrentPuzzle();

	return puzzle.bits.find(function(bit) {
		const isIncluding =  isBlockIncluding(bit.block, position);

		if (isIncluding) {
			//console.log({ bit, position });
			//debugger;
		}

		return isIncluding;
	}) || null;

	return puzzle.bits.find(function(bit) {
		return isBlockIncluding(bit.block, position);
	}) || null;
}
