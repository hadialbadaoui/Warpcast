import { defineConfig } from "vite";

// Simple static site build — no React
export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
  },
});
