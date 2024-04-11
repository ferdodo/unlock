import { fromEvent, map } from 'rxjs';

export const mouseUps$ = fromEvent(document, 'mouseup')
	.pipe(map(() => undefined));
