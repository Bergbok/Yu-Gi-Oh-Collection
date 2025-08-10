import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssNested from 'postcss-nested';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	compressHTML: true,
	output: 'static',
	site: 'https://yugioh.bergbok.party',
	trailingSlash: 'ignore',
	vite: {
		css: {
			postcss: {
				plugins: [
					autoprefixer,
					cssnano,
					postcssNested
				]
			}
		},
		server: {
			proxy: {
				'/geolocation': {
					target: 'https://geolocation.bergbok.party',
					changeOrigin: true
				}
			}
		}
	}
});
