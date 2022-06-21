// import remarkGithub from 'remark-github';
// import remarkGfm from 'remark-gfm';
// import remarkMermaid from 'remark-mermaid';
import remarkAbbr from 'remark-abbr';
import remarkRelativeImages from "mdsvex-relative-images";
import remarkContainers from 'remark-containers';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFrontmatterImport from './mdsvexplugins/mdsvex-frontmatter-to-import.js'

export default {
	layout: {
		_: "./src/lib/mdsvex/layouts/default.svelte"
	},
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: {
		dashes: 'oldschool',
		// quotes: false
	},
	remarkPlugins: [
		// [	
		// 	remarkGithub,
		// 	{
		// 		// Use your own repository
		// 		repository: 'https://github.com/Amerlander/sveltekit-mdsvex-blog.git'
		// 	}
		// ],
		[remarkAbbr, { expandFirst: true }],
		remarkContainers,
		// [remarkMermaid, { simple: true }],
		// remarkGfm,
		remarkFrontmatterImport,
		remarkRelativeImages
	],
	rehypePlugins: [
		rehypeSlug,
		[rehypeAutolinkHeadings, { behavior: 'wrap' }]
	]
};
