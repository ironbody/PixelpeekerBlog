# pixelpeeker

**[pixelpeeker.gay](https://pixelpeeker.gay)**

My personal blog, where I write about software engineering and the things I'm
learning. Built with [Astro](https://astro.build) and deployed on Vercel.

## Stack

- **Astro** for static pages, with React for the theme toggle
- **Tailwind CSS** and **daisyUI**, with a lilac light theme and Dracula
  dark theme
- **Expressive Code** for code blocks that follow the site theme
- **oxlint** and **oxfmt** for linting and formatting

## Getting started

Requires [Bun](https://bun.sh) (version in `.tool-versions`).

```sh
bun install
bun run dev
```

The dev server runs at `localhost:4321`. It runs in the background, so stop it
with `bun run astro dev stop`.

## Commands

| Command             | Action                                   |
| :------------------ | :--------------------------------------- |
| `bun run dev`       | Start the dev server                     |
| `bun run build`     | Build the site to `./dist/`              |
| `bun run preview`   | Preview the build locally                |
| `bun run lint`      | Lint with oxlint (`lint:fix` to fix)     |
| `bun run fmt`       | Format with oxfmt (`fmt:check` to check) |
| `bun run typecheck` | Type-check with TypeScript               |

## Writing a post

Posts are Markdown files in `src/content/blog/`. The file name becomes the URL,
so `my-post.md` is served at `/blog/my-post`. Each post needs this frontmatter:

```yaml
---
title: My post
author: Simon Saberian
pubDate: 2026-10-15
tags: [astro] # up to 4
image: # optional
  url: https://example.com/cover.png
  alt: Description of the image
---
```

## Project structure

```
src/
├── components/   UI pieces like the header, footer and theme toggle
├── content/      blog posts and their schema
├── layouts/      page and post layouts
├── pages/        routes: home, blog, tags, projects and about
├── styles/       global CSS and the daisyUI themes
└── utils/        helpers such as reading time
```
