import { Ref, ref, defineComponent } from "vue";
import { render } from "./playground.template";
import { BitComponent } from "unlock/components/bit";
import { LatchComponent } from "unlock/components/latch";
import { Puzzle } from "unlock/interfaces/puzzle";
import { currentPuzzle$, getCurrentPuzzle } from "unlock/observables/current-puzzle";
import { MouseDetectionComponent } from "unlock/components/mouse-detection";
import { CandidateComponent } from "unlock/components/candidate";

export const Playground = defineComponent({
	components: {
		Bit: BitComponent,
		Latch: LatchComponent,
		Candidate: CandidateComponent,
		MouseDetectionComponent
	},
	setup() {
		const puzzle: Ref<Puzzle> = ref(getCurrentPuzzle());
		currentPuzzle$.subscribe(p => puzzle.value = p);
		return { puzzle };
	},
	render
});
