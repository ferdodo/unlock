import { Block } from "./Block";

export function boxCollides(a: Block, b: Block) {
	return a.x + a.w> b.x
		&& a.x < b.x+ b.w
		&& a.y + a.h > b.y
		&& a.y < b.y + b.h;
}
