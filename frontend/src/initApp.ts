import { createApp, ref, Ref } from "vue";
import { render } from "./template";
import { Playground } from "./components/playground";
import { puzzle$, puzzleUnresolved } from "./puzzle";
import { getMoveCount } from "./moveCount";
import "cookies-ds";

const app = createApp({
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

		function share() {
			const date = new Date();
			const year = date.getFullYear();
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const day = ('0' + date.getDate()).slice(-2);
			const formattedDate = `${year}/${month}/${day}`;
			let text = `Unlock ${formattedDate}`;
			const moveCount = getMoveCount();

			text += `\n\nPuzzle réussi en ${ moveCount } mouvements.`

			text += `\n\nhttps://ferdodo.github.io/unlock`;
			navigator.clipboard.writeText(text);
		}

	
		return { 
			win,
			share
		};
	},
	render
});

app.mount("body");
