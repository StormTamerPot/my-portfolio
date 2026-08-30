// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		// LaTeX: $inline$ and $$display$$ in .md/.mdx, rendered to HTML at build
		// time by KaTeX. The stylesheet is imported in layouts/BlogPost.astro.
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
});
