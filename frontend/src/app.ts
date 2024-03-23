import { createApp, ref, Ref } from "vue";
import { render } from "unlock/app.template";
import { Playground } from "./components/playground";
import { win$ } from "unlock/observables/win";
import { share } from "unlock/utils/share";
import { disclaim } from "unlock/utils/disclaim";
import { replayGifURL$ } from "unlock/observables/replay-gif-url";
import { clickBack } from "unlock/observables/back-clicks";
import { moveCount$ } from "unlock/observables/move-count"
import "cookies-ds";

export const app = createApp({
	components: { Playground },
	setup() {
		const win: Ref<boolean> = ref(false);
		const moveCount: Ref<number> = ref(0);
		const gifUrl: Ref<string> = ref("");
		win$.subscribe(value => win.value = value);
		moveCount$.subscribe(value => moveCount.value = value);
		replayGifURL$.subscribe(value => gifUrl.value = value);
		disclaim();
		return { win, share, gifUrl, clickBack, moveCount };
	},
	render
});
