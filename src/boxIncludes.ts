import { Block } from "./Block";

export function boxIncludes(a: Block, b: Block) {
	return a.x <= b.x
		&& a.y <= b.y
		&& (a.x + a.w) >= (b.x + b.w)
		&& (a.y + a.h) >= (b.y + b.h);
}
