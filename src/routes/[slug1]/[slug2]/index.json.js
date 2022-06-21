export const folderFromPath = (path) => path.match(/([\w-]+)\/(\/index)?\.(svelte\.md|md|svx)/i)?.[1] ?? null;
import { slugFromPath,  } from '$lib/util';
import { page } from '$app/stores';

// const pathname = $page.url.pathname;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url, params }) {
	const modules = {
		...(import.meta.glob(`../../../content/*/*/*/index.{md,svx,svelte}`)),
		...(import.meta.glob(`../../../content/*/*/*.{md,svx,svelte}`))
	};

	let matches = Object.fromEntries(
		Object.entries(modules).filter(([path, resolver]) => {
			let filename = slugFromPath(path);
			return (filename.startsWith(`${params.slug1}/${params.slug2}/`))
		}
	));

	const postPromises = [];
	const limit = Number(url.searchParams.get('limit') ?? Infinity);
	const orderBy = Number(url.searchParams.get('orderBy') ?? null);

	if (Number.isNaN(limit)) {
		return {
			status: 400
		};
	}

	for (let [path, resolver] of Object.entries(matches)) {
		const slug = slugFromPath(path);
		const promise = resolver().then((post) => ({
				slug,
				...post.metadata
			})
		);

		postPromises.push(promise);
	}

	const posts = await Promise.all(postPromises);
	const publishedPosts = posts.filter((post) => post.published).slice(0, limit);

	// if(orderBy != undefined) {
	// 	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
	// }

	return {
		body: publishedPosts.slice(0, limit)
	};
}
