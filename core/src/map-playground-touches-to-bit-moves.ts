import { Observable, OperatorFunction, scan, filter, map, distinctUntilChanged } from "rxjs";
import { Block } from "blockwise";
import { TouchTracking } from ".";

interface TouchTrackingScan extends TouchTracking {
	lastX: number;
	lastY: number;
	moveDetected?: Block;
}

export function mapPlaygroundTouchesToBitMoves(
	threshold: number
): OperatorFunction<TouchTracking, Block> {
	let lastValue = Infinity;
	let previousX = -99;
	let previousY = -99;

	return function(source: Observable<TouchTracking>) {
		return source.pipe(
			scan<TouchTracking, TouchTrackingScan, undefined>(
				function(
					acc: TouchTrackingScan | undefined,
					curr: TouchTracking
				) {
					if (acc === undefined) {
						return {
							...curr,
							lastX: curr.startX,
							lastY: curr.startY
						};
					}

					if (
						acc.cordStartX !== curr.cordStartX
						|| acc.cordStartY !== curr.cordStartY
						|| acc.startX !== curr.startX
						|| acc.startY !== curr.startY
					) {
						return {
							...curr,
							lastX: curr.startX,
							lastY: curr.startY
						};
					}

					if (curr.x - threshold > acc.lastX) {
						return {
							...curr,
							lastX: curr.x,
							lastY: curr.y,
							moveDetected: { x: 1, y: 0, w: 1, h: 1 }
						};
					}

					if (curr.x + threshold < acc.lastX) {
						return {
							...curr,
							lastX: curr.x,
							lastY: curr.y,
							moveDetected: { x: -1, y: 0, w: 1, h: 1 }
						};
					}

					if (curr.y - threshold > acc.lastY) {
						return {
							...curr,
							lastX: curr.x,
							lastY: curr.y,
							moveDetected: { x: 0, y: 1, w: 1, h: 1 }
						};
					}

					if (curr.y + threshold < acc.lastY) {
						return {
							...curr,
							lastX: curr.x,
							lastY: curr.y,
							moveDetected: { x: 0, y: -1, w: 1, h: 1 }
						};
					}

					return acc;
				},
				undefined
			),
			map(v => v.moveDetected),
			filter(Boolean),
			distinctUntilChanged(function(a, b) {
				const now = Date.now();

				if (lastValue + 250 < now) {
					lastValue = now;
					previousX = b.x;
					previousY = b.y;
					return false;
				}

				const differentMoveDirection = a.x !== b.x || a.y !== b.y;
				const notReversing = b.x !== -previousX || b.y !== -previousY;

				if (differentMoveDirection && notReversing) {
					lastValue = now;
					previousX = b.x;
					previousY = b.y;
					return false;
				}

				return true;
			})
		);
	};
}
