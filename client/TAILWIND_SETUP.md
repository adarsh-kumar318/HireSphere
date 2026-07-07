# Tailwind CSS v4 Configuration Guide

This React + Vite project uses Tailwind CSS v4. Below is the configuration structure implemented and verified.

The Vite React application is located in the nested `client/client` directory.

## 1. Installed Packages

In `client/client/package.json`:
- `tailwindcss` (v4.3.2)
- `@tailwindcss/vite` (v4.3.2)

## 2. Vite Configuration (`vite.config.js`)

In `client/client/vite.config.js`, the plugin `@tailwindcss/vite` is imported and used in the `plugins` array:
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

## 3. CSS Entry Point (`src/index.css`)

In `client/client/src/index.css`, Tailwind is imported using the v4 syntax:
```css
@import "tailwindcss";
```

## 4. Usage

Ensure that all utility classes are used directly within your React components (e.g. `src/App.jsx`).

To start the development server (run inside `client/client`):
```bash
npm run dev
```

To run a production build (run inside `client/client`):
```bash
npm run build
```
