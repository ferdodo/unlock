import { PlaygroundSvgReplay } from "unlock/components/playground-svg-replay";
import { convertSvgToPng } from "unlock/utils/convert-svg-to-png";
import { replayPuzzle } from "unlock/stores/puzzle-replay";
import { createApp, h } from "vue";

export async function makeReplayGif() : Promise<void> {
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


	for (const svg of svgs) {
		if (svg) {
			const id = Math.random();
			console.time(`png-${ id }`);
			const png = convertSvgToPng(svg);
			console.timeEnd(`png-${ id }`);
			console.log({ png });
		}		
	}
}
