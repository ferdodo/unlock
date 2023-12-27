import { fromEvent } from 'rxjs';

export const mouseUps$ = fromEvent(document, 'mouseup');
