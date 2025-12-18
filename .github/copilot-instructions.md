# Copilot / AI Agent Guidance for FlowTest AI

This repository is a small Next.js (App Router) TypeScript project using Tailwind CSS. The guidance below focuses on concrete, discoverable patterns and workflows to make useful edits quickly.

- **Start / Build:** Use the npm scripts in [package.json](package.json). Common commands:
  - `npm install`
  - `npm run dev` (local dev server, Next.js default port 3000)
  - `npm run build` then `npm start` (production)

- **Big picture architecture:**
  - The project uses the Next.js `app/` directory (server + client components). Top-level layout is [app/layout.tsx](app/layout.tsx) which imports global CSS and renders the `Sidebar` component.
  - Main reusable UI components live in `components/` (example: [components/Sidebar.tsx](components/Sidebar.tsx)).
  - Styling is Tailwind-driven. Global CSS is [styles/globals.css](styles/globals.css); Tailwind plugin config is in [tailwind.config.js](tailwind.config.js) and [postcss.config.cjs](postcss.config.cjs).

- **Conventions & patterns to preserve:**
  - Keep the `@/` import alias for cross-file imports (used in `app/layout.tsx` to load `@/styles/globals.css` and `@/components/Sidebar`). Avoid switching to relative paths.
  - UI uses Tailwind utility classes directly in JSX — prefer adding or composing classes rather than introducing separate CSS files for small changes.
  - The top-level layout wraps pages with a left `Sidebar` (fixed width) and a `main` content area: preserve the `flex` layout used in [app/layout.tsx](app/layout.tsx) when adding pages/components.
  - The HTML language attribute is set to `pt-BR` in the layout; maintain locale intent unless explicitly internationalizing.

- **Where to add features:**
  - New pages: add files under `app/` (e.g., `app/feature/page.tsx`) to leverage the app router.
  - New shared components: place in `components/` and import with `@/components/YourComponent`.

- **Examples of common edits:**
  - Add a new dashboard route: create `app/dashboard/page.tsx` (existing pattern in repo).
  - Modify the sidebar links: update [components/Sidebar.tsx](components/Sidebar.tsx). Keep `Link` from `next/link`.

- **Build & dev gotchas:**
  - There are no test scripts present. Changes should be validated by running `npm run dev` and visiting localhost:3000.
  - TypeScript is installed (`typescript` devDependency). If adding new TS config or path aliases, update `tsconfig.json` (not present in repo snapshot) and ensure the `@/` alias matches.

- **Integration points / external dependencies:**
  - Next.js, React, React-DOM, Tailwind, PostCSS and Autoprefixer are the main deps; checkout `package.json` for versions.
  - No obvious API routes or server integrations are present in the visible files—look under `app/api` if adding backend endpoints.

- **Quick heuristics for edits by AI agents:**
  - Prefer minimal, focused PRs that change only files required for a feature.
  - When changing layout or `Sidebar`, run the dev server locally to visually validate spacing (Tailwind classes impact layout significantly).
  - Preserve app router conventions: page files should export a default React component.

If anything here is unclear or you'd like extra examples (component-level guidelines, testing setup suggestions, or PR style), tell me which area to expand. 
