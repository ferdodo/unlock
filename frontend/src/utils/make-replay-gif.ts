import { PlaygroundSvgReplay } from "unlock/components/playground-svg-replay";
import { convertSvgToPng } from "unlock/utils/convert-svg-to-png";
import { replayPuzzle } from "unlock/stores/puzzle-replay";
import { createApp, h } from "vue";
import { convert_hexstrings_to_animated_gif } from "pngs-to-gif/pkg/pngs_to_gif";

export async function makeReplayGif() : Promise<string> {
	const svgs: string[] = []; 

	for await (const puzzle of replayPuzzle()) {
		const target = document.createElement('div');

		const app = createApp({
			render() {
				return h(PlaygroundSvgReplay, { puzzle });
			}
		});

		app.mount(target);
		const svg = target.innerHTML;

		if (svg) {
			svgs.push(svg);
		}

		app.unmount();
		target.remove();
	}

	return convert_hexstrings_to_animated_gif(
		svgs.map(convertSvgToPng)
	);
}
