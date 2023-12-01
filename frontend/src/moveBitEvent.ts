import { Subject } from "rxjs";

export interface MoveBitEvent {
	id: number;
	x: number;
	y: number;
}

export const moveBitEvents$: Subject<MoveBitEvent> = new Subject();
