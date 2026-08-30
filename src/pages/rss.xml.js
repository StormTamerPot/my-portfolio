import rss from '@astrojs/rss';
import { SITE_CONFIG } from '../config/site';
import { getBlogPosts } from '../utils/blog';

export async function GET(context) {
	const posts = await getBlogPosts();
	return rss({
		title: SITE_CONFIG.site.title,
		description: SITE_CONFIG.site.description,
		site: context.site,
		items: posts.map((post) => ({
			...post.entry.data,
			link: post.href,
		})),
	});
}
