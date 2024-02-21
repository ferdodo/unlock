#!/usr/bin/env zx
import shell from "shelljs";
import { runTask } from "zx-run-task";

const { find, cp, mkdir } = shell;

async function buildVueTemplates() {
	const templates = find('.')
		.filter(file => !file.includes('node_modules/'))
		.filter(file => !file.includes('public/'))
		.filter(file => !file.includes('dist/'))
		.filter(file => file.match(/\.html$/));

	function outfile(fileName) {
		return fileName.replace(/\.html$/, '.js');
	}

	async function buildTemplates(infile, outfile) {
		await runTask(`Building vue.js template ${ infile }`, $`
			npx --no-install vue-compiler-dom-cli \
				--infile ${ infile } \
				--outfile ${ outfile } \
				--mode module
		`);
	}

	await Promise.all(
		templates.map(function(template) {
			return buildTemplates(template, outfile(template));
		})
	);
}

async function buildFrontend() {
	await runTask("Bundle frontend", $`
		npx --no-install esbuild --bundle src/main.ts \
			--define:__VUE_OPTIONS_API__=false \
			--define:__VUE_PROD_DEVTOOLS__=false \
			--target=chrome80 \
			--outfile=dist/bundle.js \
			--minify \
			--tree-shaking=true \
			--sourcemap
	`);
}


async function checkFrontendTypings() {
	await runTask("Checking frontend typings", $`npx tsc`);
}

await buildVueTemplates();

mkdir('-p', 'dist');
cp('-R', 'public/*', 'dist');
cp('../puzzle-generator/pkg/unlock_puzzle_generator_bg.wasm', 'dist');
cp('../svg-to-png/pkg/svg_to_png_bg.wasm', 'dist');

await Promise.all([
	buildFrontend(),
	checkFrontendTypings(),
]);

