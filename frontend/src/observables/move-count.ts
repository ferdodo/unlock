import { Observable, Subject } from "rxjs";

let moveCount = 0;
const _moveCount$: Subject<number> = new Subject();
export const moveCount$: Observable<number> = _moveCount$.asObservable();

export function incrementMoveCount() {
	moveCount++;
	_moveCount$.next(moveCount);
}

export function decrementMoveCount() {
	moveCount--;
	_moveCount$.next(moveCount);
}

export function getMoveCount(): number {
	return moveCount;
}
