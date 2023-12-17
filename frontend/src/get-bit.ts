import { Bit } from "unlock/bit";
import { Puzzle } from "unlock/puzzle";
import { getCurrentPuzzle } from "unlock/current-puzzle";

export function getBit(id: number): Bit {
	const puzzle: Puzzle = getCurrentPuzzle();
	const bit: Bit | undefined = puzzle.bits.find(b => b.id === id);

	if (bit === undefined) {
		throw Error("Bit not found !");
	}

	return bit;
}
