# Lee Geonwoo — Portfolio & Blog

Personal portfolio and blog built with Astro. Started from the official blog starter kit.

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
│   └── images/          # unprocessed static images referenced by URL (e.g. profile photo)
├── src/
│   ├── assets/           # images processed by astro:assets (e.g. OG fallback image)
│   ├── components/
│   │   ├── layout/       # BaseHead, Header, Footer — used on every page
│   │   └── *.astro       # page-level content components (ProfileCard, FormattedDate, ...)
│   ├── config/
│   │   └── site.ts       # SITE_CONFIG — single source of truth for site content/data
│   ├── content/
│   │   └── blog/         # blog post Markdown/MDX files
│   ├── content.config.ts # content collection schema (blog category ids come from SITE_CONFIG)
│   ├── layouts/
│   ├── pages/
│   └── utils/            # small shared helpers (e.g. formatDate)
├── astro.config.mjs
├── wrangler.jsonc
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Site-wide content and data (profile info, navigation, blog categories, featured projects) live in `src/config/site.ts`. New content/data requirements should extend `SITE_CONFIG` there rather than being hardcoded into a page or component.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
