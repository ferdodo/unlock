import { render } from "unlock/components/latch.template";
import { ref, defineComponent } from "vue";
import { currentPuzzle$, getCurrentPuzzle } from "unlock/observables/current-puzzle";

export const LatchComponent = defineComponent({
	setup() {
		const puzzle = getCurrentPuzzle();
		const x = ref(puzzle.latch.block.x);
		const y = ref(puzzle.latch.block.y);
		const xEnd = ref(puzzle.latch.block.x + puzzle.latch.block.w);
		const yEnd = ref(puzzle.latch.block.y + puzzle.latch.block.h);
		const latchIsMoved = ref(puzzle.latchIsMoved);
		
		currentPuzzle$.subscribe(function(puzzle) {
			x.value = puzzle.latch.block.x;
			y.value = puzzle.latch.block.y;
			xEnd.value = puzzle.latch.block.x + puzzle.latch.block.w;
			yEnd.value = puzzle.latch.block.y + puzzle.latch.block.h;
			latchIsMoved.value = puzzle.latchIsMoved;
		});

		return { x, y, xEnd, yEnd, latchIsMoved };
	},
	render
});
