import { currentPuzzleSmooth$ } from "unlock/observables/current-puzzle-smooth";
import { Puzzle } from "core";
import { saveEvent, replayEvents, clearDatabase } from "loglore";
import { uid } from "uid";
import { throttleTime } from "rxjs";

const id: string = uid();

interface PuzzleReplayEvent {
	id: string;
	puzzle: Puzzle;
}

clearDatabase().catch(console.error);
let eventCount = 0;

currentPuzzleSmooth$
	.pipe(
		throttleTime(100)
	)
	.subscribe(function(puzzle) {
		saveEvent({ id, puzzle });
		eventCount++;
	});

export async function * replayPuzzle(): AsyncGenerator<Puzzle> {
	for await (const event of replayEvents<PuzzleReplayEvent>()) {
		if (event.id === id) {
			yield event.puzzle;
		}
	}
}

export function getEventCount(): number {
	return eventCount;
}