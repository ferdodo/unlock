import { TouchTracking } from "core";
import { Subject, Observable, debounceTime } from "rxjs";

const _playgroundTouch$: Subject<TouchTracking> = new Subject();

export const playgroundTouch$: Observable<TouchTracking> = _playgroundTouch$.pipe(
		debounceTime(30)
	);

export function emitPlaygroundTouch(touchTracking: TouchTracking) {
	_playgroundTouch$.next(touchTracking);
}
