import { generatePuzzle } from "unlock/utils/generate-puzzle";
import { mouseClicks$ } from "unlock/observables/mouse-clicks";
import { mouseUps$ } from "unlock/observables/mouse-ups";
import { mousePosition$ } from "unlock/observables/mouse-position";
import { backClicks$ } from "unlock/observables/back-clicks";
import { UnlockContext } from "core";

export const context: UnlockContext = {
	initialPuzzle: generatePuzzle(),
	mouseClicks$,
	mouseUps$,
	mousePosition$,
	backClicks$
};
