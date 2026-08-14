---
name: shadcn-component-integration
description: Guidelines and step-by-step workflow for integrating TypeScript shadcn UI components into React/Vite applications.
---

# Integrating Shadcn UI Components into React / Vite

When given a React component (e.g., from shadcn or UI libraries) to integrate into a React/Vite project:

## 1. Project Setup & Aliases
- **Vite Config (`vite.config.js`)**:
  Add path alias `@` -> `./src` and file extensions resolution:
  ```js
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
  ```
- **TypeScript (`tsconfig.json`)**:
  Configure path mapping:
  ```json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
  ```

## 2. Utility & Styling Setup
- **Class Merging Utility (`src/lib/utils.ts`)**:
  ```ts
  import { type ClassValue, clsx } from "clsx";
  import { twMerge } from "tailwind-merge";
  export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
  ```
- **Tailwind CSS**: Add `@import "tailwindcss";` to `src/styles/index.css`.

## 3. Component Placement & Design Alignment
- Store reusable UI primitives in `src/components/ui/` (e.g., `src/components/ui/card-21.tsx`).
- Align fonts with project defaults (e.g., `font-family: 'Cormorant Garamond', serif` for titles, `Montserrat` for subtitles).
- Remove generic UI placeholders/emojis unless specifically requested.

## 4. Asset Management
- Store user-uploaded or project images in `src/assets/` and import them as local modules.
