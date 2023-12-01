import { Subject } from "rxjs";

export interface MoveLatchEvent {
	x: number;
}

export const moveLatchEvents$: Subject<MoveLatchEvent> = new Subject();
