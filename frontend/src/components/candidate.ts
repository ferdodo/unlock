import { render } from "unlock/components/candidate.template";
import { ref, defineComponent } from "vue";
import { currentPuzzle$, getCurrentPuzzle } from "unlock/observables/current-puzzle";

export const CandidateComponent = defineComponent({
	setup() {
		const puzzle = getCurrentPuzzle();
		const candidate = puzzle.candidate;

		if (candidate === undefined) {
			throw new Error("Candidate not found !");
		}
		
		const x = ref(candidate.block.x);
		const y = ref(candidate.block.y);
		const xEnd = ref(candidate.block.x + candidate.block.w);
		const yEnd = ref(candidate.block.y + candidate.block.h);
		
		currentPuzzle$.subscribe(function(puzzle) {
			if (puzzle.candidate) {
				x.value = puzzle.candidate.block.x;
				y.value = puzzle.candidate.block.y;
				xEnd.value = puzzle.candidate.block.x + puzzle.candidate.block.w;
				yEnd.value = puzzle.candidate.block.y + puzzle.candidate.block.h;	
			}
		});

		return { x, y, xEnd, yEnd };
	},
	render
});
