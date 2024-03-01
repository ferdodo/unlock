import { mousePosition$ } from "unlock/observables/mouse-position";
import { Block, UNIT_BLOCK } from "blockwise";
import { pairwise, map, filter, Observable } from "rxjs";

export const mouseMove$: Observable<Block> = mousePosition$.pipe(
	pairwise(),
	map(function([previous, next]) {
		return {
			...UNIT_BLOCK,
			x: next.x - previous.x,
			y: next.y - previous.y
		};
	}),
	filter(function(move) {
		switch(move.x) {
			case -1:
			case 1:
				return move.y === 0;
			case 0:
				switch(move.y) {
					case -1:
					case 1:
						return true;
					default:
						return false;
				}
			default:
				return false;
		}
	})
);
