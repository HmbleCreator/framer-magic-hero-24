# Copilot Instructions for framer-magic-hero

## Project Overview
- **Type:** Vite + React + TypeScript SPA
- **UI:** Tailwind CSS, shadcn-ui components (see `src/components/ui/`)
- **Entry Point:** `src/main.tsx` (mounts `App.tsx`)
- **Pages:** In `src/pages/` (e.g., `Index.tsx`, `NotFound.tsx`)
- **Major Sections:** Each homepage section is a React component in `src/components/` (e.g., `HeroSection.tsx`, `ServicesSection.tsx`)
- **Assets:** Images in `src/assets/` and `public/`

## Key Patterns & Conventions
- **Component Structure:**
  - UI primitives in `src/components/ui/` (reusable, stateless)
  - Section/page components in `src/components/` (compose UI primitives)
  - Pages in `src/pages/` (route-level, top-level layout)
- **Hooks:** Custom hooks in `src/hooks/` (e.g., `use-heading-reveal.ts`)
- **Styling:** Tailwind CSS utility classes, sometimes with custom CSS in `App.css`/`index.css`
- **TypeScript:** All code is typed; prefer explicit types for props and hooks.
- **No Redux or Context:** State is local to components or via hooks; no global state management.

## Developer Workflows
- **Install:** `npm i`
- **Dev Server:** `npm run dev` (hot reload, Vite)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Lint:** `npm run lint` (uses `eslint.config.js`)
- **No built-in tests** (as of 2025-09): No test runner or test files present.

## Integration & External Dependencies
- **shadcn-ui:** UI primitives in `src/components/ui/` follow shadcn-ui conventions (see [shadcn/ui docs](https://ui.shadcn.com/)).
- **Vite:** Config in `vite.config.ts`.
- **Tailwind:** Config in `tailwind.config.ts`.
- **No backend/API integration** in this repo; all data is static or local.

## Project-Specific Notes
- **Component Naming:** Use PascalCase for components, camelCase for files except React components (which use PascalCase).
- **Section Composition:** Homepage is composed of section components (see `src/components/`).
- **No routing library:** All navigation is handled in-page; no React Router.
- **Deployment:** Vercel config in `vercel.json`.

## Examples
- To add a new section: create a component in `src/components/`, import and use it in `App.tsx`.
- To add a new UI primitive: add to `src/components/ui/`, export and document usage.

---

If any conventions or workflows are unclear, please ask for clarification or check `README.md` for setup steps.
