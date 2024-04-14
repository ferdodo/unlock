import { fromEvent, map, Subject, mergeWith } from 'rxjs';

const _mouseUps$: Subject<void> = new Subject();

export const mouseUps$ = fromEvent(document, 'mouseup')
	.pipe(
		map(() => undefined),
		mergeWith(_mouseUps$)
	);

export function emitMouseUp() {
	_mouseUps$.next();
}
