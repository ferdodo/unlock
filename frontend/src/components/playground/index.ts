import { Ref, ref, defineComponent } from "vue";
import { render } from "./template";
import { BitComponent } from "../bit";
import { LatchComponent } from "../latch";
import { Puzzle } from "unlock/puzzle";
import { currentPuzzle$, getCurrentPuzzle } from "unlock/current-puzzle";

export const Playground = defineComponent({
	components: {
		Bit: BitComponent,
		Latch: LatchComponent
	},
	setup() {
		const puzzle: Ref<Puzzle> = ref(getCurrentPuzzle());
		currentPuzzle$.subscribe(p => puzzle.value = p);

		return {
			puzzle
		};
	},
	render
});
