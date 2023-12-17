import { render } from "./template";
import { ref, defineComponent } from "vue";
import { currentPuzzle$, getCurrentPuzzle } from "unlock/current-puzzle";

export const LatchComponent = defineComponent({
	setup() {
		const puzzle = getCurrentPuzzle();
		const x = ref(puzzle.latch.block.x);
		const y = ref(puzzle.latch.block.y);
		const xEnd = ref(puzzle.latch.block.x + puzzle.latch.block.w);
		const yEnd = ref(puzzle.latch.block.y + puzzle.latch.block.h);
		
		currentPuzzle$.subscribe(function(puzzle) {
			x.value = puzzle.latch.block.x;
			y.value = puzzle.latch.block.y;
			xEnd.value = puzzle.latch.block.x + puzzle.latch.block.w;
			yEnd.value = puzzle.latch.block.y + puzzle.latch.block.h;
		});

		return { x, y, xEnd, yEnd };
	},
	render
});
