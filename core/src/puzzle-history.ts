import { Puzzle } from "core";

export class PuzzleHistory {
	history: Puzzle[] = [];

	constructor(puzzle: Puzzle) {
		this.history.push(puzzle);
	}

	get size() {
		return this.history.length;
	}

	append(puzzle: Puzzle) {
		if (puzzle.candidate || puzzle.latchIsMoved) {
			return;
		}

		const last = this.history[this.history.length - 1];

		if (last!.moveCount === puzzle.moveCount) {
			return;
		}

		this.history.push(puzzle);
	}

	rewind(): Puzzle | undefined {
		if (this.history.length > 1) {
			this.history.pop();
			return this.history[this.history.length - 1];
		}
	}
}
