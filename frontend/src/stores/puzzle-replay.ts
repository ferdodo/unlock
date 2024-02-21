import { currentPuzzle$ } from "unlock/observables/current-puzzle";
import { Puzzle } from "unlock/interfaces/puzzle";
import { saveEvent, replayEvents } from "loglore";
import { uid } from "uid";

const id: string = uid();

interface PuzzleReplayEvent {
	id: string;
	puzzle: Puzzle;
}

currentPuzzle$.subscribe(function(puzzle) {
	saveEvent({ id, puzzle });
});

export async function * replayPuzzle(): AsyncGenerator<Puzzle> {
	for await (const event of replayEvents<PuzzleReplayEvent>()) {
		if (event.id === id) {
			yield event.puzzle;
		}
	}
}
