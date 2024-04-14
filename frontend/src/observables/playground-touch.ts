import { TouchTracking } from "core";
import { Subject, Observable } from "rxjs";

const _playgroundTouch$: Subject<TouchTracking> = new Subject();

export const playgroundTouch$: Observable<TouchTracking> = _playgroundTouch$.asObservable();

export function emitPlaygroundTouch(touchTracking: TouchTracking) {
	_playgroundTouch$.next(touchTracking);
}
