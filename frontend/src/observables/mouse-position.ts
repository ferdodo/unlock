import { Subject } from 'rxjs';
import { Block } from 'blockwise';

let position: Block = { x: 0, y: 0, w: 1, h: 1 };
const _mousePosition = new Subject<Block>();
export const mousePosition$ = _mousePosition.asObservable();

export function getMousePosition(): Block {
    return position;
}

export function setMousePosition(position: Block) {
    position = position;
    _mousePosition.next(position);
}
