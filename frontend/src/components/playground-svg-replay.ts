import { defineComponent } from "vue";
import { render } from "./playground-svg-view.template";
import { Puzzle } from "core";
import { getBitImage } from "unlock/utils/get-bit-image";

export const PlaygroundSvgReplay = defineComponent({
	props: {
		puzzle: {
			type: Object as () => Puzzle,
			required: true	
		}
	},
	setup({ puzzle }) {
		return { puzzle, getBitImage };
	},
	render
});
