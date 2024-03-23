import { Observable, Subject } from "rxjs";

const _backClicks$: Subject<void> = new Subject();

export const backClicks$: Observable<void> = _backClicks$.asObservable();

export function clickBack() {
	_backClicks$.next();
}
