import { Observable, Subject } from "rxjs";
import { Puzzle } from "unlock/puzzle";
import { generatePuzzle } from "unlock/generate-puzzle";

let currentPuzzle = generatePuzzle();

const _currentPuzzle$: Subject<Puzzle> = new Subject();

export const currentPuzzle$: Observable<Puzzle> = _currentPuzzle$.asObservable();

export function getCurrentPuzzle(): Puzzle {
	return currentPuzzle;
}
