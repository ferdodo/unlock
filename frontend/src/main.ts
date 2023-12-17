import init from "wasm/pkg/unlock_puzzle_generator";

init(
	new URL(
		'unlock_puzzle_generator_bg.wasm',
		document.location.href
	).toString()
)
	.then(async function() {
		const { app } = await import("./app.js");
		app.mount('body');
	});
