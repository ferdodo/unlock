import { createApp, ref, Ref, onUnmounted/*, computed*/ } from "vue";
import { render } from "./template";
import { Playground } from "./components/playground";
import { puzzle$, getPuzzle } from "./puzzle";
import "cookies-ds";

export const app = createApp({
	components: {
		Playground
	},
	setup() {
		const win = ref(false);
		puzzle$.subscribe(function(puzzle) {
			if (puzzle.latch.block.x === puzzle.w - puzzle.latch.block.w) {
				win.value = true;
			}
		});
	
		return { 
			win
		};
	},
	render
});

app.mount("body");
