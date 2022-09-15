/** @type {import('@sveltejs/kit').Config} */
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';


export default {
	kit: {
		adapter: adapter({
			fallback: 'index.html',
		}),
	},

	preprocess: preprocess({
		postcss: true
	})
};
