import { Block } from "blockwise";
import { Bit } from "unlock/interfaces/bit";
import { Latch } from "unlock/interfaces/latch";

export interface Puzzle {
	latch: Latch;
	bits: Bit[];
	block: Block;
}
