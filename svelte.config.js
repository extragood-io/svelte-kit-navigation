/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';


export default {
	kit: {
		adapter: adapter({
			fallback: 'index.html',
		}),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		ssr: false,
	},

	preprocess: preprocess({
		postcss: true
	})
};
