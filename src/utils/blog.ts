import { getCollection, type CollectionEntry } from 'astro:content';
import {
  BLOG_CATEGORY_IDS,
  SITE_CONFIG,
  type BlogCategoryId,
} from '../config/site';

export interface BlogPost {
  entry: CollectionEntry<'blog'>;
  /** URL slug — the filename, without the category folder. */
  slug: string;
  href: string;
  category: BlogCategoryId;
  categoryLabel: string;
}

const CATEGORY_LABELS = new Map(
  SITE_CONFIG.blogCategories.map((category) => [category.id, category.label]),
);

function isCategoryId(value: string): value is BlogCategoryId {
  return (BLOG_CATEGORY_IDS as readonly string[]).includes(value);
}

/**
 * Loads every blog post, newest first.
 *
 * A post's category comes from the folder it lives in
 * (`src/content/blog/<category-id>/<slug>/index.md`), so moving a post's
 * folder to a different category folder is all it takes to recategorise it.
 *
 * ## Adding images to a post
 *
 * Give the post its own folder and put images right next to `index.md`:
 *
 *   src/content/blog/<category-id>/<slug>/
 *     index.md
 *     cover.jpg
 *     diagram-1.png
 *
 * Cover/hero image — set it in frontmatter:
 *   heroImage: './cover.jpg'
 *
 * Inline images — reference them directly in the Markdown body:
 *   ![설명](./diagram-1.png)
 *
 * Both are automatically optimized by Astro at build time. Relative paths
 * only — images in `public/` are never processed this way.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await getCollection('blog');

  return entries
    .map((entry) => {
      const segments = entry.id.split('/');
      // A post written as `<slug>/index.md` uses the folder name as its
      // slug; a flat `<slug>.md` uses the filename itself.
      if (segments[segments.length - 1] === 'index') segments.pop();
      const slug = segments[segments.length - 1];
      const folder = segments.length > 1 ? segments[0] : '';

      if (!isCategoryId(folder)) {
        throw new Error(
          `Blog post "${entry.id}" is not inside a category folder. ` +
            `Move it into one of: ${BLOG_CATEGORY_IDS.join(', ')}.`,
        );
      }

      return {
        entry,
        slug,
        href: `/blog/${slug}/`,
        category: folder,
        categoryLabel: CATEGORY_LABELS.get(folder) ?? folder,
      };
    })
    .sort(
      (a, b) =>
        b.entry.data.pubDate.valueOf() - a.entry.data.pubDate.valueOf(),
    );
}

/** Posts flagged with `featured: true`, newest first. */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return (await getBlogPosts()).filter((post) => post.entry.data.featured);
}

/** Every unique tag used across all posts, in first-seen (newest-post-first) order. */
export async function getAllTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.entry.data.tags) tags.add(tag);
  }
  return [...tags];
}

/**
 * Builds a short plain-text excerpt from the start of a post's body,
 * used as the subtitle on the home page's featured cards.
 */
export function getExcerpt(post: BlogPost, maxLength = 120): string {
  const plain = (post.entry.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/\$\$[\s\S]*?\$\$/g, ' ') // display math
    .replace(/\$[^$\n]*\$/g, ' ') // inline math
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/^\s*#{1,6}\s+.*$/gm, ' ') // headings
    .replace(/^\s*[-*+]\s+/gm, ' ') // list markers
    .replace(/[*_`>#]/g, '') // leftover markdown syntax
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= maxLength) return plain;
  const truncated = plain.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const cut = lastSpace > maxLength * 0.6 ? truncated.slice(0, lastSpace) : truncated;
  return `${cut.trimEnd()}…`;
}
