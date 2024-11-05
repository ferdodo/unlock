import { createApp, ref, Ref } from "vue";
import { render } from "unlock/app.template";
import { Playground } from "./components/playground";
import { win$ } from "unlock/observables/win";
import { share } from "unlock/utils/share";
import { disclaim } from "unlock/utils/disclaim";
import { replayGifURL$ } from "unlock/observables/replay-gif-url";
import { clickBack } from "unlock/observables/back-clicks";
import { currentPuzzle$ } from "unlock/observables/current-puzzle";
import { scorelessShare } from "./utils/scoreless-share";
import "crumbs-design-system";
import { getEventCount } from "./stores/puzzle-replay";

export const app = createApp({
	components: { Playground },
	setup() {
		const win: Ref<boolean> = ref(false);
		const moveCount: Ref<number> = ref(0);
		const gifUrl: Ref<string> = ref("");
		const indeterminedDuration: Ref<number| null> = ref(null);
		const indeterminedProgress: Ref<boolean | null> = ref(null);
		const indeterminedProgressDone: Ref<boolean> = ref(false);

		win$.subscribe(value => {
			win.value = value;
			indeterminedDuration.value = Math.max(0, getEventCount() * 4);
			indeterminedProgress.value = true;

			//@ts-ignore
			if (value && window.opener?.registerScore) {
				//@ts-ignore
				window.opener.registerScore("unlock", moveCount.value);
				window.close();
			}
		});


		function showGif() {
			indeterminedProgressDone.value = true;
		}

		currentPuzzle$.subscribe(puzzle => moveCount.value = puzzle.moveCount);

		replayGifURL$.subscribe(value => {
			gifUrl.value = value;
			indeterminedProgress.value = null;
		});

		disclaim();

		return {
			win,
			share,
			showGif,
			gifUrl,
			clickBack,
			moveCount,
			scorelessShare,
			indeterminedDuration,
			indeterminedProgress,
			indeterminedProgressDone
		};
	},
	render
});
