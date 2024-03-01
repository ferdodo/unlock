import { createApp, ref, Ref } from "vue";
import { render } from "unlock/app.template";
import { Playground } from "./components/playground";
import { win$ } from "unlock/observables/win";
import { share } from "unlock/utils/share";
import { disclaim } from "unlock/utils/disclaim";
import { replayGifURL$ } from "unlock/observables/replay-gif-url";
import "cookies-ds";

export const app = createApp({
	components: { Playground },
	setup() {
		const win: Ref<boolean> = ref(false);
		const gifUrl: Ref<string> = ref("");
		win$.subscribe(value => win.value = value);
		replayGifURL$.subscribe(value => gifUrl.value = value);
		disclaim();
		return { win, share, gifUrl };
	},
	render
});
