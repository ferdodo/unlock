import { Block } from "blockwise";
import { Bit, Latch } from "core";

export interface Puzzle {
	latch: Latch;
	bits: Bit[];
	block: Block;
	candidate?: Bit;
	latchIsMoved?: boolean;
	moveCount: number;
}
