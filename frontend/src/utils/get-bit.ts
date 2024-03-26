import { Bit, Puzzle } from "core";
import { getCurrentPuzzle } from "unlock/observables/current-puzzle";

export function getBit(id: number): Bit {
	const puzzle: Puzzle = getCurrentPuzzle();
	const bit: Bit | undefined = puzzle.bits.find(b => b.id === id);

	if (bit === undefined) {
		throw Error("Bit not found !");
	}

	return bit;
}
