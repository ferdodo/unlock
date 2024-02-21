import init from "puzzle-generator/pkg/unlock_puzzle_generator";
import initSvgToPng from "svg-to-png/pkg/svg_to_png";

init(
	new URL(
		'unlock_puzzle_generator_bg.wasm',
		document.location.href
	).toString()
)
	.then(
		() => initSvgToPng(
			new URL(
				'svg_to_png_bg.wasm',
				document.location.href
			)
		)
	)
	.then(async function() {
		const { app } = await import("./app.js");
		app.mount('body');
	});
