// vite.config.js
import { defineConfig } from "vite"

export default defineConfig({
	build: {
		outDir: "dist", // The output directory for the build
	},
	plugins: [
		{
			name: "html-transform",
			transformIndexHtml(html) {
				// Find the script tag in the HTML file
				const scriptRegex = /<script.*src="\/assets\/scripts\/app\.js".*><\/script>/gm
				const scriptMatch = scriptRegex.exec(html)
				if (scriptMatch) {
					// Replace the script tag with the correct path to the JavaScript bundle
					const scriptTag =
						'<script src="/dist/assets/main-f054f167.js" defer type="module"></script>'
					return html.replace(scriptRegex, scriptTag)
				}
				return html
			},
		},
	],
})
