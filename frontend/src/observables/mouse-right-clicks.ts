import { Block } from 'blockwise';
import { Subject } from 'rxjs';

const _mouseRightClicks = new Subject<Block>();
export const mouseRightClicks$ = _mouseRightClicks.asObservable();

export function emitMouseRightClick(position: Block) {
    _mouseRightClicks.next(position);
}