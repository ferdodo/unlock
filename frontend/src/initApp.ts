import { createApp, ref, Ref } from "vue";
import { render } from "./template";
import { Playground } from "./components/playground";
import { puzzleUnresolved } from "./puzzle";
import { getMoveCount } from "unlock/move-count";
import { enqueueSnackbar } from "cookies-ds";
import { currentPuzzle$ } from "unlock/current-puzzle";

const app = createApp({
	components: {
		Playground
	},
	setup() {
		const win: Ref<boolean> = ref(false);

		currentPuzzle$.subscribe(function(puzzle) {
			if (!puzzleUnresolved(puzzle)) {
				win.value = true;
			}
		});

		if (
			new Date().toJSON().slice(0,10) === '2023-12-02'
			|| new Date().toJSON().slice(0,10) === '2023-12-03'
			|| new Date().toJSON().slice(0,10) === '2023-12-04'
			|| new Date().toJSON().slice(0,10) === '2023-12-05'
		) {
			setTimeout(function() {
				enqueueSnackbar({ message: "Maintenance temporaire" });
				enqueueSnackbar({ message: "le puzzle peut temporairement changer plusieurs fois par jour" });
				enqueueSnackbar({ message: "Le chargement de la page sera plus rapide :)" });
				enqueueSnackbar({ message: "La difficulte augmente un peu" });
				enqueueSnackbar({ message: "Il peut y avoir des dysfonctionnements imprevus xD" });
				enqueueSnackbar({ message: "Merci ❤️" });
			});
		}

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
