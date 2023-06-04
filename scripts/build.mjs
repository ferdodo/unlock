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

	for (const template of templates) {
		await buildTemplates(template, outfile(template));
	}
}

async function buildFrontend() {
	await runTask("Bundle frontend", $`
		npx --no-install esbuild --bundle index.ts \
			--define:__VUE_OPTIONS_API__=false \
			--define:__VUE_PROD_DEVTOOLS__=false \
			--target=chrome80 \
			--outfile=public/bundle.js \
			--minify \
			--tree-shaking=true \
			--sourcemap
	`);
}

async function test() {
	await runTask("Bundle test", $`
		npx --no-install esbuild --bundle test.ts \
			--platform=node \
			--outfile=test.js \
			--minify \
			--tree-shaking=true \
			--sourcemap
	`);

	await runTask("Test", $`node --enable-source-maps test.js`);
}

async function checkFrontendTypings() {
	await runTask("Checking frontend typings", $`npx tsc`);
}

await buildVueTemplates();

await Promise.all([
	buildFrontend(),
	checkFrontendTypings(),
	// test()
]);
