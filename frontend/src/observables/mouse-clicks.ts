import { Block } from 'blockwise';
import { Subject } from 'rxjs';

const _mouseClicks = new Subject<Block>();
export const mouseClicks$ = _mouseClicks.asObservable();

export function emitMouseClick(position: Block) {
    _mouseClicks.next(position);
}