import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Posts are organised as:
  //   src/content/blog/<category-id>/<slug>/index.md
  // The folder name IS the category, so there is no `category` frontmatter
  // field to keep in sync. See `src/utils/blog.ts` for how it is read back.
  //
  // Each post gets its own folder so it can carry its own images — see
  // "Adding images to a post" in that same file's doc comment.
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // A local file next to this post, e.g. heroImage: './cover.jpg'
      heroImage: image().optional(),
      // Marks a post as a highlight; not currently surfaced anywhere in the UI.
      featured: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      // If set, the post body is encrypted at build time with this password
      // (see src/utils/postLock.ts) and only decrypted client-side once the
      // reader enters it correctly. The plaintext stays in this file, so
      // whoever can read the repo can read it too — this only gates casual
      // visitors of the built site, not anyone with repo access.
      password: z.string().optional(),
    }),
});

export const collections = { blog };
