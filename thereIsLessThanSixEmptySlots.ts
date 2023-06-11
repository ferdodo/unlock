import { Puzzle } from "./puzzle";
import { Block } from "./Block";

export function thereIsLessThanSixEmptySlots(puzzle: Puzzle): boolean {
	const blocks: Block[] = puzzle.bits.map(b => b.block);
	const totalSlots: number = puzzle.block.h * puzzle.block.w;
	let occupiedSlots = 0;

	for	(const block of blocks) {
		occupiedSlots += block.h * block.w;
	}

	occupiedSlots += puzzle.latch.block.w * puzzle.latch.block.h;

	const emptySlots = totalSlots - occupiedSlots;
	return emptySlots < 6;
}
