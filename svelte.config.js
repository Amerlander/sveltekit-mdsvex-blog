import adapter from '@sveltejs/adapter-static';
// import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
// import relativeImages from "mdsvex-relative-images";
// import svelteImage from "svelte-image";
import { imagetools } from 'vite-imagetools';
import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [
		md.mdsvex(mdsvexConfig),
		// svelteImage()
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true
		}),
		prerender: {
			default: true,
			onError: 'continue'
		},
		vite: {
			plugins: [imagetools({ force: true })],
		},
	},
};

export default config;
