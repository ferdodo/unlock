import { Block } from 'blockwise';
import { Subject } from 'rxjs';

const _mouseUps = new Subject<Block>();
export const mouseUps$ = _mouseUps.asObservable();

export function emitMouseUp(position: Block) {
    _mouseUps.next(position);
}
