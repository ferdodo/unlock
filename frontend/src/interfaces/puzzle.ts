import { Block } from "blockwise";
import { Bit } from "core";
import { Latch } from "unlock/interfaces/latch";

export interface Puzzle {
	latch: Latch;
	bits: Bit[];
	block: Block;
	candidate?: Bit;
	latchIsMoved?: boolean;
}
