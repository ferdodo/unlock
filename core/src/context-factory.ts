import { Subject } from "rxjs";
import { UnlockContext, Puzzle, TouchTracking } from ".";
import { Block } from "blockwise";

export class ContextFactory {
	#puzzle: Puzzle;
	#mouseClicks$: Subject<Block>;
	#mouseUps$: Subject<void>;
	#mousePosition$: Subject<Block>;
	#backClicks$: Subject<void>;
	#playgroundTouch$: Subject<TouchTracking>;

	constructor(puzzle: Puzzle) {
		this.#mouseClicks$ = new Subject();
		this.#mouseUps$ = new Subject();
		this.#mousePosition$ = new Subject();
		this.#backClicks$ = new Subject();
		this.#playgroundTouch$ = new Subject();
		this.#puzzle = { ...puzzle };
	}

	build(): UnlockContext {
		return {
			initialPuzzle: { ...this.#puzzle },
			mouseClicks$: this.#mouseClicks$.asObservable(),
			mouseUps$: this.#mouseUps$.asObservable(),
			mousePosition$: this.#mousePosition$.asObservable(),
			backClicks$: this.#backClicks$.asObservable(),
			playgroundTouch$: this.#playgroundTouch$.asObservable()
		};
	}

	emitMouseClick(block: Block): ContextFactory {
		this.#mouseClicks$.next(block);
		return this;
	}

	emitMouseUp(): ContextFactory {
		this.#mouseUps$.next();
		return this;
	}

	emitMousePosition(block: Block): ContextFactory {
		this.#mousePosition$.next(block);
		return this;
	}

	emitBackClicks(): ContextFactory {
		this.#backClicks$.next();
		return this;
	}

	emitPlaygroundTouch(touchTracking: TouchTracking): ContextFactory {
		this.#playgroundTouch$.next(touchTracking);
		return this;
	}
}
