import { createApp, ref, Ref } from "vue";
import { render } from "./template";
import { Playground } from "./components/playground";
import { puzzle$, puzzleUnresolved } from "./puzzle";
import "cookies-ds";

export const app = createApp({
	components: {
		Playground
	},
	setup() {
		const win: Ref<boolean> = ref(false);

		puzzle$.subscribe(function(puzzle) {
			if (!puzzleUnresolved(puzzle)) {
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
