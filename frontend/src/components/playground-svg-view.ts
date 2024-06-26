import { Ref, ref, defineComponent } from "vue";
import { render } from "./playground-svg-view.template";
import { Puzzle } from "core";
import { currentPuzzleSmooth$ } from "unlock/observables/current-puzzle-smooth";
import { getBitImage } from "unlock/utils/get-bit-image";
import { getCurrentPuzzle } from "unlock/observables/current-puzzle";

export const PlaygroundSvgView = defineComponent({
	setup() {
		const puzzle: Ref<Puzzle> = ref(getCurrentPuzzle());
		currentPuzzleSmooth$.subscribe(p => puzzle.value = p);
		return { puzzle, getBitImage };
	},
	render
});
