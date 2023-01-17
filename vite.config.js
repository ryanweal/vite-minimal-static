import {
	defineConfig
} from 'vite'
import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig({
    root: './pages',
	base: `${process.env.BASE_URL || "/"}`,
	publicDir: "./assets",
	css: {
		devSourcemap: true,
		postcss: {
			plugins: []
		}
	},
	build: {
		sourcemap: true,
		outDir: "../build",
		emptyOutDir: true,
	},
	plugins: [{
			name: 'hmr-rules',
			handleHotUpdate({
				file,
				server
			}) {
				if (file.endsWith('.twig') || file.endsWith('.scss')) {
					console.log('hmr', file)
					server.ws.send({
						type: 'full-reload',
						path: '*'
					});
				}
			}
		},
		ssr({
			prerender: true,
		})
	]
})