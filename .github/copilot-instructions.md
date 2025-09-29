
# Copilot Instructions for framer-magic-hero-24

## Project Architecture & Structure
- **Type:** Vite + React + TypeScript SPA
- **UI:** Tailwind CSS, shadcn-ui primitives (`src/components/ui/`)
- **Entry:** `src/main.tsx` → `App.tsx` (mounts all routes)
- **Routing:** Uses `react-router-dom` (see `App.tsx`), but navigation is mostly in-page (anchors) for homepage sections
- **Pages:** `src/pages/` (e.g., `Index.tsx`, `NotFound.tsx`)
- **Sections:** Homepage is composed of section components in `src/components/` (e.g., `HeroSection.tsx`, `ServicesSection.tsx`)
- **UI Primitives:** All reusable UI elements in `src/components/ui/` (shadcn-ui style, stateless)
- **Hooks:** Custom hooks in `src/hooks/` (e.g., `use-heading-reveal.ts`, `use-form-submission.ts`)
- **Assets:** Images in `src/assets/` and `public/`
- **API:** Serverless function in `api/contact.ts` (handles all form submissions)
- **Config:** Vite (`vite.config.ts`), Tailwind (`tailwind.config.ts`), ESLint (`eslint.config.js`), Vercel (`vercel.json`)

## Key Patterns & Conventions
- **Component Structure:**
  - UI primitives: `src/components/ui/` (stateless, shadcn-ui conventions)
  - Section/page components: `src/components/` (compose UI primitives, one per homepage section)
  - Pages: `src/pages/` (route-level, top-level layout)
- **Naming:** PascalCase for React components, camelCase for files except React components (which use PascalCase)
- **Styling:** Tailwind CSS utility classes; custom CSS in `App.css`/`index.css` only for global tweaks
- **TypeScript:** All code is typed; always use explicit types for props, hooks, and API data
- **State:** Local state only (no Redux, no React Context)
- **Forms:** Use `useFormSubmission` hook for all forms (contact, booking, newsletter); validation with Zod schemas in `src/lib/form-validation.ts`; all forms POST to `/api/contact`
- **Toasts:** Use `use-toast` hook for notifications; only one toast visible at a time
- **Animations:** Section reveals and writing effects via custom hooks (`use-heading-reveal`, `use-writing-effect`, `use-slide-reveal`)
- **Blog:** Blog metadata in `src/lib/blogs.ts`, content in `src/blogs/*.md`, rendered with `react-markdown` in `BlogsPage.tsx`
- **No global state, no context, no Redux**

## Developer Workflows
- **Install:** `npm i`
- **Dev Server:** `npm run dev` (hot reload, Vite, port 8080)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Lint:** `npm run lint` (uses `eslint.config.js`)
- **No built-in tests** (as of 2025-09): No test runner or test files present
- **Deploy:** Vercel (`vercel.json` config, output to `dist/`)

## Integration & External Dependencies
- **shadcn-ui:** All UI primitives in `src/components/ui/` follow [shadcn/ui](https://ui.shadcn.com/) conventions
- **Vite:** See `vite.config.ts` for dev server, proxy, and alias config
- **Tailwind:** See `tailwind.config.ts` for custom color system and animations
- **API:** All forms POST to `/api/contact` (see `api/contact.ts` for schema and email logic)
- **No external backend:** All data is static or handled via Vercel serverless functions

## Examples & How-Tos
- **Add a homepage section:** Create a component in `src/components/`, import and use it in `Index.tsx`
- **Add a UI primitive:** Add to `src/components/ui/`, export and document usage
- **Add a form:** Use `useFormSubmission` and Zod schema from `src/lib/form-validation.ts`; POST to `/api/contact`
- **Add a blog post:** Add metadata to `src/lib/blogs.ts`, content as markdown in `src/blogs/`, rendered in `BlogsPage.tsx`

---

If any conventions or workflows are unclear, please ask for clarification or check `README.md` for setup steps.
