import { createApp, ref, Ref } from "vue";
import { render } from "unlock/app.template";
import { Playground } from "./components/playground";
import { win$ } from "unlock/observables/win";
import { share } from "unlock/utils/share";
import { disclaim } from "unlock/utils/disclaim";
import "cookies-ds";

export const app = createApp({
	components: {
		Playground,
	},
	setup() {
		const win: Ref<boolean> = ref(false);
		win$.subscribe(value => win.value = value);
		disclaim();
		return { win, share };
	},
	render
});
